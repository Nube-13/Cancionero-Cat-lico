/*
  CANCIONERO · Canciones editables
  Para conservar el punto EXACTO de entrada de cada acorde, usamos objetos:
  { text: "Una espiga dorada...", chords: [{ at: 6, name: "G" }] }
  "at" cuenta caracteres desde CERO en el texto (se ancla a la letra).
  También se aceptan canciones con acordes inline: "Una [G]espiga dorada...".
  Los acordes son editables, se transponen, y no ocupan espacio horizontal.
  Comprueba los permisos antes de publicar canciones protegidas.
*/
window.CANCIONERO_MOMENTS = [
  "Entrada", "Señor, ten piedad", "Gloria", "Salmo responsorial", "Aleluya",
  "Ofertorio", "Santo", "Cordero de Dios", "Comunión", "Salida",
  "Virgen María", "Adoración", "Alabanza", "Encuentro de oración", "Otros"
];
window.CANCIONERO_SEASONS = ["Adviento", "Navidad", "Cuaresma", "Pascua", "Tiempo Ordinario", "Todo el año"];
window.CANCIONERO_SONGS = [
  {
    id: "una-espiga-dorada",
    title: "Una espiga dorada",
    author: "Autor no indicado en el documento",
    moments: ["Comunión"],
    seasons: [],
    key: "G",
    keywords: ["pan", "vino", "eucaristía", "cuerpo", "sangre", "comunión"],
    description: "Acordes colocados sobre la letra respetando su posición en el documento original.",
    sections: [
      {
            "heading": "Estrofa 1",
            "lines": [
                  {
                        "text": "Una espiga dorada por el sol,",
                        "chords": [
                              {
                                    "at": 6,
                                    "name": "G"
                              }
                        ]
                  },
                  {
                        "text": "el racimo que corta el viñador;",
                        "chords": [
                              {
                                    "at": 28,
                                    "name": "D7"
                              }
                        ]
                  },
                  {
                        "text": "//se convierten ahora en Pan y Vino… de Amor,",
                        "chords": [
                              {
                                    "at": 9,
                                    "name": "C"
                              },
                              {
                                    "at": 17,
                                    "name": "Cm"
                              },
                              {
                                    "at": 31,
                                    "name": "G"
                              },
                              {
                                    "at": 35,
                                    "name": "D7"
                              },
                              {
                                    "at": 41,
                                    "name": "Em"
                              }
                        ]
                  },
                  {
                        "text": "en el Cuerpo y la Sangre del SEÑOR.//",
                        "chords": [
                              {
                                    "at": 6,
                                    "name": "Am"
                              },
                              {
                                    "at": 18,
                                    "name": "D7"
                              },
                              {
                                    "at": 32,
                                    "name": "G"
                              }
                        ]
                  }
            ]
      },
      {
            "heading": "Estrofa 2",
            "lines": [
                  {
                        "text": "Compartimos la misma comunión,",
                        "chords": [
                              {
                                    "at": 6,
                                    "name": "G"
                              }
                        ]
                  },
                  {
                        "text": "somos trigos del mismo sembrador;",
                        "chords": [
                              {
                                    "at": 29,
                                    "name": "D7"
                              }
                        ]
                  },
                  {
                        "text": "//un molino la vida nos tritura con dolor,",
                        "chords": [
                              {
                                    "at": 7,
                                    "name": "C"
                              },
                              {
                                    "at": 15,
                                    "name": "Cm"
                              },
                              {
                                    "at": 27,
                                    "name": "G"
                              },
                              {
                                    "at": 31,
                                    "name": "D7"
                              },
                              {
                                    "at": 38,
                                    "name": "Em"
                              }
                        ]
                  },
                  {
                        "text": "DIOS nos hace Eucaristía en el amor.//",
                        "chords": [
                              {
                                    "at": 8,
                                    "name": "Am"
                              },
                              {
                                    "at": 21,
                                    "name": "D7"
                              },
                              {
                                    "at": 33,
                                    "name": "G"
                              }
                        ]
                  }
            ]
      },
      {
            "heading": "Estrofa 3",
            "lines": [
                  {
                        "text": "Como granos que han hecho el mismo pan,",
                        "chords": [
                              {
                                    "at": 6,
                                    "name": "G"
                              }
                        ]
                  },
                  {
                        "text": "como notas que tejen un cantar;",
                        "chords": [
                              {
                                    "at": 27,
                                    "name": "D7"
                              }
                        ]
                  },
                  {
                        "text": "//como gotas de agua que se funden en el mar,",
                        "chords": [
                              {
                                    "at": 7,
                                    "name": "C"
                              },
                              {
                                    "at": 16,
                                    "name": "Cm"
                              },
                              {
                                    "at": 29,
                                    "name": "G"
                              },
                              {
                                    "at": 35,
                                    "name": "D"
                              },
                              {
                                    "at": 41,
                                    "name": "Em"
                              }
                        ]
                  },
                  {
                        "text": "los cristianos un cuerpo formarán.//",
                        "chords": [
                              {
                                    "at": 8,
                                    "name": "Am"
                              },
                              {
                                    "at": 18,
                                    "name": "D7"
                              },
                              {
                                    "at": 31,
                                    "name": "G"
                              }
                        ]
                  }
            ]
      },
      {
            "heading": "Estrofa 4",
            "lines": [
                  {
                        "text": "En la mesa de DIOS se sentarán,",
                        "chords": [
                              {
                                    "at": 6,
                                    "name": "G"
                              }
                        ]
                  },
                  {
                        "text": "como hijos su pan comulgarán;",
                        "chords": [
                              {
                                    "at": 25,
                                    "name": "D7"
                              }
                        ]
                  },
                  {
                        "text": "//una misma esperanza caminando contarán,",
                        "chords": [
                              {
                                    "at": 6,
                                    "name": "C"
                              },
                              {
                                    "at": 14,
                                    "name": "Bbm"
                              },
                              {
                                    "at": 26,
                                    "name": "G"
                              },
                              {
                                    "at": 32,
                                    "name": "D"
                              },
                              {
                                    "at": 37,
                                    "name": "Em"
                              }
                        ]
                  },
                  {
                        "text": "en la vida como hermanos se amarán.//",
                        "chords": [
                              {
                                    "at": 6,
                                    "name": "Am"
                              },
                              {
                                    "at": 19,
                                    "name": "D7"
                              },
                              {
                                    "at": 32,
                                    "name": "G"
                              }
                        ]
                  }
            ]
      }
]
  }
];
