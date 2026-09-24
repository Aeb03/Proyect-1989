# Liga de los Mundos v0.5.32 — IA: aproximación / primeros turnos

## Estado
🟡 EN PRUEBA

Corrección puntual sobre la IA táctica general de v0.5.31.

## Problema corregido
Cuando ambos equipos comenzaban fuera de alcance, una IA podía considerar que no había una acción suficientemente valiosa y pasar turno sin aproximarse.

Eso podía generar:

IA pasa → rival espera → IA pasa → rival espera.

## Nueva regla
Si la IA iba a finalizar su turno SIN haber realizado:

- ataque;
- curación;
- habilidad táctica;
- construcción;
- preparación;
- movimiento;

se activa una evaluación adicional de **movimiento de aproximación** antes de pasar turno.

## Movimiento de aproximación
Tiene valor táctico propio cuando:

- reduce distancia;
- acerca al rango útil;
- consigue línea de visión;
- prepara una posición para el turno siguiente.

No equivale a caminar siempre todos los PM hacia el rival.

## Distancias buscadas

### Arfeli
Aproximación agresiva.
Banda preferida: 1–2 casillas.

### Coloso
Avanza hacia zona disputada.
Banda preferida: 2–3.

### Piplus
Busca distancia de tiro.
Banda preferida: 3–4.

### Onod
Busca zona útil para Brotes/control.
Banda preferida: 3–4.

### Korgan
Busca zona de disparo/trampas sin entrar gratuitamente a cuerpo a cuerpo.
Banda preferida: 3–4.

### Hougan
Busca alcance útil de Vínculo/Maldición/Muñeco conservando distancia.
Banda preferida: 3–4.

## Sentido común conservado
La aproximación sigue penalizando:

- Herida por cada casilla;
- exposición;
- quedar adyacente innecesariamente con Campeones de rango;
- movimiento más largo cuando uno más corto logra prácticamente lo mismo;
- ocupar una trampa propia/aliada útil.

La búsqueda usa obstáculos y rutas legales del motor.

## Trampas ocultas
La corrección consulta exclusivamente trampas del MISMO equipo de la IA.

Nunca consulta trampas enemigas invisibles.

## Anti-estancamiento
Si existe una ruta razonablemente segura que acerca a una posición de combate útil, esa posición recibe valor positivo.

Pasar sin avanzar queda reservado para casos donde:

- ya hubo una acción/preparación concreta en el turno;
- no existe una mejora alcanzable;
- o avanzar resulta claramente perjudicial.

## Reevaluación
Después de aproximarse, la IA vuelve a ejecutar su evaluación táctica normal.

Esto permite:

**mover → conseguir alcance → usar habilidad**

sin convertir la IA en una búsqueda profunda multironda.

## Arquitectura
Se agrega una capa pequeña y reversible:

`ai-approach.js`

Se carga después de:

`ai-tactical.js`

No se reconstruye la IA base v0.5.31.

## Sin cambios
- balance v0.5.30;
- selección ponderada de loadouts;
- lógica táctica principal v0.5.31;
- Arena Central;
- HUD;
- miniaturas;
- cámara;
- reglas del jugador.

## Prueba prioritaria
1. Iniciar 1v1 y no avanzar con el jugador.
2. Confirmar que la IA rompe el estancamiento.
3. Repetir con Arfeli, Piplus y Korgan para comprobar diferencias de distancia.
4. Probar 2v2 y verificar que la IA aliada utiliza exactamente la misma regla.
5. Probar con Herida para confirmar que no avanza si el perjuicio supera claramente el beneficio.

## Versión
- pública: v0.5.32
- cache PWA: `liga-mundos-0532`
