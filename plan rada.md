# Plan rada - Aero BROWSER

## 🎯 Glavna vizija
* **Naziv:** Aero BROWSER
* **Verzija:** PRE RELEASE = 1.1.2.0
* **Platforma:** Linux (Artix, Arch...), macOS, Windows, mobilni i tablet ekrani
* **Filozofija:** Brz, bez telemetrije, bez veštačke inteligencije (no-AI), 100% otvorenog koda (Open Source na GitHub-u).
* **Karakteristike:** Mogućnost izbora motora/pretraživača (Aero podrazumevano, Chromium, Yandex...).

---

## 📅 STATUS RADA NA DAN 23.11.2026.

### ✅ Završeno danas:
1. **Arhitektura bez monolita i duplog koda (Single Source of Truth):**
   * Kreiran centralni registar elemenata: `core/registry.js`.
   * Definisani samostalni moduli za svaki element:
     - Dugme: `<aero-button>` (`ui/components/button.js`)
     - Box / Panel: `<aero-box>` (`ui/components/box.js`)
     - Tekst: `<aero-text>` (`ui/components/text.js`)
     - Unos (Input): `<aero-input>` (`ui/components/input.js`)
     - Ikonice: `<aero-icon>` (`ui/components/icon.js`)
     - Značka / Status: `<aero-badge>` (`ui/components/badge.js`)
     - Vertikalni Tab: `<aero-tab>` (`ui/components/tab.js`)
2. **Jedini izvor istine za odzivnost (`ui/responsive.py`):**
   * `COMPACT_PORTRAIT` (Telefoni + tableti vertikalno)
   * `DESKTOP_LANDSCAPE` (Tableti horizontalno, laptopovi, desktop i Mac)
3. **Korisnički interfejs usklađen 100% sa crtežima autora:**
   * **Gornja traka (3 zaobljene kapsule / pilule):**
     - Kapsula 1: `Home`, `Back`, `Forward`, `Refresh` i `LOCK SEARCH` u jednom zaobljenom obliku.
     - Kapsula 2: Dinamička adresna traka sa ikonicom aktivnog motora i strelicom za pretragu.
     - Kapsula 3: Izbor motora (`Aero`, `Chromium`, `Yandex`), profil i meni.
     - Uklonjena siva linija i usklađena boja hedera tako da pilule lebde na čistoj podlozi.
   * **Leva traka = Velika vertikalna pilula sa dinamičkom animacijom:**
     - Mesto gde idu tabovi oblikovano u veliku zaobljenu pilulu od vrha ka dnu.
     - Okruglo dugme `+` na vrhu za novi tab.
     - Vertikalni tabovi poređani po crtežu (`YouTube`, `Snapchat`, `Wikipedia`).
     - **Glatka animacija visine:** Pilula se automatski širi i skuplja prateći tačan broj tabova!
     - **Pametna navigacija:** Pri zatvaranju taba na `×`, odmah te prebacuje na **prednji (prethodni) tab**.
   * **AERO Brending i Logo:**
     - Premešten desno od tabova u gornji levi ugao radne površine (po crtežu).
     - Primenjen crtež kružnih strelica iz autorove sveske.
     - Primenjen **JetBrains Mono ExtraBold** font isključivo za natpis "AERO".
   * **Originalni logoi motora:**
     - Ubačene tačne slike koje je poslao autor (`Aero Engine`, `Chromium`, `Yandex`).
   * **Početni ekran (Home View):**
     - Centralni zaobljeni Search bar sa dugmetom `LUCKY GUESS!`.
     - 6 prečica (`+`, `+`, `+`, YouTube, Netflix, `+`) sa dodavanjem sajtova.
     - Desni vidžet (sat, datum, status telemetrije 0%) proširen da popuni celu kutiju (uklonjen tekst "VIDŽETI PO UKUSU").
     - Oznaka verzije: `PRE RELEASE = 1.1.2.0`.
   * **Lokalni server:**
     - Projekat uspešno serviran i testiran na `http://localhost:8000`.

---

## 📋 PREOSTALI KORACI I SLEDEĆE FAZE

- [ ] **Faza 4: Integracija lokalnog skladišta (Storage):**
  - Kreiranje `storage/db.py` (SQLite ili JSON baza) za trajno čuvanje korisničkih prečica, otvorenih tabova i istorije pri restartu računara.
- [ ] **Faza 5: Integracija punog WebEngine motora:**
  - Povezivanje sa `qt6-webengine` na Artix Linuxu za potpuno nezavisno surfovanje internetom.
- [ ] **Faza 6: Git repozitorijum i GitHub distribucija:**
  - Inicijalizacija Git-a, postavljanje `.gitignore` fajla.
  - Pisanje profesionalnog `README.md` sa snimcima ekrana i Kostinim dizajnom.
  - Kreiranje `PKGBUILD` skripte za instalaciju na Artix/Arch Linuxu (`yay -S aero-browser`).
