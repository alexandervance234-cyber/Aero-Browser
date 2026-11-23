/**
 * AERO BROWSER - SINGLE SOURCE OF TRUTH ZA TEKST
 * ui/components/text.js
 * Jedini izvor istine za veličine fonta, težine, boje i stilove teksta.
 */

export class AeroText extends HTMLElement {
  static get observedAttributes() {
    return ['variant', 'color', 'size', 'weight'];
  }

  connectedCallback() {
    this.render();
  }

  attributeChangedCallback() {
    this.render();
  }

  render() {
    const variant = this.getAttribute('variant') || 'body'; // 'title', 'subtitle', 'label', 'muted', 'badge', 'code'
    const color = this.getAttribute('color') || '';
    const size = this.getAttribute('size') || '';
    const weight = this.getAttribute('weight') || '';

    let fontSize = '14px';
    let fontWeight = '400';
    let fontColor = 'var(--aero-text-main)';
    let letterSpacing = 'normal';
    let textTransform = 'none';

    switch (variant) {
      case 'title':
        fontSize = '24px';
        fontWeight = '800';
        letterSpacing = '-0.5px';
        break;
      case 'subtitle':
        fontSize = '16px';
        fontWeight = '700';
        break;
      case 'label':
        fontSize = '12px';
        fontWeight = '700';
        letterSpacing = '1px';
        textTransform = 'uppercase';
        fontColor = 'var(--aero-text-muted)';
        break;
      case 'muted':
        fontSize = '12px';
        fontWeight = '400';
        fontColor = 'var(--aero-text-muted)';
        break;
      case 'badge':
        fontSize = '11px';
        fontWeight = '700';
        letterSpacing = '0.5px';
        break;
      case 'code':
        fontSize = '12px';
        fontWeight = '600';
        fontColor = 'var(--aero-accent-cyan)';
        break;
    }

    if (size) fontSize = size;
    if (weight) fontWeight = weight;
    if (color) fontColor = color;

    this.style.fontSize = fontSize;
    this.style.fontWeight = fontWeight;
    this.style.color = fontColor;
    this.style.letterSpacing = letterSpacing;
    this.style.textTransform = textTransform;
    this.style.display = 'inline-block';
  }
}

customElements.define('aero-text', AeroText);
