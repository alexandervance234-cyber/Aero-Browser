/**
 * AERO BROWSER - HOME VIEW
 * ui/views/home_view.js
 * 
 * Sadrži AERO Brending Logo (dve kružne strelice prema novom crtežu)
 * postavljen malo desno od tabova, u gornji levi ugao radnog prostora!
 */

import { AeroAPI } from '../../core/api.js';
import { AeroIcons } from '../components/icon.js';

export function renderHomeView(container) {
  container.innerHTML = `
    <!-- AERO Brending pozicioniran desno od tabova u gornjem levom delu (Prema crtežu!) -->
    <div class="home-top-brand-bar">
      <div class="aero-canvas-brand" id="btn-aero-home-logo" title="Aero Browser">
        <span class="aero-dual-arrows">${AeroIcons.aero_logo}</span>
        <span class="aero-title-bold">AERO</span>
      </div>
    </div>

    <div class="home-main-container">
      <!-- Centralni blok: Search + Lucky Guess + Prečice -->
      <div class="home-center-column">
        <!-- Veliki Search Bar sa skice -->
        <div class="search-section">
          <div class="search-pill-container">
            <aero-text variant="label" size="13px" weight="800" color="var(--aero-text-muted)">SEARCH</aero-text>
            <input type="text" id="aero-search-input" placeholder="Pretraži internet ili unesi URL..." autofocus />
            <button id="btn-search-go" class="search-submit-btn" title="Kreni">
              <aero-icon name="arrowRight"></aero-icon>
            </button>
          </div>

          <!-- LUCKY GUESS! Sa skice ispod Search bara -->
          <div class="lucky-guess-wrapper">
            <button id="btn-lucky-guess" class="lucky-guess-btn" title="Otvara nasumičan dobar sajt!">
              <span class="lucky-circle"></span>
              <aero-text variant="badge" size="11px" weight="700">LUCKY GUESS!</aero-text>
            </button>
          </div>
        </div>

        <!-- 6 prečica sa crteža: [ + ] [ + ] [ + ] [ ▶ YouTube ] [ N Netflix ] [ + ] -->
        <div class="shortcuts-grid">
          <aero-box variant="card" class="shortcut-box" data-url="" title="Dodaj novu prečicu">
            <aero-icon name="plus"></aero-icon>
          </aero-box>
          <aero-box variant="card" class="shortcut-box" data-url="" title="Dodaj novu prečicu">
            <aero-icon name="plus"></aero-icon>
          </aero-box>
          <aero-box variant="card" class="shortcut-box" data-url="" title="Dodaj novu prečicu">
            <aero-icon name="plus"></aero-icon>
          </aero-box>
          <aero-box variant="card" class="shortcut-box shortcut-branded" data-url="https://youtube.com" title="YouTube">
            <span class="shortcut-icon-play">▶</span>
          </aero-box>
          <aero-box variant="card" class="shortcut-box shortcut-branded" data-url="https://netflix.com" title="Netflix">
            <span class="shortcut-icon-n">N</span>
          </aero-box>
          <aero-box variant="card" class="shortcut-box" data-url="" title="Dodaj novu prečicu">
            <aero-icon name="plus"></aero-icon>
          </aero-box>
        </div>
      </div>

      <!-- Desni panel: Animirani analogni sat koji se širi na hover (Rasterećena radna površina) -->
      <div class="widgets-panel">
        <aero-clock-widget></aero-clock-widget>
      </div>
    </div>

    <!-- Oznaka u desnom donjem uglu sa crteža: PRE RELEASE = 1.1.2.0 -->
    <div class="pre-release-tag">
      <aero-badge variant="version" text="PRE RELEASE = 1.1.2.0"></aero-badge>
    </div>
  `;

  // Klik na logo resetuje na home
  container.querySelector('#btn-aero-home-logo').addEventListener('click', () => {
    AeroAPI.goHome();
  });

  // Search input event
  const searchInput = container.querySelector('#aero-search-input');
  const searchBtn = container.querySelector('#btn-search-go');

  const doSearch = () => {
    const val = searchInput.value.trim();
    if (!val) return;
    if (val.startsWith('http://') || val.startsWith('https://')) {
      AeroAPI.openUrl(val, val);
    } else {
      AeroAPI.executeSearch(val);
    }
  };

  searchBtn.addEventListener('click', doSearch);
  searchInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') doSearch();
  });

  // Lucky Guess
  container.querySelector('#btn-lucky-guess').addEventListener('click', () => {
    AeroAPI.luckyGuess();
  });

  // Shortcuts
  container.querySelectorAll('.shortcut-box').forEach(box => {
    box.addEventListener('click', () => {
      const url = box.getAttribute('data-url');
      if (url) {
        const title = box.getAttribute('title') || 'Tab';
        AeroAPI.openUrl(url, title);
      } else {
        const customUrl = prompt("Unesi URL za ovu novu prečicu (npr. https://wikipedia.org):");
        if (customUrl) {
          box.setAttribute('data-url', customUrl);
          box.innerHTML = `<span style="font-weight: bold; font-size: 14px;">★</span>`;
          box.classList.add('shortcut-branded');
        }
      }
    });
  });
}
