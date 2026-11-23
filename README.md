# 🚀 Aero BROWSER

![Version](https://img.shields.io/badge/version-1.1.2.0--prerelease-cyan?style=for-the-badge)
![License](https://img.shields.io/badge/license-GPLv3%20%2F%20MIT-blue?style=for-the-badge)
![Telemetry](https://img.shields.io/badge/telemetry-0%25-brightgreen?style=for-the-badge)
![AI-Free](https://img.shields.io/badge/AI-None-red?style=for-the-badge)
![Platform](https://img.shields.io/badge/platform-Artix%20%7C%20Arch%20%7C%20Linux-orange?style=for-the-badge)

> **Aero BROWSER** je moderan, ultralagan i privatan veb pregledač otvorenog koda (Open Source) dizajniran sa strogom filozofijom privatnosti i modularne arhitekture.

---

## 🌟 Glavna filozofija

* 🔒 **0% Telemetrije:** Nema praćenja, nema skrivenih analiza, vaši podaci pripadaju samo vama.
* 🚫 **Bez ugrađenog AI-ja:** Čist, fokusiran i brz pregledač bez viška resursa i neželjenih asistenata.
* 🏛️ **Arhitektura jedne istine (Single Source of Truth):** Strogo modularan kod, bez monolita i bez dupliranog koda.
* 🌐 **Sloboda izbora motora:** Brzo prebacivanje između **Aero Engine**, **Chromium** i **Yandex** motora.

---

## 🎨 Ključne mogućnosti

1. **Vertikalni tabovi u animiranoj piluli:**
   * Za razliku od uobičajenih pregledača gde su tabovi nagurani na vrhu, Aero skladišti tabove vertikalno sa leve strane.
   * Kapsula se dinamički i elastično animira prateći tačan broj otvorenih tabova.
   * Pametno zatvaranje: uklanjanjem taba automatski se aktivira prethodni tab.

2. **Gornja traka sa tri lebdeće kapsule:**
   * **Navigacija & Sigurnost:** `Home`, `Back`, `Forward`, `Refresh` i `LOCK SEARCH` enkripcija.
   * **Adresna traka:** Prikaz ikone aktivnog motora uživo i brza navigacija.
   * **Opcije:** Izbor motora, profil i meni.

3. **Jedini izvor istine za odzivnost (`ui/responsive.py`):**
   * `COMPACT_PORTRAIT`: Mobilni telefoni (Android, iOS) i tableti u vertikalnom položaju.
   * `DESKTOP_LANDSCAPE`: Tableti horizontalno, laptopovi, desktop računari i Apple Mac.

4. **Početni ekran (Home View):**
   * Centralni pretraživač sa tasterom `LUCKY GUESS!`.
   * Speed Dial prečice sa mogućnošću dodavanja omiljenih sajtova.
   * Prilagodljivi vidžet panel (sat, datum, telemetrijski status).

---

## 📁 Struktura projekta

```text
Aero BROWSER/
├── ui/                     # Frontend sloj
│   ├── components/         # Jedini izvori istine za elemente (button, box, text, input, icon, badge, tab)
│   ├── views/              # Modularni ekrani (navbar, sidebar, home_view)
│   ├── assets/             # Logotipi motora (Aero, Chromium, Yandex)
│   ├── fonts/              # JetBrains Mono font za Aero brend
│   ├── theme.css           # Jedina istina za dizajn tokens i teme
│   └── responsive.py       # Jedina istina za odzivnost
│
├── core/                   # Logika i centralno stanje
│   ├── api.js              # Centralni most za stanje i tabove
│   └── registry.js         # Registar komponenti i pravila
│
├── storage/                # Lokalno čuvanje postavki
├── security/               # Ghost mod i sigurnosne dozvole
├── dnevnik rada.md         # Zvanični dnevnik razvoja
├── plan rada.md            # Plan i specifikacija arhitekture
├── server.py               # Lokalni server za testiranje
└── index.html              # Tačka ulaza aplikacije
```

---

## 🚀 Kako pokrenuti Aero lokalno

1. Klonirajte repozitorijum:
```bash
git clone https://github.com/alexandervance234-cyber/Aero-Browser.git
cd Aero-Browser
```

2. Pokrenite server:
```bash
python3 server.py
```

3. Otvorite u bilo kom pregledaču:
👉 `http://localhost:8000`

---

## 👤 Autor

* **Kosta** ([@alexandervance234-cyber](https://github.com/alexandervance234-cyber))
* Napravljeno na **Artix Linuxu** uz podršku AI asistenta Antigravity.
