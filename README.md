# Liga de los Mundos v0.5.55 — Inicio + Muñecos Vudú

## Estado
🟡 LISTA PARA PROBAR

## INICIO
Se conserva el Inicio modular existente.

Correcciones:
- se recorta visualmente la escena que seguía apareciendo por debajo del marco;
- el fondo ya no debe sobresalir bajo el recuadro inferior;
- se reducen las esquinas inferiores;
- las esquinas inferiores buscan el mismo peso visual que las superiores;
- la punta inferior central queda más recortada por el borde físico de la pantalla;
- no se reemplaza el Inicio por una imagen compuesta.

## MUÑECOS VUDÚ

### Artes corregidos
La asignación visual queda:
- Muñeco de 16 PV → set de vistas `muneco-houngan-02`
- Muñeco de 30 PV → set de vistas `muneco-houngan-01`

Esto corrige el intercambio anterior.

### 4 vistas
Ambos Muñecos usan:
- down-right
- down-left
- up-left
- up-right

La vista responde a la dirección visual y a la rotación de cámara.
Al iniciar movimiento del Muñeco también se guarda una dirección visual de marcha.

### Tamaño
El tamaño de referencia es el que tenía visualmente el Muñeco de 30 PV antes de esta corrección.
Los dos Muñecos quedan normalizados para verse aproximadamente a esa misma escala.

## No cambia
- PV reales de 16 / 30;
- PM;
- vínculo;
- curación/reflejo;
- Transferencia de Dolor;
- reglas;
- balance;
- IA;
- resto del combate.

## Versión
- pública: v0.5.55
- cache PWA: liga-mundos-0555
