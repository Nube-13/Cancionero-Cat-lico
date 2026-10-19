/*
  TU CANCIONERO: modifica este archivo para añadir canciones.
  Usa [G], [Am], [F#m7], [D/F#], [Bb] para marcar acordes dentro de cada línea.
  Esos acordes se pueden transponer con los botones + / − de la web.
  ¡IMPORTANTE! Todos los textos de muestra de este archivo son originales,
  redactados solo para demostrar el funcionamiento. Sustitúyelos por obras
  propias, de dominio público o con permiso/licencia para publicarlas.
*/
window.CANCIONERO_SONGS = [
  {
    id: "la-luz-nos-convoca",
    title: "La luz nos convoca",
    author: "Composición original de muestra",
    category: "misa",
    moments: ["Entrada"],
    seasons: ["Tiempo Ordinario"],
    key: "G",
    keywords: ["asamblea", "procesión", "inicio"],
    description: "Ejemplo ilustrativo para un canto de entrada.",
    sections: [
      { heading: "Estrofa", lines: [
        "[G]Hoy caminamos en tu [D]luz,",
        "[Em]venimos juntos hacia [C]ti.",
        "[G]Haz de este encuentro una [D]oración,",
        "[C]y de nuestra voz, un canto de [G]amor."
      ]},
      { heading: "Estribillo", lines: [
        "[C]Cantemos juntos, [G]con alegría,",
        "[Am]unidos hoy en tu [D]presencia.",
        "[G]Que nuestro canto [Em]pueda elevarse,",
        "[C]como una ofrenda de [D]esperanza. [G]"
      ]}
    ]
  },
  {
    id: "pan-para-el-camino",
    title: "Pan para el camino",
    author: "Composición original de muestra",
    category: "misa",
    moments: ["Comunión"],
    seasons: ["Tiempo Ordinario"],
    key: "D",
    keywords: ["pan", "compartir", "eucaristía"],
    description: "Ejemplo ilustrativo para un canto de comunión.",
    sections: [
      { heading: "Estrofa", lines: [
        "[D]En el silencio de este [A]día,",
        "[Bm]tu amor nos vuelve a re[G]unir.",
        "[D]Un solo pueblo que ca[A]mina,",
        "[G]con un deseo de se[A]guir. [D]"
      ]},
      { heading: "Estribillo", lines: [
        "[G]Quédate siempre a nuestro [D]lado,",
        "[Em]luz de cada ama[A]necer.",
        "[G]Haznos hermanos en el [Bm]camino,",
        "[Em]enséñanos a com[A]partir. [D]"
      ]}
    ]
  },
  {
    id: "gracias-por-este-dia",
    title: "Gracias por este día",
    author: "Composición original de muestra",
    category: "alabanza",
    moments: ["Encuentro de oración"],
    seasons: ["Todo el año"],
    key: "C",
    keywords: ["gratitud", "alegría", "grupo"],
    description: "Ejemplo sencillo para una reunión de oración.",
    sections: [
      { heading: "Estrofa", lines: [
        "[C]Gracias por el nuevo [G]día,",
        "[Am]por las manos que aquí es[F]tán.",
        "[C]Por la fuerza de la espe[G]ranza,",
        "[F]y la alegría de cami[G]nar. [C]"
      ]}
    ]
  },
  {
    id: "cerca-en-el-silencio",
    title: "Cerca en el silencio",
    author: "Composición original de muestra",
    category: "adoracion",
    moments: ["Adoración"],
    seasons: ["Todo el año"],
    key: "Am",
    keywords: ["silencio", "contemplación", "oración"],
    description: "Ejemplo para un momento de oración personal o adoración fuera de la misa.",
    sections: [
      { heading: "Estrofa", lines: [
        "[Am]Cuando el ruido se apa[F]ga,",
        "[C]y descansa el cora[G]zón,",
        "[Am]descubrimos tu pre[F]sencia,",
        "[Dm]como un soplo de [E7]paz. [Am]"
      ]}
    ]
  },
  {
    id: "madre-acompananos",
    title: "Madre, acompáñanos",
    author: "Composición original de muestra",
    category: "mariano",
    moments: ["Devoción mariana"],
    seasons: ["Todo el año"],
    key: "F",
    preferredAccidentals: "flat",
    keywords: ["maría", "virgen", "madre"],
    description: "Ejemplo para encuentros de devoción mariana.",
    sections: [
      { heading: "Estrofa", lines: [
        "[F]Madre, acompaña nuestros [C]pasos,",
        "[Dm]ayúdanos a escu[Bb]char.",
        "[F]Que la esperanza de tu [C]vida,",
        "[Bb]nos anime a cami[C]nar. [F]"
      ]}
    ]
  }
];
