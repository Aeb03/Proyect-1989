# Liga de los Mundos v0.5.38 — Corrección de mapeo de vistas

## Estado
🟡 EN PRUEBA

Corrección puntual del mapeo visual de las 24 vistas de miniaturas integradas en v0.5.37.

No se modifican ni regeneran los PNG.
No se modifica escala, transparencia, peana, cámara, lógica ni mecánicas.

## Mapeo corregido

### Arfeli
- down-right → usa imagen down-left
- down-left → usa imagen down-right
- up-right → usa imagen up-left
- up-left → usa imagen up-right

### Coloso
- down-right → usa imagen down-left
- down-left → usa imagen down-right
- up-right → sin cambio
- up-left → sin cambio

### Piplus
- down-right → usa imagen down-left
- down-left → usa imagen down-right
- up-right → sin cambio
- up-left → sin cambio

### Onod
- down-right → usa imagen down-left
- down-left → usa imagen down-right
- up-right → sin cambio
- up-left → sin cambio

### Korgan
- down-right → usa imagen down-left
- down-left → usa imagen down-right
- up-right → usa imagen up-left
- up-left → usa imagen up-right

### Houngan
- down-right → usa imagen down-left
- down-left → usa imagen down-right
- up-right → usa imagen up-left
- up-left → usa imagen up-right

## Sin cambios
Se conserva exactamente la v0.5.37 en todo lo demás, incluyendo:
- Absorción Rocosa;
- balance;
- IA;
- Arena Central;
- parallax;
- VFX;
- HUD;
- assets de miniaturas.

## Archivos modificados
- `champion-assets.js`
- `index.html`
- `brand.js`
- `sw.js`
- `README.md`

## Prueba recomendada
1. Entrar con cada Campeón.
2. Girar las 4 cámaras.
3. Confirmar que cada dirección visual coincide con:
   - down-right
   - down-left
   - up-right
   - up-left

## Versión
- pública: v0.5.38
- cache PWA: `liga-mundos-0538`
