'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Coffee,
  ShoppingBag,
  Heart,
  ChevronRight,
  MapPin,
  Phone,
  Mail,
  Instagram
} from 'lucide-react';

// ==========================================
// MOCK PRODUCT DATA
// ==========================================

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image?: string;
}

interface Category {
  id: string;
  name: string;
  description: string;
  products: Product[];
}

const categories: Category[] = [
  {
    id: 'cafes',
    name: 'Cafés de Especialidad',
    description: 'Experiencias sensoriales que narran el origen',
    products: [
      {
        id: 'c1',
        name: 'Reservas Chiloé',
        description: 'Un tributo a la tierra volcánica de nuestra isla. Notas de chocolate oscuro y especias exóticas que evocan las brumas de Chiloé.',
        price: 6500,
        image: 'https://images.unsplash.com/photo-1510797328819-271552c4a2be?w=600&h=600&fit=crop&q=80'
      },
      {
        id: 'c2',
        name: 'Cascada del Volcán',
        description: 'Altura y altitud dan sabor. Notas florales con un toque ahumado, como las primeras gotas que alimentan las cascadas.',
        price: 5800,
        image: 'https://images.unsplash.com/photo-1559398790-ef58522195f5?w=600&h=600&fit=crop&q=80'
      },
      {
        id: 'c3',
        name: 'Bosque Nublado',
        description: 'Majestuosos árboles de altura. Cítricos dulces y un postgolgo cremoso que invita a quedarse.',
        price: 6200,
        image: 'https://images.unsplash.com/photo-1610632002863-ef121a29c53a?w=600&h=600&fit=crop&q=80'
      },
      {
        id: 'c4',
        name: 'Nieva del Monte',
        description: 'Fresco y vibrante. La montaña que conecta con la bruma marina, notas de manzana y pimienta rosa.',
        price: 5500,
        image: 'https://images.unsplash.com/photo-1587049454695-e243b0d191a0?w=600&h=600&fit=crop&q=80'
      },
      {
        id: 'c5',
        name: 'Anillos del Mar',
        description: 'El sonido de las olas convertido en taza. Frutos del mar, sal marina y un finish océano.',
        price: 6000,
        image: 'https://images.unsplash.com/photo-1623129075996-9fb205515a52?w=600&h=600&fit=crop&q=80'
      },
      {
        id: 'c6',
        name: 'Tumbes Chiloé',
        description: 'La cuna del oro negro. Tierra fértil, notas de miel negra y nuez picada.',
        price: 7200,
        image: 'https://images.unsplash.com/photo-1563828020-3c882b4b0c63?w=600&h=600&fit=crop&q=80'
      }
    ]
  },
  {
    id: 'pasteles',
    name: 'Pastelería de Autor',
    description: 'Dulces narrativas de tradición andina',
    products: [
      {
        id: 'p1',
        name: 'Coquito Casero',
        description: 'El alma de Chile en cada sorbo. Canela, clavos, arroz dulce y ese coquito que abrigaba las tardes de lluvia.',
        price: 4500,
        image: 'https://images.unsplash.com/photo-1579925694667-4051f0f65979?w=600&h=600&fit=crop&q=80'
      },
      {
        id: 'p2',
        name: 'Manjar con Chocolate',
        description: 'La fusión perfecta. Tradición mestiza en su máxima expresión. Cremoso, dulce, inolvidable.',
        price: 5200,
        image: 'https://images.unsplash.com/photo-1571611227919-9c0775597d8b?w=600&h=600&fit=crop&q=80'
      },
      {
        id: 'p3',
        name: 'Dulce Condensado',
        description: 'Recuerdos de infancia en cada mordida. Un clásico que nunca envejece, siempre presente como la bruma sobre Chiloé.',
        price: 4800,
        image: 'https://images.unsplash.com/photo-1589119908924-fd8b55df359d?w=600&h=600&fit=crop&q=80'
      },
      {
        id: 'p4',
        name: 'Mazamorra',
        description: 'Miel negra y maíz en perfecta sintonía. Dulzura de la tierra chilena con un toque de tradición ancestral.',
        price: 4200,
        image: 'https://images.unsplash.com/photo-1517668768426-3a455d11f3d3?w=600&h=600&fit=crop&q=80'
      },
      {
        id: 'p5',
        name: 'Tres Leches Artesanal',
        description: 'Clásico reimaginado. Tres leches seleccionadas, frutas chilenas y un bizcocho de masa madre.',
        price: 5500,
        image: 'https://images.unsplash.com/photo-1564140538188-680579595c85?w=600&h=600&fit=crop&q=80'
      },
      {
        id: 'p6',
        name: 'Quesillo',
        description: 'El pastel chileno por excelencia. Nata montañesa, huevo batido y el toque casero que hace la diferencia.',
        price: 4600,
        image: 'https://images.unsplash.com/photo-159939-559886c9d340?w=600&h=600&fit=crop&q=80'
      }
    ]
  },
  {
    id: 'veganos',
    name: 'Opciones Veganas',
    description: 'Modernidad sin compromisos con la tierra',
    products: [
      {
        id: 'v1',
        name: 'Latte de Avena',
        description: 'Suave, cremoso, con ese sabor a café que todos amamos. Sin crueldad, solo pureza.',
        price: 6000,
        image: 'https://images.unsplash.com/photo-1541746490-f6b0b3f7a8c8?w=600&h=600&fit=crop&q=80'
      },
      {
        id: 'v2',
        name: 'Avocado con Miel',
        description: 'Frescura que enamora. Avogado orgánico, miel silvestre de Chiloé y semillas de chía.',
        price: 5800,
        image: 'https://images.unsplash.com/photo-1541599947645-927df58e8885?w=600&h=600&fit=crop&q=80'
      },
      {
        id: 'v3',
        name: 'Pan con Queso Vegano',
        description: 'El clásico chileno reinterpretado. Pan de masa madre casero con queso de nuez.',
        price: 5200,
        image: 'https://images.unsplash.com/photo-1521319908016-6b4000a48513?w=600&h=600&fit=crop&q=80'
      },
      {
        id: 'v4',
        name: 'Crema de Chía',
        description: 'Textura perfecta, sabor a vainilla y chía orgánica. Nutrición que se come.',
        price: 6200,
        image: 'https://images.unsplash.com/photo-1577805918498-b5f47e72a9e6?w=600&h=600&fit=crop&q=80'
      },
      {
        id: 'v5',
        name: 'Bowl Chiloé',
        description: 'Explosión de colores y sabores. Frutas de estación, granola artesanal, lechuga fresca.',
        price: 7500,
        image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e35e?w=600&h=600&fit=crop&q=80'
      },
      {
        id: 'v6',
        name: 'Toppings Variados',
        description: 'Personaliza tu bebida. Canela, coco, pistachos, cacao. Tu sabor, tu elección.',
        price: 1500,
        image: 'https://images.unsplash.com/photo-1496837295488-116a3e2d0506?w=600&h=600&fit=crop&q=80'
      }
    ]
  }
];

