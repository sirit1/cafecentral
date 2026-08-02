"use client";

import { motion } from "framer-motion";
import { Coffee, MapPin, Instagram } from "lucide-react";
import Link from "next/link";

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Background with animated particles */}
      <div className="absolute inset-0 background-particles" />

      {/* Animated floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-amber-500/20 rounded-full"
            initial={{
              x: Math.random() * 100 + "vw",
              y: Math.random() * 100 + "vh",
              opacity: Math.random() * 0.5,
            }}
            animate={{
              y: [null, Math.random() * -50 - 100],
              opacity: [Math.random() * 0.3, 0],
            }}
            transition={{
              duration: 10 + Math.random() * 10,
              repeat: Infinity,
              ease: "linear",
            }}
            style={{
              left: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </div>

      {/* Hero content */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.3 }}
        className="relative z-10 text-center px-4"
      >
        {/* Logo/Icon */}
        <motion.div
          animate={{ scale: [1, 1.05, 1] }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="mb-6 inline-block"
        >
          <div className="w-20 h-20 md:w-24 md:h-24 bg-gradient-to-br from-amber-500/20 to-orange-500/20 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/20 shadow-2xl">
            <Coffee className="w-8 h-8 md:w-10 md:h-10 text-amber-400" />
          </div>
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-amber-400 via-orange-400 to-amber-400 bg-clip-text text-transparent mb-4"
        >
          Café Central
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="text-lg md:text-xl text-amber-300/80 font-light tracking-wide mb-8"
        >
          Especialidad y Vanguardia en <span className="text-amber-400">Chiloé</span>
        </motion.p>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="text-sm md:text-base text-white/60 max-w-md mx-auto mb-10 leading-relaxed"
        >
          Desde la montaña al sur de Chile, seleccionamos cada grano con pasión,
          dedicación y el criterio exigente de la especialidad. Una experiencia
          sensorial diseñada para despertar tus sentidos.
        </motion.p>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 1 }}
        >
          <Link href="#menu">
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: "0 0 40px #f59e0b" }}
              whileTap={{ scale: 0.95 }}
              className="group relative inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full font-semibold text-white shadow-2xl overflow-hidden"
            >
              {/* Glowing ring */}
              <span className="absolute inset-0 w-full h-full rounded-full opacity-0 group-hover:opacity-100 animate-ping" />
              
              <span className="relative flex items-center gap-3">
                <span className="text-lg">Ver Menú</span>
                <motion.span
                  animate={{ opacity: [0, 1, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                </motion.span>
              </span>
            </motion.button>
          </Link>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="flex flex-col items-center gap-2"
        >
          <div className="w-0.5 h-12 bg-white/30 rounded-full" />
          <span className="text-xs text-white/40 uppercase tracking-wider">
            Explorar
          </span>
        </motion.div>
      </motion.div>
    </section>
  );
}

function ArrowRight({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <polyline points="9 15 15 9 9 3" />
      <polyline points="15 9 9 9 9 15" />
    </svg>
  );
}