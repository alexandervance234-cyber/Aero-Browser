/**
 * AERO BROWSER - CORE API & CENTRAL STATE
 * core/api.js
 * Jedini izvor istine za stanje celog browsera i vertikalne tabove.
 */

class AeroCoreState {
  constructor() {
    this.engines = {
      aero: { name: "Aero Engine", searchUrl: "https://duckduckgo.com/?q=" },
      chromium: { name: "Chromium Blink", searchUrl: "https://www.google.com/search?q=" },
      yandex: { name: "Yandex Engine", searchUrl: "https://yandex.com/search/?text=" }
    };
    this.currentEngine = 'aero';
    this.isGhostMode = false;
    
    // Vertikalni tabovi sa leve strane (Single Source of Truth)
    // Početni primeri sa skice (YouTube, Snapchat, Wikipedia)
    this.tabs = [
      { id: 'tab-1', title: 'YouTube', url: 'https://youtube.com', icon: '▶', iconType: 'youtube' },
      { id: 'tab-2', title: 'Snapchat', url: 'https://web.snapchat.com', icon: '👻', iconType: 'snapchat' },
      { id: 'tab-3', title: 'Wikipedia', url: 'https://wikipedia.org', icon: '🌐', iconType: 'wikipedia' },
    ];
    this.activeTabId = null; // null znači da je na početnom ekranu (Home / Search)
    this.listeners = [];
  }

  subscribe(listener) {
    this.listeners.push(listener);
  }

  notify(event, data) {
    this.listeners.forEach(fn => fn(event, data));
  }

  setEngine(engineKey) {
    if (this.engines[engineKey]) {
      this.currentEngine = engineKey;
      this.notify('engine_changed', this.currentEngine);
    }
  }

  // Upravljanje vertikalnim tabovima
  addTab(url = "", title = "Novi Tab", icon = "★") {
    const newId = 'tab-' + Date.now();
    const newTab = { id: newId, title, url, icon, iconType: 'custom' };
    this.tabs.push(newTab);
    this.switchTab(newId);
    this.notify('tabs_updated', this.tabs);
    return newTab;
  }

  closeTab(tabId) {
    const closedIndex = this.tabs.findIndex(t => t.id === tabId);
    if (closedIndex === -1) return;

    // Pronalazimo prednji (prethodni) tab pre brisanja
    let nextTabToActivate = null;
    if (this.activeTabId === tabId) {
      if (closedIndex > 0) {
        // Prebacujemo na PREDNJI (prethodni) tab
        nextTabToActivate = this.tabs[closedIndex - 1];
      } else if (this.tabs.length > 1) {
        // Ako je obrisan prvi tab, prebacujemo na onaj koji je odmah iza njega
        nextTabToActivate = this.tabs[1];
      }
    }

    // Uklanjamo tab sa liste
    this.tabs = this.tabs.filter(t => t.id !== tabId);

    // Ako je obrisani tab bio aktivan, aktiviramo prednji tab ili idemo na početnu
    if (this.activeTabId === tabId) {
      if (nextTabToActivate) {
        this.switchTab(nextTabToActivate.id);
      } else if (this.tabs.length > 0) {
        this.switchTab(this.tabs[this.tabs.length - 1].id);
      } else {
        this.goHome();
      }
    }

    this.notify('tabs_updated', this.tabs);
  }

  switchTab(tabId) {
    this.activeTabId = tabId;
    const tab = this.tabs.find(t => t.id === tabId);
    if (!tab) return;

    this.notify('tab_switched', tab);

    const frame = document.getElementById('aero-web-view');
    const homeView = document.getElementById('aero-home-view');
    const addressInput = document.getElementById('aero-address-input');

    if (addressInput) addressInput.value = tab.url || tab.title;

    if (frame && homeView) {
      if (tab.url && tab.url !== 'about:blank') {
        // Koristimo naš lokalni Aero proxy da zaobiđemo iframe security blokadu
        if (tab.url.startsWith('http://') || tab.url.startsWith('https://')) {
          frame.src = `/proxy?url=${encodeURIComponent(tab.url)}`;
        } else {
          frame.src = tab.url;
        }
        frame.style.display = 'block';
        homeView.style.display = 'none';
      } else {
        frame.style.display = 'none';
        homeView.style.display = 'flex';
      }
    }
  }

  goHome() {
    this.activeTabId = null;
    const frame = document.getElementById('aero-web-view');
    const homeView = document.getElementById('aero-home-view');
    const addressInput = document.getElementById('aero-address-input');

    if (addressInput) addressInput.value = '';
    if (frame && homeView) {
      frame.style.display = 'none';
      homeView.style.display = 'flex';
      frame.src = 'about:blank';
    }
    this.notify('navigated_home', null);
  }

  executeSearch(query) {
    if (!query || query.trim() === '') return;
    const engine = this.engines[this.currentEngine];
    const fullUrl = engine.searchUrl + encodeURIComponent(query);
    this.addTab(fullUrl, query, '🔍');
  }

  openUrl(url, title = "Stranica", icon = "🌐") {
    this.addTab(url, title, icon);
  }

  luckyGuess() {
    const popularDestinations = [
      { title: "Arch Linux", url: "https://archlinux.org", icon: "🐧" },
      { title: "Artix Linux", url: "https://artixlinux.org", icon: "🚀" },
      { title: "GitHub", url: "https://github.com", icon: "🐙" },
      { title: "Wikipedia", url: "https://wikipedia.org", icon: "🌐" },
      { title: "YouTube", url: "https://youtube.com", icon: "▶" }
    ];
    const item = popularDestinations[Math.floor(Math.random() * popularDestinations.length)];
    this.openUrl(item.url, item.title, item.icon);
  }
}

export const AeroAPI = new AeroCoreState();
