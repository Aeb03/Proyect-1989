# Liga de los Mundos v0.5.31 — IA táctica general

## Estado
🟡 EN PRUEBA

Esta versión mantiene el balance consolidado de v0.5.30 y reemplaza la IA secuencial anterior por una primera IA táctica general.

## Corrección adicional
Se corrige el fallo visual de versión que podía producir textos como:

`v0.5.300000000...`

La causa era el reemplazo repetido de `v0.5.3` dentro de versiones más largas.

Ahora:
- versión pública: `v0.5.31`;
- reemplazo de versión estable;
- la pantalla inicial fuerza exactamente `v0.5.31`.

## IA aliada y enemiga
Usan exactamente el mismo motor.

La única diferencia es qué unidades considera:
- aliadas;
- enemigas.

No existen reglas especiales de inteligencia para favorecer o perjudicar al jugador.

## Selección de 4 habilidades
Cada Campeón IA elige 4 habilidades mediante configuraciones coherentes con aleatoriedad ponderada.

La elección depende únicamente del Campeón.

No consulta:
- rival;
- loadout del jugador;
- habilidades enemigas ocultas.

La configuración queda bloqueada durante el combate.

## Planificación
La IA genera planes simples para el turno actual:

- habilidad;
- movimiento → habilidad;
- habilidad → reevaluación;
- habilidad → habilidad mediante bonificaciones de sinergia;
- Impulso/reposicionamiento cuando mejora claramente el plan.

Después de cada acción vuelve a evaluar si:
- murió el objetivo;
- cambió la posición;
- apareció/desapareció una entidad;
- cambió la oportunidad táctica.

No realiza búsqueda profunda de varios turnos.

## Sentido común implementado
La IA penaliza:
- movimientos innecesarios;
- daño de Herida por desplazamiento;
- daño de Veneno por habilidades de poco valor;
- curación desperdiciada;
- escudos sin exposición;
- sobre-daño inútil;
- acercamiento gratuito de Campeones de rango;
- acciones de bajo valor sólo para gastar PA.

Bonifica:
- eliminación;
- daño efectivo;
- curación efectiva;
- control real;
- posición;
- sinergias sencillas;
- amenazas tácticas visibles.

## Trampas ocultas
La IA sólo consulta trampas de su propio equipo.

Nunca usa la posición de trampas enemigas invisibles para decidir ruta, Gancho, Granada o posicionamiento.

Si entra en una trampa enemiga oculta, la descubre mediante la resolución normal del juego.

## Persistencia de objetivo
Cada IA conserva un objetivo razonable y no cambia por diferencias mínimas.

Puede cambiar si aparece una oportunidad claramente superior.

## Objetos tácticos
Puede valorar atacar:
- Brotes;
- Pilares;
- Muñecos.

El valor depende de la amenaza visible y de la posibilidad de destruirlos.

## Identidad por Campeón

### Arfeli
- favorece daño directo;
- valora Herida cuando tendrá impacto;
- prefiere Arco si evita movimiento innecesario;
- valora -1 PA del Martillo;
- no se daña deliberadamente para activar Berserker.

### Coloso
- Pilares reciben valor por posición y sinergias;
- Réplica actual se reconoce en el turno;
- Absorción considera curación efectiva vs. perder Pilar;
- Monolito se usa sólo con una razón táctica.

### Piplus
- Marca no se aplica sólo por PV bajo;
- Preciso/Tirón/Ruptura compiten por valor;
- Ruptura considera el costo de consumir Marca;
- Impulso sólo se usa si mejora posición/seguridad/plan.

### Onod
- no coloca Brotes sólo para llegar a 3;
- Despertar calcula impactos reales actuales;
- Esporas valora múltiples blancos;
- Savia considera bonus ortogonal;
- mantiene preparación simple, no multironda perfecta.

### Korgan
- coloca trampas cerca de rutas/combate;
- Gancho y Granada valoran trampas conocidas propias/aliadas;
- Disparo de Caza valora alineación;
- Paso del Cazador sólo si mejora realmente la posición.

### Hougan
Mantiene un modo con histéresis:
- ofensivo;
- apoyo.

No alterna por diferencias pequeñas.

Valora:
- continuidad Vínculo + Muñeco;
- Maldición independiente;
- Ritual como ejecución;
- Muñeco aliado como recurso defensivo;
- Transferencia de Dolor según exposición real.

No se expone deliberadamente para generar curación.

## Imperfección controlada
Si varias opciones son cercanas en valor, la IA puede elegir entre ellas con azar ponderado.

Si una opción es claramente superior, la preferencia es fuerte.

## Arquitectura
Se agrega:

- `ai-tactical.js`
- `ai-tactical.css`

Se carga después de `balance-playtest.js`, por lo que trabaja sobre las reglas vigentes de v0.5.30 sin reconstruir `app.js`.

## Sin cambios
- balance aprobado v0.5.30;
- Arena Central;
- HUD superior v0.5.29;
- cámara;
- miniaturas;
- selección humana;
- reglas no incluidas en IA.

## Prueba prioritaria
1. 1v1 contra cada Campeón.
2. 2v2 observando especialmente IA aliada.
3. Ver si evita movimientos sin propósito.
4. Herida: comprobar que no camina gratuitamente.
5. Veneno: comprobar que no encadena habilidades inútiles.
6. Objetivos: observar persistencia.
7. Korgan: verificar que no evita trampas enemigas ocultas.
8. Onod/Coloso: observar preparación sencilla.
9. Hougan: observar continuidad ofensivo/apoyo.
10. Repetir enfrentamientos para confirmar variedad de loadouts.

## Versión
- pública: v0.5.31
- cache PWA: `liga-mundos-0531`
