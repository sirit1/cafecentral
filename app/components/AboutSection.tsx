"use client";

import { motion } from "framer-motion";
import { Mountain, Sun, Leaf } from "lucide-react";

export default function AboutSection() {
  return (
    <section className="relative py-24 px-4 md:px-8">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-amber-500/5 to-transparent" />

      <div className="max-w-7xl mx-auto relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="grid md:grid-cols-2 gap-12 items-center"
        >
          {/* Asymmetrical image layout */}
          <div className="order-2 md:order-1 relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="relative"
            >
              {/* Decorative element */}
              <div className="absolute -top-4 -left-4 w-32 h-32 bg-amber-500/20 rounded-full blur-3xl" />
              <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-orange-500/20 rounded-full blur-3xl" />

              {/* Main image */}
              <div className="glass-card overflow-hidden shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1511920170033-8dbac388010d?w=800&q=80"
                  alt="Montañas de Chiloé con café"
                  className="w-full h-80 object-cover hover:scale-105 transition-transform duration-700"
                />
              </div>

              {/* Floating badge */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                viewport={{ once: true }}
                className="absolute -bottom-6 -right-6 bg-gradient-to-br from-amber-500 to-orange-500 text-white px-6 py-4 rounded-2xl shadow-xl"
              >
                <p className="text-sm font-medium">100% Especialidad</p>
                <p className="text-2xl font-bold">Chiloé</p>
              </motion.div>
            </motion.div>
          </div>

          {/* Asymmetrical content */}
          <div className="order-1 md:order-2">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="glass-card"
            >
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="flex items-center gap-3 mb-6"
              >
                <div className="p-3 bg-amber-500/20 rounded-xl">
                  <Mountain className="w-6 h-6 text-amber-400" />
                </div>
                <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-amber-300 to-orange-300 bg-clip-text text-transparent">
                  De la Sierra a tu Taza
                </h2>
              </motion.div>

              <motion.p
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="text-white/80 leading-relaxed mb-6"
              >
                Nacimos en los Andes del sur de Chile, donde las montañas de Chiloé
                regalan climas ideales perfectos para cultivos excepcionales. Con
                alturas que van desde los 1.400 hasta los 2.000 metros,
                desarrollamos granos con características únicas: cuerpo profundo,
                acidez vibrante y notas complejas que narran la tierra de origen.
              </motion.p>

              <motion.p
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="text-white/80 leading-relaxed mb-6"
              >
                Nuestra filosofía: <span className="text-amber-300">seleccionamos</span>
                <br />
                cada gramo con rigor, <span className="text-amber-300">tostamos</span>
                <br />
                con propósito y <span className="text-amber-300">servimos</span>
                <br />
                con pasión.
              </motion.p>

              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="flex flex-wrap gap-3 mt-8"
              >
                <Feature icon={<Sun />} title="Tostado artesanal" />
                <Feature icon={<Mountain />} title="Grano local" />
                <Feature icon={<Leaf />} title="Cultivo ético" />
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function Feature({ icon, title }: { icon: React.ReactNode; title: string }) {
  return (
    <div className="flex items-center gap-2 px-4 py-2 bg-white/5 rounded-lg">
      <div className="w-4 h-4">{icon}</div>
      <span className="text-sm text-white/70">{title}</span>
    </div>
  );
}