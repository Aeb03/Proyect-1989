# Liga de los Mundos v0.5.29 — HUD superior más envolvente

## Cambio principal
Se ajusta únicamente el skin 9-slice del HUD superior:

**Ronda + Orden de turnos**

La estructura funcional NO cambia.

## Objetivo
Hacer que el marco gráfico abrace también la columna de controles laterales:

- arrastrar;
- cambiar orientación;
- plegar/desplegar.

En v0.5.28 esos botones seguían viéndose demasiado pegados al borde exterior del skin.

## Ajuste horizontal
La caja funcional conserva exactamente el mismo tamaño y posición.

Sólo crece el skin visual:
- izquierda: 46 px hacia afuera;
- derecha: 34 px hacia afuera;
- arriba/abajo: 7 px.

El remate izquierdo ahora envuelve visualmente la botonera completa.

## Ajuste vertical
El skin vertical también gana aire exterior:
- 18 px laterales;
- 16 px arriba/abajo.

## Estado plegado
El marco horizontal plegado se amplía sin modificar el tamaño funcional 176 × 34.

## Sin cambios
- contenido del HUD;
- botones y eventos;
- posición del módulo;
- dimensiones funcionales;
- turnos;
- combate;
- Arena Central;
- cámara;
- miniaturas;
- habilidades;
- PWA salvo actualización de versión/caché.

## PWA / caché
- versión pública: v0.5.29
- caché: `liga-mundos-0529`
- `hud-round.css?v=0529`
- `brand.js?v=0529`

## Prueba
1. Revisar HUD horizontal normal.
2. Confirmar que los tres botones laterales queden visualmente dentro del skin.
3. Confirmar que no se pisan textos ni chips.
4. Probar plegado/desplegado.
5. Probar orientación vertical.
6. Confirmar que arrastre y controles siguen funcionando igual.

## Estado
LISTA PARA PROBAR.
