# 🏔️ Café Central - Web App Interactiva

<div align="center">
  <h1 style="background: linear-gradient(to right, #ffffff, #06b6d4, #a855f7); -webkit-background-clip: text; -webkit-text-fill-color: transparent; font-size: 3em;">
    Café Central
  </h1>
  <p>Especialidad y Vanguardia en Chiloé</p>
</div>

---

## 📋 Roadmap del Proyecto

### ✅ Fase 1 - Implementación Base
- [x] Hero Section con animaciones Framer Motion
- [x] Sección "Nuestro Menú" con glassmorphism
- [x] 3 Categorías de Productos (Cafés, Pastelería, Vegana)
- [x] Sección "La Experiencia Chiloé"
- [x] Footer con contacto e Instagram

### ✅ Fase 2 - Funcionalidades Adicionales
- [x] Sistema de Carrito (Zustand + localStorage)
- [x] Sistema de Wishlist (Favoritos)
- [x] Navbar con botones y badges de contadores
- [x] Modal de Carrito (deslizable, controles de cantidad)
- [x] Modal de Wishlist (sincronización con carrito)
- [x] Checkout Flow con Stripe Payment Link
- [x] Sistema de Reseñas (5 testimonios con avatares)

### ⏳ Fase 3 - Futuras Integraciones (EN DESARROLLO)
- [ ] Configuración de pagos con Stripe Checkout (API)
- [ ] Persistencia de datos en backend (Firebase/Supabase)
- [ ] Sistema de pedidos con tracking
- [ ] Integración con Google Maps
- [ ] Animaciones más granulares con Intersection Observer

### ⏳ Fase 4 - Ideas para el Futuro (EN PLANIFICACIÓN)
- [ ] Blog de nuevas ofertas
- [ ] Sistema de reservas de mesas
- [ ] Programa de fidelidad
- [ ] Integración con WhatsApp para pedidos
- [ ] Mapa interactivo de la cafetería

---

## 🎯 Resumen de la Fase 2 - Funcionalidades Implementadas

### 1. Sistema de Carrito (Cart)

**Arquitectura:**
- Estado global con Zustand
- Persistencia en localStorage con clave `cafecentral-cart`
- Comunicación vía eventos React

**Componente:** `CartModal`

**Características:**
- Panel deslizable desde la derecha
- Lista de productos con cantidad
- Controles + / - para ajustar cantidades
- Contador de productos en navbar
- Cálculo de subtotal
- Botón "Proceder al Pago"
- Mensaje de éxito post-checkout

**Estilos:**
- Color acento: Cian/Morado (`from-cyan-500 to-purple-500`)
- Glassmorphism con `bg-black/95 border-l border-white/10`
- Animaciones con Framer Motion (`initial={{ x: '100%' }} animate={{ x: 0 }}`)

---

### 2. Sistema de Wishlist (Favoritos)

**Arquitectura:**
- Contexto React `WishlistContext`
- Persistencia en localStorage con clave `cafecentral-wishlist`
- Eventos para sincronizar con Cart modal

**Componente:** `WishlistModal`

**Características:**
- Toggles de like en productos
- Modal deslizable
- **Sincronización:** Al eliminar de wishlist, se abre Cart modal (opción A)
- Contador de favoritos en navbar badge

**Eventos:**
```javascript
// Cuando se elimina de wishlist
window.dispatchEvent(new CustomEvent('wishlistCleared'));
```

---

### 3. Navbar con Badges

**Estructura:**
- Navbar fija inferior (para móvil) o superior (para desktop)
- Botones "Carrito" y "Favoritos"
- Badges con counts (carro de compra y corazón)

**Estilos:**
- Glassmorphism del navbar
- Colores diferenciados:
  - Carrito: Cian (`text-cyan-400`)
  - Favoritos: Rosa (`text-pink-400`)
- Animación de pulsación al tener ítems

**Lógica:**
```javascript
const cartCount = cartContext.wishlistCount();
const wishlistCount = wishlistContext.wishlistCount();
```

---

### 4. Checkout Flow

**Método:** Stripe Payment Link (Opción A - Redirección)

**Flujo:**
1. Usuario añade productos al carrito
2. Abre modal carrito
3. Hace clic en "Proceder al Pago"
4. Redirección a Stripe Payment Link
5. LocalStorage guarda el pedido con formato:
```json
{
  "order": {
    "id": "ord_abc123",
    "timestamp": "2025-01-15T10:30:00Z",
    "items": [...],
    "subtotal": 5000,
    "status": "pending"
  }
}
```

**LocalStorage Keys:**
- `cafecentral-cart` - Array de items del carrito
- `cafecentral-wishlist` - Array de wishlist items
- `cafecentral-orders` - Array de historial de pedidos

