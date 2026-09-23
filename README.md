# Liga de los Mundos v0.5.24 — Arena Central sin cuadrícula horneada

## Cambio principal
Se reemplaza el asset anterior de Arena Central por una nueva plataforma cuyo suelo no contiene una cuadrícula de casillas dibujada.

La cuadrícula visible pasa a ser exclusivamente la cuadrícula 12×12 generada por la app.

## Motivo
En la versión anterior coexistían dos mallas:
- la cuadrícula pintada dentro del arte;
- la cuadrícula lógica generada por Código.

Al no compartir exactamente la misma proyección, se veía un descuadre al mover, seleccionar o mostrar alcances.

## Nuevo asset
`assets/arenas/central/arena-central-base.png`

Verificado:
- PNG real;
- RGBA;
- transparencia exterior;
- 1774 × 887 px;
- proporción 2:1;
- plataforma completa;
- suelo limpio, sin casillas dibujadas.

## Arquitectura visual
1. Arena Central / plataforma.
2. Cuadrícula lógica 12×12 de la app.
3. Obstáculos y elementos dinámicos.
4. Miniaturas.
5. Indicadores.

## Se conserva
- coordenadas 12×12;
- movimiento;
- alcance;
- línea de visión;
- obstáculos;
- Pilares/Brotes/trampas;
- cámara y rotaciones;
- HUD;
- habilidades;
- IA;
- miniaturas.

## Prueba recomendada
1. Confirmar v0.5.24.
2. Verificar que sólo existe una cuadrícula visible.
3. Revisar que las cuatro puntas de la cuadrícula queden dentro del piso de la Arena.
4. Activar Mover y comprobar que el resaltado coincide exactamente con la malla.
5. Probar rotación de cámara.
6. Confirmar miniaturas y obstáculos centrados en sus casillas.

## Estado
LISTA PARA PROBAR.
El siguiente ajuste, si hiciera falta, será únicamente de encuadre del rombo sobre el piso.
