# Liga de los Mundos v0.5.44 — Panel inferior + ajuste de laterales

## Estado
🟡 EN PRUEBA

Esta tanda reúne dos cambios visuales.

## 1. Panel inferior de combate
Se integra la piel `Liga_Mundos_Panel_Inferior_v1`.

Se mantiene exactamente la estructura funcional actual:

CONTROLES IZQUIERDOS
→ FICHA DEL CAMPEÓN
→ 4 HABILIDADES
→ MOVER / FIN TURNO

No se modifica:
- tamaño funcional;
- posición;
- distribución;
- lógica;
- habilidades;
- PA;
- PM;
- estados;
- IA.

### Piezas utilizadas
- `bottom-panel-base-horizontal.png`
- `bottom-panel-controls-left.png`
- `bottom-panel-champion-card.png`
- `skill-slot-normal.png`
- `skill-slot-selected.png`
- `skill-slot-disabled.png`
- `action-button-move.png`
- `action-button-end-turn.png`
- `action-button-secondary-gold.png`

Toda la información sigue siendo dinámica.

La integración ahora usa directamente la estructura real de la app:
- `.battle-command-panel`
- `.command-hud-tools`
- `.fighter-panel`
- `.skill-drawer`
- `.hud`
- `.special-actions`

No se usa detección heurística.

## 2. Paneles laterales — modo vertical
Se corrige el problema visto en los recuadros de los personajes.

### Expandido
- la ficha queda contenida dentro del marco;
- deja margen a izquierda y derecha;
- la barra de vida sigue el ancho interior;
- el avatar queda nuevamente más legible.

### Plegado
- el recuadro dorado baja a un ancho contenido;
- la barra de vida queda dentro de la ventana;
- el avatar vuelve a 31 px aprox., no se reduce más;
- se conserva el tamaño/posición general del panel.

El modo horizontal no se modifica.

## Conservado
Se mantienen todos los cambios ya vigentes:
- IA territorial de Coloso;
- Absorción Rocosa;
- Armadura de Piedra;
- halos de equipo;
- colores tácticos;
- 24 vistas de miniaturas;
- Arena Central;
- HUD superior;
- VFX.

## Archivos
- `bottom-panel-skin.css`
- `side-panel-fit.css`
- `index.html`
- `brand.js`
- `sw.js`
- assets del panel inferior

## Prueba prioritaria
1. Ver panel inferior completo.
2. Seleccionar habilidad y revisar `selected`.
3. Revisar habilidad sin PA / sin usos.
4. Probar Mover.
5. Probar Fin turno.
6. Probar acción especial de Coloso u Onod.
7. Poner TU EQUIPO / RIVALES en vertical expandido.
8. Plegarlos y confirmar que ficha + barra quedan dentro del marco.
9. Confirmar que el avatar no quedó demasiado chico.

## Versión
- pública: v0.5.44
- cache PWA: `liga-mundos-0544`
