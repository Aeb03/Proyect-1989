# Liga de los Mundos v0.5.26 — Encuadre interior de Arena Central

## Objetivo
Corregir el encastre visual de Arena Central para que la cuadrícula 12×12 quede completamente dentro del suelo jugable.

## Regla visual
La jerarquía correcta queda:

1. Fondo / entorno
2. Arena Central
3. Suelo interior jugable
4. Cuadrícula 12×12 generada por la app
5. Obstáculos y elementos dinámicos
6. Miniaturas e indicadores

Las paredes, bordes y esquinas de la Arena deben quedar por fuera de la cuadrícula.

## Ajuste aplicado
La imagen de Arena Central sigue ocupando el contenedor completo.

La capa lógica del tablero y la capa de entidades se colocan juntas dentro del piso interior:

- left: 14%
- top: 14%
- width: 72%
- height: 72%

No se cambia ninguna coordenada lógica: sólo cambia la caja visual en la que se proyecta el tablero.

## Asset
Se conserva exactamente el asset aprobado:

`assets/arenas/central/arena-central-base.png`

La cuadrícula no forma parte de la imagen; la sigue generando Código.

## Caché
Asset solicitado con:
`arena-central-base.png?v=0526`

Service Worker:
`liga-mundos-0526`

## Sin cambios
- reglas;
- movimiento;
- alcance;
- línea de visión;
- IA;
- habilidades;
- turnos;
- cámara;
- miniaturas;
- obstáculos;
- Pilares/Brotes/trampas;
- HUD.

## Prueba recomendada
1. Confirmar v0.5.26.
2. Entrar al despliegue.
3. Verificar que las cuatro puntas de la cuadrícula queden dentro del piso.
4. Confirmar que ninguna casilla pisa las paredes.
5. Revisar que miniaturas y rocas continúen centradas.
6. Activar Mover y comprobar resaltados.
7. Probar las cuatro rotaciones.

## Estado
LISTA PARA PROBAR.
