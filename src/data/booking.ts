import { owner, team } from '@/data/team';
import { categories } from '@/data/services';
import { promotions } from '@/data/promotions';
import { WHATSAPP_NUMBER } from '@/data/contact';

// ---------------------------------------------------------------------------
// API de disponibilidad (por crear)
//
// Cuando la API exista, pega su URL aquí. El formulario hará:
//
//   GET {AVAILABILITY_API}?barber=<id>&date=YYYY-MM-DD
//
// y espera las citas YA TOMADAS de ese barbero ese día, como rangos de tiempo:
//
//   { "busy": [ { "start": "10:00", "end": "10:30" }, { "start": "14:00", "end": "15:00" } ] }
//
// - <id> es el "id" de cada barbero en la lista `barbers` (ver más abajo).
// - Horas en formato "HH:MM", en el horario de la barbería.
// - También se acepta la forma simple { "busy": ["10:00", "14:30"] }: cada hora
//   se toma como una cita de SLOT_MINUTES.
// - Si la URL está vacía o la API falla, se usa una disponibilidad SIMULADA.
// ---------------------------------------------------------------------------
export const AVAILABILITY_API = ''; // TODO: URL de tu API

// Atención de 09:00 a 21:00.
export const OPEN_HOUR = 9;
export const CLOSE_HOUR = 21;
/** Cada cuántos minutos se ofrece una hora de inicio (30 = 09:00, 09:30, 10:00…). */
export const SLOT_MINUTES = 30;
export const DAYS_AHEAD = 14;

// TODO: duración real de cada servicio, en minutos (valores de EJEMPLO).
export const DEFAULT_MINUTES = 30;
export const SERVICE_MINUTES: Record<string, number> = {
  Corte: 30,
  'Facial premium': 60,
  'Barba simple': 30,
  'Barba completa': 30,
  'Diseño de cejas': 30,
  'Kiss express': 30,
  'Polvo texturizador': 30,
  'Masaje relajante': 30,
  'Lavado capilar': 30,
  Styling: 30,
  'Básic Pro': 60,
  'The Barber Premium': 90,
  'The Barber VIP': 120,
};

/** Minutos que dura un servicio (por defecto, un corte). */
export const serviceMinutes = (name?: string): number => (name && SERVICE_MINUTES[name]) || DEFAULT_MINUTES;

export const formatDuration = (min: number): string => {
  if (min < 60) return `${min} min`;
  const h = Math.floor(min / 60);
  const m = min % 60;
  return m ? `${h} h ${m} min` : `${h} h`;
};

export interface Barber {
  id: string;
  name: string;
  role: string;
}

/** El "id" coincide con el nombre de la foto en src/assets/team/. */
export const barbers: Barber[] = [owner, ...team].map((m) => ({ id: m.photo, name: m.name, role: m.role }));

const pad = (n: number) => String(n).padStart(2, '0');

export const toMinutes = (t: string): number => Number(t.slice(0, 2)) * 60 + Number(t.slice(3));
export const fromMinutes = (m: number): string => `${pad(Math.floor(m / 60))}:${pad(m % 60)}`;

/** Horas de inicio ofrecidas durante el día. */
export const allSlots = (): string[] => {
  const out: string[] = [];
  for (let m = OPEN_HOUR * 60; m < CLOSE_HOUR * 60; m += SLOT_MINUTES) out.push(fromMinutes(m));
  return out;
};

/** Fecha local en formato YYYY-MM-DD. */
export const toISODate = (d: Date): string => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;

export const parseISODate = (iso: string): Date => {
  const [y, m, d] = iso.split('-').map(Number);
  return new Date(y, m - 1, d);
};

export const formatDateEs = (iso: string): string =>
  parseISODate(iso).toLocaleDateString('es-PE', { weekday: 'long', day: 'numeric', month: 'long' });

// --- Disponibilidad ---------------------------------------------------------
/** Cita ya tomada, en minutos desde las 00:00. */
export interface BusyRange {
  start: number;
  end: number;
}

/**
 * ¿Se puede empezar a las `time` un servicio de `duration` minutos?
 * Debe terminar antes del cierre y no cruzarse con citas ya tomadas.
 */
export const isSlotFree = (time: string, duration: number, busy: BusyRange[]): boolean => {
  const start = toMinutes(time);
  const end = start + duration;
  if (end > CLOSE_HOUR * 60) return false;
  return busy.every((b) => end <= b.start || start >= b.end);
};

// --- Disponibilidad simulada -------------------------------------------------
const hash = (s: string): number => {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return (h >>> 0) / 4294967295;
};

/** Genera citas de 30 o 60 min repartidas en el día, estables por barbero y fecha. */
const simulateBusy = (barber: string, date: string): BusyRange[] => {
  const out: BusyRange[] = [];
  let m = OPEN_HOUR * 60;
  while (m < CLOSE_HOUR * 60) {
    if (hash(`${barber}|${date}|${m}`) < 0.3) {
      const dur = hash(`${barber}|${date}|${m}|d`) < 0.4 ? 60 : 30;
      out.push({ start: m, end: m + dur });
      m += dur;
    } else {
      m += SLOT_MINUTES;
    }
  }
  return out;
};

type ApiBusy = string | { start: string; end: string };

