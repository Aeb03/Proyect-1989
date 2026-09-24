# Liga de los Mundos v0.5.42 — IA territorial de Coloso + pendientes visuales

## Estado
🟡 EN PRUEBA

## Ventana inferior
POSTERGADA. No se implementa ni modifica en esta versión.

## Coloso — IA territorial
- Si el combate está lejos, prioriza aproximación.
- En Ronda 1 evita fortificar automáticamente la zona inicial.
- A larga distancia sólo permite un Pilar si adelanta claramente el frente.
- Si ya existe un Pilar adelantado, evita construir otro detrás.
- Fusión/Monolito sólo se habilita para IA cuando la posición puede influir.
- En Monolito reevalúa ataque, amenaza, red de Pilares, control territorial y protección de aliado.
- Un turno completo improductivo marca espera.
- Si al turno siguiente continúa sin influencia, sale de Monolito y vuelve a reposicionarse.

No usa información oculta ni simulación profunda.

## Balance conservado
### Absorción Rocosa
- 2 PA
- alcance 3
- no absorbe Pilar creado ese mismo turno
- cura según PV actuales del Pilar
- máximo 20

### Armadura de Piedra
- 2 PA
- +15 Escudo
- no sobre Coloso
- sí sobre aliados, Pilares e invocaciones aliadas válidas

## Visual
- brillo/grosor de peanas igual a v0.5.41
- diámetro más cerrado: 70% interior / 80% exterior
- fichas de personajes más compactas en panel lateral vertical
- sin cambios en ancho/posición/skin del panel

## Versión
- pública: v0.5.42
- cache PWA: `liga-mundos-0542`
