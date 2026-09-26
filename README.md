# Liga de los Mundos v0.6.3 — AUDIO LIFECYCLE + LOBBY COVER

Base: v0.6.2 experimental, con v0.6.1 como checkpoint estable.

Cambios controlados:
- Música: pausa inmediata cuando la app queda oculta / pasa a segundo plano (`visibilitychange` / `pagehide`).
- Música: reanuda la escena vigente al volver (`visibilitychange` / `pageshow`) respetando MASTER, MUSIC, mute, ducking y posición de reproducción.
- Lobby: JUGAR, CAMPEONES, LIGA y PERFIL pasan de `contain` a `cover`, manteniendo sus contenedores y navegación.
- Cache/PWA/versionado actualizado a 0.6.3.

No modifica mecánicas, IA, combate, SFX, MP3 ni estructura funcional del Lobby.

Estado: 🟡 LISTA PARA PROBAR.
Checkpoint de rollback: v0.6.1.
