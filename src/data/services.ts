export interface ServiceItem {
  name: string;
  /** Aclaración corta, ej. "(peinado con producto)". */
  note?: string;
  /** Precio en soles (S/). Omitir si es cortesía. */
  price?: number;
  /** "Desde S/ xx". */
  from?: boolean;
  /** Texto en lugar del precio, ej. "Cortesía". */
  label?: string;
}

export interface ServiceCategory {
  id: string;
  title: string;
  subtitle?: string;
  items: ServiceItem[];
}

// Fuente: carta física de la barbería.
export const categories: ServiceCategory[] = [
  {
    id: 'servicios',
    title: 'Nuestros servicios',
    items: [
      { name: 'Corte', price: 25 },
      { name: 'Facial premium', price: 50 },
      { name: 'Barba simple', price: 10 },
      { name: 'Barba completa', price: 15 },
      { name: 'Diseño de cejas', price: 5 },
      { name: 'Kiss express', price: 5 },
      { name: 'Polvo texturizador', price: 5 },
      { name: 'Masaje relajante', price: 10 },
      { name: 'Lavado capilar', price: 5 },
      { name: 'Styling', note: 'peinado con producto', price: 5 },
    ],
  },
  {
    id: 'colorimetria',
    title: 'Permanente y colorimetría',
    items: [
      { name: 'Ondulación semi-ondulación', price: 80, from: true },
      { name: 'Tinte & mechas', price: 100, from: true },
      { name: 'Alisado', price: 70, from: true },
    ],
  },
  {
    id: 'bebidas',
    title: 'Bebidas',
    items: [
      { name: 'Café de cortesía', label: 'Cortesía' },
      { name: 'Agua de cortesía', label: 'Cortesía' },
      { name: 'Gaseosa personal', price: 2 },
      { name: 'Agua personal', price: 2 },
      { name: 'Gatorade', price: 3 },
      { name: 'Cerveza', price: 6 },
    ],
  },
  {
    id: 'kids',
    title: 'Kids Barbers',
    subtitle: 'Zona Kids · by Jhonnatan',
    items: [
      { name: 'Cortes de niños', price: 25 },
      { name: 'Mi primer corte', note: 'con mechoncito de cabello y diploma de honor', price: 40 },
    ],
  },
  {
    id: 'total-style',
    title: 'Total Style',
    items: [
      { name: 'Mascarilla black', price: 35 },
      { name: 'Mascarilla gold', price: 35 },
      { name: 'Exfoliante de carbón', price: 40 },
      { name: 'Exfoliante de fresa', price: 40 },
      { name: 'Minoxidil', price: 60 },
      { name: 'Polvo texturizador', price: 35 },
      { name: 'Cera spider', price: 35 },
      { name: 'Gel rolda', price: 20 },
      { name: 'Shampoo en sachet', price: 7 },
      { name: 'Gorra New Era', price: 40 },
      { name: 'Lentes de sol', price: 25 },
      { name: 'Aretes', price: 7 },
      { name: 'Pulsera de acero', price: 10 },
      { name: 'Pulsera de cuerina', price: 5 },
    ],
  },
];

export const formatPrice = (item: ServiceItem): string => {
  if (item.label) return item.label;
  if (item.price === undefined) return '';
  return `${item.from ? 'Desde ' : ''}S/ ${item.price}`;
};
