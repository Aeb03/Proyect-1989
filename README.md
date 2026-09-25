# Liga de los Mundos v0.5.48 — Hotfix de Despliegue

## Estado
🟡 LISTA PARA PROBAR

## Problema observado
En v0.5.47, después de elegir una casilla en Despliegue, la app podía quedar trabada antes de entrar al combate.

## Hotfix
- Los nuevos assets tácticos NO intervienen mientras `B.deployment` está activo.
- Se eliminó la precarga/decodificación simultánea de los 16 PNG tácticos.
- Los PNG tácticos ya no se precachean todos durante la instalación del Service Worker.
- Los assets se cargan recién cuando realmente aparecen en combate.
- El renderer visual tiene fail-safe: si falla una sustitución de arte, conserva el render base.
- El bloqueo horizontal de Ronda/Habilidades usa un observer más liviano y sólo reacciona a cambios de DOM.

## Se conserva de v0.5.47
- Pilar / Brote / Trampas / Dispositivo.
- Monolito 4 vistas.
- Muñeco 01 = 16 PV.
- Muñeco 02 = 30 PV.
- Laterales corregidos.
- Nuevo icono PWA.
- Ronda y panel inferior sólo horizontales.

## No cambia
Mecánicas, balance, IA, habilidades, PA/PM, estados ni reglas.

## Versión
- pública: v0.5.48
- cache PWA: liga-mundos-0548
