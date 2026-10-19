# Cánticos · Cancionero católico digital (actualización 2)

Esta es la versión personalizada para **cantos por momentos y ocasiones**; no está limitada a la misa. Utiliza GitHub Pages, sin pago, servidor adicional ni base de datos.

## Qué cambiamos

- Los filtros principales ahora son **momentos y ocasiones**, no tipos exclusivos de misa.
- Aparece **Virgen María** junto a Entrada, Ofertorio, Comunión, Salida, Adoración y Alabanza.
- El menú **Todos los momentos** también contiene Señor, ten piedad, Gloria, Salmo responsorial, Aleluya, Santo, Cordero de Dios, Encuentro de oración y Otros; puedes sumar más opciones en `songs.js`.
- El primer canto real de la biblioteca es **Una espiga dorada**, importado de tu `.docx`, con 4 estrofas, etiqueta **Comunión**, tonalidad **G (Sol mayor)** y transposición en semitonos.
- Los cinco cantos ficticios de prueba de la versión anterior se han quitado para que tu biblioteca empiece con **tu primer canto**.

## Actualizar la página ya publicada en GitHub

Tu repositorio es `Nube-13/Cancionero-Cat-lico`. No crees otro ni cambies la configuración de Pages.

1. Descomprime `cancionero-catolico-actualizado.zip` en tu equipo.
2. Entra en tu repositorio: https://github.com/Nube-13/Cancionero-Cat-lico
3. Haz clic en **Add file → Upload files**.
4. Arrastra los archivos **que están dentro de la carpeta descomprimida** (no la carpeta ni el ZIP) hasta la raíz del repositorio:
   - `index.html`
   - `styles.css`
   - `app.js`
   - `songs.js`
   - `README.md`
   - `.nojekyll` (opcional si ya existe)
5. Si GitHub te pide confirmar que se reemplazan archivos con el mismo nombre, confírmalo.
6. Pulsa **Commit changes**. Espera unos minutos a que termine la publicación automática.
7. Abre https://nube-13.github.io/Cancionero-Cat-lico/ y recarga con **Ctrl + F5** si ves la versión anterior.

> GitHub no acepta carpetas vacías ni el archivo ZIP como página. **Los archivos deben quedar al mismo nivel** en la raíz. Si GitHub no te permite reemplazar con Upload files, edita los archivos existentes desde el ícono del lápiz o usa GitHub Desktop para sincronizar la carpeta.

## Cómo agregar el siguiente canto

Abre `songs.js` en GitHub, pulsa el lápiz y revisa `window.CANCIONERO_SONGS`. Cada canción es un objeto dentro de `[...]`.

- `id`: identificador único, por ejemplo `ven-espiritu-santo`.
- `title`: título de la canción.
- `author`: autor conocido o «Autor no indicado».
- `moments`: momentos/ocasiones. Puedes usar **varios**: `["Entrada", "Virgen María"]`.
- `seasons`: tiempo litúrgico si se conoce; `[]` si aún no se ha asignado.
- `key`: tonalidad original en notación internacional, `G`=Sol, `D`=Re, `C`=Do.
- `sections`: estrofas y líneas, colocando los acordes como `[G]`, `[D7]`, `[Bbm]`.

La canción **Una espiga dorada** fue transcrita conservando la letra, la estructura y **todos los acordes del Word, incluido Bbm en la última estrofa**. Como el Word alinea los acordes con espacios en tipografía proporcional, su posición sobre cada palabra es **aproximada** y conviene revisarla cantando antes de usarla en público.

La transposición cambia automáticamente los acordes sin modificar la letra; no verifica si un acorde del documento es musicalmente correcto.

### Lista de momentos

Edita `window.CANCIONERO_MOMENTS` al principio de `songs.js` para añadir o renombrar momentos. El menú desplegable mostrará todas las nuevas opciones; los botones principales de acceso rápido se modifican en `index.html` si deseas añadir otro botón visible.

## Nota de derechos de autor

El documento Word aportado por la usuaria permite preparar técnicamente la importación, pero **no acredita por sí solo permiso para publicar en la web**. Antes de hacer pública la letra completa y su armonización, comprueba la titularidad, licencia o autorización de reproducción. Los repositorios públicos de GitHub Pages muestran el contenido a cualquiera.

## Archivos

`index.html` → estructura y botones visibles de la web.  
`styles.css` → estilos y experiencia móvil.  
`app.js` → búsqueda, filtros, favoritos, transposición.  
`songs.js` → momentos, categorías disponibles y canciones.  
`README.md` → estas instrucciones.  
`.nojekyll` → compatibilidad sencilla con GitHub Pages.
