# Liga de los Mundos v0.5.20 — Ajuste de escala de Coloso down-left

## Cambio principal
Corrección visual mínima sobre v0.5.19 para igualar el tamaño aparente de la vista lógica `down-left` de Coloso con sus otras tres vistas.

## Ajuste aplicado
- Solo la vista lógica `down-left` de Coloso recibe `transform: scale(1.12)`.
- El punto de escala queda anclado en `center bottom` para mantener la peana apoyada en la misma posición.
- No se modifica ninguna imagen.
- No se cambia el mapeo de orientaciones ya validado.

## Se conserva
- Arfeli corregida.
- Onod con sus orientaciones correctas.
- Las otras tres vistas de Coloso sin cambios.
- Movimiento, habilidades, IA, turnos, cámara y reglas sin cambios.

## PWA / versión
- Inicio actualizado a v0.5.20.
- `champion-assets.css` actualizado a `v=0520`.
- `brand.js` actualizado a `v=0520`.
- Caché actualizado a `liga-mundos-0520`.

## Prueba recomendada
1. Confirmar que el inicio muestra v0.5.20.
2. Mostrar Coloso en `down-left`.
3. Comparar su tamaño visual con `down-right`, `up-left` y `up-right`.
4. Confirmar que la peana sigue apoyada correctamente en la casilla.
5. Confirmar que Arfeli y Onod siguen iguales.

## Estado
LISTA PARA PROBAR. No considerar VALIDADA hasta la prueba de Adrián.
