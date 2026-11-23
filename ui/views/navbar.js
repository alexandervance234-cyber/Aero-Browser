/**
 * AERO BROWSER - TOP NAVBAR VIEW
 * ui/views/navbar.js
 * 
 * Prema tačnom crtežu:
 * 1. "Prvi oblak": Zaobljeni pilula-okvir koji u sebi drži Home, Back, Forward, Refresh I Lock Search!
 * 2. "Drugi oblak": Zaobljeni pilula-okvir za adresu i pretragu sa ikonicom motora.
 * 3. "Treći oblak": Opcije, izbor motora, profil i meni.
 * (AERO Logo je premešten dole iznad vertikalnih tabova, tačno kao na crtežu!)
 */

import { AeroAPI } from '../../core/api.js';
import { AeroIcons } from '../components/icon.js';

export function renderNavbar(container) {
  container.innerHTML = `
    <header class="navbar-wrapper">
      <!-- PRVI OBLAK: Navigacija + Lock Search u jednom obliku -->
      <div class="nav-capsule-pill" id="nav-controls-pill">
        <aero-button id="btn-home" variant="icon" title="Aero Početna">
          <aero-icon name="home"></aero-icon>
        </aero-button>
        <aero-button id="btn-back" variant="icon" title="Nazad">
          <aero-icon name="back"></aero-icon>
        </aero-button>
        <aero-button id="btn-forward" variant="icon" title="Napred">
          <aero-icon name="forward"></aero-icon>
        </aero-button>
        <aero-button id="btn-refresh" variant="icon" title="Osveži">
          <aero-icon name="refresh"></aero-icon>
        </aero-button>

        <span class="capsule-divider"></span>

        <!-- LOCK SEARCH unutar prvog oblaka sa skice -->
        <div class="lock-search-inline" title="Enkripcija i nula telemetrije">
          <aero-icon name="lock"></aero-icon>
          <span class="lock-search-text">LOCK SEARCH</span>
        </div>
      </div>

      <!-- DRUGI OBLAK: Adresna / Search traka sa ikonicom motora -->
      <div class="nav-address-bar-wrapper">
        <div class="address-bar-container">
          <span class="engine-badge-icon" id="active-engine-icon" title="Aktivni motor">
            ${AeroIcons.engine_aero}
          </span>
          <input type="text" id="aero-address-input" placeholder="Unesi veb adresu ili pretraži..." />
          <button id="btn-address-go" class="address-go-btn" title="Idi">➔</button>
        </div>
      </div>

      <!-- TREĆI OBLAK: Izbor motora, Profil i Meni -->
      <div class="nav-right-pill">
        <select id="engine-select" class="engine-picker" title="Izbor motora / pretraživača">
          <option value="aero">⟳ Aero</option>
          <option value="chromium">◉ Chromium</option>
          <option value="yandex">Я Yandex</option>
        </select>

        <aero-button id="btn-profile" variant="icon" title="Profil">
          <span style="font-size: 14px;">👤</span>
        </aero-button>
        <aero-button id="btn-menu" variant="icon" title="Meni">
          <span style="font-size: 16px; font-weight: bold;">☰</span>
        </aero-button>
      </div>
    </header>
  `;

  const engineIconContainer = container.querySelector('#active-engine-icon');
  const engineSelect = container.querySelector('#engine-select');

  function updateEngineIcon(engineKey) {
    if (engineKey === 'chromium') {
      engineIconContainer.innerHTML = AeroIcons.engine_chromium;
      engineIconContainer.setAttribute('title', 'Chromium Engine aktivan');
    } else if (engineKey === 'yandex') {
      engineIconContainer.innerHTML = AeroIcons.engine_yandex;
      engineIconContainer.setAttribute('title', 'Yandex Engine aktivan');
    } else {
      engineIconContainer.innerHTML = AeroIcons.engine_aero;
      engineIconContainer.setAttribute('title', 'Aero Engine (Podrazumevani)');
    }
  }

  engineSelect.addEventListener('change', (e) => {
    const selected = e.target.value;
    AeroAPI.setEngine(selected);
    updateEngineIcon(selected);
  });

  container.querySelector('#btn-home').addEventListener('click', () => AeroAPI.goHome());
  container.querySelector('#btn-refresh').addEventListener('click', () => {
    const frame = document.getElementById('aero-web-view');
    if (frame && frame.src && frame.src !== 'about:blank') frame.src = frame.src;
  });

  const addressInput = container.querySelector('#aero-address-input');
  const navigateAddress = () => {
    const val = addressInput.value.trim();
    if (!val) return;
    if (val.startsWith('http://') || val.startsWith('https://')) {
      AeroAPI.openUrl(val, val);
    } else {
      AeroAPI.executeSearch(val);
    }
  };

  container.querySelector('#btn-address-go').addEventListener('click', navigateAddress);
  addressInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') navigateAddress();
  });

  updateEngineIcon(AeroAPI.currentEngine);
}
