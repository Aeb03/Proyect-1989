# Liga de los Mundos v0.5.22 — Arena Central

## Cambio principal
Primera integración real de la nueva Arena Central como escenario visual del tablero táctico.

## Asset
Se incorpora:

`assets/arenas/central/arena-central-base.png`

Características verificadas:
- PNG real.
- RGBA con transparencia.
- 1774 × 887 px.
- proporción 2:1.
- plataforma completa con marco, suelo, símbolo central y luces.

## Integración
Se agrega `arena-central.css` como una capa exclusivamente visual.

La Arena reemplaza la antigua base verde generada por CSS, pero se conservan por separado:
- las 144 casillas lógicas;
- coordenadas x/y;
- movimiento;
- alcance;
- selección;
- línea de visión;
- obstáculos;
- Pilares/Brotes/trampas;
- miniaturas;
- rotación de cámara.

La capa SVG sigue existiendo encima del arte para clics y resaltados tácticos.

## Ajuste de encaje
El rombo lógico se coloca sobre la superficie útil dibujada de la Arena.
La cuadrícula normal queda casi transparente y los estados tácticos usan transparencias para no ocultar el nuevo suelo.

## Sin cambios
- Campeones y miniaturas.
- Habilidades y estadísticas.
- IA.
- turnos.
- reglas.
- HUD.
- pulsación larga de habilidades de v0.5.21.

## PWA / versión
- Inicio actualizado a v0.5.22.
- `arena-central.css` añadido a la carga.
- Asset de Arena añadido al precache.
- Caché actualizado a `liga-mundos-0522`.

## Prueba recomendada
1. Confirmar que inicio muestra v0.5.22.
2. Entrar a despliegue y comprobar el encaje del 12×12 sobre el suelo.
3. Confirmar que las miniaturas pisan el centro de las casillas.
4. Probar movimiento y resaltado de alcance.
5. Probar las cuatro rotaciones de cámara.
6. Confirmar que rocas, Pilares, Brotes y trampas siguen anclados a casillas.
7. Comprobar que el HUD y la pulsación larga de habilidades siguen iguales.

## Estado
LISTA PARA PROBAR.
El encaje visual podrá afinarse después de verlo en el teléfono real.
