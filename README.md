# Liga de los Mundos v0.5.37 — 24 vistas + Absorción Rocosa

## Estado
🟡 EN PRUEBA

Actualización combinada con dos objetivos concretos:

1. integrar las cuatro vistas rígidas de los 6 Campeones;
2. modificar exclusivamente Absorción Rocosa de Coloso.

---

## MINIATURAS — 6 Campeones × 4 vistas

Se integran:

- Arfeli;
- Coloso;
- Piplus;
- Onod;
- Korgan;
- Houngan.

Cada Campeón dispone de:

- `down-right`;
- `down-left`;
- `up-right`;
- `up-left`.

Todos los PNG se normalizaron a:

- formato RGBA;
- transparencia real;
- lienzo 768 × 768;
- misma altura visible aproximada;
- misma línea inferior de peana;
- centrado horizontal por silueta.

Piplus contenía un damero gris incrustado dentro de la zona opaca.
Ese fondo fue limpiado y convertido a transparencia real antes de normalizarlo.

La lógica de elección de vista sigue siendo la existente:
`facing + rotación de cámara`.

No hay animación corporal ni caminata.

---

## COLOSO — ABSORCIÓN ROCOSA

Sólo cambia esta habilidad.

### Valores que se mantienen

- Coste: 2 PA.
- Alcance: 3.
- Consume 1 Pilar propio.
- Pilar: máximo 20 PV.

### Nueva restricción de antigüedad

Un Pilar creado durante el turno actual de Coloso NO puede ser absorbido.

Al crearse, el Pilar guarda una marca interna del turno:

`round : turn : owner`

En un turno posterior esa marca ya no coincide y el Pilar pasa a ser válido.

### Nueva curación

Absorción Rocosa recupera PV iguales a los PV ACTUALES del Pilar.

Ejemplos:

- Pilar 20/20 → intenta curar 20.
- Pilar 15/20 → intenta curar 15.
- Pilar 8/20 → intenta curar 8.
- Pilar 1/20 → intenta curar 1.

La curación efectiva continúa limitada por los PV máximos de Coloso, como cualquier curación normal.

Después:
- el Pilar se consume;
- desaparece con la lógica/VFX actual.

### IA

La IA no puede seleccionar un Pilar creado durante el mismo turno porque usa la misma validación `canUseAbility`.

Además, su valoración de Absorción ahora usa los PV actuales del Pilar en vez de asumir 20.

No se modifica ningún otro criterio de IA de Coloso.

---

## NO CAMBIA

- Coloso: 115 PV.
- Creación de Pilar: 2 PA.
- Pilar: 20 PV.
- Armadura de Piedra.
- Fusión de Pilar.
- Monolito.
- Golpe Sísmico.
- Réplicas.
- ninguna otra habilidad.
- reglas globales.
- Arena Central.
- parallax.
- VFX.
- HUD.
- balance de otros Campeones.

---

## Archivos principales modificados

- `champion-assets.js`
- `champion-assets.css`
- `coloso-absorb-test.js`
- `ai-tactical.js`
- `index.html`
- `brand.js`
- `sw.js`
- `README.md`

Más los 24 PNG de combate.

## Prueba prioritaria

### Miniaturas
1. Probar los 6 Campeones.
2. Girar las 4 cámaras.
3. Confirmar que cada vista corresponde a su dirección.
4. Revisar escala y línea de peana.

### Absorción
1. Crear Pilar.
2. Intentar absorberlo en ese mismo turno → debe impedirlo.
3. Llegar a un turno posterior → debe permitirlo.
4. Dañar Pilar a 15 → curación 15.
5. Dañar Pilar a 8 → curación 8.
6. Confirmar consumo/desaparición normal.

## Versión

- pública: v0.5.37
- cache PWA: `liga-mundos-0537`
