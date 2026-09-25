# Liga de los Mundos v0.5.47 — Assets tácticos + HUD + icono

## Estado
🟡 LISTA PARA PROBAR

## Assets tácticos integrados
- Pilar de Coloso
- Brote de Onod
- Trampa de Korgan
- Dispositivo eléctrico
- Monolito de Coloso — 4 vistas
- Muñeco Houngan 01 — 4 vistas
- Muñeco Houngan 02 — 4 vistas

Las vistas múltiples se cargan por nombre recibido:
down-right / down-left / up-left / up-right.
No se corrige preventivamente ninguna dirección. Si una vista queda cruzada, se ajusta después.

Muñecos:
- Houngan 01 → Muñeco normal de 16 PV
- Houngan 02 → Muñeco grande de 30 PV
- la selección del arte se hace por `maxHp`, no por equipo

Trampas:
- Pinchos / Cepo → trampa-korgan
- Carga Explosiva → dispositivo-electrico

## HUD
Ronda y panel inferior quedan bloqueados en horizontal.
Además del estado guardado, se fuerza la clase horizontal y se bloquea el control de orientación.

## Laterales
En modo vertical desplegado se reduce el ancho del recuadro interno y de la barra de vida
para que no sobresalgan del marco.

## Icono PWA
- icon-192.png → 192×192
- icon-512.png → 512×512
Generados a tamaño técnico exacto a partir de los dos PNG suministrados.

## No se modifica
- mecánicas
- balance
- IA
- PA/PM
- estados
- reglas
- Arena
- vistas de Campeones validadas
- sonidos

## Versión
- pública: v0.5.47
- cache: liga-mundos-0547


## Corrección previa a prueba
Se corrigió la asignación de los dos Muñecos: 01 corresponde a 16 PV y 02 a 30 PV.
