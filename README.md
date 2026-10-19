# Cánticos · Cancionero católico digital

El nombre **Cánticos** y los colores verde/salvia son provisionales; podemos personalizar el nombre, el logo y la paleta para tu comunidad.

Esta es una **plantilla de sitio web estático**, lista para GitHub Pages. No requiere pago, base de datos, instalación de programas ni frameworks.

## ¿Qué hace?

- Busca por título, palabras de la letra y etiquetas.
- Filtra por tipo de canción, momento y tiempo litúrgico.
- Muestra la letra con acordes encima de las palabras.
- Transpone los acordes **un semitono por clic** (incluye acordes menores, séptimas y bajos alternativos: `Am`, `F#m7`, `D/F#`).
- Permite mostrar/ocultar acordes, ampliar la letra e imprimirla.
- Guarda favoritos **en el navegador del dispositivo**, no en cuentas compartidas.
- Funciona en computadoras y celulares.

## PASO 1. Probar la página en tu computadora

Descomprime la carpeta y haz doble clic en `index.html`. La web ya funciona sin configuración adicional.

## PASO 2. Publicar GRATIS en GitHub Pages

1. Entra en https://github.com/ e inicia sesión o crea una cuenta.
2. Haz clic en **New repository**.
3. Nombra el repositorio `cancionero-catolico`, selecciona **Public** y **Create repository**.
4. En el repositorio, haz clic en **Add file → Upload files** (si aún está vacío, usa el enlace **uploading an existing file**).
5. **Sube todos los archivos DESCOMPRIMIDOS**, directamente al repositorio: `index.html`, `styles.css`, `app.js`, `songs.js`, `README.md` y, si tu sistema permite mostrar archivos ocultos, `.nojekyll`. NO subas únicamente el ZIP y NO guardes los archivos dentro de una carpeta adicional.
6. Guarda con **Commit changes**.
7. Ve a **Settings → Pages → Build and deployment**.
8. En **Source**, elige **Deploy from a branch**; selecciona `main` y `/ (root)`; presiona **Save**.
9. Abre la URL que aparecerá en Pages, normalmente `https://TU-USUARIO.github.io/cancionero-catolico/`.

Si cambias el nombre del repositorio, cambiará la parte final de tu enlace. GitHub indica que la primera publicación puede tardar hasta 10 minutos.

## PASO 3. Agregar canciones

Abre `songs.js`. Dentro de `window.CANCIONERO_SONGS = [ ... ];` encontrarás los cantos de muestra. Duplica un objeto de canción completo (desde `{` hasta `},`) y cambia los datos.

```js
{
  id: "mi-nueva-cancion",            // único, sin espacios ni tildes
  title: "Mi nueva canción",
  author: "Nombre del autor / fuente",
  category: "misa",                   // misa, alabanza, adoracion, mariano
  moments: ["Entrada", "Salida"],     // una o varias etiquetas
  seasons: ["Adviento"],              // una o varias etiquetas
  key: "G",                           // tonalidad original
  keywords: ["alegría", "asamblea"],
  description: "Descripción opcional",
  sections: [
    { heading: "Estrofa 1", lines: [
      "[G]Primera frase de la [D]canción",
      "[Em]Segunda frase de [C]ejemplo"
    ]},
    { heading: "Estribillo", lines: [
      "[C]Aquí empieza el estri[G]billo"
    ]}
  ]
},
```

Los acordes entre corchetes, como `[G]`, `[Am]`, `[F#m7]` o `[D/F#]`, **no aparecen entre corchetes en la web**: se muestran encima de la letra y se transponen automáticamente. Solo funcionan si las canciones están en este formato; las letras de Google Docs deben convertirse.

### Editar las canciones desde GitHub (sin instalar programas)

Abre tu repositorio, haz clic en `songs.js`, después en el ícono de lápiz **Edit this file**. Edita las canciones, usa **Commit changes** y la web se actualizará al publicarse el cambio.

### Organización aconsejada

- **category**: `misa`, `alabanza`, `adoracion`, `mariano`. Se pueden crear nuevas categorías ampliando también el menú en `index.html` y el objeto `categories` en `app.js`.
- **moments**: `Entrada`, `Señor, ten piedad`, `Gloria`, `Salmo responsorial`, `Aleluya`, `Ofertorio`, `Santo`, `Cordero de Dios`, `Comunión`, `Salida`, `Adoración`, `Encuentro de oración`… **La etiqueta no significa que el canto sea litúrgicamente apto**: revisa las normas de la celebración y las orientaciones de tu parroquia.
- **seasons**: `Adviento`, `Navidad`, `Cuaresma`, `Pascua`, `Tiempo Ordinario`, `Todo el año`.

## ¿Y mis documentos de Google Drive?

La primera versión **no se sincroniza automáticamente** con Drive; es gratuita, simple y no exige credenciales. El plan de migración sería:

1. Seleccionar una carpeta o exportar los documentos de Google Drive.
2. Convertir sus títulos, letras y acordes al formato de `songs.js`.
3. Revisar las etiquetas de uso y la atribución.
4. Sustituir los ejemplos en `songs.js` por los cantos autorizados.

Más adelante es posible automatizar parte del proceso con Google Apps Script o un flujo que genere el catálogo, pero sería una fase distinta.

## Importante sobre derechos de autor y privacidad

Los cinco cantos iniciales son **textos originales creados solo como demostración**, no repertorio oficial de misa. Antes de publicar letras existentes, comprueba su licencia o pide permiso al titular. Que se cante en una parroquia o esté en Google Drive no implica permiso de publicación web.

GitHub Pages en el plan gratuito requiere repositorios públicos; todo lo que subas al repositorio puede ser leído y copiado por otras personas. No añadas claves de acceso, datos privados ni documentos restringidos.

## Estructura

```
index.html   - Página
styles.css   - Diseño adaptable
songs.js     - Canciones y etiquetas (editar aquí)
app.js       - Buscador, filtros, acordes y favoritos
.nojekyll    - Indica que no se requiere Jekyll
README.md    - Instrucciones
```

Hecho para comenzar simple y crecer con el tiempo.
