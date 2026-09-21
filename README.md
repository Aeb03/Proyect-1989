# Liga de los Mundos v0.5.9 — pulido visual de Arfeli

Actualización visual sobre la v0.5.8.

## Cambios
- Nuevo `arfeli-select.png`: retrato vertical exclusivo para la tarjeta de selección.
- `arfeli-avatar.png` queda reservado para HUD e interfaces pequeñas.
- `arfeli-combat.png` sigue siendo el recurso del tablero.
- Arfeli en tablero se reduce aproximadamente un 25% sin tocar el anclaje v0.5.7.
- La señal azul/roja bajo Arfeli se vuelve más pequeña y sutil.
- Se completa el avatar en:
  - panel TU EQUIPO / RIVALES;
  - panel inferior del combatiente;
  - orden de turno;
  - campeón activo de la ronda;
  - detalle de selección.
- El retrato de selección pasa a ocupar la mayor parte de su tarjeta.

## Sistema visual de campeón
1. Retrato de selección: grande y protagonista.
2. Avatar UI: circular y compacto.
3. Arte de combate: cuerpo completo integrado al tablero.

## No se modifica
- `app.js` v0.5.3.
- `styles.css`.
- `entity-anchor.css` v0.5.7.
- reglas, habilidades, IA, balance, cámara o rotación.
- animaciones.

## Archivos
`index.html`, `brand.js`, `champion-assets.js`, `champion-assets.css`,
`arfeli-select.png`, `arfeli-avatar.png`, `arfeli-combat.png`, `sw.js`, `README.md`.

## Prueba
1. Selección: revisar que Arfeli se vea como tarjeta de campeón.
2. Combate: revisar nueva escala y señal táctica.
3. Girar el tablero en las 4 orientaciones.
4. Confirmar que el avatar aparezca en todos los módulos de interfaz.
