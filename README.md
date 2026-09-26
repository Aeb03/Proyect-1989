# Liga de los Mundos v0.6.1 — Música ambiente + Opciones de audio

## Estado
🟡 LISTA PARA PROBAR

Base: v0.6.0 EXPERIMENTAL SFX.

## Música

### Inicio / Lobby
Archivo:
`assets/audio/music/lobby-liga.mp3`

Estado:
🟡 EN PRUEBA

Comportamiento:
- loop;
- continúa sin reiniciarse al abrir/cerrar paneles;
- continúa por pantallas de Lobby / selección;
- al entrar al combate hace transición suave hacia la música de Arena Central.

### Arena Central
Archivo:
`assets/audio/music/arena-central-combate.mp3`

Estado:
✅ contenido aprobado / 🟡 integración en app en prueba

Comportamiento:
- loop durante el combate;
- no reinicia por turnos, rondas, selección, IA ni renders del HUD;
- al terminar el combate hace fade-out;
- al volver al Lobby vuelve la música de Lobby con fade-in.

## Loop
Los MP3 originales NO se editaron.

Se detectó que ambos masters tienen pequeños silencios de entrada/salida.
El código usa puntos de loop internos para evitar una pausa larga entre repeticiones:

- Lobby: aprox. 0.52 s → 169.30 s
- Arena Central: aprox. 0.36 s → 156.88 s

Los archivos permanecen bit a bit iguales a los masters entregados.

## Mezcla
La música usa el canal lógico MUSIC.
Los SFX siguen usando SFX_COMBAT / SFX_UI.

Volumen inicial para prueba:
- MASTER: 100 %
- MUSIC: 40 %
- SFX_COMBAT: 92 %

La intención es que los SFX queden por delante de la música.

## Ducking
Se deja preparada la API:
`LigaMusic.duck()`

No se activa automáticamente todavía para no modificar la mezcla de SFX ya validada.
Se probará después si los SFX importantes necesitan más espacio.

## Opciones de audio
Se agrega botón ⚙️ Opciones en:
- Lobby;
- controles de cámara dentro de Combate.

Panel inicial:
- Volumen del juego;
- Música ambiente;
- Sonidos del juego;
- Mute / activar audio.

Los valores se guardan en LocalStorage:
`liga-audio-settings-v1`

Cerrar/reabrir la app conserva los valores.

## Fallback
Si una pista no carga o el navegador bloquea una reproducción:
- la app continúa;
- no afecta turnos, IA ni habilidades;
- el sistema vuelve a intentarlo tras una interacción válida.

## Preparado para futuras Arenas
Mapa actual:
- Lobby → `lobby-liga.mp3`
- Arena Central → `arena-central-combate.mp3`

El motor está organizado por pistas/escenas para agregar después:
- Tarku
- Návara
- otras Arenas

## SFX
NO se reemplazan ni se editan los 26 SFX de v0.6.0.
El motor `audio-engine-0600.js` se conserva.

## Versión
- pública: v0.6.1
- cache PWA: liga-mundos-0601
