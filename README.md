# Liga de los Mundos v0.5.8 — Arfeli, primera campeona viva

Prueba visual sobre la v0.5.7 validada.

## Objetivo
Integrar por primera vez un campeón con arte propio sin tocar el motor estable.

## Arfeli
- `arfeli-combat.png`: personaje completo para el tablero.
- `arfeli-avatar.png`: avatar para selección, colección y HUD de combate.
- Estilo acordado: campeón vivo, fantasía estilizada tipo Dofus/Wakfu, sin peana tradicional.
- En tablero conserva la sombra del arte y usa una señal de equipo más fina y sutil.
- Sigue usando exactamente el anclaje de entidades validado en v0.5.7.

## Implementación
La integración se hace mediante `champion-assets.js` y `champion-assets.css`.
No se modifica `app.js` ni `styles.css`.

El sistema detecta a Arfeli y reemplaza sólo su representación visual:
- selección de campeón;
- colección/detalle;
- avatar del HUD;
- paneles de equipo/rival;
- orden de turnos;
- representación del personaje en la arena.

Los demás campeones continúan con sus iconos actuales durante esta prueba.

## No se modifica
- Reglas, habilidades, balance o IA.
- Cámara, rotación y paneo.
- Coordenadas o profundidad del tablero.
- Claves de almacenamiento.
- Animaciones: siguen fuera de esta prueba.

## Archivos de esta actualización
`index.html`, `brand.js`, `champion-assets.js`, `champion-assets.css`, `arfeli-avatar.png`, `arfeli-combat.png`, `sw.js`, `README.md`.

No reemplazar `app.js`, `styles.css`, `entity-anchor.css`, `pwa.js`, `pwa.css`, `manifest.webmanifest` ni los iconos de la app.

## Prueba recomendada
1. Revisar Arfeli en selección.
2. Entrar a combate.
3. Ver tamaño y punto de apoyo sobre la casilla.
4. Girar el tablero 0°, 90°, 180° y 270°.
5. Revisar avatar en HUD, equipo/rival y orden de turno.
