// ==========================================
// Checkout Context - Stripe Integration
// ==========================================

import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';

export interface CartItem {
  productId: string;
  quantity: number;
}

export interface OrderItem extends CartItem {
  name: string;
  price: number;
}

export interface CheckoutOrder {
  id: string; // Checkout order ID (business-side)
  stripeSessionId: string | null; // Stripe session ID (null if no payment yet)
  stripePaymentIntentId?: string; // Stripe payment intent ID
  total: number;
  items: OrderItem[];
  status: 'pending' | 'processing' | 'confirmed' | 'ready' | 'cancelled' | 'completed';
  userId: string; // Demo user ID or actual user
  createdAt: string;
  updatedAt: string;
}

export interface CheckoutState {
  orders: CheckoutOrder[];
  setOrders: React.Dispatch<React.SetStateAction<CheckoutOrder[]>>;
  activeOrderId: string | null;
  setActiveOrderId: React.Dispatch<React.SetStateAction<string | null>>;
  isLoading: boolean;
  initialized: boolean;
  setInitialized: React.Dispatch<React.SetStateAction<boolean>>;
  addItemToOrder: (orderId: string, productId: string, quantity: number) => void;
  createNewOrder: (items: OrderItem[]) => CheckoutOrder | null;
  checkoutWithStripe: (stripeUrl: string, orderId: string) => Promise<void>;
  completeCheckout: (orderId: string) => Promise<void>;
  cancelOrder: (orderId: string) => void;
  processStripeReturn: (sessionId: string) => CheckoutOrder | null;
  getActiveOrder: () => CheckoutOrder | null;
  refreshOrders: () => Promise<void>;
  clearCart: () => void;
}

const CheckoutContext = createContext<CheckoutState | null>(null);

