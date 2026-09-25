LIGA DE LOS MUNDOS — SPLASH + INICIO v1

OBJETIVO
Probar como una sola experiencia:
1) apertura de la app,
2) introducción breve de Liga,
3) pantalla Inicio / Entrar al circuito.

DIRECCIÓN APROBADA
La entrada debe sentirse como la transmisión oficial del deporte más visto de la galaxia.
No es TV retro ni una TV doméstica moderna: es un display premium del universo de Liga.

ARCHIVOS
- icon-192.png
- icon-512.png
- icon-maskable-512.png
  Nuevo icono de la app, con margen seguro para Android/PWA.

- intro-splash-aprobado.png
  Composición visual aprobada para la introducción breve.

- inicio-composicion-aprobada.png
  Composición visual aprobada de Inicio.

- inicio-boton-referencia.png
  Referencia visual aislada del botón principal.

- inicio-hitbox.json
  Zona proporcional del botón en la composición aprobada.

IMPLEMENTACIÓN RECOMENDADA

A) SPLASH DEL SISTEMA
No intentar convertir el splash nativo de Android/PWA en una escena compleja.
Usar:
- icon-192 / icon-512 / icon-maskable-512
- fondo azul noche muy oscuro, sugerido: #07111A

El splash del sistema dura sólo lo que necesite la carga.

B) INTRO PERSONALIZADA
Justo después del splash del sistema, mostrar:
intro-splash-aprobado.png

Duración sugerida para la PRUEBA:
aprox. 1.2–1.8 s, con fade corto hacia Inicio.

Esto permite conservar la introducción visual aprobada sin pelear contra las limitaciones del splash del sistema.

C) INICIO
Para esta primera integración, usar inicio-composicion-aprobada.png como composición visual completa.

IMPORTANTE:
- renderizarla con object-fit: contain;
- conservar la imagen completa, sin recortar marco superior/inferior/laterales;
- centrarla;
- usar fondo exterior azul noche/negro, no estirar la imagen de forma no proporcional.

El botón "ENTRAR AL CIRCUITO" puede implementarse inicialmente como un área táctil transparente
encima del botón pintado en la composición.

La zona proporcional sugerida está en:
inicio-hitbox.json

La hitbox debe calcularse respecto del rectángulo REAL en el que se renderiza la imagen tras object-fit: contain,
NO respecto del viewport completo.

NO CAMBIAR EN ESTA PRUEBA
- flujo de navegación;
- texto funcional;
- lógica;
- destino del botón;
- orientación landscape.

OBJETIVO DE LA PRUEBA
Validar en celular:
- splash nativo -> intro personalizada -> Inicio;
- lectura del nuevo icono;
- encuadre del display;
- ausencia de cortes;
- sensación de transmisión oficial;
- área táctil correcta de "Entrar al circuito".

Si esta prueba queda aprobada, en una segunda pasada se puede modularizar Inicio
(fondo, marco-display, logo, texto y botón dinámicos) para mayor flexibilidad futura.
