// ==========================================
// OrderTracker Component - Updated to use CheckoutContext
// ==========================================

'use client';

import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, Clock, Activity, Check, XCircle } from 'lucide-react';
import { useCheckout } from '../hooks/checkout';

type OrderStatus = 'pending' | 'processing' | 'confirmed' | 'ready' | 'completed';

interface OrderStatusStep {
  id: OrderStatus;
  label: string;
  description: string;
  icon: React.ReactNode;
}

const orderSteps: OrderStatusStep[] = [
  {
    id: 'pending',
    label: 'Pendiente',
    description: 'Tu pedido está siendo preparado',
    icon: <Clock className="text-yellow-400" size={24} />
  },
  {
    id: 'processing',
    label: 'En Proceso',
    description: 'Estamos preparando tu pedido',
    icon: <Activity className="text-purple-400" size={24} />
  },
  {
    id: 'confirmed',
    label: 'Confirmado',
    description: 'Tu pedido está listo para ser confirmado',
    icon: <CheckCircle className="text-cyan-400" size={24} />
  },
  {
    id: 'ready',
    label: 'Listo',
    description: 'Tu pedido está listo para recoger',
    icon: <Check className="text-green-400" size={24} />
  },
  {
    id: 'completed',
    label: 'Completado',
    description: '¡Gracias por tu compra!',
    icon: <CheckCircle className="text-purple-500" size={24} />
  }
];

interface OrderTrackerProps {
  activeOrderId?: string | null;
  isLoading?: boolean;
}

