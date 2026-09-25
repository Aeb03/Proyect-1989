# Liga de los Mundos v0.6.0 — EXPERIMENTAL SFX

## Estado
🧪 EXPERIMENTAL / PRUEBA MAYOR

## Punto de retorno
La v0.5.55 queda definida como CHECKPOINT ESTABLE.
Si esta integración no convence, se vuelve a v0.5.55.

## Contenido
Se integran los 26 MP3 del pack:
`Liga_de_los_Mundos_SFX_Aprobados_v1.zip`

Los archivos originales se copian sin normalizar, recortar ni modificar.

## Motor de audio
Canales lógicos preparados:
- MASTER
- MUSIC
- SFX_COMBAT
- SFX_UI

MUSIC queda preparado pero sin contenido.

Configuración:
- `audio-config-0600.js`
- volumen por canal
- ganancia individual por archivo

API de prueba:
- `LigaAudio.getState()`
- `LigaAudio.setChannelVolume('SFX_COMBAT', 0.8)`
- `LigaAudio.setGain('core.impacto', 0.9)`
- `LigaAudio.mute(true/false)`

## Inicialización en celular
No hay autoplay.

El AudioContext se desbloquea con el primer gesto real:
- pointer/touch/teclado

Después se precargan los 26 SFX.
Peso total aproximado del pack: 0.4 MB.

Si un archivo falla:
- la acción continúa;
- no se modifica ninguna mecánica;
- audio falla en silencio.

## Integración inicial

### SFX específicos
Arfeli:
- Dagas Danzantes
- Disparo con Arco
- Golpe de Martillo

Coloso:
- Absorción Rocosa
- Creación de Pilar
- Golpe Sísmico

Piplus:
- Marca
- Ruptura de Marca
- Impulso

Onod:
- Germinar
- Enredaderas
- Esporas Tóxicas

Korgan:
- Gancho
- Trampa de Pinchos al ACTIVARSE
- Trampa Eléctrica al ACTIVARSE

Houngan:
- Efigie/Muñeco
- Vínculo
- Dolor Reflejado / Transferencia de Dolor

### Korgan
Los nombres finales del ZIP son fuente de verdad:
- `trampa_pinchos.mp3` → Pinchos
- `trampa_electrica.mp3` → Eléctrica

Las trampas NO reproducen su SFX al colocarse.
Suena al activarse para no revelar información oculta.

### CORE
- curación: cuando una curación real recupera PV
- escudo: cuando un escudo real aumenta
- ruptura de escudo: cuando el escudo pasa de >0 a 0
- KO: sólo cuando un Campeón pasa a 0 PV
- proyectil + impacto: ataques sin SFX específico cuando mejora la lectura
- área: acciones de área sin específico / carga explosiva
- aparición: transformaciones/creaciones sin SFX específico

## Superposición
- máximo inicial: 3 SFX fuertes simultáneos
- deduplicación temporal para curación, escudo, áreas, KO y trampas
- separación típica proyectil→impacto: ~210 ms
- específico + resultado real se separan naturalmente por el timing de la habilidad

## Áreas
Los SFX principales se disparan una sola vez por acción.
El daño a múltiples objetivos NO reproduce una copia de audio por objetivo.

## No modifica
- daño
- curación
- escudo
- PA / PM
- estados
- IA
- movimiento
- resultado de habilidades
- balance
- reglas

## Archivos principales
- `audio-config-0600.js`
- `audio-engine-0600.js`
- `assets/audio/sfx/...`

## Versión
- pública: v0.6.0
- cache PWA: liga-mundos-0600
