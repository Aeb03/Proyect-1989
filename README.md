# Liga de los Mundos v0.5.23 — Corrección de carga de Arena Central

## Diagnóstico
En v0.5.22 se cargó correctamente la nueva hoja de estilos: por eso la cuadrícula lógica apareció reducida y reposicionada.

Sin embargo, el asset visual de la Arena Central no apareció en pantalla.

El archivo sí estaba presente en el repositorio, por lo que el problema se aisló a la forma de montaje visual mediante `background-image`.

## Corrección
La Arena Central deja de depender de `background-image`.

Se agrega:
- `arena-central.js`

Esta capa inserta automáticamente un elemento `<img>` real dentro de cada tablero isométrico:
- al entrar al despliegue;
- al entrar al combate;
- después de cada re-render;
- después de rotar la cámara.

El archivo visual sigue siendo:

`assets/arenas/central/arena-central-base.png`

## Arquitectura
Orden visual:
1. Arena Central (`<img>`)
2. SVG lógico 12×12
3. obstáculos / elementos dinámicos
4. miniaturas

La lógica táctica no cambia.

## Se conserva
- 12×12 lógico.
- movimiento.
- alcance.
- línea de visión.
- obstáculos.
- Pilares/Brotes/trampas.
- miniaturas.
- cámara y cuatro rotaciones.
- HUD.
- pulsación larga de habilidades.

## PWA / versión
- Inicio actualizado a v0.5.23.
- `arena-central.css` actualizado a `v=0523`.
- `arena-central.js` añadido con `v=0523`.
- Caché actualizado a `liga-mundos-0523`.

## Prueba recomendada
1. Confirmar v0.5.23.
2. Entrar a combate.
3. Confirmar que aparece la plataforma completa debajo de la cuadrícula.
4. Verificar el encaje de las casillas sobre el suelo.
5. Probar las cuatro rotaciones.
6. Confirmar que miniaturas y obstáculos siguen centrados.

## Estado
LISTA PARA PROBAR.
