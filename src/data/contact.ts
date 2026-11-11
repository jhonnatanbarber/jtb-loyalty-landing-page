// TODO: número de WhatsApp en formato internacional, sin "+" ni espacios (ej. 519XXXXXXXX)
export const WHATSAPP_NUMBER = '519XXXXXXXX';

export const whatsappUrl = (message = 'Hola, quiero reservar un corte'): string =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
