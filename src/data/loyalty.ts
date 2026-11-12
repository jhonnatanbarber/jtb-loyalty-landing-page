export interface LoyaltyStep {
  title: string;
  text: string;
}

export interface LoyaltyBenefit {
  /** Sellos necesarios; null si no depende de sellos (ej. cumpleaños). */
  stamps: number | null;
  value: string;
  title: string;
  description: string;
}

// Fuente: .claude/configlanding.md (programa de fidelización digital).
export const TOTAL_STAMPS = 10;

/** Sellos que se muestran llenos en la tarjeta de ejemplo. */
export const EXAMPLE_FILLED = 5;

export const steps: LoyaltyStep[] = [
  { title: 'Tu primer corte activa tu tarjeta', text: 'Sin trámites: empiezas a acumular desde tu primera visita.' },
  { title: 'Acumula sellos en cada visita', text: 'Cada vez que vienes, sumas un sello en tu tarjeta digital.' },
  { title: 'Canjea tus premios', text: 'Usa tus descuentos al llegar a los sellos indicados.' },
];

export const benefits: LoyaltyBenefit[] = [
  { stamps: 5, value: '20%', title: 'de descuento', description: 'Al completar 5 sellos en tu tarjeta.' },
  { stamps: 10, value: '50%', title: 'de descuento', description: 'Al completar los 10 sellos.' },
  { stamps: null, value: 'Gratis', title: 'corte en tu cumpleaños', description: 'Nuestro regalo en tu día especial.' },
];

// ---------------------------------------------------------------------------
// Canje de productos por puntos
// TODO: valores de EJEMPLO. Reemplazar por los puntos reales de cada servicio y producto.
// ---------------------------------------------------------------------------

/** Puntos que gana el cliente por un corte (base para el "equivale a X cortes"). */
export const POINTS_PER_CUT = 10;

export interface EarnItem {
  service: string;
  points: number;
}

export const earn: EarnItem[] = [
  { service: 'Corte', points: 10 },
  { service: 'Barba completa', points: 8 },
  { service: 'Facial premium', points: 20 },
  { service: 'Masaje relajante', points: 5 },
];

export interface RedeemProduct {
  name: string;
  points: number;
}

export const redeemProducts: RedeemProduct[] = [
  { name: 'Polvo texturizador', points: 40 },
  { name: 'Gel rolda', points: 60 },
  { name: 'Cera spider', points: 80 },
  { name: 'Mascarilla black', points: 100 },
  { name: 'Lentes de sol', points: 150 },
  { name: 'Gorra New Era', points: 200 },
];

export const redeemSteps: LoyaltyStep[] = [
  { title: 'Cada servicio suma puntos', text: 'Corte, barba, facial o masaje: todo lo que te haces en la barbería te da puntos.' },
  { title: 'Más servicios, más puntos', text: 'Mientras más nos visitas y más servicios tomas, más rápido llegas a tu producto.' },
  { title: 'Canjea desde la web', text: 'Elige el producto que quieres y págalo con tus puntos, sin salir de casa.' },
];
