# Liga de los Mundos v0.5.28 — Ajuste HUD Ronda + limpieza Arena Central

## Cambio 1 — HUD superior
Se corrige la primera integración del 9-slice del módulo:

**Ronda + Orden de turnos**

La caja funcional NO cambia de tamaño ni de posición.

### Corrección
Los remates horizontales del marco se dibujan por fuera de la caja funcional:
- normal: 28 px hacia cada lateral;
- responsive: 24 px;
- plegado: 16 px.

Esto evita que los remates se monten sobre:
- Ronda;
- Campeón activo;
- temporizador;
- chips del orden de turnos.

El emblema independiente pasa al borde superior central para no quedar detrás del contenido.

Vertical conserva su asset específico 9-slice.

## Cambio 2 — Arena Central
Se mantiene el mismo asset y el mismo encuadre jugable de v0.5.26.

Se reemplaza el recorte romboidal simple por un `clip-path` de silueta más preciso.

Objetivo:
- quitar los triángulos negros de izquierda y derecha;
- conservar completas las torres laterales;
- no cortar las cuatro esquinas;
- mantener la cuadrícula dentro del suelo interior.

No se modifica la cuadrícula 12×12 ni las coordenadas.

## Sin cambios
- combate;
- IA;
- habilidades;
- movimiento;
- alcance;
- línea de visión;
- miniaturas;
- obstáculos;
- cámara;
- tamaños y posición funcional del HUD superior.

## PWA / caché
- versión pública: v0.5.28
- cache: `liga-mundos-0528`
- `arena-central.css?v=0528`
- `hud-round.css?v=0528`
- `brand.js?v=0528`

## Prueba
1. Revisar HUD horizontal normal.
2. Confirmar que los remates ya no pisan textos/chips.
3. Revisar plegado.
4. Revisar vertical.
5. Confirmar que el emblema no tapa contenido.
6. Revisar Arena Central: no deben quedar triángulos negros laterales.
7. Confirmar que las esquinas izquierda y derecha estén completas.
8. Confirmar cuadrícula y miniaturas alineadas.

## Estado
LISTA PARA PROBAR.
