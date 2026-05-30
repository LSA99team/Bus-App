// Bus System Datenbank
const busSystemData = {
  drivers: [
    { id: 0, name: 'Admin', username: 'admin', password: 'admin', active: true },
    { id: 1, name: 'Sören Becker', username: 'BF0001', password: '9901', active: true }
  ],
  
  routes: [
    { id: 01, number: '1', name: 'Stadtstrecke', active: true },
    { id: 02, number: '2', name: 'Wohnviertelstrecke' active: true },
  ],
  
  variants: [
    { id: 01, routeId: 01, name: 'Haupt-Hinweg', stops: [0.2, 3, 4, 11.2, 0.1, 8] },
    { id: 02, routeId: 01, name: 'Haupt-Rückweg', stops: [8, 0.1, 11.2, 4, 3, 0.2] },
    { id: 03, routeId: 02, name: 'Haupt-Hinweg', stops: [11.3, 6, 10, 4, 3, 2, 1] },
    { id: 04, routeId: 02, name: 'Haupt-Rückweg', stops: [1, 2, 3, 4, 10, 6, 11.3] },
    { id: 05, routeId: 02, name: 'Alternativ-Hinweg', stops: [11.3, 0.2, 4, 3, 2, 1] },
    { id: 06, routeId: 02, name: 'Alternativ-Rückweg', stops: [1, 2, 3, 4, 0.2, 11.3] },
  ],
  
   stops: [
    { id: 0.1, name: 'Schwamm Stadt, Hauptbahnhof', time: '0:00' },
    { id: 0.2, name: 'Schwamm Stadt, Busplatz', time: '0:00' },
    { id: 1, name: 'Schwamm Stadt, Famesstrasse', time: '0:00' },
    { id: 2, name: 'Schwamm Stadt, Bogalastrasse', time: '0:00' },
    { id: 3, name: 'Schwamm Stadt, Kandis-Weg', time: '0:00' },
    { id: 4, name: 'Schwamm Stadt, Nord', time: '0:00' },
    { id: 5, name: 'Schwamm Stadt, Markt-Einkaufszentrum', time: '0:00' },
    { id: 6, name: 'Schwamm Stadt, Markt-am Restaurant', time: '0:00' },
    { id: 7, name: 'Schwamm Stadt International Airport', time: '0:00' },
    { id: 8, name: 'Schwamm Stadt, Promenade', time: '0:00' },
    { id: 9, name: 'Balonenstrasse - Schwamm Land Zentral Bank', time: '0:00' },
    { id: 10, name: 'Schwamm Stadt, Kino', time: '0:00' },
    { id: 11.1, name: 'Schwamm Stadt, Orange Park - Süd', time: '0:00' },
    { id: 11.2, name: 'Schwamm Stadt, Orange Park - Mitte', time: '0:00' },
    { id: 11.3, name: 'Schwamm Stadt, Orange Park - Nord', time: '0:00' },
    { id: 12, name: 'Schwamm Stadt, Nord Ring', time: '0:00' },
    { id: 13, name: 'Schwamm Stadt, Süd', time: '0:00' },
    { id: 14, name: 'Schwamm Stadt, Süd Schleifen-Ring', time: '0:00' },
    { id: 15, name: 'Schwamm Stadt, Deltara-Allee', time: '0:00' }
  ],

  tickets: [
    {
      "id": "0001",
      "userId": "user-2",
      "tripId": "trip-1",
      "art": "Einzelfahrt",
      "price": 1.25,
      "validFrom": "27-04-2026T19:00:00Z",
      "validTo": "27-04-2026T19:59:59Z"
    },
    {
      "id": "0002",
      "userId": "user-2",
      "tripId": "trip-1",
      "art": "Tageskarte",
      "price": 5.55,
      "validFrom": "27-04-2026T11:35:00Z",
      "validTo": "28-04-2026T11:34:59Z"
    },
    {
      "id": "0003",
      "userId": "user-2",
      "tripId": "trip-1",
      "art": "Einzelfahrt",
      "price": 1.25,
      "validFrom": "27-04-2026T19:16:00Z",
      "validTo": "27-04-2026T20:15:59Z"
    }
  ]
};

// Get data functions
function getDrivers() {
  return busSystemData.drivers;
}

function getRoutes() {
  return busSystemData.routes;
}

function getVariants(routeId) {
  return busSystemData.variants.filter(v => v.routeId === routeId);
}

function getStops(variantId) {
  const variant = busSystemData.variants.find(v => v.id === variantId);
  if (!variant) return [];
  // Konvertiere Stop-IDs zu Stop-Namen
  return variant.stops.map(stopId => {
    const stop = busSystemData.stops.find(s => s.id === stopId);
    return stop ? stop.name : 'Unbekannt';
  });
}

function getDriverById(id) {
  return busSystemData.drivers.find(d => d.id === id);
}

function getRouteById(id) {
  return busSystemData.routes.find(r => r.id === id);
}

function getTickets() {
  return busSystemData.tickets;
}
