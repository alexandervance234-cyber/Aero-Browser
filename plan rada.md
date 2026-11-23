# Plan rada - Aero BROWSER

## 🎯 Glavna vizija
* **Naziv:** Aero BROWSER
* **Verzija:** PRE RELEASE = 1.1.2.0
* **Platforma:** Linux (Artix, Arch...), macOS, Windows, mobilni i tablet ekrani
* **Filozofija:** Brz, bez telemetrije, bez veštačke inteligencije (no-AI), 100% otvorenog koda (Open Source na GitHub-u).
* **Karakteristike:** Mogućnost izbora motora/pretraživača (Aero podrazumevano, Chromium, Yandex...).
* **GitHub Repozitorijum:** [https://github.com/alexandervance234-cyber/Aero-Browser](https://github.com/alexandervance234-cyber/Aero-Browser)

---

## 📐 Arhitektura Interfejsa
1. **Gornja traka (3 zaobljene kapsule):**
   * **Kapsula 1:** `Home`, `Back`, `Forward`, `Refresh` i `LOCK SEARCH`.
   * **Kapsula 2:** Dinamička adresna traka sa logotipom izabranog motora i dugmetom za pretragu.
   * **Kapsula 3:** Izbor motora, profil i meni.
2. **Leva bočna traka = DINAMIČKA ANIMIRANA PILULA ZA TABOVE:**
   * Pilula za tabove automatski i glatko raste i skuplja se (animira) prateći tačnu količinu otvorenih tabova.
   * Pametna navigacija: kada zatvoriš tab, automatski te prebacuje na prednji tab.
3. **`⟳ AERO` Logo i brending:**
   * Smešten desno od vertikalne pilule sa tabovima, u gornji levi ugao radne površine.
   * Koristi originalni crtež autora i **JetBrains Mono ExtraBold** font za natpis "AERO".
4. **Početni ekran (Home View):**
   * Centralni Search bar sa `LUCKY GUESS!` tasterom.
   * 6 prečica sa mogućnošću dodavanja novih.
   * Desni vidžet panel (sat, datum, nula telemetrije) koji popunjava celu kutiju.
   * Oznaka verzije: `PRE RELEASE = 1.1.2.0`.
5. **Nativni Desktop Launcher (`main.py`):**
   * Pokreće samostalni prozor na Artix Linuxu koristeći `qt6-webengine` i PyQt6.
   * Poseduje i ugrađeni pametni proxy u `server.py` za uklanjanje `X-Frame-Options` restrikcija.

---

## 📋 Faze rada
- [x] **Definisanje odgovornosti i arhitekture**
- [x] **Kreiranje jedinog izvora istine za responsivity (`ui/responsive.py`)**
- [x] **Definisanje 1 izvora istine za svaki element (`button`, `box`, `text`, `input`, `icon`, `badge`, `tab`)**
- [x] **Kreiranje centralnog registra elemenata (`core/registry.js`)**
- [x] **Gornja traka sa 3 zaobljene kapsule na čistoj pozadini**
- [x] **AERO tekst postavljen u JetBrains Mono ExtraBold font**
- [x] **Originalni logoi motora (Aero, Chromium, Yandex)**
- [x] **Animirana pilula za tabove koja dinamički prati količinu tabova**
- [x] **Automatsko prebacivanje na prednji tab pri zatvaranju taba**
- [x] **Inicijalizacija Git-a i kreiranje GitHub repozitorijuma (`alexandervance234-cyber/Aero-Browser`)**
- [x] **Ispravka rekurzivne petlje u komponentama i dodavanje no-cache zaštite**
- [x] **Kreiran samostalni Linux Desktop program (`main.py`) i ugrađen pametni proxy u `server.py`**
- [ ] **Faza 4: Interaktivni Animirani Analogni Sat/Vidžet (Rasterećenje radne površine)**
  * **Arhitektura:** Nova samostalna Web komponenta `<aero-clock-widget>` u `ui/components/clock_widget.js` (SSOT pravilo).
  * **Početno (Mirovanje) stanje:** Mali, elegantni kružni analogni sat (SVG brojčanik sa satnom, minutnom i sekundnom kazaljkom u realnom vremenu). Zauzima minimalan prostor u uglu.
  * **Hover (Prošireno) stanje:** Kada miš pređe preko sata, glatkom FLIP/CSS transformacijom krug se širi u punu vidžet karticu sa digitalnim satom, ćiriličnim datumom, bedžom "0% Telemetrije" i klikabilnim akcijama.
  * **Mouseleave (Smanjivanje):** Čim kursor napusti prostor vidžeta, glatko se vraća u analogni krug bez seckanja (GPU ubrzanje).
- [ ] **Faza 5: Integracija lokalnog čuvanja (Storage)**
- [ ] **Faza 6: Priprema instalacionog paketa za Artix/Arch (PKGBUILD)**
