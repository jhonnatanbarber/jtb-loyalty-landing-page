export interface TeamMember {
  name: string;
  role: string;
  /**
   * Nombre del archivo de la foto (sin extensión) dentro de src/assets/team/.
   * Ej. "barbero-1" → src/assets/team/barbero-1.jpg
   */
  photo: string;
}

// TODO: agregar las fotos en src/assets/team/ (jhonnatan.jpg, barbero-1.jpg, barbero-2.jpg, barbero-3.jpg).
export const owner: TeamMember = {
  name: 'Jhonnatan',
  role: 'Dueño',
  photo: 'jhonnatan',
};

// TODO: reemplazar por los nombres reales de los barberos.
export const team: TeamMember[] = [
  { name: 'Nombre del barbero', role: 'Barbero', photo: 'barbero-1' },
  { name: 'Nombre del barbero', role: 'Barbero', photo: 'barbero-2' },
  { name: 'Nombre del barbero', role: 'Barbero', photo: 'barbero-3' },
];
