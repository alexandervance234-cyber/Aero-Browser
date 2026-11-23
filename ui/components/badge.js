/**
 * AERO BROWSER - SINGLE SOURCE OF TRUTH ZA ZNAČKU / STATUS (BADGE)
 * ui/components/badge.js
 * Jedini izvor istine za statusne pilule (LOCK SEARCH, Telemetrija 0%, Pre-release).
 */

export class AeroBadge extends HTMLElement {
  static get observedAttributes() {
    return ['variant', 'text', 'icon'];
  }

  connectedCallback() {
    this.render();
  }

  attributeChangedCallback() {
    this.render();
  }

  render() {
    const variant = this.getAttribute('variant') || 'status'; // 'lock', 'status', 'version'
    const text = this.getAttribute('text') || this.textContent.trim();
    const icon = this.getAttribute('icon') || '';

    this.className = `aero-badge aero-badge-${variant}`;
    this.innerHTML = `
      ${icon ? `<span class="badge-icon">${icon}</span>` : ''}
      <span class="badge-text">${text}</span>
    `;

    this.style.display = 'inline-flex';
    this.style.alignItems = 'center';
    this.style.gap = '6px';
    this.style.borderRadius = 'var(--aero-radius-pill)';
    this.style.fontSize = '11px';
    this.style.fontWeight = '700';
    this.style.letterSpacing = '0.5px';
    this.style.userSelect = 'none';

    if (variant === 'lock') {
      this.style.padding = '5px 12px';
      this.style.backgroundColor = 'rgba(35, 134, 54, 0.2)';
      this.style.border = '1px solid rgba(57, 197, 187, 0.4)';
      this.style.color = 'var(--aero-accent-cyan)';
    } else if (variant === 'status') {
      this.style.padding = '4px 10px';
      this.style.backgroundColor = 'rgba(35, 134, 54, 0.15)';
      this.style.color = 'var(--aero-accent)';
    } else if (variant === 'version') {
      this.style.padding = '4px 8px';
      this.style.color = 'var(--aero-text-muted)';
      this.style.opacity = '0.75';
    }
  }
}

customElements.define('aero-badge', AeroBadge);
