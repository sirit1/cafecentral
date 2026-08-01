// ==========================================
// Stripe Webhook - Order Status Updates
// ==========================================

import { NextRequest, NextResponse } from 'next/server';
import { WebhookEvent } from '@stripe/stripe-webhooks';
import { headers } from 'next/headers';
import { stripe } from '@/lib/stripe';
import { createClient } from '@supabase/supabase-js';
import { CheckoutOrder, OrderItem } from '@/app/hooks/checkout';

// Create Supabase client (only available in serverless functions, not in middleware)
// For Vercel Edge Runtime, we may need to use a different approach
let supabase: any = null;

try {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (supabaseUrl && supabaseKey) {
    supabase = createClient(supabaseUrl, supabaseKey);
  }
} catch (error) {
  console.error('Supabase connection failed in webhook:', error);
}

export const config = {
  // Stripe webhook secret
  runtime: 'edge', // Run on edge for webhook events
};

export async function POST(request: NextRequest) {
  const body = await request.text();
  const signature = request.headers.get('stripe-signature') as string;

  const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!endpointSecret) {
    console.log('Webhook secret not configured, skipping signature validation');
  } else if (!signature) {
    return NextResponse.json({ error: 'No signature' }, { status: 400 });
  } else {
    let event: WebhookEvent;
    try {
      event = WebhookEvent.constructFromBytes(body, signature, endpointSecret);
    } catch (error) {
      return NextResponse.json({ error: 'Webhook signature verification failed' }, { status: 400 });
    }
  }

  // Handle only checkout.session.completed events
  if (event.type === 'checkout.session.completed') {
    await handleCheckoutCompleted(event.data as any);
  } else if (event.type === 'checkout.session.async_payment_failed') {
    await handlePaymentFailed(event.data as any);
  }

  return NextResponse.json({ received: true });
}

async function handleCheckoutCompleted(session: any) {
  const orderId = session.metadata?.orderId;
  
  if (!orderId) {
    console.log('No order ID in session metadata');
    return;
  }

  // Get or create the order
  let order: CheckoutOrder | null = null;

  if (supabase) {
    const { data, error } = await supabase
      .from('orders')
      .select('*')
      .eq('id', orderId)
      .single();

    if (data) {
      order = data;
    }
  }

  // If order doesn't exist in Supabase and Stripe has the items, create it
  if (!order && session.line_items?.data) {
    const stripeItems = session.line_items.data;
    const items: OrderItem[] = [];
    let total = 0;

    stripeItems.forEach((stripeItem: any) => {
      // Find corresponding item in the cart (simplified - you'd need to store cart items)
      const productId = stripeItem.price.product?.id || stripeItem.price.product?.metadata?.productId;
      const name = stripeItem.price.product?.metadata?.name || `Item ${productId}`;
      const price = stripeItem.price.unit_price ? parseInt(stripeItem.price.unit_price) / 100 : 0;

      items.push({
        productId: productId || '',
        name,
        price: price * 1000, // Convert back to CLP (x10, since Stripe divides by 100)
        quantity: stripeItem.quantity,
      });
      total += (price * 1000) * stripeItem.quantity;

      if (!productId) {
        console.warn(`Could not find product ID: ${productId}`);
      }
    });

    const orderPayload: CheckoutOrder = {
      id: orderId,
      stripeSessionId: session.id,
      total,
      items,
      status: 'confirmed',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    if (supabase) {
      const { error } = await supabase.from('orders').insert([orderPayload]);
      if (error) throw error;
      order = orderPayload;
    }
  }

  // Update order status
  if (order && supabase) {
    await supabase
      .from('orders')
      .update({
        status: 'processing',
        updatedAt: new Date().toISOString(),
      })
      .eq('id', orderId);
  }
}

async function handlePaymentFailed(session: any) {
  const orderId = session.metadata?.orderId;

  if (orderId && supabase) {
    await supabase
      .from('orders')
      .update({
        status: 'cancelled',
        updatedAt: new Date().toISOString(),
      })
      .eq('id', orderId);
  }

  console.log(`Order ${orderId} cancelled due to payment failure`);
}