/**
 * AERO BROWSER - SINGLE SOURCE OF TRUTH ZA VERTIKALNI TAB
 * ui/components/tab.js
 * Jedini izvor istine za vertikalne kartice tabova sa leve strane.
 */

export class AeroTab extends HTMLElement {
  static get observedAttributes() {
    return ['tab-id', 'title', 'icon', 'active'];
  }

  connectedCallback() {
    this.render();
  }

  attributeChangedCallback() {
    this.render();
  }

  render() {
    const tabId = this.getAttribute('tab-id') || '';
    const title = this.getAttribute('title') || 'Tab';
    const icon = this.getAttribute('icon') || '★';
    const isActive = this.hasAttribute('active');

    this.className = `sidebar-tab-card ${isActive ? 'active' : ''}`;
    this.setAttribute('data-id', tabId);
    this.setAttribute('title', title);

    this.innerHTML = `
      <span class="tab-card-icon">${icon}</span>
      <span class="tab-card-close" data-close-id="${tabId}" title="Zatvori tab">×</span>
    `;
  }
}

customElements.define('aero-tab', AeroTab);