/** Citas tomadas de un barbero en una fecha (API real o simulada). */
export async function getBusy(barber: string, date: string): Promise<BusyRange[]> {
  if (AVAILABILITY_API) {
    try {
      const res = await fetch(
        `${AVAILABILITY_API}?barber=${encodeURIComponent(barber)}&date=${encodeURIComponent(date)}`
      );
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data.busy)) {
          return (data.busy as ApiBusy[]).map((b) =>
            typeof b === 'string'
              ? { start: toMinutes(b), end: toMinutes(b) + SLOT_MINUTES }
              : { start: toMinutes(b.start), end: toMinutes(b.end) }
          );
        }
      }
    } catch {
      // Si la API falla, se cae a la simulación.
    }
  }
  await new Promise((r) => setTimeout(r, 350));
  return simulateBusy(barber, date);
}

// --- Servicios para elegir ---------------------------------------------------
export interface ServiceGroup {
  group: string;
  items: string[];
}

export const serviceGroups = (): ServiceGroup[] => [
  { group: 'Promociones', items: promotions.map((p) => p.name) },
  { group: 'Servicios', items: categories.find((c) => c.id === 'servicios')?.items.map((i) => i.name) ?? [] },
];

// --- Mensaje de WhatsApp -----------------------------------------------------
export interface BookingData {
  barber: string;
  date: string;
  time: string;
  /** Minutos que dura el servicio elegido. */
  minutes: number;
  service?: string;
  name: string;
  phone: string;
}

export const buildMessage = (d: BookingData): string =>
  [
    '*Reserva de cita*',
    '',
    `*Barbero:* ${d.barber}`,
    `*Fecha:* ${formatDateEs(d.date)}`,
    `*Hora:* ${d.time}`,
    d.service ? `*Servicio:* ${d.service}` : '',
    `*Nombre:* ${d.name}`,
    `*Teléfono:* ${d.phone}`,
  ]
    .filter((l, i, arr) => l !== '' || (i > 0 && arr[i - 1] !== ''))
    .join('\n');

export const bookingUrl = (text: string): string => `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;

// ---------------------------------------------------------------------------
// API para ENVIAR la reserva (por crear)
//
// El cliente NO ve WhatsApp: al enviar, la página hace
//
//   POST {BOOKING_API}   (Content-Type: application/json)
//
// con este cuerpo:
//
//   {
//     "barber":  { "id": "jhonnatan", "name": "Jhonnatan" },
//     "date":    "2026-11-13",          // YYYY-MM-DD
//     "time":    "17:00",               // hora de inicio
//     "minutes": 30,                    // duración que se reserva
//     "service": "The Barber VIP",      // puede venir vacío
//     "name":    "Nombre del cliente",
//     "phone":   "9XXXXXXXX",
//     "message": "*Reserva de cita* ..." // texto ya armado, listo para reenviar
//   }
//
// Tu API debe guardar la cita y avisar al dueño (WhatsApp Business API, Twilio,
// etc.) al número 902424399. Debe responder 2xx si todo salió bien.
//
// Mientras BOOKING_API esté vacío, se usa el plan B: se abre WhatsApp con el
// mensaje listo hacia el número del dueño (el cliente debe pulsar "Enviar").
// ---------------------------------------------------------------------------
export const BOOKING_API = ''; // TODO: URL de tu API

export interface BookingPayload extends BookingData {
  barberId: string;
}

/** Envía la reserva a la API. Devuelve true si se registró correctamente. */
export async function submitBooking(d: BookingPayload): Promise<boolean> {
  try {
    const res = await fetch(BOOKING_API, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        barber: { id: d.barberId, name: d.barber },
        date: d.date,
        time: d.time,
        minutes: d.minutes,
        service: d.service ?? '',
        name: d.name,
        phone: d.phone,
        message: buildMessage(d),
      }),
    });
    return res.ok;
  } catch {
    return false;
  }
}

// ---------------------------------------------------------------------------
// Aviso automático al dueño por WhatsApp, SIN servidor propio (CallMeBot)
//
// 1. Desde el WhatsApp del dueño (902424399), envía el mensaje
//      I allow callmebot to send me messages
//    al número de CallMeBot que indica https://www.callmebot.com/blog/free-api-whatsapp-messages/
// 2. CallMeBot responde con una "apikey". Pégala aquí abajo.
//
// Con la apikey, al reservar, la página envía el mensaje al WhatsApp del dueño
// y el cliente solo ve la confirmación. Limitaciones: es un servicio gratuito no
// oficial de WhatsApp y su respuesta no se puede leer desde el navegador, así que
// no se puede confirmar que el mensaje llegó.
// ---------------------------------------------------------------------------
export const CALLMEBOT_APIKEY = ''; // TODO: apikey que te da CallMeBot

/** Envía el mensaje al WhatsApp del dueño. true = se despachó (no garantiza entrega). */
export async function sendViaCallMeBot(text: string): Promise<boolean> {
  try {
    const url = `https://api.callmebot.com/whatsapp.php?phone=${WHATSAPP_NUMBER}&text=${encodeURIComponent(
      text
    )}&apikey=${encodeURIComponent(CALLMEBOT_APIKEY)}`;
    await fetch(url, { mode: 'no-cors' });
    return true;
  } catch {
    return false;
  }
}
