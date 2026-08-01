// ==========================================
// POST - Create Checkout Session (Stripe Checkout API)
// ==========================================

import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { CheckoutOrder, OrderItem } from '@/app/hooks/checkout';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const cartItems: OrderItem[] = body.items;
    const orderId = body.orderId || '';

    if (!cartItems || cartItems.length === 0) {
      return NextResponse.json({ error: 'No items in cart' }, { status: 400 });
    }

    // Calculate total
    const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

    // Create Checkout Session
    // NOTE: Stripe uses the smallest currency unit. For CLP, 1 CLP = 1 cent.
    // So we use the price directly without multiplying by 100.
    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      payment_method_types: ['card'],
      line_items: cartItems.map(item => ({
        price_data: {
          currency: 'clp',
          product_name: item.name,
          // 1 CLP = 1 cent in Stripe's smallest currency unit
          unit_price: item.price, 
          quantity: item.quantity,
        },
      })),
      success_url: `${process.env.NEXT_PUBLIC_SITE_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}/`,
      metadata: {
        order_id: orderId, // Link this Stripe session to the business order
        customer_email: body.email || '',
      },
    });

    return NextResponse.json({ 
      sessionId: session.id, 
      url: session.url,
      orderId // Return the orderId so the frontend knows which order to link to
    });
  } catch (error) {
    console.error('Checkout error:', error);
    return NextResponse.json({ error: 'Checkout failed' }, { status: 500 });
  }
}

// ==========================================
// GET - Retrieve Checkout Session
// ==========================================

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const sessionId = searchParams.get('sessionId');

    if (!sessionId) {
      return NextResponse.json({ error: 'No session ID provided' }, { status: 400 });
    }

    const session = await stripe.checkout.sessions.retrieve(sessionId);

    if (session.mode !== 'payment') {
      return NextResponse.json({ error: 'Session not a payment session' }, { status: 400 });
    }

    return NextResponse.json({
      id: session.id,
      amount: session.amount_total || 0, // For CLP, this is already in smallest unit
      status: session.status,
      metadata: session.metadata,
    });
  } catch (error) {
    console.error('Session retrieval error:', error);
    return NextResponse.json({ error: 'Failed to retrieve session' }, { status: 500 });
  }
}