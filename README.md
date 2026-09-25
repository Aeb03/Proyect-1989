# Liga de los Mundos v0.5.51 — Splash + Intro + Inicio Modular

## Estado
🟡 LISTA PARA PROBAR EN CELULAR

## Alcance
Actualización exclusivamente visual del flujo de apertura:

1. Splash nativo de la PWA.
2. Intro personalizada breve.
3. Inicio modular.

No se modifica el destino ni la navegación del botón `ENTRAR AL CIRCUITO`.

## 1. Splash nativo
Se reemplazan los iconos por los suministrados:
- `icon-192.png`
- `icon-512.png`
- `icon-maskable-512.png`

Manifest:
- background: `#07111A`
- theme: `#07111A`
- orientation: landscape

Nota: Android/launcher puede conservar temporalmente el icono/splash de una PWA
ya instalada. Si no cambia después de la actualización, puede requerir reinstalar
el acceso/PWA para validar el splash nativo definitivo.

## 2. Intro
Asset:
- `assets/ui/start/intro-splash.png`

Prueba actual:
- 1.5 s visible
- fade de ~0.28 s
- sin interacción
- se ejecuta una vez por carga de página

## 3. Inicio modular
Assets de runtime:
- `inicio-fondo.png`
- `inicio-marco-display.png`
- `inicio-logo-liga.png`
- `inicio-boton-normal.png`
- `inicio-boton-pressed.png`
- `inicio-icono-espadas.png`

La referencia compuesta `mockup-referencia-NO-USAR.png` NO se incluye ni se usa
en runtime.

### Fondo
`cover`, centrado.

### Marco
Se adapta mediante `border-image` / 9-slice.
No se usa como una fotografía estirada completa.

### Elementos independientes
- Logo.
- Texto principal.
- Lema.
- Botón.
- Icono de espadas.
- Versión.

Los textos y la versión son HTML dinámico.

## Botón
El script captura y reutiliza el callback del botón existente creado por
`showStart()`. Por lo tanto se conserva el mismo destino funcional actual.

Estados:
- normal → `inicio-boton-normal.png`
- pressed → `inicio-boton-pressed.png`

## Responsive
- fondo: cover
- marco: 9-slice
- contenido: posiciones relativas con zona segura ~4–5%
- ajustes especiales para celulares landscape de poca altura

## No modifica
- lobby
- navegación
- combate
- reglas
- balance
- IA
- HUD de combate
- orientación landscape
- destino de Entrar al circuito

## Versión
- pública: v0.5.51
- cache PWA: `liga-mundos-0551`
