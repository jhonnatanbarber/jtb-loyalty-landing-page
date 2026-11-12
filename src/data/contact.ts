// Número de WhatsApp en formato internacional, sin "+" ni espacios (51 = Perú).
export const WHATSAPP_NUMBER = '51902424399'; // TODO: provisional (número de prueba); cambiar por el de la barbería

export const whatsappUrl = (message = 'Hola, quiero reservar un corte'): string =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
