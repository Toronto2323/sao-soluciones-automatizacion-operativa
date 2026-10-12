# SAO — Soluciones y Automatizaciones Operativas

Landing comercial estática de SAO.

## Oferta

- **WMS:** inventario, ubicaciones y movimientos.
- **Aplicaciones a medida:** Android, iOS y web.
- **Automatizaciones:** procesos conectados y tareas repetitivas eliminadas.

## Arquitectura

La web es intencionalmente una única landing, sin autenticación, Firebase, diagnóstico ni catálogo dinámico.

```text
index.html
styles.css
script.js
assets/brand/
```

## Desarrollo local

```powershell
python -m http.server 5500
```

Abre `http://127.0.0.1:5500/`.
