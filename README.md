# Liga de los Mundos v0.5.11 — Primera animación de Arfeli

Prueba de integración de la caminata generada en FrameSprite sobre la base v0.5.10.

## Cambios
- Se incorporan 8 fotogramas PNG transparentes de la caminata de Arfeli.
- Reproducción configurada a 8 FPS (125 ms por fotograma).
- La animación se activa solamente cuando Arfeli está realizando un movimiento en combate.
- Al terminar el movimiento vuelve automáticamente a `arfeli-combat.png`.
- Los fotogramas se precargan para evitar parpadeos durante el primer movimiento.
- Funciona tanto para Arfeli controlada por el jugador como para una Arfeli rival IA.

## Importante
Esta versión es una **prueba de integración visual**. No modifica `app.js` ni las reglas, balance, IA, PM, rutas, cámara o rotación del motor v0.5.3.

## Archivos a subir/reemplazar
- `index.html`
- `brand.js`
- `walk-animation.js`
- `sw.js`
- `README.md`
- `arfeli-walk-0.png`
- `arfeli-walk-1.png`
- `arfeli-walk-2.png`
- `arfeli-walk-3.png`
- `arfeli-walk-4.png`
- `arfeli-walk-5.png`
- `arfeli-walk-6.png`
- `arfeli-walk-7.png`

## Prueba recomendada
1. Actualizar la PWA/web a v0.5.11.
2. Iniciar un combate con Arfeli.
3. Elegir **Mover** y desplazarla una o varias casillas.
4. Confirmar que durante el movimiento aparecen los frames de caminata.
5. Confirmar que al detenerse vuelve a la pose normal.
6. Girar la cámara y comprobar que el giro por sí solo no activa la caminata.
