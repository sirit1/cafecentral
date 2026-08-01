// ==========================================
// Supabase Interface Hook (Client-side)
// ==========================================

import { createClient } from '@supabase/supabase-js';
import { useState, useEffect } from 'react';

// Create Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

const supabase = supabaseUrl && supabaseKey 
  ? createClient(supabaseUrl, supabaseKey) 
  : null;

// Interfaces
export interface Order {
  id: string;
  userId: string;
  status: 'pending' | 'processing' | 'confirmed' | 'ready' | 'completed';
  total: number;
  items: {
    productId: string;
    quantity: number;
  }[];
  createdAt: string;
  updatedAt: string;
}

export interface OrderItem extends Order {
  items: {
    productId: string;
    name: string;
    price: number;
    quantity: number;
  }[];
}

export function useSupabase() {
  const [client] = useState<any>(supabase);

  // Fetch user's orders
  const fetchOrders = async (): Promise<Order[]> => {
    if (!client) return [];
    
    // In production, we'll pass userId through context/state
    // For now, we'll fetch all orders (demo mode)
    try {
      const { data, error } = await client.from('orders').select('*').order('created_at', { ascending: false });
      if (error) throw error;
      return data || [];
    } catch (error: any) {
      console.error('Error fetching orders:', error);
      return [];
    }
  };

  // Create order
  const createOrder = async (order: Partial<Order>): Promise<Order> => {
    if (!client) return {} as Order;

    try {
      const { data, error } = await client.from('orders').insert(order).select().single();
      if (error) throw error;
      return data;
    } catch (error: any) {
      console.error('Error creating order:', error);
      return { id: '', userId: '', status: 'pending', total: 0, items: [], createdAt: '', updatedAt: '' };
    }
  };

  // Update order status
  const updateOrderStatus = async (orderId: string, status: Order['status']): Promise<void> => {
    if (!client) return;

    try {
      await client.from('orders').update({ status, updated_at: new Date().toISOString() }).eq('id', orderId);
    } catch (error: any) {
      console.error('Error updating order status:', error);
    }
  };

  // Delete order
  const deleteOrder = async (orderId: string): Promise<boolean> => {
    if (!client) return false;

    try {
      const { error } = await client.from('orders').delete().eq('id', orderId);
      return !error;
    } catch (error: any) {
      console.error('Error deleting order:', error);
      return false;
    }
  };

  return { fetchOrders, createOrder, updateOrderStatus, deleteOrder };
};