// ==========================================
// POST - Create Order
// ==========================================

import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { OrderItem } from '@/app/hooks/checkout';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { userId, items, status } = body;

    if (!userId || !items || !Array.isArray(items)) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Validate Supabase config
    if (!supabaseUrl || !supabaseKey) {
      return NextResponse.json({ 
        error: 'Backend not configured. Please configure Supabase in your environment.' 
      }, { status: 500 });
    }

    const supabase = createClient(supabaseUrl, supabaseKey);

    // Calculate total
    const total = items.reduce((sum, item) => sum + (item.price || 0) * (item.quantity || 1), 0);

    const orderPayload = {
      user_id: userId,
      status: status || 'pending',
      total,
      items,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    // Insert order
    const { data: order, error } = await supabase
      .from('orders')
      .insert([orderPayload])
      .select()
      .single();

    if (error) throw error;

    return NextResponse.json({ 
      order: { 
        id: order.id,
        status: order.status,
        total,
        items,
        createdAt: order.created_at,
        updatedAt: order.updated_at,
      } 
    });
  } catch (error: any) {
    console.error('Error creating order:', error);
    return NextResponse.json({ error: error.message || 'Failed to create order' }, { status: 500 });
  }
}