'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Coffee, 
  ShoppingBag, 
  Heart, 
  ChevronRight, 
  MapPin, 
  Phone, 
  Mail, 
  Instagram,
  Zap,
  Utensils,
  Users
} from 'lucide-react';

// ==========================================
// MOCK DATA - MENÚ PRINCIPAL (O2O)
// ==========================================

const categories = [
  {
    id: 'cafes',
    name: 'Cafés de Especialidad',
    description: 'Selección premium de la mejor granja chilota',
    icon: Coffee,
    gradient: 'from-amber-500 to-orange-600',
    items: [
      { id: '1', name: 'Chiloé Gold', description: 'Notas de chocolate y nuez, cuerpo medio', price: 4500, category: 'especialidad', image: 'https://images.unsplash.com/photo-1511537537410-5a73253775e7?w=500&auto=format&fit=crop&q=60&ico=png' },
      { id: '2', name: 'Cinnamon Court', description: 'Aromas a canela y especias, cuerpo intenso', price: 5200, category: 'especialidad', image: 'https://images.unsplash.com/photo-1514432384663-e6b1b1e1d2b3?w=500&auto=format&fit=crop&q=60&ico=png' },
      { id: '3', name: 'Chocolate de Chiloé', description: 'Chocolate artesanal con notas locales únicas', price: 3800, category: 'especialidad', image: 'https://images.unsplash.com/photo-1511358466421-b52fdd4a402e?w=500&auto=format&fit=crop&q=60&ico=png' },
    ]
  },
  {
    id: 'pasteleria',
    name: 'Pastelería de Autor',
    description: 'Dulces creaciones con identidad chilota',
    icon: Utensils,
    gradient: 'from-pink-500 to-rose-600',
    items: [
      { id: '4', name: 'Queso de Chiloé', description: 'Queso artesanal con hierbas locales', price: 4200, category: 'pasteleria', image: 'https://images.unsplash.com/photo-1572292052704-7d87635f349e?w=500&auto=format&fit=crop&q=60&ico=png' },
      { id: '5', name: 'Empanadas de la Abuela', description: 'Receta tradicional con relleno casero', price: 2500, category: 'pasteleria', image: 'https://images.unsplash.com/photo-1569952648384-629505e3f94a?w=500&auto=format&fit=crop&q=60&ico=png' },
      { id: '6', name: 'Dulce de Membrillo', description: 'Dulce casero con membrillo chilota', price: 3500, category: 'pasteleria', image: 'https://images.unsplash.com/photo-1549097310-faf620ef60b3?w=500&auto=format&fit=crop&q=60&ico=png' },
    ]
  },
  {
    id: 'vegano',
    name: 'Opciones 100% Veganas',
    description: 'Sabor premium sin compromisos éticos',
    icon: Users,
    gradient: 'from-green-500 to-emerald-600',
    items: [
      { id: '7', name: 'Latte de Açaí', description: 'Açaí premium con leche de avena', price: 5500, category: 'vegano', image: 'https://images.unsplash.com/photo-1541785771-9853c512a1c0?w=500&auto=format&fit=crop&q=60&ico=png' },
      { id: '8', name: 'Cold Brew Vegano', description: 'Infusión intensiva con agua filtrada', price: 4800, category: 'vegano', image: 'https://images.unsplash.com/photo-1600210498522-72540d94bd0b?w=500&auto=format&fit=crop&q=60&ico=png' },
      { id: '9', name: 'Cappuccino de Almendras', description: 'Crema de almendras artesanal', price: 5800, category: 'vegano', image: 'https://images.unsplash.com/photo-1572449441117-852029a3836e?w=500&auto=format&fit=crop&q=60&ico=png' },
    ]
  }
];

// ==========================================
// COMPONENTES
// ==========================================

const Hero = () => {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
      {/* Fondo animado */}
      <div className="absolute inset-0 bg-black">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-gray-900 via-black to-black opacity-90" />
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 left-20 w-64 h-64 bg-amber-500/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-20 right-20 w-64 h-64 bg-orange-500/20 rounded-full blur-3xl animate-pulse delay-1000" />
          <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-pink-500/10 rounded-full blur-3xl animate-pulse delay-2000" />
        </div>
      </div>
      
      {/* Grid pattern */}
      <div className="absolute inset-0" 
           style={{ 
             backgroundImage: 'linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)',
             backgroundSize: '50px 50px'
           }} 
      />
      
      {/* Contenido */}
      <div className="relative z-10 text-center px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-6"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Zap size={16} className="text-yellow-400" />
            <span className="text-sm text-gray-300">Especialidad y Vanguardia</span>
          </motion.div>
          
          <h1 className="text-7xl md:text-9xl font-bold text-white mb-4 tracking-tight">
            <span>Café</span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-400 to-pink-400 animate-gradient">
              Central
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-400 mb-8 font-light">
            Isla de Chiloé, Chile
          </p>
        </motion.div>
        
        <motion.button
          whileHover={{ scale: 1.05, boxShadow: '0 0 40px rgba(245, 158, 11, 0.4)' }}
          whileTap={{ scale: 0.98 }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="group relative inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-amber-500 to-orange-500 rounded-2xl font-semibold text-white shadow-2xl shadow-amber-500/30 hover:shadow-amber-500/50 transition-all duration-300 overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-orange-400 to-pink-500 opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
          <ShoppingBag size={22} className="relative" />
          <span className="relative">Ver Menú</span>
        </motion.button>
      </div>
    </section>
  );
};

