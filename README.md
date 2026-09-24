# Liga de los Mundos v0.5.35 — Integración Arena Central / Coliseo

## Estado
🟡 EN PRUEBA

Primera integración del fondo completo de la Sede de la Liga con la plataforma jugable actual.

## Nuevo recurso

`assets/arenas/central/arena-central-background.png`

El archivo se incorpora exactamente como fue entregado:
- 1536 × 864 px;
- no se redibuja;
- no se recorta;
- no se recomprime;
- no se altera su diseño.

## Orden de capas

1. Fondo del Coliseo.
2. Plataforma `arena-central-base.png`.
3. SVG funcional 12×12.
4. Obstáculos.
5. Pilares / Brotes / trampas / Muñeco y demás objetos.
6. Campeones + PV + estados.
7. HUD e interfaz.

## Fondo
El Coliseo se aplica exclusivamente a `.battle-screen`.

Características:
- cubre el viewport en horizontal;
- `background-size: cover`;
- anclado arriba para conservar la arquitectura monumental;
- no recibe clics;
- no forma parte de la lógica del tablero;
- no rota con la cámara.

## Plataforma
Se conserva la misma integración de la plataforma vigente.

No se modifican:
- imagen;
- escala actual del tablero;
- posición actual;
- clip vigente;
- cuadrícula 12×12.

## Cuadrícula
Se mantiene:
- `left: 14%`;
- `top: 14%`;
- `width: 72%`;
- `height: 72%`.

No cambia ninguna coordenada lógica.

## Rotación
La plataforma y el fondo visual se reutilizan en las 4 vistas.

La rotación sigue ocurriendo únicamente a través del sistema lógico actual de `isoViewCoords`.

Esta prueba NO introduce assets r0/r1/r2/r3.

## Cámara
No se cambia el desplazamiento de cámara actual.

Mover/rotar la cámara continúa funcionando como antes.

## Sin cambios
Esta versión NO modifica:
- combate;
- daño;
- PA;
- PM;
- estados;
- IA;
- balance;
- VFX;
- obstáculos;
- movimiento;
- alcance;
- LoS;
- Campeones;
- miniaturas.

## Archivos modificados
- `arena-central.css`
- `index.html`
- `brand.js`
- `sw.js`
- `README.md`

## Archivo nuevo
- `assets/arenas/central/arena-central-background.png`

## Prueba prioritaria
1. Iniciar combate real.
2. Revisar escala del Coliseo.
3. Revisar lectura de la plataforma.
4. Confirmar que el SVG sigue perfectamente funcional.
5. Seleccionar movimiento/alcance y comprobar resaltados.
6. Rotar las 4 cámaras.
7. Arrastrar cámara.
8. Revisar obstáculos y miniaturas sobre el nuevo fondo.
9. Revisar HUDs flotantes.
10. Confirmar que ninguna interacción cambió.

## Versión
- pública: v0.5.35
- cache PWA: `liga-mundos-0535`
