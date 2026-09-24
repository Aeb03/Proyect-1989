# Liga de los Mundos v0.5.40 — Pulido visual de combate

## Estado
🟡 EN PRUEBA

Parche exclusivamente visual sobre v0.5.39.

## 1. TU EQUIPO / RIVALES

Se conserva el diseño aprobado de los paneles laterales.

Pulidos:
- menor desborde ornamental exterior;
- interior azul/rojo un poco menos intenso;
- filas normales con menos brillo;
- combatiente activo conserva brillo destacado;
- avatar y textos mantienen la jerarquía actual.

### Controles del encabezado

Se corrige la doble capa visual.

Antes:
- el asset de controles estaba debajo;
- el botón funcional viejo seguía dibujando fondo y borde encima.

Ahora:
- el asset continúa siendo la superficie visible;
- mover / orientar / plegar-desplegar siguen siendo los mismos botones funcionales;
- el botón real queda transparente;
- sólo el glifo y la respuesta táctil quedan encima.

No cambia ninguna función.

## 2. Peanas de equipo

Se recupera la lectura de equipo:

- aliado / propio → halo AZUL;
- rival / enemigo → halo ROJO.

El halo queda detrás de la miniatura y alrededor de la peana, sin alterar el PNG ni su escala.

## 3. Colores tácticos de casillas

Nueva convención visual:

- VERDE = movimiento disponible;
- AZUL = alcance / área de habilidad;
- AZUL brillante = objetivo válido de habilidad;
- azul/gris discontinuo = casilla del alcance bloqueada.

No cambia:
- cantidad de PM;
- alcance real;
- LoS;
- objetivos válidos;
- mecánicas.

## Sin cambios

Se mantiene exactamente:
- miniaturas al 89%;
- mapeo validado de las 24 vistas;
- Absorción Rocosa;
- Armadura de Piedra v0.5.39;
- balance;
- IA;
- Arena Central;
- parallax;
- HUD de Ronda;
- VFX.

## Archivos

- `battle-visual-polish.css`
- `index.html`
- `brand.js`
- `sw.js`
- `README.md`

## Prueba prioritaria

1. Revisar TU EQUIPO y RIVALES.
2. Probar mover / cambiar orientación / plegar.
3. Confirmar que ya no se ve el botón viejo por encima de la textura.
4. Revisar brillo azul de peanas propias.
5. Revisar brillo rojo de peanas rivales.
6. Pulsar Mover: área VERDE.
7. Seleccionar habilidad: alcance AZUL.
8. Confirmar que ninguna regla cambió.

## Versión

- pública: v0.5.40
- cache PWA: `liga-mundos-0540`
