# Liga de los Mundos v0.5.33 — Sistema general de VFX

## Estado
🟡 EN PRUEBA

Primera capa general reutilizable de efectos visuales de combate.

## Regla principal
Los VFX son exclusivamente una capa de presentación.

No modifican:
- daño;
- curación;
- PA;
- PM;
- alcance;
- estados;
- movimiento;
- IA;
- orden de resolución.

Si un VFX falla, la mecánica debe continuar normalmente.

## Arquitectura
Se agregan:

- `visual-effects.js`
- `visual-effects.css`

Existe una API general:

`window.LigaVFX`

Métodos:
- `damage(subject, n)`
- `heal(subject, n)`
- `impact(subject, variant)`
- `projectile(from, to, variant)`
- `shield(subject)`
- `area(cells, variant)`
- `status(subject, icon, label)`
- `spawn(subject, variant)`
- `vanish(subject, variant)`
- `ko(subject)`
- `forced(subject, source, away)`

Esto permite reutilizar el mismo motor con estilos futuros por Campeón.

## Sistemas incorporados

### Daño flotante
Cualquier pérdida real de PV genera:
- impacto breve;
- número negativo;
- desplazamiento hacia arriba;
- desaparición automática.

Si un Escudo absorbe todo el golpe, se muestra pérdida de Escudo.

### Curación
Cualquier recuperación real de PV muestra un número positivo.

### Impacto
Flash/chispa breve localizado sobre la pieza.

### Proyectil
Sistema genérico de origen → objetivo.

Primera conexión en:
- Arfeli: Arco;
- Coloso: Roca;
- Onod: Espina;
- Piplus: Marcador / Preciso / Vectorial;
- Korgan: Disparo de Caza;
- Hougan: Aguja / Maldición.

### Escudo
Pulso protector breve al aplicar Escudo.

### Área
Pulso por casilla.

Primera conexión:
- Esporas Tóxicas;
- Granada;
- Golpe Sísmico;
- Despertar del Bosque.

### Estado aplicado
Feedback breve para:
- Herida;
- Veneno;
- Quemadura;
- Marca;
- Vínculo;
- pérdida de PA;
- pérdida de PM.

El indicador permanente sigue perteneciendo al HUD/motor existente.

### Empuje / atracción
Se muestra un impulso direccional antes/durante el movimiento forzado.

No anima caminata.
La pieza sigue siendo movida por el sistema mecánico existente.

### Aparición de piezas
Pulso reutilizable para:
- Pilares;
- Brotes;
- Muñecos;
- trampas.

No crea ni modifica el asset de la pieza.

### Desaparición / destrucción
Efecto general para objetos destruidos, consumidos o retirados.

### KO
Indicador deportivo `KO`.

No representa muerte.

## Rendimiento
- capa global única;
- `pointer-events:none`;
- máximo 60 nodos simultáneos;
- limpieza automática;
- animaciones breves;
- sin timers permanentes;
- sin canvas pesado;
- sin assets adicionales.

## Compatibilidad
Se conserva:
- balance v0.5.30;
- IA táctica v0.5.31;
- aproximación IA v0.5.32;
- Arena Central;
- HUD superior;
- miniaturas rígidas;
- cámara.

## Fuera de esta versión
NO se incorpora:
- caminata;
- balanceo de peana;
- animación corporal;
- cambio de pose;
- frames extra de Campeones.

## Prueba prioritaria
1. Atacar y comprobar impacto + daño flotante.
2. Curar y comprobar número positivo.
3. Aplicar Escudo.
4. Usar Arco/Roca/Espina para ver proyectil.
5. Usar Esporas o Granada para ver área.
6. Aplicar Herida/Veneno.
7. Crear Pilar/Brote/Muñeco/trampa.
8. Destruir o consumir una pieza.
9. Empujar/atraer.
10. Llevar un Campeón a 0 PV y comprobar KO.
11. Confirmar que todas las mecánicas siguen resolviendo aunque haya varios VFX seguidos.

## Versión
- pública: v0.5.33
- cache PWA: `liga-mundos-0533`
