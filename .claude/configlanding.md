Actúa como Frontend Engineer Senior. Crea la sección completa del programa de
fidelización en esta landing (Astro) de "Jhonnatan The Barber", barbería en Lima, Perú.
Todo el texto en español (Perú), tono cercano pero premium.

=====================================================================
REGLAS DE ESTILO (OBLIGATORIAS)
=====================================================================
- Reutiliza el sistema de diseño que YA existe en el proyecto: tokens y fuentes de
  src/styles/global.css, el layout, y los patrones de los componentes actuales
  (Hero, Services, Header, etc.). Antes de escribir, revisa esos archivos.
- NO crees colores, fuentes, sombras ni tamaños nuevos. Si necesitas una variante,
  derívala de los tokens existentes.
- Misma estética: sobria, editorial, bordes finos, nada de degradados, glassmorphism,
  brillos ni emojis. El bronce solo para sellos, puntos y premios.
- Iconos SVG outline en línea, consistentes con los que ya usa el proyecto.
- Mobile first, HTML semántico, contraste AA, objetivos táctiles ≥ 44px,
  un solo <h2> por sección.
- Solo componentes .astro. JavaScript mínimo y solo si es imprescindible
  (por ejemplo, el acordeón de preguntas puede usar <details>/<summary> sin JS).

=====================================================================
CONTEXTO DEL NEGOCIO: QUÉ DEBE ENTENDER EL VISITANTE
=====================================================================
El programa "Cliente VIP" tiene DOS beneficios que se acumulan en paralelo:

---------------------------------------------------------------------
PARTE 1 · LA CARTILLA DE SELLOS (beneficio por constancia)
---------------------------------------------------------------------
Reemplaza la tarjeta física de cartón por una tarjeta digital.

Cómo funciona:
1. En su primera visita, el barbero registra al cliente con su nombre y celular.
   Recibe su cartilla digital por WhatsApp con el PRIMER SELLO ya marcado.
   No necesita descargar ninguna app: la abre desde el enlace.
2. Cada corte suma 1 SELLO. Lo marca el barbero desde su panel; al cliente le llega
   un aviso por WhatsApp con su avance (por ejemplo, "Llevas 6 de 10").
3. La cartilla tiene 10 casilleros:
   - Al completar 5 sellos → 20% de descuento en un producto o cualquier servicio.
   - Al completar 10 sellos → 50% de descuento en un producto o cualquier servicio.
4. Los premios se canjean mostrando la cartilla al barbero en la siguiente visita.
   El 20% se puede usar una vez por cartilla.
5. Al canjear el premio de los 10 sellos, la cartilla se cierra y se abre una
   nueva automáticamente: el cliente empieza un nuevo ciclo, y su historial queda
   guardado.
6. Beneficio adicional: el día de su cumpleaños, el cliente recibe un corte gratis
   (válido para precio regular).

Reglas a mostrar en letra pequeña:
- Máximo 1 sello por visita.
- La cartilla es personal e intransferible (está ligada al celular del cliente).
- Vigencia de la cartilla: [VIGENCIA] (placeholder; ver datos).

Ejemplo narrativo para la web:
"Carlos se cortó por primera vez en marzo y recibió su cartilla con 1 sello.
En su quinta visita desbloqueó el 20%, que usó en una pomada. En su décima visita
pagó la mitad de su corte y empezó una cartilla nueva."

---------------------------------------------------------------------
PARTE 2 · PUNTOS JTB (beneficio por consumo)
---------------------------------------------------------------------
Además de los sellos, cada servicio da PUNTOS. Mientras más servicios tome el
cliente (o servicios de mayor valor), más puntos acumula. Los puntos se canjean por
PRODUCTOS de la barbería desde su tarjeta digital en la web.

Diferencia clave que la sección debe dejar clara:
- Los SELLOS premian la FRECUENCIA (1 sello por visita, sin importar el servicio).
- Los PUNTOS premian el CONSUMO (cada servicio suma según su valor).
- Se acumulan a la vez: una visita con "Corte + Barba" suma 1 sello y los puntos
  de ese servicio.

Cómo se ganan (valores de EJEMPLO, configurables en datos):
| Servicio                 | Puntos |
|--------------------------|--------|
| Corte clásico            | 10     |
| Corte + barba            | 15     |
| Perfilado de barba       | 6      |
| Corte niño               | 8      |
| Diseño / tinte           | 20     |

Cómo se canjean:
1. El cliente abre su tarjeta digital (el enlace de WhatsApp) y ve su saldo de puntos.
2. Entra al catálogo de productos y elige uno que alcance con sus puntos.
3. Genera la solicitud de canje y recoge el producto en la barbería; el barbero
   confirma la entrega desde su panel y los puntos se descuentan.

Catálogo de ejemplo (valores de EJEMPLO, configurables):
| Producto                       | Puntos |
|--------------------------------|--------|
| Peine profesional              | 40     |
| Cera / pomada para cabello     | 120    |
| Aceite para barba              | 150    |
| Shampoo para barba             | 180    |
| Kit de cuidado de barba        | 300    |

