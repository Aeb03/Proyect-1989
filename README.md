# Liga de los Mundos v0.5.53 — Corrección Inicio + Splash/Intro

## Estado
🟡 LISTA PARA PROBAR EN CELULAR

## 1. Inicio
Se mantiene la escala general del fondo / escena interior.

Se corrige exclusivamente el marco-display:
- se extiende más hacia los extremos;
- gana cobertura lateral;
- gana cobertura superior e inferior;
- en celulares muy anchos se sobredimensiona ligeramente;
- continúa implementado con `border-image` / 9-slice;
- NO se transforma en una fotografía estirada.

Logo, textos, botón y versión continúan separados y dinámicos.

## 2. Splash nativo
Se mantiene simple:
- icon-192
- icon-512
- icon-maskable-512
- fondo #07111A

No usa la composición del Inicio.

## 3. Intro breve
Se reemplaza el asset de Intro por la imagen dedicada suministrada en esta corrección:
- `assets/ui/start/intro-splash.png`

La Intro:
- conserva duración de 1.5 s;
- conserva fade corto;
- no tiene interacción;
- usa `contain` sobre fondo #07111A para evitar recortar la composición en pantallas muy anchas.

## 4. Inicio interactivo
Permanece modular:
- fondo de escena;
- marco-display;
- logo;
- textos;
- botón normal / pressed;
- icono de espadas;
- versión.

## 5. PWA instalada
Se arrastra también el hotfix de v0.5.52:
- start_url versionado;
- navegación network-first/no-store para el shell;
- activación segura del Service Worker nuevo desde Inicio.

## No cambia
- navegación del botón Entrar al circuito;
- Lobby;
- combate;
- reglas;
- balance;
- IA;
- HUD;
- orientación landscape.

## Versión
- pública: v0.5.53
- cache PWA: liga-mundos-0553
