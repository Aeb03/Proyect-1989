# Liga de los Mundos v0.5.46 — HUD horizontal + pulido de habilidades

## Estado
🟡 EN PRUEBA

## Objetivo
Cerrar la UI de combate antes de integrar el próximo pack de invocaciones/objetos.

## 1. Ronda y panel inferior: sólo horizontal
Se bloquea la orientación vertical para:
- HUD superior de Ronda;
- panel inferior de habilidades/acciones.

Los paneles laterales TU EQUIPO / RIVALES conservan orientación adaptable.

También desaparece el botón de cambio de orientación en Ronda y panel inferior.

## 2. Habilidades
Se corrige la composición interna de las cuatro cartas:

- nombre en hasta 2 líneas;
- coste de PA arriba a la derecha;
- contador de usos arriba a la izquierda;
- icono centrado;
- mejor jerarquía del estado seleccionado;
- estado deshabilitado más claro.

No se cambia ningún coste, límite o habilidad.

## 3. Mover / Fin turno
Se mejora:
- centrado del icono;
- centrado del texto;
- proporción interna;
- lectura dentro de la skin gráfica.

No cambia su función.

## No cambia
- lógica;
- IA;
- PA / PM;
- habilidades;
- estados;
- reglas;
- arena;
- miniaturas;
- laterales;
- sistema de audio (todavía no integrado).

## Archivos
- `hud-horizontal-only.js`
- `hud-horizontal-polish-0546.css`
- `index.html`
- `brand.js`
- `sw.js`
- `README.md`

## Prueba prioritaria
1. Confirmar que Ronda no puede pasar a vertical.
2. Confirmar que panel inferior no puede pasar a vertical.
3. Ver nombres largos de habilidades.
4. Revisar PA arriba a la derecha.
5. Revisar contador de usos arriba a la izquierda.
6. Confirmar iconos centrados.
7. Probar Mover.
8. Probar Fin turno.
9. Probar a baja altura / celular apaisado.

## Versión
- pública: v0.5.46
- cache PWA: `liga-mundos-0546`