Ejemplo numérico para la web (debe calcularse con los datos, no escribirse fijo):
"Si vienes cada 15 días por un Corte + barba (15 puntos), en 4 meses sumas
8 visitas = 120 puntos: suficientes para una pomada, y además ya desbloqueaste
el 20% de tu cartilla."

Reglas de puntos a mostrar en letra pequeña (placeholders configurables):
- Los puntos se acreditan al registrar el servicio en la barbería.
- Vigencia de los puntos: [VIGENCIA_PUNTOS].
- Los puntos no son canjeables por dinero ni transferibles.
- Canje sujeto a stock del producto.

Estado de esta función:
- La cartilla de sellos ya está disponible.
- Los puntos y el canje de productos desde la web todavía NO están implementados
  en el sistema. Muestra la Parte 2 con una etiqueta discreta "Próximamente",
  controlada por un flag en los datos (pointsStatus: 'proximamente' | 'activo').
  Si el flag es 'activo', la etiqueta desaparece. Valor inicial: 'proximamente'.

=====================================================================
DATOS: TODO CONFIGURABLE (src/data/loyalty.ts)
=====================================================================
Crea src/data/loyalty.ts, tipado con TypeScript, con:
- stampCard: totalStamps (10), milestones [{ stamps: 5, discount: 20 },
  { stamps: 10, discount: 50 }], birthdayBenefit, validity (placeholder), rules[].
- points: status ('proximamente' | 'activo'), services [{ name, points }],
  catalog [{ name, description, points, image? }], rules[], validity (placeholder).
- faq: [{ question, answer }].
- Un helper que calcule el ejemplo numérico a partir de los datos
  (frecuencia, servicio de ejemplo y meses) para que nunca quede desactualizado.
Marca con // TODO y comentarios "Valor de ejemplo" todo lo que sea inventado
(puntos, productos, vigencias). No inventes precios en soles.
Si ya existe información de fidelización en src/data/site.ts, muévela aquí y
actualiza las referencias.

=====================================================================
ESTRUCTURA DE COMPONENTES
=====================================================================
src/components/loyalty/
├── LoyaltySection.astro      contenedor: título, intro y orden de las partes (id="fidelizacion")
├── StampCardExplainer.astro  Parte 1: pasos 1-2-3 + cartilla visual + premios
├── StampCardVisual.astro     cartilla de 10 casilleros (algunos llenos en bronce con
│                             monograma "JTB"; los casilleros 5 y 10 marcados como premio)
├── PointsExplainer.astro     Parte 2: cómo se ganan + tabla de servicios
├── RewardsCatalog.astro      grilla de productos canjeables con sus puntos
├── LoyaltyExample.astro      el ejemplo narrativo y el numérico calculado
├── StampsVsPoints.astro      comparación breve: Sellos (frecuencia) vs Puntos (consumo)
└── LoyaltyFaq.astro          preguntas frecuentes con <details>/<summary>

Reemplaza la sección de fidelización actual en src/pages/index.astro por
<LoyaltySection />, manteniendo el ancla #fidelizacion que usa el menú.

Orden visual dentro de la sección:
1. Título "Cliente VIP" + bajada: "Tu constancia también se nota".
2. StampCardExplainer (con StampCardVisual).
3. StampsVsPoints (puente entre las dos partes).
4. PointsExplainer (+ etiqueta "Próximamente" si aplica).
5. RewardsCatalog.
6. LoyaltyExample.
7. LoyaltyFaq.
8. Llamada a la acción final: "Pide tu cartilla en tu próxima visita" + botón
   "Reservar por WhatsApp" (reutiliza el helper de WhatsApp existente).

Preguntas frecuentes mínimas:
- ¿Necesito descargar una app? (No, la tarjeta se abre desde el enlace de WhatsApp.)
- ¿Qué pasa si pierdo el enlace? (El barbero puede reenviarlo.)
- ¿Los sellos y los puntos son lo mismo? (No; explicar la diferencia.)
- ¿Puedo juntar el 20% y el 50%? (El 20% se usa a los 5 sellos; el 50% a los 10.)
- ¿Los puntos vencen? (Usar el placeholder de vigencia.)
- ¿Cómo canjeo un producto con mis puntos?

=====================================================================
RESTRICCIONES
=====================================================================
- No inventes testimonios ni reseñas.
- No uses imágenes de stock: en el catálogo, si no hay imagen del producto,
  usa un ícono outline o un recuadro sobrio con el nombre.
- No cambies otras secciones de la landing salvo para reemplazar la de fidelización.
- La landing es estática: no conectes con ningún API.

=====================================================================
VERIFICACIÓN
=====================================================================
1. npm run build sin errores ni advertencias.
2. npx astro check sin errores de TypeScript.
3. Revisa la sección en 390px y 1440px de ancho.

Al terminar, entrégame:
- la lista de archivos creados y modificados;
- todos los valores de ejemplo y placeholders que debo confirmar con el negocio
  (puntos por servicio, productos, vigencias);
- cómo cambiar pointsStatus a 'activo' cuando el canje esté disponible.