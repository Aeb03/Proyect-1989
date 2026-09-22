# Liga de los Mundos v0.5.15 — Organización de assets de campeones

## Cambio principal
Se inicia la estructura definitiva de recursos gráficos por campeón:

`assets/champions/<campeon>/`

Arfeli conserva su avatar, selección y cuatro vistas tácticas. Coloso y Piplus incorporan sus imágenes aprobadas de selección y avatar.

## Estructura
- `assets/champions/arfeli/`: avatar, selección y 4 vistas tácticas.
- `assets/champions/coloso/`: avatar y selección.
- `assets/champions/piplus/`: avatar y selección.

## Implementación
- `champion-assets.js` pasa a usar un registro común de assets para Arfeli, Coloso y Piplus.
- Selección, ficha, equipo, HUD e iniciativa reutilizan el avatar aprobado de cada campeón.
- El hook de cuatro vistas tácticas continúa siendo exclusivo de Arfeli; no se modifican mecánicas.
- `avatar-layout.css` generaliza el tratamiento visual del retrato sin tocar el motor.
- `brand.js` corrige el número visible de inicio a v0.5.15.

## PWA
- Caché actualizado a `liga-mundos-0515`.
- Las rutas precargadas apuntan a la nueva estructura de carpetas.
- Se mantiene la actualización manual segura de la PWA.

## Migración
Ejecutar `migrate-assets.sh` una vez después de descomprimir este paquete en la raíz del repositorio local. El script mueve los seis assets existentes de Arfeli desde la raíz a `assets/champions/arfeli/`.

## Prueba recomendada
1. Confirmar inicio v0.5.15.
2. Revisar selección y avatar de Arfeli, Coloso y Piplus.
3. Revisar ficha, equipo, HUD e iniciativa de los tres.
4. Confirmar las cuatro vistas tácticas de Arfeli.
5. Confirmar que movimiento, habilidades, turnos, IA y cámara siguen iguales.
6. Verificar actualización de la PWA sin pantalla blanca.

## Estado
LISTA PARA PROBAR. No considerar validada hasta la prueba de Adrián.
