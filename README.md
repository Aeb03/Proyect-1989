# Liga de los Mundos v0.5.25 — Arena Central correcta + huella original

## Cambio principal
Se reemplaza el asset de Arena Central por la imagen exacta aprobada por Adrián.

La imagen correcta es:
- arena lisa;
- sin cuadrícula integrada;
- con emblema central;
- marco isométrico aprobado.

## Corrección de encuadre
La versión anterior reducía y desplazaba la cuadrícula lógica para intentar adaptarla al arte.

En v0.5.25 se hace lo contrario:

**la geometría original de Código vuelve a ser la referencia.**

La cuadrícula 12×12 vuelve a:
- ocupar el 100% del contenedor isométrico;
- conservar su ángulo original;
- conservar su altura y posición originales;
- mantener las mismas coordenadas de miniaturas y obstáculos.

El asset visual se adapta al contenedor del tablero, no al revés.

## Asset
`assets/arenas/central/arena-central-base.png`

El archivo aprobado llegó como imagen RGB con fondo negro. Se conserva exactamente el dibujo y se usa un recorte romboidal CSS para evitar que el fondo rectangular invada el escenario.

## Caché
El asset se solicita como:
`arena-central-base.png?v=0525`

Esto fuerza a la app y al Service Worker a dejar de reutilizar la imagen anterior.

## Sin cambios
- mecánicas;
- 12×12 lógico;
- movimiento;
- alcance;
- línea de visión;
- IA;
- habilidades;
- HUD;
- miniaturas;
- obstáculos;
- cámara.

## Prueba
1. Confirmar v0.5.25.
2. Verificar que aparece la Arena correcta.
3. Confirmar que la cuadrícula tiene el mismo tamaño/posición que antes de integrar imágenes.
4. Revisar las cuatro puntas.
5. Activar Mover y comprobar que miniaturas, casillas y resaltados siguen coincidiendo.
6. Probar las cuatro rotaciones.

## Estado
LISTA PARA PROBAR.
