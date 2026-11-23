/**
 * AERO BROWSER - VERTICAL TABS SIDEBAR VIEW
 * ui/views/sidebar.js
 * 
 * Dinamička animacija pilule:
 * Visina pilule se automatski i glatko (animirano) prilagođava tačnoj količini tabova!
 */

import { AeroAPI } from '../../core/api.js';

export function renderSidebar(container) {
  function calculateHeight() {
    const tabCount = AeroAPI.tabs.length;
    // 32px (padding) + 50px (dugme +) + tabovi (svaki tab 52px + 14px razmak = 66px)
    const height = 32 + 50 + (tabCount > 0 ? 14 + (tabCount * 66) : 0);
    return Math.min(height, window.innerHeight - 80);
  }

  function updateTabs() {
    const targetHeight = calculateHeight();

    container.innerHTML = `
      <nav class="sidebar-wrapper" id="aero-sidebar" style="height: ${targetHeight}px;">
        <!-- Dugme za novi tab na vrhu pilule -->
        <aero-button class="sidebar-new-tab-btn" id="btn-add-vertical-tab" title="Otvori novi tab (+)">
          <span>+</span>
        </aero-button>

        <!-- Lista vertikalnih tabova -->
        <div class="sidebar-tabs-list" id="sidebar-tabs-container">
          ${AeroAPI.tabs.map(tab => {
            const isActive = AeroAPI.activeTabId === tab.id ? 'active' : '';
            return `
              <aero-tab tab-id="${tab.id}" title="${tab.title}" icon="${tab.icon}" ${isActive}></aero-tab>
            `;
          }).join('')}
        </div>
      </nav>
    `;

    // Klik na tab za aktivaciju
    container.querySelectorAll('aero-tab').forEach(card => {
      card.addEventListener('click', (e) => {
        if (e.target.classList.contains('tab-card-close')) return;
        const tabId = card.getAttribute('tab-id');
        AeroAPI.switchTab(tabId);
        updateTabs();
      });
    });

    // Zatvaranje taba (uz animaciju skupljanja pilule)
    container.querySelectorAll('.tab-card-close').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const tabId = btn.getAttribute('data-close-id');
        AeroAPI.closeTab(tabId);
        updateTabs();
      });
    });

    // Dodavanje novog taba (uz animaciju širenja pilule)
    const addBtn = container.querySelector('#btn-add-vertical-tab');
    if (addBtn) {
      addBtn.addEventListener('click', () => {
        AeroAPI.goHome();
        updateTabs();
      });
    }
  }

  AeroAPI.subscribe((event) => {
    if (event === 'tabs_updated' || event === 'tab_switched' || event === 'navigated_home') {
      updateTabs();
    }
  });

  window.addEventListener('resize', () => {
    const sidebar = container.querySelector('#aero-sidebar');
    if (sidebar) sidebar.style.height = `${calculateHeight()}px`;
  });

  updateTabs();
}
