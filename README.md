# Cancionero católico · Importación masiva

Esta versión contiene **163 cantos** importados de **245 documentos Word**. Las copias con el mismo nombre ubicadas en varias carpetas se agruparon y conservaron sus etiquetas. La clasificación que falta quedó sin asignar; no se añadieron categorías por suposición.

## Publicar la actualización en GitHub Pages

1. Abre el repositorio `Nube-13/Cancionero-Cat-lico`.
2. Si ya está publicada la versión anterior, sube **`index.html`, `styles.css`, `app.js` y `songs.js`** del ZIP. Es importante reemplazar los archivos antiguos por los nuevos.
3. Pulsa **Commit changes**. Espera al despliegue y recarga tu web con `Ctrl+F5`.
4. **No subas el ZIP**: descomprímelo antes. Los archivos deben estar en la raíz del repositorio.
5. No necesitas tocar Settings > Pages si ya está funcionando.

## Importante: revisar antes de hacerlo público

Esta es una **primera importación para validar**, no una transcripción garantizada al 100 %.

- Solo se extrajo la **primera página** de cada documento, según lo indicado; 70 documentos tienen páginas posteriores que pueden ser versiones diferentes o continuaciones del canto.
- Los acordes se han colocado según la posición que tenían en el documento. Algunas alineaciones complejas o canciones con dos columnas todavía pueden requerir retoques.
- Las notas declaradas en los encabezados y las posiciones originales de los acordes se han conservado en lo posible. En algunas canciones, el nombre del archivo y la tonalidad de los acordes no coinciden: revisa esos casos antes de considerarlos definitivos.
- Hay cuatro documentos donde no se detectaron acordes.
- **73 canciones** siguen sin momento asignado para no inventar una categoría.
- Se marcaron todas como **Por revisar** desde el punto de vista de la importación; esto **no** implica que nunca las hayas cantado.
- Ve a `INFORME_DE_REVISION.md` para ver todos los casos.
- **Derechos de autor:** si el sitio es público, las letras también se publican. Verifica permisos antes de difundir canciones protegidas.

## Añadir y corregir canciones

`songs.js` guarda las canciones: título, momento(s), tiempo(s), acorde base, secciones y acordes `{at, name}` donde `at` señala el carácter en el que entra cada acorde. Así, los acordes se mueven al transponer pero su posición respecto a la letra no cambia.

Si editas posteriormente una sola canción, basta subir nuevamente `songs.js` a GitHub. También puedes enviarme otro ZIP con nuevos documentos para preparar la siguiente importación masiva.
