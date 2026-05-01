// Bus System Datenbank
const busSystemData = {
  drivers: [
    { id: 1, name: 'Admin', username: 'admin', password: 'admin', active: true },
    { id: 2, name: 'Anna Schmidt', username: 'driver2', password: 'pass2', active: true },
    { id: 3, name: 'Peter Weber', username: 'driver3', password: 'pass3', active: true }
  ],
  
  routes: [
    { id: 1, number: '5', name: 'Stadtzentrum - Flughafen', active: true },
    { id: 2, number: '42', name: 'Hauptbahnhof - Industriezone', active: true },
    { id: 3, number: '7', name: 'Marktplatz - Krankenhaus', active: true }
  ],
  
  variants: [
    { id: 1, routeId: 1, name: 'Standard Route', stops: ['Hauptbahnhof', 'Marktplatz', 'Rathaus', 'Stadion', 'Flughafen'] },
    { id: 2, routeId: 1, name: 'Umleitung Baustelle', stops: ['Hauptbahnhof', 'Marktplatz', 'Alter Weg', 'Stadion', 'Flughafen'] },
    { id: 3, routeId: 2, name: 'Vollständige Route', stops: ['Hauptbahnhof', 'Zentrum', 'Industriezone Nord', 'Industriezone Süd'] },
    { id: 4, routeId: 3, name: 'Direktroute', stops: ['Marktplatz', 'Stadtpark', 'Schule', 'Krankenhaus'] }
  ],
  
  stops: [
    { name: 'Hauptbahnhof', time: '0:00' },
    { name: 'Marktplatz', time: '0:05' },
    { name: 'Rathaus', time: '0:10' },
    { name: 'Stadion', time: '0:15' },
    { name: 'Flughafen', time: '0:25' },
    { name: 'Alter Weg', time: '0:08' },
    { name: 'Zentrum', time: '0:05' },
    { name: 'Industriezone Nord', time: '0:12' },
    { name: 'Industriezone Süd', time: '0:18' },
    { name: 'Stadtpark', time: '0:08' },
    { name: 'Schule', time: '0:15' },
    { name: 'Krankenhaus', time: '0:20' }
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
  return variant ? variant.stops : [];
}

function getDriverById(id) {
  return busSystemData.drivers.find(d => d.id === id);
}

function getRouteById(id) {
  return busSystemData.routes.find(r => r.id === id);
}
