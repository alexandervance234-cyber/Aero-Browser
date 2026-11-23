/**
 * AERO BROWSER - SINGLE SOURCE OF TRUTH ZA BOX / PANEL
 * ui/components/box.js
 */

export class AeroBox extends HTMLElement {
  connectedCallback() {
    const variant = this.getAttribute('variant') || 'panel'; // 'panel', 'card', 'pill'
    this.classList.add('aero-box', `aero-box-${variant}`);

    let radius = 'var(--aero-radius-md)';
    if (variant === 'pill') radius = 'var(--aero-radius-pill)';
    if (variant === 'card') radius = 'var(--aero-radius-lg)';

    this.style.cssText = `
      display: flex;
      background-color: var(--aero-surface);
      border: 1px solid var(--aero-border);
      border-radius: ${radius};
      transition: var(--aero-transition);
    `;
  }
}

customElements.define('aero-box', AeroBox);
