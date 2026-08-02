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
      { id: '6', name: 'Dulce de Membrillo', description: 'Dulce casero con membrillo chilota', price: 3500, category: 'pasteleria', image: 'https://images.unsplash.com/photo-1549097530-faf620ef60b3?w=500&auto=format&fit=crop&q=60&ico=png' },
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

export { categories };

const Hero = () => {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
      {/* Fondo animado */}
      <div className="absolute inset-0 bg-black">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-gray-900 via-black to-black opacity-90" />
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" 
               style={{
                 backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'0.4\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm-20-2v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm40-8v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm-20-2v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm40-8v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm-20-2v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm40-8v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm-20-2v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm40-8v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm-20-2v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm40-8v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm-42.153-1.847c1.647-1.102 3.724-1.847 5.921-1.847h18.306c2.197 0 4.274.745 5.921 1.847l8.485 5.372c1.255.801 2 2.181 2 3.624v4.624c0 1.443-.745 2.823-2 3.624l-8.485 5.372c-1.647 1.102-3.724 1.847-5.921 1.847h-18.306c-2.197 0-4.274-.745-5.921-1.847l-8.485-5.372c-1.255-.801-2-2.181-2-3.624v-4.624c0-1.443.745-2.823 2-3.624zM30 29.375a4.25 4.25 0 1 1-8.5 0 4.25 4.25 0 0 1 8.5 0z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E)" }}
               />
        </div>
      </div>
      
      {/* Contenido */}
      <div className="relative z-10 text-center px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass bg-white/5 backdrop-blur-sm border border-white/10 text-amber-400 text-sm mb-6"
          >
            <Zap size={16} />
            <span>Experiencia Inmersiva</span>
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-4 tracking-tight"
          >
            <span className="bg-gradient-to-r from-amber-400 via-orange-400 to-pink-400 bg-clip-text text-transparent">
              Café Central
            </span>
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-xl md:text-2xl text-gray-300 mb-8 font-light"
          >
            Especialidad y Vanguardia en <span className="text-amber-400">Chiloé</span>
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <button className="group relative inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-amber-500 to-orange-600 rounded-2xl overflow-hidden shadow-2xl">
              <div className="absolute inset-0 w-0 h-full bg-white/20 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out" />
              <span className="relative text-white font-semibold text-lg">Ver Menú</span>
              <ChevronRight className="relative group-hover:translate-x-1 transition-transform" size={20} />
            </button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

const MenuPreview = () => {
  const [activeCategory, setActiveCategory] = useState(categories[0]);
  
  return (
    <section className="py-24 px-6 bg-gradient-to-b from-black via-gray-900 to-black relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Nuestro <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-pink-400">Menú</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            {activeCategory.description}
          </p>
        </motion.div>
        
        {/* Categorias */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat)}
              className={`px-6 py-3 rounded-xl transition-all duration-300 flex items-center gap-2 ${
                activeCategory.id === cat.id
                  ? 'bg-white/10 backdrop-blur-sm border border-white/20 text-white scale-105'
                  : 'bg-white/5 backdrop-blur-sm border border-white/10 text-gray-400 hover:bg-white/10 hover:text-white'
              }`}
            >
              <cat.icon size={18} />
              <span className="font-medium">{cat.name}</span>
            </button>
          ))}
        </div>
        
        {/* Items */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {activeCategory.items.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              whileHover={{ y: -8, transition: { duration: 0.2 } }}
              className="group"
            >
              <div className="glass p-6 rounded-2xl border border-white/10 backdrop-blur-sm bg-black/40 hover:bg-white/10 transition-all duration-300 hover:shadow-2xl hover:shadow-amber-500/20">
                <div className="flex items-start gap-4">
                  <div className={`w-14 h-14 rounded-xl ${cat.gradient} flex items-center justify-center flex-shrink-0`}>
                    <cat.icon size={24} className="text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-white mb-2 group-hover:text-amber-400 transition-colors">
                      {item.name}
                    </h3>
                    <p className="text-gray-400 text-sm mb-3">{item.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-bold text-white">
                        ${item.price.toLocaleString('es-CL')} CLP
                      </span>
                      <button className="p-2 rounded-lg bg-amber-500/20 hover:bg-amber-500/30 transition-colors">
                        <ShoppingBag size={20} className="text-amber-400" />
                      </button>
                    </div>
                  </div>
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
  return (
    <section className="py-24 px-6 bg-gradient-to-b from-gray-900 to-black relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="grid md:grid-cols-2 gap-12 items-center"
        >
          {/* Text */}
          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
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
              
              <div className="flex items-center gap-3 mt-8 pt-6 border-t border-white/10">
                <button className="px-6 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white font-medium transition-all duration-300">
                  Reserva tu Experiencia
                </button>
                <button className="px-6 py-3 rounded-xl glass hover:bg-white/10 text-white font-medium transition-all duration-300">
                  Saber Más
                </button>
              </div>
            </motion.div>
          </div>
          
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-amber-500 to-pink-600 rounded-3xl blur-2xl opacity-20 animate-pulse" />
            <div className="relative glass rounded-3xl border border-white/20 overflow-hidden aspect-[4/5] md:aspect-square">
              <img
                src="https://images.unsplash.com/photo-1511537537410-5a73253775e7?w=800&auto=format&fit=crop&q=80"
                alt="Café Central Chiloé"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <p className="text-white text-lg font-medium">
                  "La mejor experiencia cafetera en la Isla de Chiloé"
                </p>
                <p className="text-amber-400 text-sm mt-2">
                  ¡Visítanos en el corazón de la isla!
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="py-16 px-6 bg-black border-t border-white/10">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-4 gap-8 mb-12">
          <div className="md:col-span-2">
            <h3 className="text-2xl font-bold text-white mb-4">Café Central</h3>
            <p className="text-gray-400 text-sm max-w-sm">
              Tu refugio de especialidad en el corazón de Chiloé. 
              Una experiencia única de café, cultura y momentos inolvidables.
            </p>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Contacto</h4>
            <div className="space-y-3 text-gray-400 text-sm">
              <div className="flex items-center gap-2">
                <MapPin size={16} className="text-amber-400" />
                <span>Aldea Chiloé, Isla de Chiloé, Chile</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone size={16} className="text-amber-400" />
                <span>+56 9 1234 5678</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail size={16} className="text-amber-400" />
                <span>contacto@cafecentral.cl</span>
              </div>
            </div>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Síguenos</h4>
            <div className="flex items-center gap-3">
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