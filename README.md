# Calendario de adviento para mi novia preciosa

Calendario de Adviento estático, sin dependencias y listo para GitHub Pages.

## Personalizar

1. Reemplazá los textos y títulos de los 24 días en `mensajes.js`.
2. Copiá fotos a `assets/images/` con los nombres `day-01.jpg` hasta `day-24.jpg`.
3. Abre `index.html` para ver el calendario.

Las imágenes que acompañaban los sobres movidos conservan sus nombres originales: `day-09.jpg` aparece en el día 10 y `day-18.jpg` en el día 19. Las rutas de las fotos principales de los viajes, si se agregan, son `day-10.jpg` para el día 9 y `day-19.jpg` para el día 18. Los días 20 y 21 usan `day20.jpg` y `day21.jpg`.

## Apertura de sobres

- Cada sobre se habilita a las 00:00 de su día entre el 1 y el 24 de diciembre de 2026, en `America/Costa_Rica`. Los sobres abiertos se recuerdan en ese navegador.

## Publicar en GitHub Pages

1. Creá un repositorio y subí el **contenido de esta carpeta**, incluidos todos los archivos HTML, CSS y JS y la carpeta `assets/`, a la raíz.
2. En GitHub: **Settings → Pages**.
3. Elegí **Deploy from a branch**, rama `main` y carpeta `/(root)`; guardá.
4. GitHub mostrará la URL pública en esa pantalla en unos minutos.

No necesita claves, servidor ni instalar paquetes.

## Recursos visuales locales

Los sobres usan imágenes locales guardadas en `assets/art/`, no ilustraciones hechas con CSS. Hay cuatro variantes físicas de sobre. La portada no usa imágenes generadas: podés sumarle una foto real tuya más adelante si querés.

## Audios, videos y recuerdos de viaje

- Cada día puede incluir opcionalmente `audio` y `video` dentro de su objeto en `mensajes.js`. Mirá el comentario al principio del archivo para el formato.
- Los rincones **México** y **Guatemala** se editan en `recuerdos.js`: podés sumar todos los recuerdos que quieras y, en cada uno, indicar texto, foto, audio y video.
- Copiá los archivos a `assets/media/` (audios/videos) o `assets/images/` (fotos) y usá sus rutas locales. La guía concreta está en `assets/media/README.md`.
- Para que funcione bien en GitHub Pages, usá MP3 para audio y MP4/H.264 para video, preferiblemente comprimidos.

## Quizzes dentro de los días

Editá [quiz.js](quiz.js) para escribir las cinco claves. Vienen en los días 4, 8, 10, 16 y 20; podés moverlas cambiando `dia`. Cada una contiene exactamente cuatro opciones en `opciones`; `correcta` indica cuál es la buena empezando en 0 (primera opción), 1 (segunda), 2 o 3.

Cuando llega la fecha de un día con quiz, primero debe responder su pregunta correctamente para abrir la carta. Si falla, solamente ese sobre bloquea el siguiente intento hasta dos días calendario después.

## Días canción

Hay canciones en los días 1, 6, 12, 17, 19, 22 y 24. Personalizalas en `canciones.js`: cambiá título, artista y el motivo por el que te recuerda a ella. Podés mover una canción a otra fecha cambiando el número a la izquierda.

Para reproducirla, agregá la URL de inserción de YouTube en el campo `video`.

## Vales y viajes dentro de dias

Los vales aparecen dentro de las cartas: pelicula (dia 7), sushi (dia 14) y Yoba (dia 21). Al reclamarlos, quedan marcados solo en ese navegador.

México y Guatemala también viven dentro de los sobres: están en los días 9 y 18. En `recuerdos.js` podés editar los recuerdos y sus fotos, audios o videos.
## Prologo del 19 de noviembre

La portada incluye una sorpresa independiente para el 19 de noviembre de 2026. Es el dia 0: se abre a las 00:00 en Costa Rica, muestra una carta introductoria y permite mirar los 24 sobres de diciembre. Edita su texto en `mensajes.js`, bajo `noviembre19`; su foto opcional debe llamarse `assets/images/nov-19.jpg`.

