'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Coffee, Leaf, Sprout } from 'lucide-react';
import { categories } from './data/menu';

interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  image?: string;
  category: "especialidad" | "pasteleria" | "vegano";
}

export function MenuPreview() {
  // Convert category IDs to display names
  const categoryNames: Record<string, string> = {
    'especialidad': 'Cafés de Especialidad',
    'pasteleria': 'Pastelería de Autor',
    'vegano': 'Opciones Veganas'
  };

  // Icon mapping
  const categoryIcons = {
    'especialidad': Coffee,
    'pasteleria': Leaf,
    'vegano': Sprout
  };

  const container = {
    hidden: { opacity: 0 },
    show: { 
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2
      }
    }
  };

  const item = {
    hidden: { 
      opacity: 0,
      y: 30,
      scale: 0.96
    },
    show: { 
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 12
      }
    }
  };

  return (
    <motion.section 
      className="relative py-20 px-4 max-w-6xl mx-auto"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8 }}
    >
      <div className="text-center mb-12">
        <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent mb-4">
          Nuestro Menú
        </h2>
        <p className="text-gray-400 text-lg max-w-2xl mx-auto">
          Descubre una selección curada de productos únicos, creados con pasión y dedicación.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {categories.map((cat) => (
          <motion.div key={cat.id} variants={container} initial="hidden" whileInView="show" viewport={{ once: true }} >
            <MenuCard 
              name={cat.name}
              description={cat.description}
              price={cat.items[0]?.price || 0}
              image={cat.items[0]?.image || ''}
            />
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}

function MenuCard({ name, description, price, image }: MenuCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6 }}
      whileHover={{ y: -8, transition: { duration: 0.3 } }}
      className="glass-card rounded-2xl overflow-hidden card-hover cursor-pointer group"
    >
      <div className="relative">
        <div className="relative h-52 overflow-hidden">
          <img
            src={image}
            alt={name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
        </div>
        
        <div className="p-6 relative">
          <h3 className="text-2xl font-bold text-white mb-2">{name}</h3>
          <p className="text-gray-400 text-sm mb-4 line-clamp-2">{description}</p>
          <div className="flex items-center justify-between">
            <p className="text-2xl font-bold bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent">
              ${price.toLocaleString('es-CL')}
            </p>
            <Link 
              href="#"
              className="px-6 py-2 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 text-white font-medium hover:shadow-lg hover:shadow-amber-500/50 transition-all duration-300 hover:scale-105"
            >
              Ver detalles
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
}