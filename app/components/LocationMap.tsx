'use client';

import { MapPin, Navigation } from 'lucide-react';
import { motion } from 'framer-motion';

const cafeLocation = {
  label: 'Café Central',
  address: 'Isla de Chiloé, Región de Los Lagos, Chile',
  mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Caf%C3%A9%20Central%20Chilo%C3%A9%20Chile',
};

export const LocationMap: React.FC = () => {
  return (
    <div className="relative w-full h-[400px] lg:h-[500px] rounded-3xl overflow-hidden border border-white/10 bg-gradient-to-br from-cyan-500/20 via-purple-500/20 to-black">
      <div className="absolute inset-0 opacity-30 bg-[radial-gradient(circle_at_center,_#06b6d4_0%,_transparent_35%),linear-gradient(135deg,_transparent_0%,_rgba(168,85,247,.4)_100%)]" />

      <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-cyan-500/20 text-cyan-300 shadow-lg shadow-cyan-500/20"
        >
          <MapPin size={42} />
        </motion.div>

        <motion.h3
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-2 text-3xl font-bold text-white"
        >
          {cafeLocation.label}
        </motion.h3>

        <p className="mb-8 max-w-md text-gray-300">{cafeLocation.address}</p>

        <a
          href={cafeLocation.mapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-full bg-white/10 px-5 py-3 font-semibold text-white transition hover:bg-white/20"
        >
          <Navigation size={18} />
          Ver ubicación
        </a>
      </div>
    </div>
  );
};

export default LocationMap;
