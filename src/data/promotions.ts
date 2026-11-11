export interface Promotion {
  name: string;
  /** Precio en soles (S/). */
  price: number;
  /** Lo que incluye el paquete. */
  includes: string[];
  /** Resalta visualmente el paquete. */
  featured?: boolean;
}

// Fuente: carta física de promociones.
export const promotions: Promotion[] = [
  {
    name: 'Básic Pro',
    price: 25,
    includes: ['Corte', 'Lavado'],
  },
  {
    name: 'The Barber Premium',
    price: 45,
    includes: [
      'Corte',
      'Diseño de cejas',
      'Lavado',
      'Bebida (gaseosa o agua)',
      'Kiss express ó polvo texturizador',
      'Styling (peinado con producto)',
      'Masaje relajante',
    ],
  },
  {
    name: 'The Barber VIP',
    price: 80,
    featured: true,
    includes: [
      'Todo lo Premium',
      'Tratamiento con productos premium',
      'Uso de vaporizador facial',
      'Limpieza profunda (exfoliante, mascarilla y tónico para el cuidado de la piel)',
    ],
  },
];
