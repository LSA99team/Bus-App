const messageElement = document.getElementById('message');

const stops = ['Nächster Halt: Hauptbahnhof', 'Weiterfahrt in 2 Minuten', 'Bitte anschnallen'];
let currentIndex = 0;

function rotateMessage() {
  messageElement.textContent = stops[currentIndex];
  currentIndex = (currentIndex + 1) % stops.length;
}

setInterval(rotateMessage, 3000);
rotateMessage();
