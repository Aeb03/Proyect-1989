# Liga de los Mundos — v0.5.12

Corrección de la primera prueba de caminata de Arfeli.

## Qué cambia
- Los 8 fotogramas de caminata fueron normalizados para mantener la misma altura visual y el mismo punto de apoyo de los pies.
- La animación ya no se reinicia cada vez que el motor redibuja una casilla.
- Al detectar un movimiento de Arfeli, se reproduce como mínimo un ciclo completo de 8 fotogramas para que la caminata sea visible incluso en un desplazamiento de una sola casilla.
- Al finalizar vuelve a `arfeli-combat.png`.
- No se modifican reglas, PA, PM, alcance, IA, cámara ni rotación.

## Archivos
Incluye `index.html` y `README.md`, más el controlador de caminata, los 8 frames normalizados y los archivos de versión/cache necesarios.

## Base
Motor de combate: v0.5.3 sin cambios.
Interfaz/colección: v0.5.10.
Prueba de animación corregida: v0.5.12.
