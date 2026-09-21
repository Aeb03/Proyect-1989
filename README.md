# Liga de los Mundos v0.5.10 — Campeones escalable

Actualización visual sobre la v0.5.9.

## Cambios
- La pantalla **Campeones** ahora usa el mismo retrato grande de selección para Arfeli.
- El avatar circular queda reservado para HUD, turno, ficha compacta y otras interfaces pequeñas.
- La grilla izquierda de **Campeones** pasa a ser desplazable verticalmente con el dedo.
- La lista ya no depende de que todos los campeones entren en una sola pantalla.
- Se mantienen 3 columnas en horizontal.
- Se agrega scrollbar fina como referencia visual de que hay más contenido.
- El detalle de campeón y los botones inferiores permanecen fijos mientras se desplaza solamente el plantel.

## Sistema visual oficial
1. `*-select.png`: Selección de partida + pantalla Campeones.
2. `*-avatar.png`: HUD e interfaces compactas.
3. `*-combat.png`: campeón dentro de la arena.

## Se conserva
- Escala de Arfeli en combate de v0.5.9.
- Anclaje de entidades v0.5.7.
- Avatar completo en los HUD.
- Motor `app.js` v0.5.3.
- Reglas, balance, IA, cámara y rotación.

## Archivos
`index.html`, `brand.js`, `champion-assets.js`, `champion-assets.css`,
`arfeli-select.png`, `arfeli-avatar.png`, `arfeli-combat.png`, `sw.js`, `README.md`.

## Prueba
1. Abrir **Campeones** y comprobar que Arfeli muestra el portrait grande.
2. Deslizar verticalmente dentro del plantel.
3. Confirmar que la ficha derecha y los botones inferiores no se mueven.
4. Entrar a combate para confirmar que v0.5.9 se mantiene intacta.
