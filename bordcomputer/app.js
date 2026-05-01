// App Logic
let currentDriver = null;
let currentTrip = null;
let currentStopIndex = 0;

// Modal Management
function openModal(modalId) {
  document.getElementById(modalId).style.display = 'block';
}

function closeModal(modalId) {
  document.getElementById(modalId).style.display = 'none';
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
  setupMenuButtons();
  setupCloseButtons();
  setupDateTime();
  setupDriverLogin();
  setupTripSelection();
  setupTripDisplay();
});

// Menu Buttons
function setupMenuButtons() {
  document.querySelector('.system-btn').addEventListener('click', () => openModal('systemModal'));
  document.querySelector('.driver-btn').addEventListener('click', () => openModal('driverModal'));
  document.querySelector('.trip-btn').addEventListener('click', () => {
    if (currentDriver) {
      openModal('tripModal');
    } else {
      alert('Bitte melden Sie sich zuerst als Fahrer an!');
    }
  });
}

// Close Buttons
function setupCloseButtons() {
  document.querySelectorAll('.close').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.target.parentElement.parentElement.style.display = 'none';
    });
  });
}

// System Info
function setupDateTime() {
  function updateDateTime() {
    const now = new Date();
    document.getElementById('currentDate').textContent = now.toLocaleDateString('de-DE', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
    document.getElementById('currentTime').textContent = now.toLocaleTimeString('de-DE');
  }
  
  updateDateTime();
  setInterval(updateDateTime, 1000);
}

// Driver Login
function setupDriverLogin() {
  const form = document.getElementById('driverLoginForm');
  const messageEl = document.getElementById('driverMessage');
  
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const username = document.getElementById('driverUsername').value;
    const password = document.getElementById('driverPassword').value;
    
    const driver = getDrivers().find(d => d.username === username && d.password === password);
    
    if (driver) {
      currentDriver = driver;
      messageEl.textContent = '✓ Anmeldung erfolgreich!';
      messageEl.style.color = '#059669';
      
      setTimeout(() => {
        closeModal('driverModal');
        form.reset();
      }, 1000);
    } else {
      messageEl.textContent = '✗ Fehlerhafte Anmeldedaten!';
      messageEl.style.color = '#dc2626';
    }
  });
}

// Trip Selection
function setupTripSelection() {
  const routeSelect = document.getElementById('routeSelect');
  const variantSelect = document.getElementById('variantSelect');
  const stopSelect = document.getElementById('stopSelect');
  const startBtn = document.getElementById('startTripBtn');
  
  // Fill routes
  getRoutes().forEach(route => {
    const option = document.createElement('option');
    option.value = route.id;
    option.textContent = `Linie ${route.number} - ${route.name}`;
    routeSelect.appendChild(option);
  });
  
  // Update variants
  routeSelect.addEventListener('change', () => {
    variantSelect.innerHTML = '<option value="">-- Wählen --</option>';
    stopSelect.innerHTML = '<option value="">-- Wählen --</option>';
    
    if (!routeSelect.value) return;
    
    const variants = getVariants(parseInt(routeSelect.value));
    variants.forEach(variant => {
      const option = document.createElement('option');
      option.value = variant.id;
      option.textContent = variant.name;
      variantSelect.appendChild(option);
    });
  });
  
  // Update stops
  variantSelect.addEventListener('change', () => {
    stopSelect.innerHTML = '<option value="">-- Wählen --</option>';
    
    if (!variantSelect.value) return;
    
    const stops = getStops(parseInt(variantSelect.value));
    stops.forEach((stop, index) => {
      const option = document.createElement('option');
      option.value = index;
      option.textContent = `${stop} (${index + 1}/${stops.length})`;
      stopSelect.appendChild(option);
    });
  });
  
  // Start trip
  startBtn.addEventListener('click', () => {
    if (!routeSelect.value || !variantSelect.value || stopSelect.value === '') {
      alert('Bitte alle Felder ausfüllen!');
      return;
    }
    
    const route = getRouteById(parseInt(routeSelect.value));
    const variant = busSystemData.variants.find(v => v.id === parseInt(variantSelect.value));
    
    currentTrip = {
      route: route,
      variant: variant,
      stops: variant.stops,
      currentStopIndex: parseInt(stopSelect.value)
    };
    
    currentStopIndex = currentTrip.currentStopIndex;
    
    closeModal('tripModal');
    openModal('tripDisplayModal');
    displayTripInfo();
  });
}

// Trip Display
function setupTripDisplay() {
  document.getElementById('nextStopBtn').addEventListener('click', moveToNextStop);
  document.getElementById('ticketSalesBtn').addEventListener('click', () => openModal('ticketSalesModal'));
  document.getElementById('ticketScanBtn').addEventListener('click', () => openModal('ticketScanModal'));
  document.getElementById('endTripBtn').addEventListener('click', endTrip);
  document.getElementById('openTicketBtn').addEventListener('click', () => window.open('../ticket/index.html', '_blank'));
}

function displayTripInfo() {
  document.getElementById('tripLine').textContent = `${currentTrip.route.number}`;
  document.getElementById('tripDriver').textContent = currentDriver.name;
  document.getElementById('currentStop').textContent = currentTrip.stops[currentStopIndex];
  
  const stopsDisplay = document.getElementById('stopsDisplay');
  stopsDisplay.innerHTML = '';
  
  // Show next 3 stops
  for (let i = 0; i < 3; i++) {
    const stopIndex = currentStopIndex + i;
    if (stopIndex < currentTrip.stops.length) {
      const stop = currentTrip.stops[stopIndex];
      const div = document.createElement('div');
      div.className = `stop-item ${i === 0 ? 'current' : ''}`;
      div.textContent = `${stopIndex + 1}. ${stop}`;
      stopsDisplay.appendChild(div);
    }
  }
}

function moveToNextStop() {
  if (currentStopIndex < currentTrip.stops.length - 1) {
    currentStopIndex++;
    displayTripInfo();
  } else {
    alert('Letzte Haltestelle erreicht!');
  }
}

function endTrip() {
  if (confirm('Fahrt beenden?')) {
    currentTrip = null;
    closeModal('tripDisplayModal');
    alert('Fahrt beendet!');
  }
}

// Ticket Scan
document.addEventListener('DOMContentLoaded', () => {
  const scanInput = document.getElementById('scanInput');
  const scanResult = document.getElementById('scanResult');
  
  if (scanInput) {
    scanInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        const code = scanInput.value;
        // Simple validation - in reality would check against database
        if (code.length > 5) {
          scanResult.innerHTML = '<div style="color: #059669; padding: 12px; background: #dcfce7; border-radius: 8px;">✓ Ticket gültig</div>';
        } else {
          scanResult.innerHTML = '<div style="color: #dc2626; padding: 12px; background: #fee2e2; border-radius: 8px;">✗ Ticket ungültig</div>';
        }
        scanInput.value = '';
      }
    });
  }
});
