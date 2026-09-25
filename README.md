# Liga de los Mundos v0.5.54 — Ajuste fino del marco de Inicio

## Estado
🟡 LISTA PARA PROBAR EN CELULAR

## Cambios
Esta versión NO rediseña el Inicio.

Se mantiene exactamente:
- fondo / escena interior;
- logo;
- textos;
- botón;
- icono de espadas;
- Intro;
- Splash nativo;
- navegación.

### Marco-display
Se corrige únicamente el marco:

- laterales más finos;
- esquinas con menos peso visual;
- mayor cierre visual abajo;
- un poco más de cierre arriba;
- estrella superior desplazada parcialmente fuera del viewport;
- punta/triángulo inferior desplazado parcialmente fuera del viewport;
- el borde exterior debe leerse más recto contra los límites físicos de la pantalla.

La técnica sigue siendo `border-image` / 9-slice.
No se estira el PNG entero como una fotografía.

## PWA
Se conserva el hotfix de actualización de la app instalada.
- versión pública: v0.5.54
- cache: liga-mundos-0554