export function CheckoutProvider({ children }: { children: React.ReactNode }) {
  const [orders, setOrders] = useState<CheckoutOrder[]>([]);
  const [activeOrderId, setActiveOrderId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Initialize from localStorage (demo mode)
  const [initialized, setInitialized] = useState(false);

  // Poll for order status updates
  useEffect(() => {
    if (activeOrderId && !initialized) {
      const interval = setInterval(async () => {
        await refreshOrders();
        clearInterval(interval);
      }, 3000); // Poll every 3 seconds
      return () => clearInterval(interval);
    }
  }, [activeOrderId, initialized]);

  const refreshOrders = async () => {
    try {
      setIsLoading(true);
      
      // Try to fetch from Supabase if available
      if (typeof window !== 'undefined') {
        const response = await fetch('/hooks/supabase.js');
        const { useSupabase } = await response.json();
        const sup = useSupabase();
        const data = await sup.fetchOrders();
        
        if (data.length > 0) {
          setOrders(data);
          const newActiveOrder = data.find((o: CheckoutOrder) => o.id === activeOrderId) || data[0];
          if (newActiveOrder && newActiveOrder.id === activeOrderId) {
            setActiveOrderId(newActiveOrder.id);
          }
        }
      }
    } catch (error) {
      console.error('Failed to refresh orders:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const saveToStorage = () => {
    localStorage.setItem('cafecentral-checkout-orders', JSON.stringify(orders));
  };

  const addItemToOrder = (orderId: string, productId: string, quantity: number) => {
    setOrders(prev => prev.map(order => {
      if (order.id !== orderId) return order;
      
      const existingItem = order.items.find(item => item.productId === productId);
      if (existingItem) {
        return { ...order, items: order.items.map(item => 
          item.productId === productId ? { ...item, quantity: item.quantity + quantity } : item
        )};
      }
      
      return { ...order, items: [...order.items, { productId, name: 'Producto', price: 0, quantity }] };
    }));
    
    if (activeOrderId !== orderId) setActiveOrderId(orderId);
    saveToStorage();
  };

  const createNewOrder = (items: OrderItem[]): CheckoutOrder | null => {
    const orderId = 'order_' + crypto.randomUUID();
    const total = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    
    const newOrder: CheckoutOrder = {
      id: orderId,
      stripeSessionId: null,
      stripePaymentIntentId: undefined,
      total,
      items,
      status: 'pending',
      userId: 'demo-user',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    
    setOrders(prev => [...prev, newOrder]);
    setActiveOrderId(orderId);
    saveToStorage();
    
    return newOrder;
  };

  const checkoutWithStripe = async (stripeUrl: string, orderId: string) => {
    setIsLoading(true);
    
    // Redirect to Stripe checkout in new window
    const newWindow = window.open(stripeUrl, '_blank');
    
    if (newWindow && !newWindow.closed) {
      // After successful payment, mark order as processing
      setTimeout(async () => {
        await refreshOrders();
        saveToStorage();
      }, 1000);
    } else {
      // User cancelled the payment
      cancelOrder(orderId);
    }
    
    setIsLoading(false);
  };

  const completeCheckout = async (orderId: string) => {
    setIsLoading(true);
    
    try {
      const response = await fetch('/api/checkout/status', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ orderId }),
      });
      
      const result = await response.json();
      
      if (result.order && result.order.stripeSessionId) {
        // We have a Stripe session, proceed to checkout
        const checkoutResponse = await fetch('/api/checkout', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            items: result.order.items,
            orderId: orderId,
            email: result.order.userId,
          }),
        });
        
        const checkoutResult = await checkoutResponse.json();
        
        if (checkoutResult.url) {
          await checkoutWithStripe(checkoutResult.url, orderId);
        } else {
          console.error('Checkout failed:', checkoutResult);
        }
      } else {
        // No Stripe session, order is already confirmed
        setOrders(prev => prev.map(order => 
          order.id === orderId ? { ...order, status: 'confirmed', updatedAt: new Date().toISOString() } : order
        ));
      }
    } catch (error) {
      console.error('Complete checkout error:', error);
    }
    
    setIsLoading(false);
  };

  const cancelOrder = (orderId: string) => {
    setOrders(prev => prev.map(order => 
      order.id === orderId ? { ...order, status: 'cancelled', updatedAt: new Date().toISOString() } : order
    ));
    setActiveOrderId(null);
    saveToStorage();
  };

  const processStripeReturn = (sessionId: string): CheckoutOrder | null => {
    // Find or create order for this Stripe session
    const existingOrder = orders.find(o => o.stripeSessionId === sessionId);
    
    if (existingOrder) {
      // Update existing order status
      return {
        ...existingOrder,
        status: 'confirmed',
        stripeSessionId: sessionId,
        updatedAt: new Date().toISOString(),
      };
    }
    
    // If order doesn't exist, create a new confirmed order
    // (This shouldn't happen in normal flow, but as fallback)
    return null;
  };

  const getActiveOrder = () => {
    return orders.find(order => order.id === activeOrderId) || null;
  };

  const clearCart = () => {
    // This function clears the cart by removing items from any active order
    // For demo mode, we remove items from the active order
    setOrders(prev => prev.map(order => {
      if (order.id === activeOrderId) {
        return { ...order, items: [] };
      }
      return order;
    }));
    saveToStorage();
  };

  return (
    <CheckoutContext.Provider value={{ 
      orders, setOrders,
      activeOrderId, setActiveOrderId,
      addItemToOrder, createNewOrder, checkoutWithStripe, completeCheckout, cancelOrder, processStripeReturn, getActiveOrder, 
      isLoading, refreshOrders, initialized, setInitialized,
      clearCart
    }}>
      {children}
    </CheckoutContext.Provider>
  );
}

export const useCheckout = (): CheckoutState => {
  const context = useContext(CheckoutContext);
  if (!context) {
    throw new Error('useCheckout must be used within CheckoutProvider');
  }
  return context;
};

export { CheckoutContext };
export default CheckoutContext;