Configura y construye la landing page de "Jhonnatan The Barber" en este proyecto Astro
(ya creado con la plantilla minimal). Actúa como Frontend Engineer Senior.

## Contexto
- Negocio: barbería premium en Lima, Perú, desde 2015.
- Objetivo de la landing: que nuevos clientes conozcan la barbería y reserven por
  WhatsApp, y que los clientes actuales conozcan el programa de fidelización digital
  (tarjeta de 10 sellos: 5 sellos = 20% de descuento, 10 sellos = 50%, corte gratis
  en su cumpleaños).
- Todo el texto de la página en español (Perú).
- Es una página estática: no consume ningún API.

## Stack y configuración
1. Astro con TypeScript estricto.
2. Tailwind CSS v4 con la integración oficial (npx astro add tailwind).
3. @astrojs/sitemap (npx astro add sitemap).
4. En astro.config.mjs define site: 'https://jhonnatanthebarber.pe' (lo cambiaré después).
5. Alias "@/" apuntando a "src/" en tsconfig.json.
6. Sin frameworks de UI (React, Vue): solo componentes .astro. JavaScript mínimo,
   solo para el menú móvil.

## Diseño
- Fuente: Poppins de Google Fonts (pesos 400, 500, 600), cargada en el layout con
  preconnect.
- Paleta en src/styles/global.css con @theme de Tailwind:
  --color-background: #F6F5F2   (fondo general)
  --color-surface:    #FFFFFF
  --color-dark:       #141414   (secciones oscuras, header y footer)
  --color-ink:        #1A1A1A   (texto principal)
  --color-muted:      #6B6B6B   (texto secundario)
  --color-line:       #E6E3DD   (bordes)
  --color-brass:      #A8834A   (acento: solo detalles, iconos y CTA secundario)
  --color-brass-soft: #F3ECE0
- Estilo: clásico, premium y sobrio. Bordes finos en lugar de sombras pesadas,
  radios de 8px, mucho espacio en blanco, grilla de 8px, ancho máximo de 1200px.
- Prohibido: degradados, glassmorphism, efectos de brillo, emojis, ilustraciones
  genéricas, blobs decorativos y animaciones exageradas. Solo transiciones suaves
  en hover. Debe verse como el sitio de una marca real, no como una plantilla de IA.
- Iconos: SVG en línea, estilo outline fino, consistentes.
- Totalmente responsive (mobile first), con objetivos táctiles de al menos 44px.
- Accesibilidad: HTML semántico, alt en todas las imágenes, contraste AA, foco visible.

## Estructura de archivos
src/
├── assets/
│   ├── logo-jhonnatan.png        (lo copiaré yo; usa este nombre)
│   └── gallery/                  (deja la carpeta lista para fotos reales)
├── components/
│   ├── Header.astro
│   ├── Hero.astro
│   ├── Services.astro
│   ├── LoyaltyProgram.astro
│   ├── Gallery.astro
│   ├── Location.astro
│   ├── WhatsAppButton.astro
│   └── Footer.astro
├── data/
│   └── site.ts
├── layouts/
│   └── BaseLayout.astro
├── pages/
│   └── index.astro
└── styles/
    └── global.css
public/
├── favicon.png
├── og-image.jpg                  (placeholder; la reemplazaré)
└── robots.txt                    (permitir todo y apuntar al sitemap)

## Datos centralizados (src/data/site.ts)
Todos los textos variables deben salir de este archivo, tipados con TypeScript:
- name, tagline ("Tu estilo, nuestra pasión"), since (2015)
- whatsapp: número en formato internacional y mensaje predefinido
  ("Hola, quiero reservar un corte")
- address, district, city, mapsUrl, coordinates (lat, lng)
- schedule: horarios por día
- services: lista con name, description, price (en soles, S/)
- social: instagram, facebook, tiktok
- loyalty: los 3 beneficios del programa
Usa valores marcados claramente como placeholders, por ejemplo "[DIRECCIÓN]",
"[TELÉFONO]" o precio 0 con un comentario // TODO. NO inventes direcciones,
teléfonos, precios ni datos reales.

## Secciones (en este orden en index.astro)
1. Header: logo a la izquierda; menú (Servicios, Fidelización, Galería, Ubicación);
   botón "Reservar" que abre WhatsApp. En móvil, menú hamburguesa accesible.
   Fondo oscuro (#141414) para que luzca el logo blanco y dorado.
2. Hero: título principal, frase de la marca, botón principal "Reservar por WhatsApp"
   y botón secundario "Ver servicios". Imagen de fondo opcional preparada para una
   foto real del local (con overlay oscuro sólido, sin degradados de colores).
3. Services: grilla de tarjetas con servicio, descripción breve y precio.
4. LoyaltyProgram: explica en 3 pasos cómo funciona la tarjeta digital
   (1. "Tu primer corte activa tu tarjeta", 2. "Acumula sellos en cada visita",
   3. "Canjea tus premios"). Muestra una tarjeta visual de 10 sellos (algunos llenos
   en bronce con monograma "JTB") y los beneficios: 20% a los 5 sellos, 50% a los 10
   y corte gratis en el cumpleaños.
5. Gallery: grilla responsive preparada para fotos reales de cortes, usando el
   componente <Image /> de Astro para optimizarlas. Mientras no haya fotos, muestra
   un estado vacío elegante, sin imágenes de stock.
6. Location: dirección, horarios en tabla, botón "Cómo llegar" (Google Maps) y un
   iframe de Google Maps con loading="lazy".
7. Footer: logo, redes sociales, horario resumido, © con el año actual y un enlace
   discreto "Acceso barberos" que apunte a https://app.jhonnatanthebarber.pe
   (configurable en site.ts).
8. WhatsAppButton: botón flotante fijo abajo a la derecha, con aria-label, que no
   tape contenido en móvil.

## SEO (en BaseLayout.astro)
- <title> y meta description en español, con props para sobrescribirlos.
- Open Graph y Twitter Card (og:title, og:description, og:image con /og-image.jpg,
  og:locale es_PE).
- <link rel="canonical"> y lang="es".
- Datos estructurados JSON-LD de tipo "BarberShop" (schema.org) generados desde
  site.ts: nombre, dirección, teléfono, horarios (openingHoursSpecification),
  geo, url, logo y sameAs con las redes sociales.
- Un solo <h1> en la página (en el Hero).

## Reglas
- No agregues testimonios ni reseñas inventadas. Si creas una sección de reseñas,
  deja solo un enlace al perfil de Google Maps.
- No uses imágenes externas ni de stock.
- Componentes pequeños y reutilizables; nada de estilos inline repetidos.
- El enlace de WhatsApp se arma con un helper en site.ts
  (https://wa.me/<numero>?text=<mensaje codificado>).

## Verificación
1. Ejecuta npm run build y corrige hasta que compile sin errores ni advertencias.
2. Ejecuta npm run dev y confirma que la página carga en http://localhost:4321.
3. Revisa que no haya errores de TypeScript (npx astro check).

Al terminar, dame:
- la lista de archivos creados;
- la lista de todos los placeholders que debo completar en site.ts;
- qué imágenes debo agregar y con qué medidas (logo, favicon, og-image, galería, hero).