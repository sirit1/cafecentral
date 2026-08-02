import { MapPin, Phone, Instagram } from 'lucide-react';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="relative z-50 border-t border-white/10 bg-black/60 backdrop-blur-md pt-8 pb-6">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Marca */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold bg-gradient-to-r from-amber-400 via-orange-400 to-pink-400 bg-clip-text text-transparent">
              Café Central
            </h3>
            <p className="text-white/70 text-sm leading-relaxed">
              La experiencia del buen café en Chiloé. De la sierra a tu taza,
              conectando la tierra con el paladar en cada grano seleccionado.
            </p>
            <div className="flex gap-4 pt-2">
              <Link
                href="https://www.instagram.com/cafecentralspecialty"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 border border-white/20 rounded-lg transition-all duration-300 group"
              >
                <Instagram className="w-5 h-5 text-amber-400 group-hover:text-amber-300 transition-colors" />
                <span className="text-white/90 text-sm font-medium">Síguenos</span>
              </Link>
            </div>
          </div>

          {/* Contacto */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-amber-400">Contáctanos</h4>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-amber-400 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-white/80 text-sm">
                    Isla de Chiloé, Chile
                  </p>
                  <p className="text-white/60 text-xs mt-1">
                    Av. Principal, Puerto Antonio
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-amber-400 flex-shrink-0" />
                <p className="text-white/80 text-sm">+56 9 1234 5678</p>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-white/80 text-sm">hola@cafecentral.cl</span>
              </div>
            </div>
          </div>

          {/* Horarios */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-amber-400">Horarios</h4>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-white/70">Lunes - Viernes</span>
                <span className="text-white/90 font-medium">7:00 - 20:00</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-white/70">Sábado</span>
                <span className="text-white/90 font-medium">8:00 - 21:00</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-white/70">Domingo</span>
                <span className="text-white/90 font-medium">9:00 - 19:00</span>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="pt-6 border-t border-white/10 text-center">
          <p className="text-white/50 text-xs">
            © 2024 Café Central. Todos los derechos reservados.
          </p>
          <p className="text-white/30 text-xs mt-2">
            Diseñado con ❤️ en la Isla de Chiloé
          </p>
        </div>
      </div>
    </footer>
  );
}