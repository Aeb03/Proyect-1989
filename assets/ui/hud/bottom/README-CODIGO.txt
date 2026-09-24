LIGA DE LOS MUNDOS — PANEL INFERIOR v1

OBJETIVO
Piel gráfica técnica del panel inferior de combate.
NO cambia distribución, tamaños funcionales, lógica ni contenido dinámico.

ARCHIVOS
- bottom-panel-base-horizontal.png
  Marco general del panel inferior horizontal.
  Contiene: columna de controles izquierda, zona del campeón, cuatro zonas de habilidades
  y sector derecho de acciones. Usar como base principal.

- bottom-panel-controls-left.png
  Columna izquierda para controles pequeños.

- bottom-panel-champion-card.png
  Marco de la ficha del campeón activo.

- skill-slot-normal.png
  Slot base de habilidad disponible.

- skill-slot-selected.png
  Slot de habilidad seleccionada / resaltada.

- skill-slot-disabled.png
  Referencia de slot deshabilitado.
  Si conviene, este estado también puede resolverse por CSS bajando brillo/opacidad.

- action-button-move.png
  Botón azul principal para "Mover".

- action-button-end-turn.png
  Botón dorado para "Fin turno".

- action-button-secondary-gold.png
  Botón secundario reutilizable para acciones contextuales:
  Salir de Monolito, Consumir Pilar, Retirar Brote, Desarmar Trampa, etc.

REGLAS
- Mantener la estructura actual:
  controles | campeón | 4 habilidades | acciones.
- No agregar barras nuevas de Vida/Mana/Stats.
- Todo texto, iconos funcionales, avatar, nombre, PV/PA/PM, estados y contadores
  siguen siendo HTML/CSS dinámicos por encima del marco.

SUGERENCIA DE ESTADOS DE HABILIDAD
- NORMAL: skill-slot-normal.png
- SELECCIONADA: skill-slot-selected.png
- DESHABILITADA: skill-slot-disabled.png o CSS equivalente
- PULSADA: feedback táctil breve por CSS (brillo/sombra/scale)

SUGERENCIA DE ESTADOS DE BOTÓN
- MOVER: base azul + brillo leve al hover/press
- FIN TURNO: base dorada + leve incremento de contraste al hover/press

IMPORTANTE
- Los PNG tienen transparencia RGBA.
- Si una pieza grande necesita adaptarse, preferir 9-slice en lugar de escalarla como foto.
- Probar primero sobre la estructura real actual del combate.
