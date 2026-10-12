# SAO — Soluciones y Automatizaciones Operativas

Landing comercial de una sola página: automatizaciones, aplicaciones a medida y gestión operativa/WMS.

## Archivos

- `index.html`: contenido, secciones, tarjetas y preguntas frecuentes.
- `styles.css`: identidad, fondo animado, diseño responsive y movimiento reducido.
- `script.js`: ejemplos, navegación, formulario hacia WhatsApp y animaciones.
- `assets/brand/`: marca original, conservada sin modificar.
- `netlify.toml`: publicación estática desde la raíz, sin compilación.

## Desarrollo local en Windows

Abre la carpeta con VS Code y ejecuta en PowerShell:

```powershell
python -m http.server 5500
```

Visita http://localhost:5500. También puedes abrir index.html directamente; copiar texto requiere permisos del navegador.

## Personalización

Edita las fichas y ejemplos en index.html. Cambia colores en las variables al inicio de styles.css. El contacto usa WHATSAPP_NUMBER en script.js y el número existente de SAO: 573116760185.

El formulario prepara el mensaje y abre WhatsApp. No lo envía automáticamente ni almacena información. Los ejemplos están identificados como conceptuales y WMS como piloto.

## GitHub y Netlify

Repositorio oficial: https://github.com/Toronto2323/sao-soluciones-automatizacion-operativa
Sitio: https://sao-soluciones-automatizadas.netlify.app/

Con Netlify conectado a main, cada actualización de esa rama debe activar un despliegue. Si la publicación automática está desactivada, usa Deploys > Trigger deploy en Netlify. Configuración: directorio de publicación raíz (`.`), comando de build vacío.

## Instalar la copia descargable

Extrae la carpeta en C:\Proyectos\sao-soluciones-automatizacion-operativa. Si ya tienes una copia con Git, es preferible ejecutar git pull --ff-only desde esa copia, después de guardar los cambios locales. El ZIP no incluye .git.

## Volver a la versión anterior

Antes de integrar este catálogo, main apuntaba a 3993844a6c9790a17b36fcf0b9e7fdaca2666e23. El historial conserva todos los archivos anteriores. Para revertir la actualización publicada, crea un commit de reversión sobre el commit del catálogo; no reescribas main.
