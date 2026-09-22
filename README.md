# Liga de los Mundos v0.5.14 — Prueba de nuevo avatar de Arfeli

## Cambio principal
Prueba visual del nuevo concepto de avatar de Arfeli. El retrato deja de tratarse como un icono exclusivamente circular y gana presencia en ficha/perfil y HUD, reutilizando el mismo asset en todos los contextos.

## Assets actualizados
- `arfeli-avatar.png`: nuevo retrato cuadrado aprobado.
- `arfeli-select.png`: nueva imagen de selección aprobada.

Las cuatro vistas de la miniatura de combate permanecen sin cambios.

## Implementación
Se agrega `avatar-layout.css` como capa visual independiente. No se modifica `app.js`, `champion-assets.js` ni ninguna regla de combate. El motor v0.5.3 permanece intacto.

El mismo `arfeli-avatar.png` se adapta mediante CSS a:
- ficha/perfil;
- integrantes del equipo;
- HUD del combatiente;
- iniciativa/orden de turno;
- campeón activo de ronda.

En pantallas landscape de poca altura se aplica una variante compacta para conservar espacio de arena.

## PWA
El caché pasa a `liga-mundos-0514` y precarga la nueva capa visual y los assets aprobados. Se conserva el sistema existente de aviso de actualización y actualización manual segura.

## Prueba recomendada
1. Confirmar que el título muestre v0.5.14.
2. Revisar la nueva imagen de selección de Arfeli.
3. Abrir ficha/perfil y comprobar el nuevo retrato.
4. Entrar en combate y revisar el avatar del HUD.
5. Revisar Arfeli en orden/iniciativa y campeón activo de ronda.
6. Confirmar que el rostro siga siendo reconocible en los tamaños pequeños.
7. Probar en horizontal, especialmente en una pantalla de poca altura.
8. Confirmar que movimiento, habilidades, turnos, IA, cámara y las cuatro vistas de combate siguen funcionando igual que en v0.5.13.

## Estado
LISTA PARA PROBAR. No considerar validada hasta la prueba de Adrián en GitHub Pages/PWA.