// ==========================================
// HERO SECTION
// ==========================================

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated Gradient Background */}
      <div className="absolute inset-0 bg-black">
        <motion.div
          animate={{
            background: [
              'linear-gradient(135deg, #0a0a0a 0%, #1a0a2e 50%, #0a1a2e 100%)',
              'linear-gradient(135deg, #0a1a2e 0%, #1a0a2e 50%, #0a0a0a 100%)',
              'linear-gradient(135deg, #0a0a0a 0%, #1a0a2e 50%, #0a1a2e 100%)'
            ]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
          className="w-full h-full"
        />
      </div>

      {/* Geometric Pattern Overlay */}
      <motion.div
        animate={{
          scale: [1, 1.05, 1],
          opacity: [0.1, 0.15, 0.1]
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: 'easeInOut'
        }}
        className="absolute inset-0"
        style={{
          backgroundSize: '100px 100px'
        }}
      >
        <svg
          width="100%"
          height="100%"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path
                d="M 40 0 L 0 0 0 40"
                fill="none"
                stroke="rgba(6, 182, 212, 0.1)"
                strokeWidth="0.5"
              />
            </pattern>
            <filter id="glow">
              <feGaussianBlur stdDeviation="2.5" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="coloredBlur" />
              </feMerge>
            </filter>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </motion.div>

      {/* Gradient Orbs */}
      <motion.div
        animate={{
          x: [0, 50, 0],
          y: [0, 30, 0],
          scale: [1, 1.2, 1]
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: 'easeInOut'
        }}
        className="absolute top-1/4 left-1/4 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl"
      />

      <motion.div
        animate={{
          x: [0, -40, 0],
          y: [0, -50, 0],
          scale: [1, 1.3, 1]
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 2
        }}
        className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl"
      />

      {/* Content */}
      <div className="relative z-10 text-center px-6">
        <motion.div
          initial={{
            opacity: 0,
            y: 30
          }}
          animate={{
            opacity: 1,
            y: 0
          }}
          transition={{
            duration: 1,
            delay: 0.5
          }}
        >
          <Coffee className="w-12 h-12 mx-auto mb-6 text-cyan-400" />
        </motion.div>

        <motion.h1
          initial={{
            opacity: 0,
            y: 20
          }}
          animate={{
            opacity: 1,
            y: 0
          }}
          transition={{
            duration: 1,
            delay: 1
          }}
          className="text-6xl md:text-8xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 pb-2"
          style={{
            fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
          }}
        >
          Café Central
        </motion.h1>

        <motion.p
          initial={{
            opacity: 0,
            y: 20
          }}
          animate={{
            opacity: 1,
            y: 0
          }}
          transition={{
            duration: 1,
            delay: 1.5
          }}
          className="text-xl md:text-2xl text-gray-300 mb-8 font-light tracking-wide"
        >
          Especialidad y Vanguardia en Chiloé
        </motion.p>

        <motion.button
          initial={{
            opacity: 0,
            scale: 0.8
          }}
          animate={{
            opacity: 1,
            scale: 1
          }}
          transition={{
            duration: 1,
            delay: 2
          }}
          whileHover={{
            scale: 1.05,
            boxShadow: [
              '0 0 20px rgba(6, 182, 212, 0.5)',
              '0 0 40px rgba(6, 182, 212, 0.8)',
              '0 0 20px rgba(6, 182, 212, 0.5)'
            ]
          }}
          whileTap={{
            scale: 0.95
          }}
          className="relative group inline-flex items-center gap-3 px-8 py-4 bg-transparent overflow-hidden rounded-full border border-white/10"
        >
          <motion.div
            animate={{
              opacity: [0.3, 0.6, 0.3]
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: 'easeInOut'
            }}
            className="absolute inset-0 w-full h-full bg-gradient-to-r from-cyan-400/20 via-purple-400/20 to-pink-400/20"
          />
          <span className="relative text-white font-medium tracking-wide">
            Ver Menú
          </span>
          <ChevronRight className="relative w-5 h-5 text-cyan-400 group-hover:translate-x-1 transition-transform" />
        </motion.button>
      </div>
    </section>
  );
};

