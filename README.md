# Cánticos — acordes alineados como en Word

Esta versión del cancionero conserva **la ubicación horizontal de los acordes en el documento original**: cada acorde aparece justo encima de la letra donde entraba, sin empujar palabras hacia la derecha.

## Actualizar tu página de GitHub Pages

1. Descomprime el ZIP y abre tu repositorio `Nube-13/Cancionero-Cat-lico`.
2. Ve a **Add file → Upload files**; arrastra los archivos `index.html`, `styles.css`, `songs.js`, `app.js`, `.nojekyll` (no el ZIP ni la carpeta contenedora).
3. GitHub te preguntará si quieres reemplazar los archivos existentes; confirma los reemplazos.
4. Pulsa **Commit changes**. Espera unos minutos y recarga tu página usando Ctrl+F5.

No necesitas configurar GitHub Pages de nuevo.

## Al agregar una canción en `songs.js`

Cada línea puede guardarse de dos formas:

**Opción fácil (ancla el acorde en la siguiente sílaba):** `"Una [G]espiga dorada por el sol,"`

**Opción fiel al Word (posición precisa):**

```js
{ text: "Una espiga dorada por el sol,", chords: [{ at: 6, name: "G" }] }
```

`at` es la posición del carácter al que va anclado el acorde, contando desde 0. Las estrofas del ejemplo ya están ajustadas a partir de la posición de cada acorde en el Word recibido.

Usa `+` y `−` para transponer por semitonos, `Original` para volver a Sol, y **Ocultar acordes** si quieres ver solo la letra.

> Publica textos de canciones protegidas únicamente si cuentas con permiso o licencia adecuada.
