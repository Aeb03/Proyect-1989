# Liga de los Mundos v0.5.30 — Balance consolidado de playtest

## Estado
🟡 EN PRUEBA

Esta versión implementa el paquete consolidado aprobado para los 6 Campeones y reemplaza versiones intermedias cuando existe conflicto.

## Reglas globales

### Herida
- máximo 3;
- daño por CADA casilla recorrida igual a las acumulaciones actuales;
- funciona con PM, habilidades, empujes, atracciones y desplazamientos forzados;
- al final del turno se reduce a la mitad redondeando hacia abajo.

### Veneno
- máximo 6;
- cada habilidad utilizada causa daño igual al Veneno actual;
- al final del turno se reduce a la mitad redondeando hacia abajo.

### Quemadura
- máximo 8;
- daño al inicio del turno;
- mismo daño al final;
- después se reduce a la mitad redondeando hacia abajo.

### Escudos
- duración global actualizada a 1 turno o hasta ser destruidos.

Parálisis no se modifica.

## Arfeli
- Corte con Espada: máximo 1 uso/turno.
- Portación de Escudo: 3 PA, 20 Escudo.
- Golpe de Martillo: sólo 4 casillas ortogonales.

## Coloso
- Absorción Rocosa: 2 PA.
- Fusión de Pilar: 3 PA.
- Réplica: detección sólo ortogonal.
- Cada Pilar participa máximo una vez por Golpe Sísmico.
- Se conserva colocación de Pilar adyacente a enemigos.

## Piplus
- Impulso ya no evita Herida.
- Ruptura de Marca: 16 daño, empuje 2.

## Onod
- máximo 3 Brotes;
- Retirar Brote: máximo 1/turno;
- Espina Venenosa: máximo 2 usos/turno;
- Savia Vital usa adyacencia ortogonal;
- Esporas Tóxicas: 8 daño;
- Despertar del Bosque activa simultáneamente TODOS los Brotes, 8 daño por Brote ortogonal, sin consumirlos ni empujar;
- Simbiosis usa adyacencia ortogonal.

## Korgan
- máximo 3 trampas activas;
- trampas enemigas invisibles;
- trampas propias/aliadas translúcidas;
- desarmar 1 trampa propia/turno a 0 PA;
- Pinchos: 3 PA, 10 daño + Herida 1, máximo 2 colocaciones/turno;
- Mina Eléctrica: 3 PA, 8 daño, -1 PA próximo turno, máximo 1 colocación/turno;
- Granada reemplaza Carga Explosiva y deja de ser trampa;
- Disparo de Caza: 12 daño, alcance 5 lineal;
- Gancho: 6 daño, atracción hasta 2 casillas;
- Paso del Cazador respeta Herida.

## Hougan
- Vínculo admite enemigo o aliado, máximo 1;
- Aguja Vudú daña enemigo o cura aliado 7 y aplica Vínculo;
- Muñeco enemigo: 16 PV / movimiento 3;
- Muñeco aliado: 30 PV / PM 4 / cura 50% del daño recibido redondeando hacia arriba;
- Transferencia: 2 PA;
- Maldición: 3 PA, alcance 3, 9 daño + Veneno 1, máximo 1 uso/turno, sin requisito de Vínculo;
- Dolor Reflejado eliminado;
- Transferencia de Dolor implementada: reparto 50/50, impar mayor a Hougan, persistente hasta desaparecer el Muñeco;
- Ritual del Dolor: 14 base, +6 con Muñeco asociado ortogonal, consume Vínculo.

## Implementación técnica
Para reducir riesgo de regresión, las nuevas reglas se aplican mediante:

- `balance-playtest.js`
- `balance-playtest.css`

La base `app.js` no se reconstruye.

Se mantienen los IDs históricos de algunas habilidades para preservar loadouts:
- `trap_snare` = Mina Eléctrica;
- `trap_bomb` = Granada;
- `reflected` = Transferencia de Dolor.

## Sin cambios intencionales
- HUD superior v0.5.29;
- Arena Central;
- cámara;
- selección de Campeones;
- miniaturas;
- estructura PWA;
- reglas no incluidas en el paquete aprobado.

## Pruebas prioritarias
1. Herida con PM, Impulso, Gancho, empujes y Paso del Cazador.
2. Veneno con múltiples habilidades y reducción al final.
3. Quemadura inicio/fin.
4. Escudos.
5. Réplica ortogonal de Coloso.
6. Tres Brotes + Despertar del Bosque.
7. Trampas ocultas + Mina + desarmar.
8. Granada centro/cardinales.
9. Vínculo aliado/enemigo de Hougan.
10. Muñeco aliado y redondeo hacia arriba.
11. Transferencia de Dolor con daño par/impar.
12. Ritual +6 sólo ortogonal y con Muñeco asociado.

## Versión
- pública: v0.5.30
- cache PWA: `liga-mundos-0530`
