const singleBtn = document.getElementById('singleBtn');
const dayBtn = document.getElementById('dayBtn');
const weekBtn = document.getElementById('weekBtn');
const backBtn = document.getElementById('backBtn');
const infoBtn = document.getElementById('infoBtn');
const messageElement = document.getElementById('message');

function showMessage(type, price) {
  const messages = {
    single: `Einzelfahrt für €${price} gebucht. Gültig für eine Fahrt.`,
    day: `Tageskarte für €${price} gebucht. Gültig für heute.`,
    week: `Wochenkarte für €${price} gebucht. Gültig für 7 Tage.`
  };
  messageElement.textContent = messages[type];
}

if (singleBtn) {
  singleBtn.addEventListener('click', () => {
    window.location.href = 'payment.html?ticket=Einzelfahrt';
  });
}

if (dayBtn) {
  dayBtn.addEventListener('click', () => {
    window.location.href = 'payment.html?ticket=Tageskarte';
  });
}

if (weekBtn) {
  weekBtn.addEventListener('click', () => {
    window.location.href = 'payment.html?ticket=Wochenkarte';
  });
}

if (backBtn) {
  backBtn.addEventListener('click', () => {
    window.location.href = 'index.html';
  });
}

if (infoBtn) {
  infoBtn.addEventListener('click', () => {
    window.location.href = 'kategorien.html';
  });
}