// ==========================================
// MENU SECTION
// ==========================================

const MenuSection = ({ categories }: { categories: Category[] }) => {
  return (
    <section className="relative py-20 px-6 bg-black min-h-screen overflow-hidden">
      {/* Subtle Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/50 to-black" />

      {/* Title */}
      <div className="relative z-10 text-center mb-16">
        <motion.h2
          initial={{
            opacity: 0,
            y: 20
          }}
          whileInView={{
            opacity: 1,
            y: 0
          }}
          transition={{
            duration: 0.8
          }}
          viewport={{
            once: true
          }}
          className="text-4xl md:text-5xl font-bold text-white pb-2"
        >
          Nuestro Menú
        </motion.h2>
        <motion.p
          initial={{
            opacity: 0,
            y: 10
          }}
          whileInView={{
            opacity: 1,
            y: 0
          }}
          transition={{
            duration: 0.8,
            delay: 0.2
          }}
          viewport={{
            once: true
          }}
          className="text-gray-400 mt-2 text-lg"
        >
          Descubre nuestra selección de especialidad
        </motion.p>
      </div>

      {/* Categories Grid */}
      <div className="relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {categories.map((category) => (
            <motion.div
              key={category.id}
              initial={{
                opacity: 0,
                y: 30
              }}
              whileInView={{
                opacity: 1,
                y: 0
              }}
              whileHover={{
                y: -5
              }}
              transition={{
                duration: 0.6
              }}
              viewport={{
                once: true
              }}
            >
              <div className="text-left mb-4">
                <motion.h3
                  className="text-2xl md:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-400"
                >
                  {category.name}
                </motion.h3>
                <motion.p
                  className="text-gray-400 text-sm mt-2"
                >
                  {category.description}
                </motion.p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Product Cards */}
        {categories.map((category, categoryIndex) => (
          <motion.div
            key={category.id}
            initial={{
              opacity: 0,
              y: 30
            }}
            whileInView={{
              opacity: 1,
              y: 0
            }}
            whileHover={{
              y: -5,
              boxShadow: '0 20px 40px rgba(6, 182, 212, 0.2)'
            }}
            transition={{
              duration: 0.6,
              delay: categoryIndex * 0.2
            }}
            viewport={{
              once: true
            }}
          >
            <div className="flex flex-wrap gap-4">
              {category.products.map((product, productIndex) => (
                <motion.div
                  key={product.id}
                  initial={{
                    opacity: 0,
                    scale: 0.9
                  }}
                  whileInView={{
                    opacity: 1,
                    scale: 1
                  }}
                  whileHover={{
                    scale: 1.02,
                    y: -8,
                    boxShadow: '0 10px 30px rgba(139, 92, 246, 0.25)'
                  }}
                  transition={{
                    duration: 0.5,
                    delay: productIndex * 0.1
                  }}
                  viewport={{
                    once: true
                  }}
                  className="relative group"
                >
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-400/20 via-purple-400/20 to-pink-400/20 rounded-2xl blur opacity-0 group-hover:opacity-100 transition duration-500" />

                  <div className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 md:p-8 overflow-hidden">
                    {/* Background Glow Effect */}
                    <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/5 via-purple-400/5 to-pink-400/5 opacity-0 group-hover:opacity-100 transition duration-500" />

                    <div className="relative z-10">
                      <motion.div
                        className="mb-4"
                        whileHover={{
                          scale: 1.1,
                          rotate: [0, -5, 5, 0]
                        }}
                        transition={{
                          duration: 0.5
                        }}
                      >
                        {product.image && (
                          <img
                            src={product.image}
                            alt={product.name}
                            className="w-full h-48 md:h-56 object-cover rounded-xl shadow-lg"
                          />
                        )}
                      </motion.div>

                      <motion.h4
                        className="text-xl md:text-2xl font-bold text-white mb-2"
                        initial={{
                          opacity: 0,
                          x: -10
                        }}
                        whileInView={{
                          opacity: 1,
                          x: 0
                        }}
                        transition={{
                          duration: 0.5,
                          delay: productIndex * 0.05
                        }}
                      >
                        {product.name}
                      </motion.h4>

                      <motion.p
                        className="text-gray-300 text-sm md:text-base mb-4 line-clamp-2"
                        initial={{
                          opacity: 0,
                          x: -10
                        }}
                        whileInView={{
                          opacity: 1,
                          x: 0
                        }}
                        transition={{
                          duration: 0.5,
                          delay: (productIndex + 0.5) * 0.05
                        }}
                      >
                        {product.description}
                      </motion.p>

                      <motion.div
                        initial={{
                          opacity: 0,
                          scale: 0.8
                        }}
                        whileInView={{
                          opacity: 1,
                          scale: 1
                        }}
                        whileHover={{
                          scale: 1.05
                        }}
                        transition={{
                          duration: 0.5,
                          delay: (productIndex + 1) * 0.05
                        }}
                        className="flex items-center justify-between"
                      >
                        <span className="text-purple-400 font-bold text-lg">
                          ${product.price.toLocaleString('es-CL')}
                        </span>

                        <motion.button
                          whileHover={{
                            scale: 1.1
                          }}
                          whileTap={{
                            scale: 0.95
                          }}
                          className="px-6 py-2 bg-gradient-to-r from-cyan-500 to-purple-500 text-white rounded-full font-medium text-sm md:text-base shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40 transition duration-300"
                        >
                          Agregar
                        </motion.button>
                      </motion.div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

// ==========================================
// EXPERIENCE SECTION
// ==========================================

const ExperienceSection = () => {
  return (
    <section className="relative py-20 px-6 bg-black overflow-hidden">
      {/* Animated Background */}
      <motion.div
        animate={{
          opacity: [0.05, 0.1, 0.05]
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: 'easeInOut'
        }}
        className="absolute inset-0"
        style={{
          backgroundSize: '300px 300px'
        }}
      >
        <svg
          width="100%"
          height="100%"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <pattern id="grid-experience" width="60" height="60" patternUnits="userSpaceOnUse">
              <path
                d="M 60 0 L 0 0 0 60"
                fill="none"
                stroke="rgba(167, 139, 250, 0.1)"
                strokeWidth="0.5"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid-experience)" />
        </svg>
      </motion.div>

      <div className="relative z-10">
        {/* Left Side - Text */}
        <div className="hidden md:block md:w-1/2 lg:w-[45%]">
          <motion.div
            initial={{
              opacity: 0,
              x: -30
            }}
            whileInView={{
              opacity: 1,
              x: 0
            }}
            transition={{
              duration: 1
            }}
            viewport={{
              once: true
            }}
          >
            <div className="mb-6">
              <Coffee className="w-8 h-8 text-purple-400" />
            </div>
          </motion.div>

          <motion.div
            initial={{
              opacity: 0,
              x: -30
            }}
            whileInView={{
              opacity: 1,
              x: 0
            }}
            transition={{
              duration: 1,
              delay: 0.3
            }}
            viewport={{
              once: true
            }}
            className="mb-6"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white">
              La Experiencia Chiloé
            </h2>
          </motion.div>

          <motion.p
            initial={{
              opacity: 0,
              x: -30
            }}
            whileInView={{
              opacity: 1,
              x: 0
            }}
            transition={{
              duration: 1,
              delay: 0.6
            }}
            viewport={{
              once: true
            }}
            className="text-gray-300 text-lg md:text-xl leading-relaxed max-w-xl"
          >
            En el corazón de la Isla de Chiloé, donde la niebla baña las montañas y las olas 
            del mar surcan nuestras costas, <strong className="text-cyan-400">Café Central</strong> nace 
            de una obsesión: compartir lo mejor de nuestra tierra a través del café.

            <br /><br />

            Nuestra selección de granos 100% chilenos cuenta historias de agricultores chilenos 
            comprometidos con la sostenibilidad y la calidad excepcional. Desde las zonas nubladas 
            de altura hasta las tierras fértiles de Tumbes, cada grano ha viajado miles de 
            kilómetros para llegar hasta ti.

            <br /><br />

            Pero Café Central es más que café. Es un espacio donde la tradición chilena se 
            encuentra con la modernidad. Donde puedes degustar un coquito casero tan auténtico 
            como las leyendas ancestrales de la isla, mientras disfrutas de un latte de avena 
            preparado con las técnicas más vanguardistas de la cafetaría de especialidad.

            <br /><br />

            Somos Chiloé en cada taza. Somos tradición con mirada al futuro. Ven a vivir la 
            experiencia café, donde cada sorbo te transporta al mundo que anhelamos compartir.
          </motion.p>
        </div>

        {/* Right Side - Image */}
        <div className="relative md:block md:w-1/2 lg:w-[55%]">
          {/* Abstract decorative elements */}
          <motion.div
            initial={{
              opacity: 0,
              scale: 0.8,
              x: 50
            }}
            whileInView={{
              opacity: 1,
              scale: 1,
              x: 0
            }}
            transition={{
              duration: 1,
              delay: 0.8
            }}
            viewport={{
              once: true
            }}
            className="absolute -right-8 top-20 md:-right-12 md:top-32 w-64 h-64 md:w-80 md:h-80"
          >
            <div className="w-full h-full bg-gradient-to-br from-cyan-400/20 via-purple-400/20 to-pink-400/20 rounded-full blur-3xl" />
          </motion.div>

          <motion.div
            initial={{
              opacity: 0,
              scale: 0.8,
              y: 50
            }}
            whileInView={{
              opacity: 1,
              scale: 1,
              y: 0
            }}
            transition={{
              duration: 1,
              delay: 1
            }}
            viewport={{
              once: true
            }}
            className="relative z-10"
          >
            <div className="relative">
              {/* Main image container */}
              <div className="group relative overflow-hidden rounded-2xl">
                <motion.div
                  initial={{
                    opacity: 0,
                    y: 20
                  }}
                  whileInView={{
                    opacity: 1,
                    y: 0
                  }}
                  transition={{
                    duration: 1,
                    delay: 1.2
                  }}
                  viewport={{
                    once: true
                  }}
                  className="absolute -inset-0.5 bg-gradient-to-r from-cyan-400/30 via-purple-400/30 to-pink-400/30 rounded-2xl blur opacity-0 group-hover:opacity-50 transition duration-500"
                />

                <div className="relative aspect-[4/5] overflow-hidden rounded-xl bg-gradient-to-br from-gray-900 to-black">
                  <motion.img
                    initial={{
                      opacity: 0,
                      scale: 1.1
                    }}
                    whileInView={{
                      opacity: 1,
                      scale: 1
                    }}
                    whileHover={{
                      scale: 1.05
                    }}
                    transition={{
                      duration: 1,
                      delay: 1.5
                    }}
                    viewport={{
                      once: true
                    }}
                    src="https://images.unsplash.com/photo-1511920170073-24190db6a27c?w=800&h=1000&fit=crop&q=80"
                    alt="Café Central - Experiencia Chiloé"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                </div>
              </div>

              {/* Floating badges */}
              <motion.div
                initial={{
                  opacity: 0,
                  scale: 0
                }}
                whileInView={{
                  opacity: 1,
                  scale: 1
                }}
                transition={{
                  duration: 1,
                  delay: 2
                }}
                viewport={{
                  once: true
                }}
                className="absolute -bottom-4 -left-4 bg-purple-500/20 backdrop-blur-xl border border-white/20 px-4 py-2 rounded-full"
              >
                <motion.span
                  animate={{
                    scale: [1, 1.2, 1]
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: 'easeInOut'
                  }}
                  className="text-white text-sm font-medium"
                >
                  ✨ 100% Orgánico
                </motion.span>
              </motion.div>

              <motion.div
                initial={{
                  opacity: 0,
                  scale: 0,
                  bottom: '0px',
                  left: '20px'
                }}
                whileInView={{
                  opacity: 1,
                  scale: 1,
                  bottom: '-4px',
                  left: '-4px'
                }}
                transition={{
                  duration: 1,
                  delay: 2.5
                }}
                viewport={{
                  once: true
                }}
                className="absolute -bottom-4 -left-4 hidden md:block"
              >
                <motion.span
                  animate={{
                    scale: [1, 1.2, 1]
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: 'easeInOut',
                    delay: 1
                  }}
                  className="bg-pink-500/20 backdrop-blur-xl border border-white/20 px-4 py-2 rounded-full"
                >
                  <span className="text-pink-300 text-sm font-medium">
                    🌱 Sostenible
                  </span>
                </motion.span>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

// ==========================================
// FOOTER SECTION
// ==========================================

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative py-12 px-6 bg-black border-t border-white/10 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-black/95 to-black" />

      {/* Content */}
      <div className="relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {/* Brand Section */}
          <div className="text-center md:text-left">
            <motion.div
              initial={{
                opacity: 0,
                y: 10
              }}
              whileInView={{
                opacity: 1,
                y: 0
              }}
              transition={{
                duration: 0.8
              }}
              viewport={{
                once: true
              }}
            >
              <Coffee className="w-8 h-8 md:w-10 md:h-10 mx-auto md:mx-0 text-cyan-400 mb-3" />
            </motion.div>

            <motion.div
              initial={{
                opacity: 0,
                y: 10
              }}
              whileInView={{
                opacity: 1,
                y: 0
              }}
              transition={{
                duration: 0.8,
                delay: 0.2
              }}
              viewport={{
                once: true
              }}
            >
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">
                Café Central
              </h3>
              <p className="text-gray-400 text-sm md:text-base">
                Especialidad y Vanguardia en Chiloé
              </p>
            </motion.div>
          </div>

          {/* Contact Section */}
          <div className="text-center md:text-right md:flex md:justify-end flex-col md:items-end gap-4">
            <motion.div
              initial={{
                opacity: 0,
                x: 20
              }}
              whileInView={{
                opacity: 1,
                x: 0
              }}
              transition={{
                duration: 0.8
              }}
              viewport={{
                once: true
              }}
            >
              <h4 className="text-white font-semibold mb-4">Contáctanos</h4>
            </motion.div>

            <motion.div
              initial={{
                opacity: 0,
                x: 20
              }}
              whileInView={{
                opacity: 1,
                x: 0
              }}
              transition={{
                duration: 0.8,
                delay: 0.2
              }}
              viewport={{
                once: true
              }}
              className="flex items-center gap-2 md:gap-3 justify-center md:justify-start"
            >
              <MapPin className="w-4 h-4 md:w-5 md:h-5 text-pink-400" />
              <p className="text-gray-400 text-sm md:text-base">
                Isla de Chiloé, Chile
              </p>
            </motion.div>

            <motion.div
              initial={{
                opacity: 0,
                x: 20
              }}
              whileInView={{
                opacity: 1,
                x: 0
              }}
              transition={{
                duration: 0.8,
                delay: 0.4
              }}
              viewport={{
                once: true
              }}
              className="flex items-center gap-2 md:gap-3 justify-center md:justify-start"
            >
              <Phone className="w-4 h-4 md:w-5 md:h-5 text-pink-400" />
              <p className="text-gray-400 text-sm md:text-base">
                +56 9 1234 5678
              </p>
            </motion.div>

            <motion.div
              initial={{
                opacity: 0,
                x: 20
              }}
              whileInView={{
                opacity: 1,
                x: 0
              }}
              transition={{
                duration: 0.8,
                delay: 0.6
              }}
              viewport={{
                once: true
              }}
              className="flex items-center gap-2 md:gap-3 justify-center md:justify-start"
            >
              <Mail className="w-4 h-4 md:w-5 md:h-5 text-pink-400" />
              <p className="text-gray-400 text-sm md:text-base">
                hola@cafecentral.cl
              </p>
            </motion.div>
          </div>

          {/* Social Section */}
          <div className="text-center md:text-center">
            <motion.div
              initial={{
                opacity: 0,
                y: 10
              }}
              whileInView={{
                opacity: 1,
                y: 0
              }}
              transition={{
                duration: 0.8
              }}
              viewport={{
                once: true
              }}
            >
              <h4 className="text-white font-semibold mb-4">Síguenos</h4>
            </motion.div>

            <motion.div
              initial={{
                opacity: 0
              }}
              whileInView={{
                opacity: 1
              }}
              transition={{
                duration: 0.8,
                delay: 0.4
              }}
              viewport={{
                once: true
              }}
            >
              <a
                href="https://www.instagram.com/cafecentralspecialty?igsh=ZG84MWNjeTI3NHJ5"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center md:justify-center gap-2 px-6 py-3 bg-gradient-to-r from-cyan-500 to-purple-500 text-white rounded-full font-medium shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40 hover:shadow-cyan-500/25 transition duration-300"
              >
                <Instagram className="w-5 h-5 md:w-6 md:h-6" />
                <span className="hidden sm:inline">
                  Síguenos en Instagram
                </span>
                <span className="sm:hidden">
                  @cafecentralspecialty
                </span>
              </a>
            </motion.div>
          </div>
        </div>

        {/* Copyright */}
        <motion.div
          initial={{
            opacity: 0
          }}
          whileInView={{
            opacity: 1
          }}
          transition={{
            duration: 0.8,
            delay: 0.8
          }}
          viewport={{
            once: true
          }}
          className="mt-12 pt-6 border-t border-white/10 text-center"
        >
          <p className="text-gray-500 text-sm">
            © {currentYear} Café Central. Todos los derechos reservados.
          </p>
          <p className="text-gray-600 text-xs mt-2">
            Diseñado con ❤️ en la Isla de Chiloé
          </p>
        </motion.div>
      </div>
    </footer>
  );
};

// ==========================================
// MAIN PAGE COMPONENT
// ==========================================

export default function Page() {
  return (
    <div className="min-h-screen bg-black">
      {/* Animated Background Gradient */}
      <div className="fixed inset-0 z-0">
        <motion.div
          animate={{
            background: [
              'radial-gradient(circle at 30% 70%, rgba(6, 182, 212, 0.08), transparent 60%), radial-gradient(circle at 70% 30%, rgba(139, 92, 246, 0.08), transparent 60%)',
              'radial-gradient(circle at 70% 70%, rgba(236, 72, 153, 0.08), transparent 60%), radial-gradient(circle at 30% 30%, rgba(6, 182, 212, 0.08), transparent 60%)',
              'radial-gradient(circle at 30% 70%, rgba(6, 182, 212, 0.08), transparent 60%), radial-gradient(circle at 70% 30%, rgba(139, 92, 246, 0.08), transparent 60%)'
            ]
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
          className="w-full h-full"
        />
      </div>

      {/* Main Content */}
      <div className="relative z-10">
        <Hero />
        <MenuSection categories={categories} />
        <ExperienceSection />
        <Footer />
      </div>
    </div>
  );
}