export function OrderTracker({ activeOrderId = null, isLoading = false }: OrderTrackerProps) {
  const { orders, activeOrder, isLoading: contextLoading, getActiveOrder, refreshOrders } = useCheckout();

  // Override props with context values if not provided
  const useOrders = typeof activeOrderId !== 'undefined' ? activeOrderId : null;
  const localLoading = typeof isLoading !== 'undefined' ? isLoading : contextLoading;

  // Get active order from context or props
  const activeOrderObj = activeOrderId ? getActiveOrder() : orders.find(o => o.id === activeOrderId) || orders[0];
  
  // Get completed orders (for history)
  const completedOrders = orders.filter(o => o.status === 'completed');

  const formatCurrency = (amount: number) => `$${amount.toLocaleString()} CLP`;

  return (
    <div className="w-full max-w-4xl mx-auto my-12 px-6">
      {/* Loading State */}
      {localLoading && orders.length === 0 && (
        <div className="text-center py-8">
          <div className="w-12 h-12 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-400">Cargando tu pedido...</p>
        </div>
      )}

      {/* Active Order Tracker */}
      {activeOrderObj && activeOrderObj.status !== 'completed' && !localLoading && (
        <div className="mb-12">
          <div className="text-center mb-8">
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">
              Estado de tu Pedido
            </h3>
            <p className="text-gray-400 text-sm">
              <span className="text-white font-semibold">{activeOrderObj.id.slice(0, 8)}...</span>
              {' '} • Creado el {new Date(activeOrderObj.createdAt).toLocaleDateString('es-CL')}
            </p>
          </div>

          {/* Progress Steps */}
          <div className="flex items-center justify-between mb-8">
            {orderSteps.map((step, index) => (
              <div key={step.id} className="flex flex-col items-center">
                <AnimatePresence mode="popLayout">
                  {activeOrderObj.status === step.id && (
                    <motion.div
                      key="active"
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1.2, opacity: 1 }}
                      exit={{ scale: 0, opacity: 0 }}
                      className="absolute inset-0 flex items-center justify-center"
                    >
                      <motion.div
                        animate={{ scale: [1, 1.3, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="w-16 h-16 rounded-full bg-gradient-to-r from-cyan-500 to-purple-500 flex items-center justify-center shadow-lg shadow-purple-500/30"
                      >
                        {step.icon}
                      </motion.div>
                    </motion.div>
                  )}
                </AnimatePresence>

                <motion.div
                  animate={{
                    scale: activeOrderObj.status === step.id ? 1.1 : 1,
                    opacity: activeOrderObj.status === step.id ? 1 : 0.6
                  }}
                  className={`w-12 h-12 rounded-full flex items-center justify-center border-2 transition-all relative z-10
                    ${activeOrderObj.status === step.id 
                      ? 'bg-gradient-to-r from-cyan-500 to-purple-500 border-transparent' 
                      : 'bg-black/50 border-white/20'
                    }
                  `}
                >
                  {index < orderSteps.length - 1 && activeOrderObj.status === step.id && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute -top-1 -right-1"
                    >
                      <Check size={18} className="text-white" />
                    </motion.div>
                  )}
                  {step.icon}
                </motion.div>
                <span className="text-xs text-gray-400 mt-2">{step.label}</span>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
            <div className="grid md:grid-cols-3 gap-4 mb-4">
              <div className="text-center">
                <p className="text-2xl font-bold text-cyan-400">{activeOrderObj.items.length}</p>
                <p className="text-gray-400 text-sm">Productos</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-purple-400">{formatCurrency(activeOrderObj.total)}</p>
                <p className="text-gray-400 text-sm">Total</p>
              </div>
              <div className="text-center">
                <p className="text-xl font-bold text-white truncate" style={{ maxWidth: '100px' }}>
                  {activeOrderObj.id.slice(-8)}
                </p>
                <p className="text-gray-400 text-xs">ID del pedido</p>
              </div>
            </div>

            {/* Items List */}
            <div className="space-y-2 mb-4">
              {activeOrderObj.items.slice(0, 6).map((item, index) => (
                <motion.div
                  key={item.productId}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 * (index + 1) }}
                  className="flex justify-between items-center py-2 border-b border-white/5 last:border-0"
                >
                  <span className="text-gray-300 truncate max-w-[120px]">{item.name}</span>
                  <span className="text-gray-400 text-sm">
                    x{item.quantity} x {new Intl.NumberFormat('es-CL').format(item.price)}
                  </span>
                </motion.div>
              ))}
              
              {activeOrderObj.items.length > 6 && (
                <p className="text-gray-500 text-xs text-center">+{activeOrderObj.items.length - 6} más productos</p>
              )}
            </div>
          </div>

          {/* Status Description */}
          <motion.div
            key={activeOrderObj.status}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center text-gray-300 text-sm mb-6 px-4"
          >
            {activeOrderObj.status === 'pending' && (
              <p>Estamos preparando tu pedido... ☕</p>
            )}
            {activeOrderObj.status === 'processing' && (
              <p>Nuestro equipo está trabajando en él... 🎨</p>
            )}
            {activeOrderObj.status === 'confirmed' && (
              <p>¡Tu pedido ha sido confirmado! ✅</p>
            )}
            {activeOrderObj.status === 'ready' && (
              <p>🎉 ¡Tu pedido está listo para recoger! <br/> Ven a visitarnos en la Isla de Chiloé. 🏝️</p>
            )}
            {activeOrderObj.status === 'completed' && (
              <p>¡Gracias por tu compra! 🎊 Tu experiencia en Café Central ha sido especial.</p>
            )}
          </motion.div>

          {/* Actions */}
          <div className="flex gap-3">
            {activeOrderObj.status === 'ready' && (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex-1 py-3 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold text-sm hover:shadow-lg hover:shadow-purple-500/25 transition-all"
              >
                🏪 Recoger pedido
              </motion.button>
            )}
            {activeOrderObj.status !== 'completed' && (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  // Scroll to top to see menu
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="flex-1 py-3 rounded-xl bg-white/10 text-white font-bold text-sm hover:bg-white/20 transition-all"
              >
                🛍️ Continuar comprando
              </motion.button>
            )}
          </div>
        </div>
      )}

      {/* Completed Orders */}
      {completedOrders.length > 0 && (
        <div className="border-t border-white/10 pt-8">
          <h4 className="text-center text-lg font-bold text-gray-400 mb-4">
            ✅ Pedidos Completados
          </h4>
          <div className="grid md:grid-cols-2 gap-4">
            {completedOrders.slice(0, 4).map(order => (
              <div key={order.id} className="bg-white/5 border border-white/10 rounded-xl p-4">
                <div className="flex justify-between items-start mb-2">
                  <span className="text-white font-medium text-sm truncate">{order.id.slice(0, 12)}...</span>
                  <span className="text-gray-500 text-xs">{new Date(order.createdAt).toLocaleDateString('es-CL')}</span>
                </div>
                <div className="flex items-center gap-2 mb-2">
                  <Check className="text-purple-500" size={16} />
                  <span className="text-purple-400 text-sm font-medium">{order.status}</span>
                </div>
                <p className="text-cyan-400 text-sm font-semibold">
                  {formatCurrency(order.total)}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* No Orders Message */}
      {orders.length === 0 && !localLoading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12"
        >
          <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-4">
            <ShoppingBag size={32} className="text-gray-600" />
          </div>
          <p className="text-gray-400">Aún no tienes pedidos</p>
          <p className="text-gray-600 text-sm mt-2">Explora nuestro menú y comienza tu experiencia!</p>
        </motion.div>
      )}
    </div>
  );
}