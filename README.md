# Liga de los Mundos v0.5.21 — Información de habilidades por pulsación larga

## Cambio principal
La descripción de una habilidad ya no queda abierta al seleccionarla.

## Nuevo comportamiento
- Toque normal sobre una habilidad: la selecciona exactamente como antes.
- Mantener el dedo apoyado durante 1,5 segundos: aparece una tarjeta flotante con la información de esa habilidad.
- Mientras el dedo siga apoyado, la información permanece visible.
- Al levantar el dedo, la tarjeta desaparece.
- Después de levantar el dedo, el toque sigue seleccionando la habilidad normalmente.
- La tarjeta aparece alejada de la barra inferior para que el dedo no tape el texto.
- Se evita el menú contextual del navegador durante la pulsación larga.

## Alcance del cambio
- No cambia costes, alcance, daño ni reglas.
- No cambia selección de objetivos ni resaltado de casillas.
- No cambia movimiento, IA, turnos ni cámara.
- No cambia miniaturas ni recursos gráficos.
- Se mantiene el indicador normal de habilidad seleccionada.

## Implementación
Se incorpora una capa aislada:
- `skill-hold-info.js`
- `skill-hold-info.css`

Esto permite añadir la interacción sin modificar el motor táctico principal (`app.js`).

## PWA / versión
- Inicio actualizado a v0.5.21.
- Nuevo JS/CSS cacheado por el Service Worker.
- Caché actualizado a `liga-mundos-0521`.

## Prueba recomendada
1. Confirmar que el inicio muestra v0.5.21.
2. Tocar rápidamente una habilidad y comprobar que se selecciona sin abrir su descripción.
3. Mantener una habilidad durante menos de 1,5 s y comprobar que no aparece información.
4. Mantenerla durante 1,5 s: debe aparecer la tarjeta.
5. Seguir manteniendo el dedo: la tarjeta debe permanecer visible.
6. Soltar: la tarjeta debe desaparecer y la habilidad quedar seleccionada.
7. Probar varias habilidades y comprobar que no aparece el menú contextual de Android/Chrome.
8. Confirmar que el tablero, objetivos, alcance y ejecución de habilidades siguen funcionando igual.

## Estado
LISTA PARA PROBAR. No considerar VALIDADA hasta la prueba de Adrián.
