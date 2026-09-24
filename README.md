# Liga de los Mundos v0.5.39 — Paneles laterales + escala de miniaturas + Armadura de Piedra

## Estado
🟡 EN PRUEBA

Esta actualización conserva la v0.5.38 como base validada para las 24 vistas y su mapeo.

Incluye tres cambios concretos.

## 1. TU EQUIPO / RIVALES — nueva piel

Se integran los assets `Liga_Mundos_Paneles_Laterales_v1`.

Se aplican:
- marco azul para TU EQUIPO;
- marco rojo para RIVALES;
- versión vertical;
- versión horizontal;
- versión vertical plegada;
- cabecera;
- placa de controles;
- emblema independiente;
- brillo del equipo para combatiente activo;
- tratamiento desaturado para KO.

Los marcos grandes se renderizan mediante `border-image` 9-slice.

NO se modifica:
- tamaño funcional;
- posición;
- arrastre;
- orientación;
- plegado;
- avatares;
- nombres;
- PV;
- PA;
- PM;
- controles.

## 2. Miniaturas de combate

Las seis miniaturas se reducen visualmente un 11%.

Se conserva:
- la misma casilla lógica;
- la misma posición;
- la misma línea inferior de peana;
- las 24 imágenes;
- el mapeo validado en v0.5.38;
- la rotación de cámara.

El ajuste se hace sólo por CSS con `transform: scale(.89)` y origen `center bottom`.

## 3. Coloso — Armadura de Piedra

Continúa:
- Coste: 2 PA.
- Alcance: 3.
- Escudo: +15.
- Máximo 1 uso por objetivo por turno.
- Duración: 1 turno o hasta ser destruido.

Cambio:
- Coloso NO puede aplicarse Armadura de Piedra a sí mismo.

Objetivos válidos:
- Campeón aliado;
- Pilar aliado;
- invocación aliada con PV, incluyendo Brotes y Muñecos.

La IA usa la misma validación `canUseAbility`, por lo que tampoco intentará usarla sobre Coloso y puede considerar los nuevos objetivos válidos.

## Sin cambios

No se modifica:
- Absorción Rocosa v0.5.37;
- Fusión;
- Monolito;
- Golpe Sísmico;
- Réplicas;
- ninguna otra habilidad;
- balance de otros Campeones;
- Arena Central;
- parallax;
- VFX;
- HUD de Ronda;
- lógica de cámara.

## Archivos nuevos / modificados

- `hud-team-panels.css`
- `miniature-scale.css`
- `coloso-stonearmor-test.js`
- `index.html`
- `brand.js`
- `sw.js`
- `README.md`
- `assets/ui/hud/team/*`

## Prueba prioritaria

1. TU EQUIPO vertical normal.
2. RIVALES vertical normal.
3. Ambos plegados.
4. Cambiar ambos a horizontal.
5. Arrastrarlos.
6. Confirmar que no cambió el tamaño funcional.
7. Revisar miniaturas dentro de la grilla.
8. Con Coloso, intentar Armadura sobre sí mismo: debe rechazarse.
9. Probar Armadura sobre aliado.
10. Probar Armadura sobre Pilar.
11. En 2v2, probar Armadura sobre Brote o Muñeco aliado.

## Versión

- pública: v0.5.39
- cache PWA: `liga-mundos-0539`
