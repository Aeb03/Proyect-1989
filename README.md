# Liga de los Mundos v0.5.19 — Corrección final de orientación de Coloso

## Cambio principal
Corrección mínima sobre v0.5.18 para invertir izquierda/derecha en las cuatro vistas tácticas de Coloso.

## Corrección de Coloso
Se conserva el mismo arte y solo cambia la asignación lógica:

- `down-right` usa `coloso-combat-up-left.png`
- `down-left` usa `coloso-combat-up-right.png`
- `up-right` usa `coloso-combat-down-right.png`
- `up-left` usa `coloso-combat-down-left.png`

## Se conserva
- Arfeli con el tratamiento visual específico corregido en v0.5.18.
- Onod con su mapeo corregido en v0.5.18.
- Selección, avatares, HUD e iniciativa.
- Movimiento, habilidades, IA, turnos, cámara y reglas sin cambios.
- Ninguna imagen fue regenerada ni editada.

## PWA / versión
- Inicio actualizado a v0.5.19.
- `champion-assets.js` actualizado a `v=0519`.
- `brand.js` actualizado a `v=0519`.
- Caché actualizado a `liga-mundos-0519`.

## Prueba recomendada
1. Confirmar que el inicio muestra v0.5.19.
2. Probar Coloso en las cuatro orientaciones.
3. Confirmar que `down-right` y `down-left` ya no están cruzadas.
4. Confirmar que `up-right` y `up-left` ya no están cruzadas.
5. Verificar que Arfeli y Onod siguen correctos.

## Estado
LISTA PARA PROBAR. No considerar VALIDADA hasta la prueba de Adrián.
