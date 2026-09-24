# Liga de los Mundos v0.5.34 — VFX general ampliado

## Estado
🟡 EN PRUEBA

Esta versión amplía y ordena el sistema general de efectos visuales iniciado en v0.5.33.

## Principio de arquitectura
La mecánica siempre se resuelve primero.

Después la capa VFX observa el resultado y reproduce la presentación correspondiente.

Una animación:
- no decide si una acción impactó;
- no decide daño;
- no decide curación;
- no decide escudo;
- no decide estados;
- no decide desplazamiento;
- no decide trampas;
- no modifica IA.

Si un VFX falla, la partida continúa.

## Importante — MISS / FALLO
Actualmente Liga de los Mundos no tiene mecánica de MISS/FALLO.

Esta versión:
- NO agrega MISS;
- NO agrega FALLO;
- NO agrega animación asociada a algo que no existe mecánicamente.

## API reutilizable
`window.LigaVFX` expone:

- `damage(subject,n)`
- `heal(subject,n)`
- `impact(subject,variant)`
- `projectile(from,to,variant)`
- `shield(subject)`
- `shieldBreak(subject)`
- `area(cells,variant)`
- `statusApplied(subject,icon,label)`
- `statusActivation(subject,icon,label)`
- `forced(subject,source,away)`
- `spawn(subject,variant)`
- `vanish(subject,variant)`
- `transfer(from,to,variant)`
- `trapActivation(subject,type)`
- `relation(from,to,kind,mode)`
- `transform(subject,variant)`
- `activationPulse(subject,variant)`
- `ko(subject)`

## Sistemas

### Daño / curación
Números flotantes basados en la pérdida/recuperación REAL de PV.

### Impacto
Flash breve sobre la pieza afectada.

### Proyectil
Origen → objetivo reutilizable.

### Escudo
Pulso al obtener Escudo.

### Ruptura de Escudo
Si un golpe deja el Escudo en 0:
- quiebre;
- fragmentos energéticos;
- destello breve.

No cambia el cálculo del Escudo.

### Área
Casilla central + casillas afectadas según la habilidad ya resuelta.

### Estado aplicado
Feedback al recibir:
- Herida;
- Veneno;
- Quemadura;
- Marca;
- Vínculo;
- reducción de PA;
- reducción de PM.

### Estado activado
Diferenciado de la aplicación.

Primeras conexiones:
- Veneno cuando una habilidad activa su daño;
- Herida al recorrer una casilla;
- Quemadura al inicio/final;
- reducción de PA/PM al comenzar turno.

### Empuje / atracción
Feedback direccional sólo cuando el motor realmente cambió la posición.

### Aparición
Pilar, Brote, Muñeco, trampa y futuras piezas.

### Desaparición
Objeto destruido, consumido o retirado.

### Consumo / transferencia
Rastro entre pieza origen y destino.

Primeros ejemplos:
- Absorción Rocosa;
- Fusión de Pilar;
- Consumir Pilar en Monolito;
- Transferencia de Hougan.

### Trampas
Se distingue:
- colocar = aparición;
- activar = pulso específico;
- desaparecer = efecto posterior.

La trampa sólo se activa porque el motor lo resolvió.

### Marca / Vínculo
Conexión breve y limpia:
- al aplicar;
- al utilizar la relación.

No se dibuja una línea permanente por el tablero.

Los indicadores permanentes de 🎯 Marcado y 🪡 Vinculado siguen siendo los existentes en el sistema de estados.

### Transformación
Transición genérica.

Primera conexión:
- Coloso → Monolito;
- salida de Monolito.

No anima el cuerpo ni agrega frames.

### Pulso del ejecutor
Toda habilidad resuelta correctamente genera un pulso corto sobre quien la ejecuta.

### KO
Feedback deportivo:
`KO / FUERA`

No representa muerte.

## Secuencia
Durante una habilidad los eventos mecánicos se capturan sólo para PRESENTACIÓN.

Luego se reproducen aproximadamente:

pulso ejecutor
→ proyectil / área / relación / transferencia
→ impacto
→ ruptura de escudo, si corresponde
→ daño/curación
→ estado

La resolución mecánica ya ocurrió y no espera la animación.

## Rendimiento
- una sola capa global;
- `pointer-events:none`;
- máximo 72 nodos VFX;
- limpieza automática;
- Web Animations API;
- sin canvas;
- sin assets adicionales;
- sin timers permanentes;
- las animaciones no bloquean el turno.

## Compatibilidad
Se conservan:
- balance v0.5.30;
- IA táctica v0.5.31;
- aproximación v0.5.32;
- Arena Central;
- HUD;
- cámara;
- miniaturas rígidas.

## Fuera de esta versión
No se incorporan:
- caminata;
- balanceo de peana;
- ataques corporales;
- cambio de pose;
- frames adicionales;
- animaciones de MISS/FALLO.

## Pruebas prioritarias
1. Daño a PV.
2. Curación.
3. Escudo que absorbe parcialmente.
4. Escudo que llega exactamente a 0.
5. Arco/Roca/Espina/disparo como proyectil.
6. Esporas/Granada/Golpe Sísmico.
7. Aplicar Veneno y luego activarlo.
8. Herida al desplazarse.
9. Empuje/atracción.
10. Crear y destruir Pilar/Brote/Muñeco/trampa.
11. Absorber/Fusionar Pilar.
12. Activar una trampa.
13. Aplicar y usar Marca.
14. Aplicar y usar Vínculo.
15. Entrar/salir de Monolito.
16. KO.
17. Confirmar que ninguna mecánica depende de las animaciones.

## Versión
- pública: v0.5.34
- cache PWA: `liga-mundos-0534`
