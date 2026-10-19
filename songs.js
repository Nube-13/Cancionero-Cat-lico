/*
  CANCIONERO · Biblioteca editable
  Cada canción puede tener VARIOS momentos y tiempos litúrgicos.
  Escribe [G], [D7], [Bbm], etc., dentro de las líneas para mostrar
  los acordes sobre la letra y permitir transposición automática.
  Para publicar letras ajenas, comprueba antes los permisos/licencias.
*/
window.CANCIONERO_MOMENTS = [
  "Entrada",
  "Señor, ten piedad",
  "Gloria",
  "Salmo responsorial",
  "Aleluya",
  "Ofertorio",
  "Santo",
  "Cordero de Dios",
  "Comunión",
  "Salida",
  "Virgen María",
  "Adoración",
  "Alabanza",
  "Encuentro de oración",
  "Otros"
];
window.CANCIONERO_SEASONS = [
  "Adviento",
  "Navidad",
  "Cuaresma",
  "Pascua",
  "Tiempo Ordinario",
  "Todo el año"
];

window.CANCIONERO_SONGS = [
  {
    "id": "una-espiga-dorada",
    "title": "Una espiga dorada",
    "author": "Autor no indicado en el documento",
    "moments": [
      "Comunión"
    ],
    "seasons": [],
    "key": "G",
    "keywords": [
      "pan",
      "vino",
      "eucaristía",
      "cuerpo",
      "sangre",
      "comunión"
    ],
    "description": "Transcrita de tu documento Word. Revisa la posición de los acordes antes de utilizarla con músicos.",
    "sections": [
      {
        "heading": "Estrofa 1",
        "lines": [
          "Una [G]espiga dorada por el sol,",
          "el racimo que corta el [D7]viñador;",
          "//se [C]convierten [Cm]ahora en Pan y [G]Vino… [D7]de [Em]Amor,",
          "en el [Am]Cuerpo y la [D7]Sangre del [G]SEÑOR.//"
        ]
      },
      {
        "heading": "Estrofa 2",
        "lines": [
          "[G]Compartimos la misma comunión,",
          "somos trigos del mismo [D7]sembrador;",
          "//un [C]molino la [Cm]vida nos [G]tritura [D7]con [Em]dolor,",
          "DIOS nos [Am]hace Eucaristía [D7]en el [G]amor.//"
        ]
      },
      {
        "heading": "Estrofa 3",
        "lines": [
          "Como [G]granos que han hecho el mismo pan,",
          "como notas que tejen un [D7]cantar;",
          "//como [C]gotas de [Cm]agua que se [G]funden [D]en el [Em]mar,",
          "los [Am]cristianos un [D7]cuerpo [G]formarán.//"
        ]
      },
      {
        "heading": "Estrofa 4",
        "lines": [
          "En la [G]mesa de DIOS se sentarán,",
          "como hijos su pan [D7]comulgarán;",
          "[C]//una [Bbm]misma [G]esperanza [D]caminando [Em]contarán,",
          "en la [Am]vida como [D7]hermanos se [G]amarán.//"
        ]
      }
    ]
  }
];
