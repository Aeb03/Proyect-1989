# Liga de los Mundos v0.5.36 — Arena transparente + parallax

## Estado
🟡 EN PRUEBA

Corrección visual puntual de Arena Central sobre v0.5.35.

## 1. Plataforma RGBA real

Se reemplaza:

`assets/arenas/central/arena-central-base.png`

por una versión técnica:

- PNG;
- RGBA;
- 1920 × 960;
- proporción 2:1;
- fondo exterior realmente transparente;
- sin halo negro exterior.

El asset conserva el diseño de la plataforma.

## 2. Se elimina el recorte artificial

La versión anterior necesitaba un `clip-path` aproximado para esconder el negro del PNG.

Ese recorte queda eliminado:

`clip-path: none`

La transparencia ahora pertenece al propio archivo.

## 3. Parallax del Coliseo

El fondo del Coliseo continúa siendo:

`assets/arenas/central/arena-central-background.png`

No rota físicamente.

Ahora acompaña suavemente el desplazamiento de la cámara:

- horizontal: 22% del desplazamiento del tablero;
- vertical: 14%;
- límite horizontal: ±56 px;
- límite vertical: ±20 px.

Esto evita que el Coliseo parezca una fotografía completamente fija detrás de una plataforma móvil.

## 4. Cómo se sincroniza

`arena-central.js` observa la cámara ya existente.

Después de que `applyBattleCamera()` termina su cálculo normal:

1. NO altera `B.camera`;
2. NO modifica la transformación del tablero;
3. lee `camera.x / camera.y`;
4. actualiza únicamente dos variables CSS del fondo.

Por eso el parallax no participa en ninguna regla del juego.

## 5. Rotación

La cámara lógica mantiene exactamente sus cuatro rotaciones actuales.

La plataforma continúa reutilizándose en las cuatro vistas.

El Coliseo:
- no gira;
- conserva orientación arquitectónica;
- acompaña cualquier recentrado/desplazamiento que produzca la rotación.

## Sin cambios

No se modifica:

- tablero lógico 12×12;
- `isoViewCoords`;
- selección;
- movimiento;
- alcance;
- LoS;
- obstáculos;
- Campeones;
- objetos dinámicos;
- daño;
- PA;
- PM;
- estados;
- balance;
- IA;
- VFX;
- HUD.

## Archivos modificados

- `arena-central.css`
- `arena-central.js`
- `index.html`
- `brand.js`
- `sw.js`
- `README.md`

## Asset reemplazado

- `assets/arenas/central/arena-central-base.png`

## Prueba prioritaria

1. Comprobar que desapareció el halo negro.
2. Arrastrar lentamente la arena en las cuatro direcciones.
3. Confirmar que el Coliseo acompaña de forma suave, pero menos que la plataforma.
4. Rotar cámara varias veces.
5. Confirmar que el fondo no gira físicamente.
6. Confirmar que el recentrado tras rotar también produce parallax.
7. Probar selección/movimiento/alcance.
8. Confirmar que cuadrícula, piezas y clics siguen exactamente alineados.

## Versión

- pública: v0.5.36
- cache PWA: `liga-mundos-0536`
