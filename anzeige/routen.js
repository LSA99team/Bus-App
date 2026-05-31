const ROUTEN_DB = {};

function addRoute(
  nummer,
  kuerzel,
  name,
  stops,
  varianten
) {

  ROUTEN_DB[nummer] = {

    nummer,
    kuerzel,
    name,

    // Stops:
    // { 1: "Bahnhof", 2: "Markt" }
    stops,

    // Varianten
    varianten: varianten.map(v => ({

      name: v.name,

      // Nummern → Namen
      stopNamen:
        v.stops
          .map(nr => stops[nr])
          .filter(Boolean),

      // Originale Nummern
      stopNummern: v.stops,

      // Via-Punkte
      via:
        (v.via || [])
          .map(nr => stops[nr])
          .filter(Boolean)

    }))
  };
}

// ------------------------------------------------------------
//  ROUTEN
// ------------------------------------------------------------

addRoute(

  1,
  "L1",
  "Stadtlinie",

  {
    0.2: "Schwamm Stadt, Busplatz",
    0.1: "Schwamm Stadt, Hauptbahnhof",
    3: "Schwamm Stadt, Kandis-Weg",
    4: "Schwamm Stadt, Nord",
    11.2: "Schwamm Stadt, Orange Park - Mitte",
    8: "Schwamm Stadt, Promenade"
  },

  [

    {
      name: "Haupt-Hinweg",

      stops: [
        0.2,
        3,
        4,
        11.2,
        0.1,
        8
      ],

      // Diese wechseln außen
      via: [
        4,
        11.2,
        0.1
      ]
    },

    {
      name: "Haupt-Rückweg",

      stops: [
        8,
        0.1,
        11.2,
        4,
        3,
        0.2
      ],

      via: [
        0.1,
        11.2,
        4
      ]
    },

  ]
);

addRoute(

  2,
  "L2",
  "Wohnviertel",

  {
    0.2: "Schwamm Stadt, Busplatz",
    1: "Schwamm Stadt, Famesstrasse",
    2: "Schwamm Stadt, Bogalastrasse",
    3: "Schwamm Stadt, Kandis-Weg",
    4: "Schwamm Stadt, Nord",
    6: "Schwamm Stadt, Markt-am Restaurant",
    10: "Schwamm Stadt, Kino",
    11.3: "Schwamm Stadt, Orange Park - Nord"
  },

  [

    {
      name: "Haupt-Hinweg",

      stops: [
        11.3,
        10,
        6,
        4,
        3,
        2,
        1
      ],

      // Diese wechseln außen
      via: [
        10,
        3
      ]
    },
    
    {
      name: "Haupt-Rückweg",

      stops: [
        1,
        2,
        3,
        4,
        6,
        10,
        11.3
      ],

      // Diese wechseln außen
      via: [
        3,
        10
      ]
    },
    
    {
      name: "Alternative-Hinweg",

      stops: [
        11.3,
        0.2,
        4,
        3,
        2,
        1
      ],

      // Diese wechseln außen
      via: [
        0.2,
        3
      ]
    },
    
    {
      name: "Alternative-Rückweg",

      stops: [
        1,
        2,
        3,
        4, 
        0.2,
        11.3
      ],

      // Diese wechseln außen
      via: [
        3,
        0.2
      ]
    },
    
  ]
);


// ------------------------------------------------------------
//  HILFSFUNKTIONEN
// ------------------------------------------------------------

/**
 * Gibt eine Route zurück
 * getRoute(1)
 */
function getRoute(nummer) {

  return ROUTEN_DB[nummer] || null;
}

/**
 * Gibt Variante zurück
 * getVariante(1, 0)
 */
function getVariante(
  nummer,
  varianteIndex = 0
) {

  const route =
    getRoute(nummer);

  if (!route) {
    return null;
  }

  return (
    route.varianten[varianteIndex] ||
    route.varianten[0]
  );
}

/**
 * Alle Routen
 */
function getAlleRouten() {

  return Object.values(
    ROUTEN_DB
  );
}

// ------------------------------------------------------------
//  GLOBAL
// ------------------------------------------------------------

if (typeof window !== "undefined") {

  window.ROUTEN_DB =
    ROUTEN_DB;

  window.getRoute =
    getRoute;

  window.getVariante =
    getVariante;

  window.getAlleRouten =
    getAlleRouten;
}