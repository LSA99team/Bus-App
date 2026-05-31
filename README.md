# Bus System - Technik

Ein umfassendes Bus-Management-System bestehend aus mehreren Modulen für Ticketing, Fahrtenverwaltung, Bankverbindungen und digitale Anzeigetafeln.

## 📁 Projektstruktur

### `server/`
Backend-Server basierend auf Express.js
- **Hauptdatei:** `index.js`
- **Abhängigkeiten:** Express 4.18.4
- **Start:** `npm start`

**Routes:**
- `auth.js` - Authentifizierung und Benutzerverwaltung
- `tickets.js` - Ticketverwaltung und -verkauf
- `trips.js` - Fahrtenverwaltung

**Datenbank:**
- `data/users.json` - Benutzerdaten
- `data/tickets.json` - Ticketdaten
- `data/trips.json` - Fahrtendaten

### `ticket/`
Ticketing-Frontend für Fahrkartenkauf
- `index.html` - Hauptseite
- `kategorien.html` - Ticketkategorien
- `payment.html` - Zahlungsabwicklung
- `payment.js` - Zahlungslogik
- `app.js` - Anwendungslogik
- `style.css` - Styling

### `anzeige/`
Digitale Anzeigetafeln für Fahrgastinformationen
- **aussen.html** - Außenanzeigetafel
- **innen.html** - Innenanzeigetafel
- `index.html` - Anzeigenauswahl
- `routen.js` - Routenlogik
- `style.css` - Styling

### `bordcomputer/`
Bordcomputer-System für Busse
- `index.html` - Benutzeroberfläche
- `app.js` - Anwendungslogik
- `database.js` - Datenverwaltung
- `style.css` - Styling

### `bank/`
Bankverbindungs- und Zahlungssystem
- `index.html` - Kontoverwaltung
- `account.html` - Kontodetails
- `app.js` - Anwendungslogik
- `style.css` - Styling

## 🚀 Getting Started

1. **Server starten:**
   ```bash
   cd server
   npm install
   npm start
   ```

2. **Frontend öffnen:**
   - Ticketing: `ticket/index.html`
   - Anzeigetafeln: `anzeige/index.html`
   - Bordcomputer: `bordcomputer/index.html`
   - Bankverbindung: `bank/index.html`

## 📋 Modul-Übersicht

| Modul | Funktion | Typ |
|-------|----------|-----|
| Server | API & Datenverwaltung | Node.js/Express |
| Ticket | Fahrkartenkauf | Web Frontend |
| Anzeige | Fahrgastinformationen | Web Frontend |
| Bordcomputer | Fahrerinfo | Web Frontend |
| Bank | Zahlungssystem | Web Frontend |
| Ansagen | Ankündigungen | Module |

## � Änderung von Funktionen des Systems

### Eigne Routen

**bordcomputer/database.js** - Hier ist das komplette Routing-System:

#### 1. Neue Haltestelle hinzufügen (stops Array)
```javascript
stops: [
  { id: 0.1, name: 'Schwamm Stadt, Hauptbahnhof', time: '0:00' },
  { id: 0.2, name: 'Schwamm Stadt, Busplatz', time: '0:00' },
  // ... weitere Haltestellen ...
  { id: 16, name: 'Neue Haltestelle, Zentrum', time: '0:00' }  // ← NEUE HALTESTELLE
]
```
**So wird's gemacht - nur diese 3 Felder:**
- **id**: Eindeutige Nummer (0.1, 0.2, 1, 2, ... 16, 17...)
- **name**: Name der Haltestelle
- **time**: Bleibt `'0:00'`

**Beispiel für eine neue Haltestelle:**
```javascript
{ id: 16, name: 'Neue Stadt, Bushof', time: '0:00' }
```

#### 2. Neue Route hinzufügen (routes Array)
```javascript
routes: [
  { id: 1, number: '1', name: 'Stadtstrecke', active: true },
  { id: 2, number: '2', name: 'Wohnviertelstrecke', active: true }
]
```
**So wird's gemacht:**
- **id**: Eindeutige Nummer (1, 2, 3...)
- **number**: Die Liniennummer (z.B. '1', '2', '5A')
- **name**: Beschreibung der Route
- **active**: true = aktiv, false = inaktiv

