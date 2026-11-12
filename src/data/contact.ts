export const WHATSAPP_NUMBER = '51927836487';
export const whatsappUrl = (message = 'Hola, quiero reservar un corte'): string =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