const MenuPreview = () => {
  return (
    <section className="py-24 px-6 relative">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Nuestro <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-pink-400">Menú</span>
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Descubre la selección de café de especialidad de Chiloé. 
              Calidad premium, origen local y sabor inolvidable.
            </p>
          </motion.div>
        </div>
        
        {/* Categorías */}
        <div className="grid md:grid-cols-3 gap-8">
          {categories.map((category, index) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <div className="glass glass-card rounded-2xl p-6 hover:border-amber-500/40 transition-all duration-300">
                <div className="flex items-center gap-4 mb-4">
                  <div className={`p-3 rounded-xl bg-gradient-to-br ${category.gradient}`}>
                    <category.icon size={24} className="text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">{category.name}</h3>
                    <p className="text-sm text-gray-400">{category.description}</p>
                  </div>
                </div>
                
                <div className="space-y-4">
                  {category.items.map((item, itemIndex) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: 0.1 + itemIndex * 0.05 }}
                      viewport={{ once: true }}
                    >
                      <MenuCard item={item} />
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const AboutChiloe = () => {
  const container = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const item = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { type: 'spring', stiffness: 100 }
    }
  };

  return (
    <section className="py-24 px-6 bg-gradient-to-b from-black via-gray-900 to-black">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Text */}
          <motion.div
            variants={item}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="space-y-6"
          >
            <motion.div
              variants={container}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                La <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-pink-400">Experiencia</span> Chiloé
              </h2>
              <p className="text-lg text-gray-300 leading-relaxed">
                Donde la tradición de la tierra se encuentra con la modernidad del café de especialidad. 
                En Chiloé, cada grano cuenta una historia de dedicación, tradición y pasión por la excelencia.
              </p>
              <p className="text-lg text-gray-400 leading-relaxed">
                Descubre un café que respeta el origen, que honra las tradiciones locales y que te ofrece 
                una experiencia sensorial única. Más que café, es cultura, es territorio, es tradición viva.
              </p>
              
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="pt-4"
              >
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                  className="inline-flex items-center gap-3 px-6 py-3 rounded-xl glass hover:bg-white/10 transition-all duration-300"
                >
                  <ChevronRight size={20} className="text-amber-400" />
                  <span className="text-white font-semibold">Descubre más sobre Chiloé</span>
                </motion.button>
              </motion.div>
            </motion.div>
          </motion.div>
          
          {/* Image */}
          <motion.div
            variants={item}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="relative"
          >
            <div className="relative z-10">
              <div className="absolute inset-0 bg-gradient-to-br from-amber-500 to-pink-600 rounded-3xl transform rotate-6 scale-95 opacity-30" />
              <div className="absolute inset-0 bg-gradient-to-br from-amber-500/20 to-pink-500/20 rounded-3xl transform -rotate-3 scale-105" />
              <div className="relative glass glass-card rounded-3xl overflow-hidden aspect-square md:aspect-[4/3]">
                <img 
                  src="https://images.unsplash.com/photo-1541785756790-8d6337c3c6a9?w=800&auto=format&fit=crop&q=80"
                  alt="Café de especialidad en ambiente chiloto"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            
            {/* Decorative elements */}
            <motion.div
              animate={{ 
                y: [0, 10, 0],
                rotate: [0, 2, 0]
              }}
              transition={{ 
                duration: 4,
                repeat: Infinity,
                repeatDelay: 10
              }}
              className="absolute -bottom-4 -right-4 w-32 h-32 bg-gradient-to-br from-amber-500/30 to-pink-500/30 rounded-full blur-2xl"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="py-16 px-6 bg-black border-t border-white/10">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <div className="col-span-2 md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <Coffee size={32} className="text-amber-500" />
              <h3 className="text-2xl font-bold text-white">Café Central</h3>
            </div>
            <p className="text-gray-400 max-w-md">
              Café de especialidad en la Isla de Chiloé. 
              Donde la tradición se encuentra con la excelencia moderna.
            </p>
          </div>
          
          {/* Contact */}
          <div>
            <h4 className="text-white font-semibold mb-4">Contacto</h4>
            <ul className="space-y-3 text-gray-400">
              <li className="flex items-center gap-2">
                <MapPin size={16} />
                <span>Av. Principal 123, Chiloé</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone size={16} />
                <span>+56 9 1234 5678</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail size={16} />
                <span>hola@cafecentral.cl</span>
              </li>
            </ul>
          </div>
          
          {/* Social */}
          <div>
            <h4 className="text-white font-semibold mb-4">Síguenos</h4>
            <div className="flex gap-4">
              <a 
                href="https://www.instagram.com/cafecentralspecialty?igsh=ZG84MWNjeTI3NHJ5"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 glass rounded-xl hover:bg-white/10 transition-all duration-300"
              >
                <Instagram size={18} />
                <span className="text-sm">Instagram</span>
              </a>
            </div>
          </div>
        </div>
        
        {/* Divider */}
        <div className="flex items-center gap-4 mb-8">
          <div className="h-px flex-1 bg-gradient-to-r from-amber-500/50 to-transparent" />
          <span className="text-gray-500 text-sm">© 2025 Café Central. Todos los derechos reservados.</span>
          <div className="h-px flex-1 bg-gradient-to-l from-amber-500/50 to-transparent" />
        </div>
        
        {/* Bottom links */}
        <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-500">
          <a href="#" className="hover:text-amber-400 transition-colors">Privacidad</a>
          <a href="#" className="hover:text-amber-400 transition-colors">Términos</a>
          <a href="#" className="hover:text-amber-400 transition-colors">Cookies</a>
        </div>
      </div>
    </footer>
  );
};

// ==========================================
// MAIN PAGE
// ==========================================

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white">
      <Hero />
      <MenuPreview />
      <AboutChiloe />
      <Footer />
    </main>
  );
}