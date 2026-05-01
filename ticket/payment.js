const ticketData = {
  'Einzelfahrt': '2.50',
  'Tageskarte': '7.00',
  'Wochenkarte': '25.00',
  'Monatskarte': '55.55',
};

const ticketTypeElement = document.getElementById('ticketType');
const amountElement = document.getElementById('amount');
const paymentMethodButtons = document.querySelectorAll('.payment-btn');
const paymentForm = document.getElementById('paymentForm');
const formContent = document.getElementById('formContent');
const messageElement = document.getElementById('message');
const cancelBtn = document.getElementById('cancelBtn');

// Get ticket type from URL parameter
const urlParams = new URLSearchParams(window.location.search);
const ticketType = urlParams.get('ticket') || 'Einzelfahrt';
const amount = ticketData[ticketType] || '0.00';

ticketTypeElement.textContent = ticketType;
amountElement.textContent = `€${amount}`;

paymentMethodButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    const method = btn.dataset.method;
    showPaymentForm(method, amount);
  });
});

function showPaymentForm(method, amount) {
  paymentForm.style.display = 'block';
  let html = '';

  switch(method) {
    case 'card':
      html = `
        <h3>Kreditkarte</h3>
        <input type="text" placeholder="Kartennummer" maxlength="16" />
        <input type="text" placeholder="MM/YY" maxlength="5" />
        <input type="text" placeholder="CVV" maxlength="3" />
        <button onclick="processPayment('Kreditkarte', '${amount}')">Bezahlen €${amount}</button>
      `;
      break;
    case 'ec':
      html = `
        <h3>EC-Karte</h3>
        <input type="text" placeholder="Kontonummer" maxlength="22" />
        <input type="text" placeholder="name" maxlength="16" />
        <button onclick="processPayment('EC-Karte', '${amount}')">Zahlung bestätigen</button>
      `;
      break;
    case 'cash':
      html = `
        <h3>Bargeld</h3>
        <p>Betrag: €${amount}</p>
        <input type="number" id="cashAmount" placeholder="Eingezahlter Betrag" step="0.01" />
        <button onclick="processCash('${amount}')">Bestätigen</button>
      `;
      break;
    case 'mobile':
      html = `
        <h3>Mobile Zahlung</h3>
        <input type="number" placeholder="Telefonnummer" />
        <button onclick="processPayment('Mobile Zahlung', '${amount}')">Zahlung durchführen</button>
      `;
      break;
  }

  formContent.innerHTML = html;
}

function processPayment(method, amount) {
  messageElement.innerHTML = `
    <div style="color: #059669; font-size: 1.1rem; padding: 16px;">
      ✓ Zahlung erfolgreich!<br>
      Methode: ${method}<br>
      Betrag: €${amount}<br>
      <small>Ticket wird ausgedruckt...</small>
    </div>
  `;
  
  setTimeout(() => {
    window.location.href = 'index.html';
  }, 3000);
}

function processCash(amount) {
  const cashInput = document.getElementById('cashAmount');
  const paid = parseFloat(cashInput.value);
  
  if (paid < parseFloat(amount)) {
    messageElement.innerHTML = `<div style="color: #dc2626;">Betrag unzureichend!</div>`;
    return;
  }
  
  const change = (paid - parseFloat(amount)).toFixed(2);
  messageElement.innerHTML = `
    <div style="color: #059669; font-size: 1.1rem; padding: 16px;">
      ✓ Zahlung erfolgreich!<br>
      Betrag: €${amount}<br>
      Rückgeld: €${change}<br>
      <small>Ticket wird ausgedruckt...</small>
    </div>
  `;
  
  setTimeout(() => {
    window.location.href = 'index.html';
  }, 3000);
}

cancelBtn.addEventListener('click', () => {
  window.location.href = 'index.html';
});
