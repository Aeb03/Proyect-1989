# Arena Táctica v0.5.3 — corrección de rotación de cámara

Corrección puntual sobre v0.5.2. Mantiene intactos motor, reglas, IA, balance y cámara desplazable.

- Se corrigió el bloque CSS de los controles de cámara, que había quedado escrito con secuencias `\n` literales y por eso no se aplicaba correctamente en el navegador.
- El mini HUD de cámara ahora queda por encima del tablero y recibe los toques correctamente.
- Se eliminó el botón central de centrado: quedan sólo mover controles, girar 90° a la izquierda y girar 90° a la derecha.
- Los botones se redujeron para que sean sutiles y ocupen el mínimo espacio posible.
- La rotación visual puede usarse incluso mientras la IA o una animación está resolviendo una acción.
- La rotación sigue siendo puramente visual: coordenadas lógicas, movimiento, alcance, LOS, empujes, IA y habilidades no cambian.
