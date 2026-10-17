# DERIVA · Una ciudad entre estrellas

Juego de construcción y gestión de una colonia espacial vertical, en español. HTML, CSS y JavaScript con Canvas 2D; sin bibliotecas, servicios externos, imágenes descargadas ni recursos de pago. Gráficos pixel art y sonido sintetizado originales.

## Ejecutar

Abre `index.html` en un navegador moderno (Chrome, Edge o Firefox). No necesita instalación, compilación ni conexión a Internet. Mantén los cuatro archivos de código en la misma carpeta. Si tu navegador restringe localStorage al abrir archivos locales, usa un servidor local.

Alternativa con Node.js: ejecuta `node server.js` y abre http://localhost:8080. Alternativa con Python instalado: `python -m http.server 8080` desde esta carpeta.

## Cómo jugar

Empiezas con una isla, 8 habitantes y reservas. Construye dos viviendas, una granja y un aserradero. Pulsa Esc, selecciona los edificios y asigna trabajadores con los botones + y −. Añade una cantera para piedra y metal. No se asignan empleados automáticamente: puedes decidir todas las prioridades.

Los edificios ocupan 2 casillas de ancho y 1 piso; las conexiones ocupan 1 casilla. Debe haber soporte en todo el ancho. Para subir, construye una escalera en planta baja junto a los edificios y apila tramos. Un tramo conecta su piso con el inmediatamente inferior. Los pisos tienen acceso horizontal a través de edificios adyacentes. Los edificios sin conexión a la planta baja no producen ni ofrecen servicios. Los puntos verdes muestran empleos ocupados; el punto naranja indica falta de acceso.

Construye generadores y laboratorios, asigna investigadores y abre Investigación. Ingeniería orbital desbloquea ascensores y expediciones: cada expedición conecta una isla mediante un puente. Cultivos adaptativos mejora toda producción un 30 %. Comunicaciones permite construir la antena.

Cada 32 segundos de simulación pueden llegar hasta 4 habitantes, si hay camas libres, felicidad ≥ 63 % y comida superior a la mitad de la población. Cada vivienda aporta 6 camas. Cada empleado del centro recreativo atiende a 18 personas. La felicidad combina vivienda/descanso, alimentación y entretenimiento. Los colonos caminan por conexiones transitables hacia sus empleos y regresan a descansar en ciclos de 24 segundos; la producción se calcula por personal asignado, sin esperar al trayecto visual. El hambre reduce la felicidad y detiene la inmigración, sin muertes ni bloqueos irreversibles.

La meta inicial es llegar a 50 habitantes y tener una antena conectada, operativa y con energía. Después puedes seguir jugando. Un ciclo completo suele requerir 10–20 minutos de simulación según tus decisiones; acelera a ×4 si lo prefieres.

## Recursos y eventos

- Comida: granjas; consumo de 0,09 por habitante/s.
- Madera: aserraderos; generadores consumen 0,08 por trabajador/s.
- Piedra y metal: cantera, con reservas renovables para permitir recuperarse.
- Energía: generadores; laboratorios, ocio, ascensores y antena la consumen.
- Ciencia: laboratorios; se utiliza en investigaciones.

La cápsula inicial guarda 250 de cada recurso. Cada almacén conectado añade 250. Los recursos llenos dejan de acumularse. Los edificios muestran sus costes y su efecto. Las acciones inválidas explican el requisito que falta. Cada 85 segundos hay un evento: plaga de comida, avería o hallazgo de metal. Repara averías desde el panel del edificio por 5 piedra y 3 metal. Desmontar devuelve la mitad del coste y se bloquea si dejaría estructuras sin soporte o conexión.

## Controles

| Acción | Control |
| --- | --- |
| Construir | Elegir en el menú inferior y hacer clic en el mundo |
| Inspeccionar / asignar | Esc y clic en un edificio |
| Cancelar | Esc o clic derecho |
| Mover cámara | Arrastrar, WASD o flechas |
| Zoom | Rueda, + / − o botones |
| Centrar | Botón ⌖ |
| Pausa | Espacio o Ⅱ |
| Velocidad | Teclas 1, 2, 4 o botones ×1, ×2, ×4 |
| Tutorial | Botón ? |
| Guardar, exportar, importar, reiniciar | Botón ☰ |
| Música y efectos | Botón ♫ (requiere un clic para activar audio) |

Los paneles modales pausan la simulación. El guardado automático se realiza cada 10 segundos de juego, al construir y al cerrar/ocultar la página. La partida vive en localStorage del navegador; puedes exportarla a JSON y volver a importarla. No hay progreso mientras el juego está cerrado. Reiniciar requiere una confirmación y elimina la partida actual.

## Organización

- `index.html`: estructura e interfaz en español.
- `style.css`: diseño adaptable, paneles y controles.
- `model.js`: simulación, costes, conexión estructural, empleos, felicidad, eventos e investigación. También exportable en Node para pruebas.
- `render.js`: mundo Canvas, pixel art procedural, cámara, colonos y rutas.
- `game.js`: controles, interfaz, guardado, tutorial y audio Web Audio.
- `server.js`: servidor local opcional, solo módulos incluidos en Node.
- `test.js`: pruebas de reglas y una partida completa automatizada. Ejecuta `node test.js`.

Primera versión: tres islas, máximo 19 pisos, recursos renovables y hasta dos empleos por edificio productivo. Pensada para ratón y teclado; los paneles se adaptan a pantallas pequeñas y se puede arrastrar con un dedo. No usa cuentas, analítica ni conexiones de red.
