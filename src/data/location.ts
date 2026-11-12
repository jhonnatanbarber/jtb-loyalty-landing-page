export const location = {
  name: 'Sede principal',
  address: 'Los Pinos 1449',
  district: 'Comas',
  postalCode: '15316',
  city: 'Lima',
  country: 'Perú',
  coordinates: { lat: -11.9140705, lng: -77.0560537 },
  /** Enlace de "Cómo llegar" (ficha de Google Maps). */
  mapsUrl:
    'https://www.google.com/maps/place/Jhonnatan+the+barber/@-11.9140705,-77.0560537,17z/data=!3m1!4b1!4m6!3m5!1s0x9105d1f679dea1fd:0xbce2cae7cb65bd2c!8m2!3d-11.9140705!4d-77.0560537!16s%2Fg%2F11zxy9qnkz',
};

/** URL del mapa incrustado (no requiere API key). */
export const mapEmbedUrl = `https://www.google.com/maps?q=${location.coordinates.lat},${location.coordinates.lng}&z=17&output=embed`;