**Límites de Storage:**
- LocalStorage: ~5MB
- Se recomienda borrar wishlist al checkout (opción A)
- O mantener carrito limpio y solo wishlist (opción B - no implementado)

---

### 5. Sistema de Reseñas (Reviews/Testimonials)

**Componente:** `ReviewsSection`

**Características:**
- 5 testimonios fijos (mock data)
- Nombres de clientes
- Fotos de avatares (Unsplash)
- Clasificación con estrellas (1-5)

**Estructura de datos:**
```typescript
interface Review {
  id: string;
  name: string;
  avatar: string;
  rating: number; // 1-5
  comment: string;
}
```

**Diseño:**
- Grid responsive (1 columna móvil, 3 en desktop)
- Cards con glassmorphism
- Estrellas con icono Lucide

---

### 6. Configuración de Stripe para Producción

**Pasos:**

1. **Crear cuenta en Stripe**
   - Visita [stripe.com](https://stripe.com)
   - Crea cuenta con email de tu dominio

2. **Crear Payment Link**
   - Ve a "Products" → "Payment links"
   - Click "Create a payment link"
   - Selecciona "Products or services"
   - Nombre: "Pedidos - Café Central"
   - Precio: Configura tu paquete base (ej: $4500 CLP)
   - Productos: Añade los que quieras mostrar
   - Click "Publish"
   - Copia el link que te dan (ej: `https://pay.stripe.com/...`)

3. **Reemplazar en código**
   ```typescript
   // En el componente CartModal
   const checkoutUrl = 'TU_STRIPE_PAYMENT_LINK';
   ```

4. **Probar flujo completo**
   - Añade productos al carrito
   - Abre carrito
   - Haz clic "Proceder al Pago"
   - Verifica redirección a Stripe

**Configuración adicional opcional:**
- Configura dominio en Stripe para que el link muestre tu marca
- Añade logos de tu cafetería
- Configura mensajes de éxito/fallo

**NOTA:** Este método es "lite" de Stripe, no requiere backend pero los pagos no son automáticos (son contraentrega).

---

### 7. Checklist de Pre-Lanzamiento

**Antes de publicar en Vercel:**

- [ ] **Funcionalidad Carrito:**
  - [ ] Aceptar productos: `addItem(productId)`
  - [ ] Eliminar producto: `removeItem(productId)`
  - [ ] Cambiar cantidad: `updateQuantity(id, qty)`
  - [ ] Contador navbar se actualiza
  - [ ] Subtotal calcula correctamente

- [ ] **Funcionalidad Wishlist:**
  - [ ] Toggle like: `toggleItem(productId)`
  - [ ] Eliminar de wishlist: `removeFromWishlist(productId)`
  - [ ] Al limpiar wishlist, se abre cart modal (evento `wishlistCleared`)

- [ ] **Checkout:**
  - [ ] Al dar click en pago, se redirige
  - [ ] Pedido se guarda en localStorage
  - [ ] Mensaje de éxito aparece

- [ ] **Persistencia:**
  - [ ] Al recargar página, carrito se mantiene
  - [ ] Al recargar página, wishlist se mantiene
  - [ ] Al recargar página, pedidos se mantienen

- [ ] **Responsive:**
  - [ ] Móvil (320px): Grid 1 columna
  - [ ] Tablet (768px): Grid 2 columnas
  - [ ] Desktop (1024px+): Grid 3 columnas

- [ ] **Animaciones:**
  - [ ] Hero aparece al cargar
  - [ ] Scroll indicator anima
  - [ ] Cards glassmorphism tienen hover
  - [ ] Modales se deslizan suavemente

- [ ] **Diseño:**
  - [ ] Modo oscuro por defecto
  - [ ] Glassmorphism en cards y modales
  - [ ] Gradientes animados en fondo
  - [ ] Colores consistentes (cian/morado/rosa)

- [ ] **Datos:**
  - [ ] Todas las categorías funcionan
  - [ ] Precios en CLP con formato correcto
  - [ ] Imágenes cargan sin error

- [ ] **SEO:**
  - [ ] Meta title: "Café Central | Especialidad y Vanguardia en Chiloé"
  - [ ] Meta description: "Descubre el mejor café de especialidad en la Isla de Chiloé..."
  - [ ] Open Graph tags

---

## 🛠️ Stack Tecnológico

| Tecnología | Uso |
|-----------|------|
| **Next.js** | Framework (App Router) |
| **React 18+** | UI Library |
| **TypeScript** | Type checking (opcional) |
| **Tailwind CSS** | Estilos |
| **Framer Motion** | Animaciones |
| **Lucide React** | Iconos |
| **Zustand** | Estado global (carrito/wishlist) |
| **Stripe** | Pagos (Payment Link) |
| **localStorage** | Persistencia de datos |

---

## 📦 Dependencias Necesarias

```json
{
  "dependencies": {
    "next": "^14.0.0",
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "framer-motion": "^10.0.0",
    "lucide-react": "^0.200.0",
    "zustand": "^4.0.0",
    "stripe": "^14.0.0"
  }
}
```

**Opcionales:**
```json
{
  "dependencies": {
    "react-intersection-observer": "^10.0.0"
  }
}
```

---

## 🚀 Despliegue en Vercel

```bash
# 1. Instalar dependencias
npm install

# 2. Configurar variables de entorno (.env.local)
STRIPE_CHECKOUT_URL=tu_stripe_payment_link
NEXT_PUBLIC_APP_NAME=Cafe Central

# 3. Subir a Vercel
vercel

# 4. O usar Vercel CLI
vercel --prod
```

**Variables de entorno:**
| Variable | Descripción |
|----------|-------------|
| `STRIPE_CHECKOUT_URL` | URL de tu Stripe Payment Link |
| `NEXT_PUBLIC_APP_NAME` | Nombre de la app en navbar/footer |
| `NEXT_PUBLIC_CONTACT_EMAIL` | Email de contacto |
| `NEXT_PUBLIC_CONTACT_PHONE` | Teléfono de contacto |

---

## 🎨 Guía de Estilos

### Colores

| Color | Usage | Hex |
|-------|-------|-----|
| Primary | Gradient main | `from-cyan-500 to-purple-500` |
| Accent 1 | Botones, acentos | `cyan-500` |
| Accent 2 | Favoritos | `pink-500` |
| Dark | Fondo | `#0a0a0a` |
| Glass | Trasparencias | `bg-white/5` to `bg-white/15` |
| Text | Principal | `text-white` |
| Text Sub | Secundario | `text-gray-400` |

### Tipografía

| Elemento | Style |
|----------|-------|
| H1 | `text-6xl md:text-8xl font-bold` |
| H2 | `text-3xl md:text-4xl font-bold` |
| H3 | `text-xl md:text-2xl font-semibold` |
| Body | `text-base` |
| Small | `text-sm` |
| XSmall | `text-xs` |

### Efectos

| Efecto | CSS |
|--------|-----|
| Glassmorphism | `bg-white/5 border border-white/10 backdrop-blur-sm` |
| Glow | `shadow-lg shadow-purple-500/30` |
| Gradient | `bg-gradient-to-r from-cyan-500 to-purple-500` |

### Animaciones Framer Motion

| Componente | Props |
|------------|-------|
| Hero entrance | `initial={{ opacity: 0, y: 60 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}` |
| Smooth scroll | `whileInView={{ opacity: 1, y: 0 }}` |
| Button hover | `whileHover={{ scale: 1.05 }}` |
| Button tap | `whileTap={{ scale: 0.98 }}` |
| Modal slide | `initial={{ x: '100%' }} animate={{ x: 0 }} transition={{ type: 'spring' }}` |

---

## 📱 Estructura del Proyecto

```
/
├── app/
│   ├── page.tsx              # Página principal (todo el código)
│   ├── globals.css           # Estilos globales
│   └── layout.tsx           # Layout principal
├── components/              # (opcional - componentes separados)
├── store/                  # (opcional - Zustand stores)
├── public/                 # Imágenes, favicon
├── README.md               # Este archivo
└── package.json
```

---

## 📝 Notas para el Cliente

Este código está diseñado para:

1. **Copiar y pegar** directamente en el archivo `app/page.tsx` de tu proyecto Next.js
2. **Compilarse sin modificaciones** en un entorno Next.js local
3. **Desplegarse en Vercel** sin configuración adicional
4. **Personalizarse fácilmente** cambiando textos, precios e imágenes

### Requiere:

- Next.js 14+ con App Router
- Tailwind CSS instalado y configurado
- Framer Motion instalado
- Lucide React instalado para los iconos
- React 18+
- TypeScript (opcional, con los tipos incluidos en el código)

### Opcional (mejoras):

- Instalar `react-intersection-observer` para animaciones más granulares
- Instalar `zustand` para estado global (carrito, favoritos)
- Instalar `leaflet` o `mapbox` para mapa interactivo en el footer

---

## 📞 Contacto

¿Tienes preguntas sobre el diseño, animaciones o personalizaciones?

**Café Central Team**
📍 Isla de Chiloé, Chile

📧 email@example.com
📱 +56 9 1234 5678

---

## 📄 License

MIT License - Diseñado con ❤️ para Chiloé

---

![Made with](https://img.shields.io/badge/Made_with-Vercel-black?logo=vercel)
![Next.js](https://img.shields.io/badge/Next.js-14-black?logo=vercel)
![Tailwind](https://img.shields.io/badge/Tailwind-3-blue?logo=tailwind-css)
![React](https://img.shields.io/badge/React-18-61dafb?logo=react)

<EOF>