#### 3. Varianten hinzufügen (variants Array)
```javascript
variants: [
  { id: 1, routeId: 1, name: 'Haupt-Hinweg', stops: [0.2, 3, 4, 11.2, 0.1, 8] },
  { id: 2, routeId: 1, name: 'Haupt-Rückweg', stops: [8, 0.1, 11.2, 4, 3, 0.2] },
  { id: 3, routeId: 2, name: 'Haupt-Hinweg', stops: [11.3, 6, 10, 4, 3, 2, 1] },
  { id: 4, routeId: 2, name: 'Haupt-Rückweg', stops: [1, 2, 3, 4, 10, 6, 11.3] }
]
```
**So wird's gemacht:**
- **id**: Eindeutige Varianten-ID (1, 2, 3, 4, 5, 6...)
- **routeId**: MUSS der route `id` entsprechen (z.B. routeId: 1 = Route mit id: 1)
- **name**: z.B. "Haupt-Hinweg", "Haupt-Rückweg", "Alternativ-Hinweg"
- **stops**: Array mit Haltestellen-IDs in der korrekten Reihenfolge - **NUR die existierenden Stop-Nummern!**

**Beispiel einer neuen kompletten Linie (RICHTIG):**
```javascript
// 1. Neue Route im routes Array (letzte Route ist id: 2, also nächste ist 3)
{ id: 3, number: '3', name: 'Neue Linie', active: true },

// 2. Varianten im variants Array (letzte Variante ist id: 6, also nächste ist 7)
{ id: 7, routeId: 3, name: 'Hinweg', stops: [0.1, 3, 8, 11.2] },
{ id: 8, routeId: 3, name: 'Rückweg', stops: [11.2, 8, 3, 0.1] }
```

**SCHRITT FÜR SCHRITT - SO FÜGST DU EINE NEUE LINIE HINZU:**
- 1. Neue Haltestellen (falls nötig) in den `stops` Array hinzufügen
- 2. Neue Route in den `routes` Array hinzufügen
- 3. Eine oder zwei Varianten (Hinweg/Rückweg) in den `variants` Array hinzufügen
- Die Stop-IDs in den Varianten können neu definierte oder bereits existierende Haltestellen sein

**anzeige/routen.js** - Hier werden die Routen für die Anzeigetafel verwaltet

Das System ist anders als bordcomputer! Hier nutzt du die Funktion `addRoute()` um neue Routen hinzuzufügen.

#### 1. Stops eintragen (als Objekt mit ID und Name)
Du definierst die Haltestellen als Objekt mit der ID (wie in bordcomputer/database.js) und einem Namen:

```javascript
{
  0.2: "Schwamm Stadt, Busplatz",
  0.1: "Schwamm Stadt, Hauptbahnhof",
  3: "Schwamm Stadt, Kandis-Weg",
  4: "Schwamm Stadt, Nord",
  11.2: "Schwamm Stadt, Orange Park - Mitte",
  8: "Schwamm Stadt, Promenade"
}
```

#### 2. Varianten definieren (mit Reihenfolge und Via-Punkte)
Du definierst die Variante mit einem Namen, der Reihenfolge der Stops und optional wichtige Via-Punkte für die Außenanzeige:

```javascript
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
  via: [
    4,
    11.2,
    0.1
  ]  // Diese Halte wechseln außen
}
```

#### 3. Komplette Route mit addRoute() hinzufügen

**Beispiel einer kompletten neuen Route:**
```javascript
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

  ]
)
```

**WICHTIG für anzeige/routen.js:**
- Nutze die `addRoute()` Funktion
- Stops sind ein Objekt (nicht Array wie in bordcomputer!)
- Varianten nutzen Stop-Nummern, nicht die echten Namen
- `via` ist optional und zeigt wichtige Halte auf der Außenanzeige an
- Routen namen werden hier direrkt in der Route eingetragen aber dann über Nummern zugeordnet 


---

### Eigne Fahrer

**bordcomputer/database.js** - Ganz oben im Array `drivers`
Die Fahrer sind hier definiert:
```javascript
drivers: [
  { id: 0, name: 'Admin', username: 'admin', password: 'admin', active: true },
  { id: 1, name: 'Sören Becker', username: 'BF0001', password: '9901', active: true }
]
```
- **id**: Eindeutige Fahrerkennung
- **name**: Name des Fahrers
- **username/password**: Anmeldedaten für den Login
- **active**: Status ob aktiv oder nicht

