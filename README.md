# Liga de los Mundos v0.5.13 — Miniatura Arfeli 4 vistas

Primera versión del nuevo enfoque de **juego de mesa digital** para los campeones en combate.

## Cambio principal
Arfeli deja de usar `arfeli-combat.png`. En la arena ahora se representa como una miniatura rígida fotografiada desde cuatro ángulos isométricos:

- `arfeli-combat-down-right.png`
- `arfeli-combat-down-left.png`
- `arfeli-combat-up-right.png`
- `arfeli-combat-up-left.png`

Las cuatro imágenes fueron colocadas sobre el mismo canvas y alineadas por el centro de la peana para reducir saltos de posición o escala al cambiar de vista.

## Orientación
- Se conserva el `facing` que ya usa el motor v0.5.3.
- Un último paso o un ataque puede cambiar la orientación de Arfeli exactamente como antes.
- La vista mostrada también tiene en cuenta la rotación 0/90/180/270° de la cámara.
- No hay animación de caminata. Arfeli es una miniatura física rígida.

## Cambio de imagen sin parpadeo
Las cuatro vistas se precargan al iniciar la app y se insertan superpuestas dentro del mismo contenedor. Sólo una queda visible. No se cambia el `src` durante el combate.

## Motor
`app.js` permanece **v0.5.3 sin modificaciones**. La integración se realiza desde `champion-assets.js`, envolviendo solamente la salida visual de `renderEntity`; PA, PM, IA, alcance, LOS, turnos, cámara y reglas no cambian.

## Archivos de Arfeli que se conservan
- `arfeli-avatar.png`: HUD y elementos compactos.
- `arfeli-select.png`: Selección y pantalla Campeones.

`arfeli-combat.png` ya no es utilizado ni precargado. Una vez validada esta versión puede eliminarse manualmente del repositorio.

## Prueba recomendada
1. Confirmar que la app muestre v0.5.13.
2. Entrar al combate con Arfeli y comprobar que se ve la peana completa.
3. Moverla una casilla en cada dirección y comprobar las cuatro vistas.
4. Atacar desde distintos lados y verificar que conserva la orientación resultante.
5. Girar la cámara con ↶/↷ y confirmar que la vista cambia coherentemente.
6. Observar especialmente si hay salto de escala/posición o un cuadro vacío al cambiar de vista.

## Carga manual
Subir todos los archivos de este ZIP a la raíz del repositorio, reemplazando los existentes cuando corresponda. `arfeli-combat.png` viejo puede quedar temporalmente: esta versión no lo referencia.
