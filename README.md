# Liga de los Mundos v0.5.50 — Ajuste fino táctico + HUD contextual

## Estado
🟡 LISTA PARA PROBAR

## Trampas
- Las imágenes ya validadas NO se cambian.
- Se reduce apenas el tamaño.
- Se corrige el apoyo visual para que la trampa quede centrada dentro de UNA casilla.
- El ancla sigue siendo la casilla lógica original; sólo cambia la posición visual del PNG.

## Pilar
- Se reduce nuevamente.
- Debe quedar un poco más chico que un Campeón.

## Monolito
- Se reduce nuevamente.
- Debe quedar aproximadamente en la misma escala visual que los Campeones.

## Brote y Muñecos
- No se modifican en esta versión.

## Acciones doradas contextuales
Problema anterior:
Retirar Brote / Desarmar Trampa / Salir de Monolito / Consumir Pilar
entraban como una segunda fila del panel y empujaban las cuatro habilidades.

Solución:
- dejan de participar del grid del HUD;
- aparecen en una barra dorada compacta flotante encima del panel;
- las 4 habilidades permanecen siempre en su posición original;
- Mover / Fin turno tampoco se desplazan;
- si hay dos acciones contextuales, se muestran lado a lado.

## No cambia
- reglas
- balance
- IA
- habilidades
- PA / PM
- direcciones de Monolito y Muñecos
- asignación visual de trampas

## Versión
- pública: v0.5.50
- cache PWA: liga-mundos-0550
