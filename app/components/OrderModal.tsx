// ==========================================
// Order Modal Component
// ==========================================

export const OrderModal: React.FC<{
  order: {
    id: string;
    status: string;
    items: {
      name: string;
      price: number;
      quantity: number;
    }[];
    total: number;
    date: string;
  } | null;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}> = ({ order, isOpen, setIsOpen }) => {
  if (!order) return null;

  const formatCurrency = (amount: number) => 
    `$${amount.toLocaleString()} CLP`;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50"
          />
          
          {/* Order Panel */}
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-y-0 left-0 w-full max-w-md bg-black/95 border-l border-white/10 z-50 p-6 overflow-hidden"
          >
            {/* Order Header */}
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-2xl font-bold text-white flex items-center gap-2">
                  <CreditCard className="text-yellow-400" size={24} />
                  Orden #{order.id.slice(0, 8).toUpperCase()}
                </h3>
                <p className="text-gray-400 text-sm mt-1">
                  {new Date(order.date).toLocaleString('es-CL', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </p>
                <span className={`
                  inline-block mt-3 px-3 py-1 rounded-full text-xs font-semibold
                  ${
                    order.status === 'completed' && 'bg-green-500/20 text-green-400'
                  }
                  ${
                    order.status === 'ready' && 'bg-green-500/20 text-green-400'
                  }
                  ${
                    order.status === 'confirmed' && 'bg-purple-500/20 text-purple-400'
                  }
                  ${
                    order.status === 'processing' && 'bg-blue-500/20 text-blue-400'
                  }
                  ${
                    order.status === 'pending' && 'bg-yellow-500/20 text-yellow-400'
                  }
                  ${
                    order.status === 'cancelled' && 'bg-red-500/20 text-red-400'
                  }
                `}>
                  {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                </span>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 hover:bg-white/10 rounded-full transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            {/* Order Items */}
            <div className="space-y-3 mb-6 max-h-64 overflow-y-auto pr-2">
              {order.items.map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  className="flex items-center gap-3 p-3 bg-white/5 border border-white/10 rounded-xl"
                >
                  <div className="w-12 h-12 rounded-lg bg-white/10 flex items-center justify-center">
                    <Palette size={18} className="text-purple-400" />
                  </div>
                  <div className="flex-1">
                    <p className="text-white font-medium text-sm">{item.name}</p>
                    <p className="text-gray-400 text-xs">{item.quantity}x ${item.price} c/p</p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Order Summary */}
            <div className="border-t border-white/10 pt-4 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Subtotal</span>
                <span className="text-white">${order.items.reduce((sum, item) => sum + item.price * item.quantity, 0)} c/p</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Iva (19%)</span>
                <span className="text-white">${(order.total * 0.19).toFixed(0)} c/p</span>
              </div>
              <div className="flex justify-between text-xl font-bold pt-2 border-t border-white/10">
                <span className="text-white">Total</span>
                <span className="text-purple-400">${order.total} c/p</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 mt-6">
              {order.status === 'ready' ? (
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    alert('¡Gracias por tu compra! Tu pedido está listo para recoger.');
                    setIsOpen(false);
                  }}
                  className="flex-1 py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white font-bold rounded-xl shadow-lg shadow-green-500/30 flex items-center justify-center gap-2"
                >
                  <CheckCircle size={20} />
                  Recoger Pedido
                </motion.button>
              ) : (
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    alert('Pedido en progreso. Te mantendremos informado.');
                    setIsOpen(false);
                  }}
                  className="flex-1 py-3 bg-gradient-to-r from-cyan-500 to-purple-500 text-white font-bold rounded-xl shadow-lg shadow-purple-500/30 flex items-center justify-center gap-2"
                >
                  <ClockSpinning size={20} />
                  Seguir Pidiendo
                </motion.button>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};