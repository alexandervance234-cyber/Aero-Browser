/**
 * AERO BROWSER - SINGLE SOURCE OF TRUTH ZA VERTIKALNI TAB
 * ui/components/tab.js
 * Jedini izvor istine za vertikalne kartice tabova sa leve strane.
 */

export class AeroTab extends HTMLElement {
  static get observedAttributes() {
    return ['tab-id', 'icon', 'active'];
  }

  connectedCallback() {
    this.render();
  }

  attributeChangedCallback(name, oldVal, newVal) {
    if (oldVal !== newVal) {
      this.render();
    }
  }

  render() {
    const tabId = this.getAttribute('tab-id') || '';
    const icon = this.getAttribute('icon') || '★';
    const isActive = this.hasAttribute('active');

    this.className = `sidebar-tab-card ${isActive ? 'active' : ''}`;

    this.innerHTML = `
      <span class="tab-card-icon">${icon}</span>
      <span class="tab-card-close" data-close-id="${tabId}" title="Zatvori tab">×</span>
    `;
  }
}

if (!customElements.get('aero-tab')) {
  customElements.define('aero-tab', AeroTab);
}
