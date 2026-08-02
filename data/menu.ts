export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  image?: string;
  category: "especialidad" | "pasteleria" | "vegano";
}

export interface Category {
  id: string;
  name: string;
  description: string;
  items: MenuItem[];
}

export const categories: Category[] = [
  {
    id: "especialidad",
    name: "Cafés de Especialidad",
    description:
      "Granos seleccionados de pequeños productores de América del Sur, cosechados con excelencia y tostados para resaltar sus notas únicas.",
    items: [
      {
        id: "espec-1",
        name: "Huayra - Geisha Ecuador",
        description:
          "Geisha de altura en los Andes ecuatorianos. Una experiencia etérea con notas florales, cítricas y un finish delicado. La joya de nuestra colección.",
        price: 9500,
        image:
          "https://images.unsplash.com/photo-1589736993172-ebb5c0b3ca25?w=600&q=80",
        category: "especialidad",
      },
      {
        id: "espec-2",
        name: "Tulum - Colombia Supremo",
        description:
          "Colombia en su mejor expresión. Granos de Arabica 100% con un cuerpo suave y notas a cacao, chocolate negro y un toque frutal. Elegancia en cada toma.",
        price: 7200,
        image:
          "https://images.unsplash.com/photo-1514432384664-1fb0e0720002?w=600&q=80",
        category: "especialidad",
      },
      {
        id: "espec-3",
        name: "El Volcán - Costa Rica",
        description:
          "Climatizado a 1700 metros de altura. El equilibrio perfecto entre acidez vibrante y cuerpo pronunciado. Una fusión magistral de naturaleza y cuidado.",
        price: 8900,
        image:
          "https://images.unsplash.com/photo-1611163414080-efa10f2f9038?w=600&q=80",
        category: "especialidad",
      },
    ],
  },
  {
    id: "pasteleria",
    name: "Pastelería de Autor",
    description:
      "Postres artesanales horneados todos los días con mantequilla natural y los mejores ingredientes locales. El complemento perfecto para tu café.",
    items: [
      {
        id: "past-1",
        name: "Croissant de Mantequilla",
        description:
          "Clásico francés de 50% mantequilla. Croquante por fuera, fundido y mantecoso por dentro. Un tributo a la perfección.",
        price: 4500,
        image:
          "https://images.unsplash.com/photo-1587412453500-3299988c4545?w=600&q=80",
        category: "pasteleria",
      },
      {
        id: "past-2",
        name: "Pain au Lait",
        description:
          "Suavidad inigualable. Un pequeño paraíso de leche y mantequilla que se derrite en tu boca. Simplicidad y sofisticación en cada bocado.",
        price: 3900,
        image:
          "https://images.unsplash.com/photo-1509440140398-a765d52dbdf0?w=600&q=80",
        category: "pasteleria",
      },
      {
        id: "past-3",
        name: "Red Velvet Cake",
        description:
          "El icono atemporal. Suave bizcocho de color carmesí con frosting de queso crema cremoso. Un verdadero deleite.",
        price: 5800,
        image:
          "https://images.unsplash.com/photo-1586987085846-82942999a756?w=600&q=80",
        category: "pasteleria",
      },
    ],
  },
  {
    id: "vegano",
    name: "Opciones Veganas",
    description:
      "Para quienes exploran sabores sin compromisos. Alternativas veganas creativas hechas con ingredientes de la más alta calidad.",
    items: [
      {
        id: "veg-1",
        name: "Avocado Toast Premium",
        description:
          "Pan de masa madre tostado, aguacate cremoso, semillas de sésamo y semillas de girasol. Nutritivo, fresco y lleno de energía.",
        price: 9800,
        image:
          "https://images.unsplash.com/photo-1588137342008-17fa02258ab8?w=600&q=80",
        category: "vegano",
      },
      {
        id: "veg-2",
        name: "Tostada de Tomate Asado",
        description:
          "El clásico mediterráneo elevado. Pan integral, tomate asado, albahaca fresca y aceite de oliva virgen extra. Sabor puro de la tierra.",
        price: 7500,
        image:
          "https://images.unsplash.com/photo-1509440140398-a765d52dbdf0?w=600&q=80",
        category: "vegano",
      },
      {
        id: "veg-3",
        name: "Smooth Bowl Tropical",
        description:
          "Base de acai o banana con frutas frescas, granola casera y lechuga. Un explosión de energía y vitaminas. Belleza saludable.",
        price: 12500,
        image:
          "https://images.unsplash.com/photo-1624828285129-6108b29cb35a?w=600&q=80",
        category: "vegano",
      },
    ],
  },
];

export const baristaSpecialties: {
  id: string;
  name: string;
  image: string;
  description: string;
  upcoming: string;
}[] = [
  {
    id: "barista-1",
    name: "Latte Art Showcase",
    image:
      "https://images.unsplash.com/photo-15h1536363767507-62856d566372?w=600&q=80",
    description:
      "El arte de transformar cafeína en una obra maestra. Nuestros baristas dan vida a cada vaso con天鹅, corazones, rosas y flores.",
    upcoming: "Martes - 17:00 hrs",
  },
  {
    id: "barista-2",
    name: "Technique Perfection",
    image:
      "https://images.unsplash.com/photo-1589736993172-ebb5c0b3ca25?w=600&q=80",
    description:
      "El secreto está en los detalles. Aprende la técnica perfecta de la extracción, temperatura, molienda y dosificación.",
    upcoming: "Jueves - 18:00 hrs",
  },
  {
    id: "barista-3",
    name: "Chocolate Fusion",
    image:
      "https://images.unsplash.com/photo-1579237455026-6cb6c0c1335d?w=600&q=80",
    description:
      "Cuando el café se encuentra con el chocolate. Una fusión oscura que despierta todos los sentidos.",
    upcoming: "Sábado - 10:00 hrs",
  },
];