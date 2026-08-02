"use client";

import { motion } from "framer-motion";
import { Menu, DollarSign } from "lucide-react";

interface MenuCardProps {
  name: string;
  description: string;
  price: number;
  image: string;
}

export function MenuCard({ name, description, price, image }: MenuCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6 }}
      whileHover={{ y: -10, transition: { duration: 0.3 } }}
      className="glass-card rounded-2xl overflow-hidden card-hover cursor-pointer group"
    >
      <div className="relative">
        {/* Image */}
        <div className="relative h-48 overflow-hidden">
          <img
            src={image}
            alt={name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          {/* Category badge */}
          <div className="absolute top-3 left-3 glass px-3 py-1 rounded-full text-xs font-medium text-white">
            {name.includes("Café") ? "☕ Café" : "🥐 Pastelería" : "🌱 Vegano"}
          </div>
        </div>
        
        {/* Hover overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>
      
      {/* Content */}
      <div className="p-6 relative z-10">
        <h3 className="text-xl font-bold text-white mb-2 group-hover:text-yellow-500 transition-colors duration-300">
          {name}
        </h3>
        
        <p className="text-sm text-gray-400 mb-4 line-clamp-2">{description}</p>
        
        {/* Price */}
        <div className="flex items-center justify-between mt-4 pt-4 border-t border-white/10">
          <div className="flex items-center gap-1 text-yellow-500 font-semibold">
            <DollarSign className="w-5 h-5" />
            <span className="text-lg">${price.toLocaleString("es-CL")}</span>
          </div>
          
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="glass px-4 py-2 rounded-lg text-sm font-medium text-white hover:bg-white/20 transition-colors"
          >
            <Info className="w-4 h-4" />
            Detalles
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}