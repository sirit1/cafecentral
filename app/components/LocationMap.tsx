// ==========================================
// Google Maps Integration Component
// ==========================================

import { GoogleMap, LoadError, Marker, Polyline } from '@react-google-maps/api';
import { MapPin, Navigation, Phone } from 'lucide-react';

const containerStyle = {
  width: '100%',
  height: '100%',
  borderRadius: '24px',
  overflow: 'hidden',
};

const center = {
  lat: -43.1536, // Chiloé, Chile coordinates
  lng: -73.2039,
};

const mapOptions = {
  disableDefaultUI: false,
  zoom: 14,
  mapId: '', // For custom map styles, provide a mapId
};

// Coffee Shop Location Marker
const coffeeShopMarker = {
  position: center,
  title: 'Café Central',
  description: 'Isla de Chiloé, Región de Los Lagos, Chile',
};

// Nearby attractions (mock data for Chiloé)
const nearbyAttractions = [
  { name: 'Auditorio Guitarrillo', lat: -43.1500, lng: -73.2100 },
  { name: 'Parque Larrain', lat: -43.1450, lng: -73.2000 },
  { name: 'Mirador de las Estrellas', lat: -43.1600, lng: -73.1900 },
];

const mapContainerElement = document.getElementById('map-container');

export const LocationMap: React.FC = () => {
  const [center, setCenter] = useState(center);

  useEffect(() => {
    // Fetch real location if we had backend integration
    // For now, using hardcoded Chiloé coordinates
    // Future: Get coordinates from your location data
    console.log('Map loaded for:', center);
  }, [center]);

  if (!mapContainerElement) return null;

  return (
    <div className="relative w-full h-[400px] lg:h-[500px]">
      {/* Map Header */}
      <div className="absolute -top-6 left-0 right-0 z-10 flex justify-center gap-4">
        <motion.button
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="flex items-center gap-2 px-4 py-2 bg-white/90 backdrop-blur-md rounded-full shadow-lg hover:bg-white/100 transition-colors"
        >
          <MapPin size={16} className="text-cyan-500" />
          <span className="text-sm font-medium text-gray-800">Ver Ubicación</span>
        </motion.button>
      </div>

      {/* Map Container */}
      <div id="map-container" className="relative z-0">
        {typeof window !== 'undefined' && !process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ? (
          // Fallback if no API key is configured
          (
            <LoadError
              error={new Error('Google Maps API Key not configured')}
            />
          )
        ) : (
          <GoogleMap
            mapContainerElement={mapContainerElement}
            center={center}
            zoom={14}
            options={mapOptions}
            onLoad={onLoad}
            onUnmount={onUnmount}
            onClick={onMapClick}
          >
            {/* Coffee Shop Marker */}
            <Marker
              position={{ ...center }}
              icon={{
                url: 'data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%2224%22 height=%2224%22 viewBox=%220 0 24 24%22 fill=%22none%22 stroke=%22%2306b6d4%22 stroke-width=%222%22 stroke-linecap=%22round%22 stroke-linejoin=%22round%22%3E%3Cpath d=%22M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z%22%3E%3C/svg%3E%3C/svg%3E',
                scaledSize: new google.maps.Size(40, 40),
              }}
              animation={google.maps.Animation.BOUNCE}
            />
            
            {/* Pulse Effect */}
            <div 
              className="absolute inset-0 z-0 pointer-events-none"
              style={{ 
                backgroundImage: 'radial-gradient(circle at 50% 50%, #06b6d4 0%, transparent 70%)',
                opacity: 0.3,
              }}
            />

            {/* Nearby Attractions */}
            {nearbyAttractions.map((attraction, idx) => (
              <Marker
                key={idx}
                position={{ lat: attraction.lat, lng: attraction.lng }}
                icon={{
                  url: 'data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%2216%22 height=%2216%22 viewBox=%220 0 24 24%22 fill=%22none%22 stroke=%22%23a855f7%22 stroke-width=%221.5%22 stroke-linecap=%22round%22 stroke-linejoin=%22round%22%3E%3Cpath d=%22M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z%22%3E%3C/svg%3E%3C/svg%3E',
                  scaledSize: new google.maps.Size(24, 24),
                }}
              />
            ))}

            {/* Route Line from current position */}
            {currentPosition && (
              <Polyline
                path={[currentPosition, ...nearbyAttractions]}
                options={{
                  strokeColor: '#a855f7',
                  strokeWeight: 3,
                  strokeOpacity: 0.8,
                }}
              />
            )}

            {/* Current Location Button */}
            <div className="absolute bottom-6 right-6 z-10">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={onCurrentLocation}
                className="flex flex-col items-center gap-2 px-4 py-3 bg-white/90 backdrop-blur-md rounded-full shadow-lg hover:bg-white/100 transition-colors"
              >
                <Navigation size={20} className="text-purple-500" />
                <span className="text-xs font-medium text-gray-800">Tu Ubicación</span>
              </motion.button>
            </div>
          </GoogleMap>
        )}
      </div>

      {/* Map Legend / Info */}
      <div className="absolute top-6 right-6 z-10 p-3 bg-white/90 backdrop-blur-md rounded-xl shadow-lg">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-cyan-500" />
            <span className="text-xs text-gray-700">Café Central</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-purple-500" />
            <span className="text-xs text-gray-700">Atracciones</span>
          </div>
        </div>
      </div>

      {/* Address Info Overlay */}
      <div className="absolute bottom-6 left-6 right-6 z-10">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-4 bg-white/95 backdrop-blur-md rounded-2xl shadow-xl"
        >
          <h3 className="text-lg font-bold text-gray-900 mb-2">Café Central</h3>
          <p className="text-sm text-gray-600">
            Isla de Chiloé, Región de Los Lagos<br />
            Chile
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default LocationMap;