# Liga de los Mundos v0.5.27 — HUD superior 9-slice

## Cambio principal
Primera integración gráfica definitiva del módulo superior:

**Ronda + Orden de turnos**

No se modifica su tamaño, posición, contenido ni funcionamiento.

## Assets incorporados
Ruta:

`assets/ui/hud/round/`

Archivos:
- `hud-round-horizontal@2x.png`
- `hud-round-vertical@2x.png`
- `hud-round-emblem@2x.png`

Los tres fueron verificados como PNG RGBA reales con transparencia.

## Implementación
Se agrega:

`hud-round.css`

El marco se renderiza mediante `border-image` / 9-slice sobre un pseudo-elemento independiente.

### Horizontal
Master: 940 × 96 px

Cortes fuente:
- TOP: 18
- RIGHT: 84
- BOTTOM: 18
- LEFT: 84

Se utiliza para:
- estado normal;
- responsive;
- estado plegado 176 × 34.

### Vertical
Master: 352 × 704 px

Cortes fuente:
- TOP: 80
- RIGHT: 42
- BOTTOM: 80
- LEFT: 42

Se utiliza para el HUD vertical de 176 px de ancho y altura dinámica.

### Emblema
Master: 80 × 80 px

Se monta como capa independiente.
No participa del área estirable del 9-slice y no recibe eventos táctiles.

## Contenido dinámico
Permanece sin cambios y por encima del nuevo marco:
- ronda;
- Campeón activo;
- temporizador;
- orden de turnos;
- avatares;
- controles;
- reset;
- estados actuales del HUD.

## Alcance
Cambio solamente gráfico.

No se modifican:
- combate;
- IA;
- turnos;
- habilidades;
- Arena Central;
- cámara;
- miniaturas;
- lógica del tablero;
- movimiento;
- PWA salvo actualización de caché/assets.

## Prueba recomendada
1. Confirmar que el inicio muestra v0.5.27.
2. Revisar HUD superior horizontal normal.
3. Revisar responsive en pantalla baja.
4. Plegar el HUD y comprobar 176 × 34.
5. Cambiar a orientación vertical.
6. Comprobar que esquinas/remates no se deforman.
7. Comprobar que todos los textos, avatares y botones siguen funcionando.
8. Confirmar que mover/orientar/plegar el HUD funciona igual que antes.

## Estado
LISTA PARA PROBAR.
