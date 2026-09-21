# Liga de los Mundos v0.5.7 — anclaje de entidades

Actualización visual sobre la v0.5.6 validada.

## Cambios
- Punto de anclaje único para combatientes y objetos isométricos.
- La referencia sigue siendo `isoCenter(x,y)`.
- Peana, personaje, vida, escudo y estados quedan ligados al mismo contenedor.
- Brotes, Pilares y Muñeco usan el mismo criterio.
- Se conserva la profundidad del motor en las cuatro rotaciones.
- Obstáculos y trampas conservan su elevación visual.
- Versión pública v0.5.7.

## No se modifica
- Motor `app.js` v0.5.3.
- `styles.css`.
- Reglas, IA, balance, cámara, paneo ni HUD.
- El caso de Onod bajo el HUD se evalúa después de esta prueba.
- Feedback de combate queda para después.
- Las claves internas `arena-tactica-*` se conservan.

## Archivos
`index.html`, `brand.js`, `brand.css`, `entity-anchor.css`, `pwa.js`, `pwa.css`, `manifest.webmanifest`, `sw.js`, `README.md`.

No reemplazar `app.js`, `styles.css`, `icon-192.png` ni `icon-512.png`.

## Prueba
Comparar el mismo combatiente en 0°, 90°, 180° y 270° y verificar que la peana permanezca centrada en su casilla.
