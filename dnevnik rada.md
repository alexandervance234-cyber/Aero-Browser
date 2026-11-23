# Dnevnik rada - Aero BROWSER

Dobrodošli u dnevnik rada za projekat **Aero BROWSER**.
Kada se pokrene protokol za kraj, novi unosi se dodaju na vrh ovog dokumenta (hronološki unazad).

---

## 📅 23.11.2026.

### ✅ Šta je urađeno:
1. **Postavljanje projekta i stroge modularne arhitekture:**
   - Kreiran radni direktorijum projekta: `/home/acu/Aero BROWSER/`.
   - Usvojeno glavno pravilo: **Zabranjen dupli i monolitan kod (Single Source of Truth / DRY princip)**.
   - Kreirani `plan rada.md` i `dnevnik rada.md`.

2. **Jedini izvor istine za odzivnost (`ui/responsive.py`):**
   - Definisana pravila preloma za sve uređaje u dva striktna režima:
     - `COMPACT_PORTRAIT`: Mobilni telefoni (Android, iPhone) i Tableti u vertikalnom položaju.
     - `DESKTOP_LANDSCAPE`: Tableti horizontalno, Laptopovi, Desktop računari (Linux, PC) i Apple Mac.

3. **Jedini izvori istine za svaki grafički element (`core/registry.js` & `ui/components/`):**
   - `<aero-button>` (`ui/components/button.js`): Jedina istina za sva dugmad, klik, hover i stanja.
   - `<aero-box>` (`ui/components/box.js`): Jedina istina za panele, kartice i zaobljene okvire.
   - `<aero-text>` (`ui/components/text.js`): Jedina istina za fontove, labele, naslove i boje teksta.
   - `<aero-input>` (`ui/components/input.js`): Jedina istina za forme, search bar i unos adrese.
   - `<aero-icon>` (`ui/components/icon.js`): Jedina istina za vektorske SVG ikonice i slike motora.
   - `<aero-badge>` (`ui/components/badge.js`): Jedina istina za statusne pilule (`LOCK SEARCH`, status telemetrije, verzija).
   - `<aero-tab>` (`ui/components/tab.js`): Jedina istina za vertikalne kartice tabova sa leve strane.

4. **Izrada korisničkog interfejsa (UIX) tačno prema crtežima autora:**
   - **Gornja traka sa 3 zaobljene kapsule na čistoj pozadini:**
     - *Kapsula 1:* `Home`, `Back`, `Forward`, `Refresh` i `LOCK SEARCH` spojeni u jednu zaobljenu pilulu.
     - *Kapsula 2:* Dinamička adresna traka sa ikonicom aktivnog motora i dugmetom za navigaciju.
     - *Kapsula 3:* Padajući meni za izbor motora, korisnički profil i meni opcija.
     - Uklonjena siva linija hedera i usklađena boja pozadine tako da kapsule lebde na čistoj podlozi.
   - **Leva traka = Velika vertikalna pilula za tabove sa dinamičkom animacijom:**
     - Prostor za tabove oblikovan kao velika zaobljena pilula od vrha ka dnu.
     - Na vrhu je okrugli taster `+` za otvaranje novog taba.
     - Sadrži vertikalne tabove prema crtežu (`YouTube`, `Snapchat`, `Wikipedia`).
     - **Glatka animacija visine:** Pilula se automatski elastično rasteže na dole pri dodavanju tabova, a skuplja na gore pri zatvaranju tabova.
     - **Pametna navigacija:** Kada se zatvori aktivni tab (`×`), sistem korisnika odmah prebacuje na **prednji (prethodni) tab**.
   - **AERO Brending i Logo:**
     - Premešten desno od vertikalnih tabova u gornji levi ugao radnog prostora (tačno po crtežu).
     - Vektorizovan originalni ručno crtani logo autora (dve kružne strelice).
     - Instaliran i primenjen **JetBrains Mono ExtraBold** font isključivo za natpis "AERO".
   - **Logotipi motora (Aero, Chromium, Yandex):**
     - Zamenjeni generički logoi originalnim slikama koje je poslao autor:
       - `Aero Engine`: Crtež kružnih strelica.
       - `Chromium`: Zvanični trobojni plavi logo.
       - `Yandex`: Beli krug sa crvenim slovom "Y".
   - **Početni ekran (Home View):**
     - Centralni zaobljeni Search bar sa opcijom `LUCKY GUESS!`.
     - 6 interaktivnih prečica (`+`, `+`, `+`, YouTube, Netflix, `+`) sa mogućnošću unosa sopstvenog sajta.
     - Desni vidžet panel (sat uživo, datum na srpskom, status 0% telemetrije) prilagođen da popuni celu kutiju (uklonjen suvišni tekst "VIDŽETI PO UKUSU").
     - Oznaka verzije u uglu: `PRE RELEASE = 1.1.2.0`.
   - **Lokalni server:**
     - Pokrenut lokalni HTTP server na `http://localhost:8000` za testiranje uživo u browseru na Artix Linuxu.

---

### ⏳ Šta nije urađeno (Sledeći koraci):
- [ ] **Faza 4: Integracija lokalnog čuvanja (Storage):**
  - Trajno čuvanje dodatih prečica, istorije i podešavanja u lokalni SQLite/JSON fajl kako se ne bi gubili nakon gašenja browsera.
- [ ] **Faza 5: Integracija punog WebEngine motora:**
  - Povezivanje sa Qt6 WebEngine-om instaliranim na Artixu za neometano otvaranje svih sajtova bez iframe ograničenja.
- [ ] **Faza 6: Git repozitorijum i GitHub priprema:**
  - Inicijalizacija git repoa, kreiranje `README.md`, licence i skripte za bildovanje paketa za Artix/Arch Linux.

---
