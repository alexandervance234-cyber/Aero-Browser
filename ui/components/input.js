/**
 * AERO BROWSER - SINGLE SOURCE OF TRUTH ZA POLJE ZA UNOS (INPUT)
 * ui/components/input.js
 * Jedini izvor istine za unos adrese, search bar i forme.
 */

export class AeroInput extends HTMLElement {
  static get observedAttributes() {
    return ['placeholder', 'value', 'variant'];
  }

  connectedCallback() {
    this.render();
  }

  attributeChangedCallback(name, oldVal, newVal) {
    if (oldVal !== newVal) {
      this.render();
    }
  }

  get value() {
    const input = this.querySelector('input');
    return input ? input.value : '';
  }

  set value(val) {
    const input = this.querySelector('input');
    if (input) input.value = val;
  }

  focus() {
    const input = this.querySelector('input');
    if (input) input.focus();
  }

  render() {
    const placeholder = this.getAttribute('placeholder') || '';
    const val = this.getAttribute('value') || '';
    const variant = this.getAttribute('variant') || 'standard'; // 'standard', 'search', 'address'

    this.innerHTML = `
      <div class="aero-input-wrapper aero-input-${variant}">
        <input type="text" placeholder="${placeholder}" value="${val}" spellcheck="false" autocomplete="off" />
      </div>
    `;

    const inputEl = this.querySelector('input');
    inputEl.addEventListener('keydown', (e) => {
      this.dispatchEvent(new CustomEvent('aero-keydown', { detail: { key: e.key, value: inputEl.value } }));
    });
    inputEl.addEventListener('input', () => {
      this.dispatchEvent(new CustomEvent('aero-change', { detail: { value: inputEl.value } }));
    });
  }
}

if (!customElements.get('aero-input')) {
  customElements.define('aero-input', AeroInput);
}
