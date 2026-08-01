// ==========================================
// Success Page - Handle Stripe Payment Return
// ==========================================

'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, ArrowLeft, ShoppingBag, Star } from 'lucide-react';

export default function SuccessPage() {
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Read sessionId from URL query params
    const params = new URLSearchParams(window.location.search);
    const sessionParam = params.get('session_id');
    
    if (sessionParam) {
      setSessionId(sessionParam);
      
      // Call backend API to validate session
      fetch('/api/checkout/status', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sessionId: sessionParam }),
      })
        .then(res => res.json())
        .then(result => {
          if (result.order) {
            setOrder(result.order);
          } else {
            // Fetch from CheckoutContext
            fetch('/hooks/checkout.ts')
              .then(res => res.json())
              .then(module => {
                const { useCheckout } = module;
                // This will be handled by the parent page providing the context
              });
          }
        })
        .catch(err => {
          console.error('Failed to fetch order:', err);
          setError('No se pudo validar tu sesión de pago.');
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      // Redirect if no session
      window.location.href = '/';
    }
  }, []);

  const handleRedirect = () => {
    window.location.href = '/';
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <div className="text-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
          >
            <div className="w-12 h-12 border-4 border-cyan-500 border-t-transparent rounded-full"></div>
          </motion.div>
          <p className="text-gray-400 mt-4">Procesando tu pago...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black px-4">
        <div className="max-w-md w-full">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-red-500/10 border border-red-500/30 rounded-xl p-6 text-center"
          >
            <div className="flex justify-center mb-4">
              <CheckCircle className="text-red-400" size={48} />
            </div>
            <h2 className="text-xl font-bold text-red-400 mb-2">Error en el Pago</h2>
            <p className="text-gray-300">{error}</p>
            <button
              onClick={handleRedirect}
              className="mt-6 px-6 py-3 bg-gradient-to-r from-cyan-500 to-purple-500 text-white font-bold rounded-xl hover:shadow-lg hover:shadow-purple-500/25 transition-all w-full"
            >
              Volver al Inicio
            </button>
          </motion.div>
        </div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black px-4">
        <div className="max-w-md w-full text-center">
          <p className="text-gray-400 mb-4">No se encontró un ID de sesión en la URL.</p>
          <button
            onClick={handleRedirect}
            className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-purple-500 text-white font-bold rounded-xl hover:shadow-lg hover:shadow-purple-500/25 transition-all w-full"
          >
            Volver al Inicio
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Success Header */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-gradient-to-r from-cyan-500/20 to-purple-500/20 border border-white/10 rounded-3xl p-8 text-center mb-8"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', damping: 15 }}
            className="w-20 h-20 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg shadow-purple-500/30"
          >
            <CheckCircle size={40} className="text-white" />
          </motion.div>
          <h1 className="text-3xl font-bold text-white mb-2">¡Pago Exitoso!</h1>
          <p className="text-gray-300">Gracias por tu compra en Café Central.</p>
        </motion.div>

        {/* Order Summary */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {/* Order Details */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white/5 border border-white/10 rounded-2xl p-6"
          >
            <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <Star className="text-yellow-400" size={20} />
              Resumen del Pedido
            </h2>
            
            <div className="space-y-4">
              <div>
                <p className="text-gray-400 text-sm">Número de Orden</p>
                <p className="text-white font-semibold">{order.id}</p>
              </div>
              <div>
                <p className="text-gray-400 text-sm">Fecha del Pedido</p>
                <p className="text-white font-semibold">
                  {new Date(order.createdAt).toLocaleDateString('es-CL', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </p>
              </div>
              <div>
                <p className="text-gray-400 text-sm">Estado</p>
                <span className="inline-block px-3 py-1 rounded-full bg-green-500/20 text-green-400 text-sm font-medium">
                  {order.status}
                </span>
              </div>
            </div>
          </motion.div>

          {/* Items List */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white/5 border border-white/10 rounded-2xl p-6"
          >
            <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <ShoppingBag className="text-cyan-400" size={20} />
              Productos
            </h2>
            
            <div className="space-y-3">
              {order.items.map((item, index) => (
                <motion.div
                  key={item.productId}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * (index + 1) }}
                  className="flex justify-between items-center py-2 border-b border-white/5"
                >
                  <div>
                    <p className="text-white font-medium">{item.name}</p>
                    <p className="text-gray-400 text-sm text-right">
                      x{item.quantity} x {new Intl.NumberFormat('es-CL').format(item.price)} CLP
                    </p>
                  </div>
                  <p className="text-cyan-400 font-semibold">
                    {new Intl.NumberFormat('es-CL').format(item.price * item.quantity)} CLP
                  </p>
                </motion.div>
              ))}
            </div>

            <div className="border-t border-white/10 pt-4 mt-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-400 font-medium">Total</span>
                <span className="text-2xl font-bold text-cyan-400">
                  {new Intl.NumberFormat('es-CL').format(order.total)} CLP
                </span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Next Steps */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white/5 border border-white/10 rounded-2xl p-6 mb-8"
        >
          <h2 className="text-xl font-bold text-white mb-4">Próximos Pasos</h2>
          
          {order.status === 'confirmed' && (
            <div className="space-y-3 text-gray-300">
              <p>⏳ Tu pedido está siendo confirmado por nuestro sistema.</p>
              <p>📞 Te enviaremos un mensaje a tu email con los detalles.</p>
              <p>🔔 O visita nuestra ubicación cuando esté listo para recoger.</p>
            </div>
          )}
          
          {order.status === 'processing' && (
            <div className="space-y-3 text-gray-300">
              <p>⚙️ Nuestro equipo está preparando tu pedido.</p>
              <p>🕐 Esto puede tomar aproximadamente 15-30 minutos.</p>
              <p>🔔 Te avisaremos cuando esté listo para recoger.</p>
            </div>
          )}
          
          {order.status === 'cancelled' && (
            <div className="space-y-3 text-gray-300">
              <p>⚠️ Tu pedido ha sido cancelado.</p>
              <p>🔄 Por favor, agrega productos al carrito e intenta de nuevo.</p>
            </div>
          )}
          
          {order.status === 'ready' && (
            <div className="space-y-3 text-gray-300">
              <p>✅ ¡Tu pedido está listo para recoger!</p>
              <p>🏪 Ven a nuestra cafetería en la Isla de Chiloé.</p>
              <a
                href="https://www.instagram.com/cafecentralspecialty?igsh=ZG84MWNjeTI3NHJ5"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white font-medium text-sm hover:shadow-lg hover:shadow-purple-500/25 transition-all"
              >
                Ver ubicación en Instagram
              </a>
            </div>
          )}
          
          {order.status === 'completed' && (
            <div className="space-y-3 text-gray-300">
              <p>🎉 ¡Gracias por tu compra!</p>
              <p>⭐ Tu experiencia con Café Central fue valiosa.</p>
              <p>📧 Te enviaremos una reseña.</p>
            </div>
          )}
        </motion.div>

        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
        >
          <button
            onClick={handleRedirect}
            className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-purple-500 text-white font-bold text-lg rounded-2xl hover:shadow-lg hover:shadow-purple-500/25 transition-all flex items-center justify-center gap-3"
          >
            <ArrowLeft className="rotate-180" size={20} />
            Volver al Inicio
          </button>
        </motion.div>
      </div>
    </div>
  );
}