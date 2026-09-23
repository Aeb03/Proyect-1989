# Liga de los Mundos v0.5.17 — Prueba táctica Coloso + Onod

## Cambio principal
Se completa la integración de imágenes aprobadas de **selección + avatar** para los seis campeones actuales.

## Campeones
- Arfeli
- Coloso
- Piplus
- Onod
- Korgan
- Houngan

Cada campeón utiliza:
`assets/champions/<campeon>/<campeon>-select.png`
`assets/champions/<campeon>/<campeon>-avatar.png`

Arfeli conserva además sus cuatro vistas tácticas ya validadas.

## Implementación
- `champion-assets.js`: registro visual ampliado a los 6 campeones.
- Selección, ficha, equipo, HUD e iniciativa reutilizan el avatar correspondiente.
- No se modifican estadísticas, habilidades, IA, movimiento ni reglas.
- `champion-assets.css` generaliza la presentación de selección a los seis campeones.
- `avatar-layout.css` conserva el formato de retrato validado.
- Inicio y referencias públicas actualizadas a v0.5.17.

## PWA
- Caché actualizado a `liga-mundos-0516`.
- Los seis pares selección/avatar quedan incluidos en el precache.
- Se mantiene el mecanismo de actualización manual segura.

## Prueba recomendada
1. Confirmar que el inicio muestra v0.5.17.
2. Abrir Campeones y revisar selección + avatar de los 6.
3. Iniciar partidas con Onod, Korgan y Houngan.
4. Revisar sus avatares en equipo, HUD e iniciativa.
5. Confirmar que Arfeli, Coloso y Piplus siguen iguales.
6. Confirmar que movimiento, habilidades, turnos, IA y cámara no cambiaron.
7. Verificar actualización de la PWA sin pantalla blanca.

## Estado
LISTA PARA PROBAR. No considerar VALIDADA hasta la prueba de Adrián.


## v0.5.17 — prueba táctica
- Se integran las cuatro vistas oficiales de Coloso y Onod para probar orientación, escala y presentación en arena.
- Arfeli conserva sus cuatro vistas ya validadas.
- Sin cambios de mecánicas.
