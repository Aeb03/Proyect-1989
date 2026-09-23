# Liga de los Mundos v0.5.18 — Corrección Arfeli + orientación Coloso/Onod

## Cambio principal
Versión de corrección sobre v0.5.17 para continuar la prueba de miniaturas tácticas sin tocar mecánicas.

## Correcciones
- Arfeli recupera su tratamiento visual específico ya validado (`arfeli-combat-host` / `arfeli-combat-img`), evitando la miniatura gigante durante el despliegue.
- Coloso corrige el mapeo de sus cuatro vistas:
  - archivo `up-right` -> dirección lógica `down-right`
  - archivo `up-left` -> dirección lógica `down-left`
  - archivo `down-right` -> dirección lógica `up-left`
  - archivo `down-left` -> dirección lógica `up-right`
- Onod intercambia sus vistas superiores:
  - archivo `up-right` -> dirección lógica `up-left`
  - archivo `up-left` -> dirección lógica `up-right`
  - `down-right` y `down-left` permanecen igual.
- Se corrige la referencia de versión de `brand.js` en `index.html`.
- Caché PWA actualizado a `liga-mundos-0518`.

## Sin cambios
- No se modifican estadísticas.
- No se modifican habilidades.
- No se modifican movimiento, IA, turnos, cámara ni reglas.
- No se regeneran ni editan imágenes.

## Prueba recomendada
1. Confirmar que el inicio muestra v0.5.18.
2. Entrar a despliegue con Arfeli y confirmar que ya no aparece gigante.
3. Probar Coloso y girar la cámara por las cuatro orientaciones.
4. Si Coloso queda correcto, probar Onod del mismo modo.
5. Confirmar que movimiento, habilidades, turnos e IA siguen iguales.

## Estado
LISTA PARA PROBAR. No considerar VALIDADA hasta la prueba de Adrián.
