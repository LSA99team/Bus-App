const routeElement = document.getElementById('route');
const destinationElement = document.getElementById('destination');

const routes = [
  { route: 'Linie 42', destination: 'Zum Stadion' },
  { route: 'Linie 10', destination: 'Zur Innenstadt' },
  { route: 'Linie 7', destination: 'Zum Hauptbahnhof' }
];
let index = 0;

function updateDisplay() {
  const current = routes[index];
  routeElement.textContent = current.route;
  destinationElement.textContent = current.destination;
  index = (index + 1) % routes.length;
}

setInterval(updateDisplay, 5000);
updateDisplay();
