/**
 * AERO BROWSER - SINGLE SOURCE OF TRUTH ZA DUGME
 * ui/components/button.js
 */

export class AeroButton extends HTMLElement {
  connectedCallback() {
    const variant = this.getAttribute('variant') || 'default'; // 'default', 'icon', 'pill', 'primary'
    const title = this.getAttribute('title') || '';
    
    this.classList.add('aero-btn', `aero-btn-${variant}`);
    this.setAttribute('role', 'button');
    this.setAttribute('tabindex', '0');
    if (title) this.setAttribute('title', title);

    this.render();
  }

  render() {
    this.style.cssText = `
      display: inline-flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      border-radius: var(--aero-radius-md);
      transition: var(--aero-transition);
      user-select: none;
      outline: none;
    `;
  }
}

customElements.define('aero-button', AeroButton);
