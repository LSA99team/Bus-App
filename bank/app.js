// Sample users database
const users = [
  {username: 'admin', password: 'admin', name: 'Administrator', balance: 249999997500.00, accountNumber: ' SMLZB ', cardNumber: ' / ', loan: 0.00 },
  { username: 'Sibo99', password: '9901', name: 'Sören Becker', balance: 2500.00, accountNumber: 'SML11 0099 1125 1000 0222 99', cardNumber: '5485 2563 5587 2095', loan: 2500.00 },
  { username: 'SMSF', password: 'OPNV', name: 'Schwamm Stadt Faehrt', balance: 25000.00, accountNumber: 'SML11 4578 4521 4579 1025 03', cardNumber: 'nicht vorhanden', loan: 0.00 },
  { username: 'ZiegelJacke56', password: 'Jacke', name: 'Ines Becker', balance: 0.56, accountNumber: 'DE46 5393 6283 2182 8251 13', cardNumber: 'nicht vorhanden', loan: 0.00 }
];

// Detect which page we're on
const isLoginPage = document.getElementById('loginForm') !== null;
const isAccountPage = document.getElementById('logoutBtn') !== null;

// LOGIN PAGE LOGIC
if (isLoginPage) {
  const loginForm = document.getElementById('loginForm');
  const messageElement = document.getElementById('message');
  
  loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    
    const user = users.find(u => u.username === username && u.password === password);
    
    if (user) {
      localStorage.setItem('bankUser', JSON.stringify(user));
      messageElement.textContent = '✓ Anmeldung erfolgreich!';
      messageElement.style.color = '#059669';
      messageElement.style.backgroundColor = '#dcfce7';
      
      setTimeout(() => {
        window.location.href = 'account.html';
      }, 1000);
    } else {
      messageElement.textContent = '✗ Benutzername oder Passwort falsch!';
      messageElement.style.color = '#dc2626';
      messageElement.style.backgroundColor = '#fee2e2';
      document.getElementById('password').value = '';
    }
  });
}

// ACCOUNT PAGE LOGIC
if (isAccountPage) {
  const currentUserData = localStorage.getItem('bankUser');
  
  if (!currentUserData) {
    window.location.href = 'index.html';
  } else {
    try {
      const user = JSON.parse(currentUserData);
      
      // Update all fields
      document.getElementById('displayUsername').textContent = user.username;
      document.getElementById('accountHolder').textContent = user.name;
      document.getElementById('balance').textContent = `€${user.balance.toLocaleString('de-DE', { minimumFractionDigits: 2 })}`;
      document.getElementById('accountNumber').textContent = user.accountNumber;
      document.getElementById('cardNumber').textContent = user.cardNumber;
      document.getElementById('loan').textContent = `€${user.loan.toLocaleString('de-DE', { minimumFractionDigits: 2 })}`;
      
      // Logout button handler
      document.getElementById('logoutBtn').addEventListener('click', () => {
        localStorage.removeItem('bankUser');
        window.location.href = 'index.html';
      });
    } catch (e) {
      console.error('Error loading user data:', e);
      localStorage.removeItem('bankUser');
      window.location.href = 'index.html';
    }
  }
}