---

### Eigene Tickets

Das Ticketsystem ist zweigeteilt und funktioniert so:

1. **server/data/tickets.json** - Hauptdatenquelle
   - Hier muss jedes Ticket mit id, userId, tripId, art, price, validFrom und validTo definiert sein
   - Dies ist die zentrale Verwaltung

2. **bordcomputer/database.js** - Im Array `tickets`
   - Die gleichen Ticketdaten müssen AUCH hier eingetragen sein
   - Die id muss identisch sein
   - Alle Werte müssen gleich sein wie in `server/data/tickets.json`
   - **Achtung:** Das Datum kann unterschiedlich formatiert sein, aber die Daten müssen sich entsprechen
   - Das System erkennt das Ticket nur wenn es in BEIDEN Datenquellen mit den gleichen Daten existiert

---

### Bank

**bank/app.js** - Das Bankensystem
- Verwaltet Benutzerkonten mit Kontostand, Kartennummer und Kreditlimit
- Benutzer haben username, password, name, balance (Kontostand), accountNumber (IBAN), cardNumber und loan

Was man wichtigsten ändert:
- Neue Benutzer in der `users` Array in `bank/app.js` hinzufügen
- Die Balance (Kontostand) anpassen
- Kartendaten und Kontonummern ändern
---

### Ticketing-System (ticket/)

Das Ticketing-System besteht aus 3 Dateien die zusammenarbeiten:

#### Ticketarten ändern oder hinzufügen (`ticket/kategorien.html`)

```html
<div class="category-card">
  <h2>Einzelfahrt</h2>
  <p class="price">€1.25</p>
  <p class="description">Eine Fahrt innerhalb der Stadt</p>
</div>
```

**So wird's gemacht:**
- **h2**: Der Name der Ticketart (z.B. "Einzelfahrt", "Tageskarte")
- **price**: Der Preis (z.B. "€1.25")
- **description**: Kurze Beschreibung

**Beispiel für eine neue Ticketart:**
```html
<div class="category-card">
  <h2>Wochenendkarte</h2>
  <p class="price">€8.50</p>
  <p class="description">Unbegrenzte Fahrten für 2 Tage am Wochenende</p>
</div>
```

#### Preise definieren (`ticket/payment.js`)

```javascript
const ticketData = {
  'Einzelfahrt': '1.25',
  'Einzelfahrt (Kind)': '0.75',
  'Tageskarte': '5.55',
  'Wochenkarte': '22.25',
  'Monatskarte': '55.55',
};
```

**So wird's gemacht:**
- **Key**: MUSS genau dem Namen aus kategorien.html entsprechen!
- **Value**: Der Preis ohne € Zeichen (z.B. '1.25')

**Beispiel für eine neue Ticketart:**
```javascript
'Wochenendkarte': '8.50',
```

#### Bestätigungsnachrichten (`ticket/app.js`)

```javascript
function showMessage(type, price) {
  const messages = {
    single: `Einzelfahrt für €${price} gebucht. Gültig für eine Fahrt.`,
    singlekind: `Einzelfahrt (Kind) für €${price} gebucht. Gültig für eine Fahrt.`,
    day: `Tageskarte für €${price} gebucht. Gültig für heute.`,
    week: `Wochenkarte für €${price} gebucht. Gültig für 7 Tage.`,
    month: `Monatskarte für €${price} gebucht. Gültig für 28 Tage.`
  };
  messageElement.textContent = messages[type];
}
```

Hier werden die Nachrichten definiert, die nach dem Kauf angezeigt werden.

**Beispiel für eine neue Nachricht:**
```javascript
weekend: `Wochenendkarte für €${price} gebucht. Gültig für 2 Tage.`
```

**WICHTIG:**
- Die Ticketart-Namen MÜSSEN identisch sein in:
  - kategorien.html (h2 Text)
  - payment.js (ticketData Key)
  - app.js (messages Key)
- Wenn nur der Preis geändert wird, nur in payment.js anpassen
- Neue Ticketarten müssen in ALLEN DREI Dateien hinzugefügt werden

## �📝 Lizenz & Autor

Dieses Projekt ist ein eigenständiges Bus-Management-System von Sören Becker.

---

**Hinweis:** Für weitere Entwicklung bitte die entsprechenden Module dokumentieren und Dependencies aktualisieren.
