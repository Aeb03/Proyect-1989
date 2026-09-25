# Liga de los Mundos v0.5.45 — Fix panel inferior + centrado laterales

## Estado
🟡 EN PRUEBA

## Referencia visual
La captura aprobada donde el panel inferior aparece como una sola consola continua
se toma como objetivo de integración.

## Panel inferior
Se corrige el desorden observado en v0.5.44.

Cambios:
- una sola base continua;
- controles izquierdos alineados sobre sus tres huecos;
- ficha del Campeón contenida;
- cuatro habilidades del mismo tamaño;
- Mover / Fin turno alineados;
- eliminación de marcos duplicados que se superponían;
- selected / disabled siguen usando la familia gráfica suministrada;
- acciones contextuales permanecen funcionales.

No se toca:
- posición global;
- lógica;
- habilidades;
- PA;
- PM;
- estados;
- IA.

## Paneles laterales
Se fuerza centrado geométrico de cada ficha en modo vertical.

Especialmente en RIVALES:
- avatar centrado;
- recuadro centrado;
- barra de Vida centrada;
- compensación óptica mínima del asset rojo.

TU EQUIPO usa el mismo eje de centrado para mantener simetría.

## Versión
- pública: v0.5.45
- cache PWA: `liga-mundos-0545`
