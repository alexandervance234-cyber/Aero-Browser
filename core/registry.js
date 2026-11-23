/**
 * AERO BROWSER - CENTRAL ELEMENT REGISTRY (SINGLE SOURCE OF TRUTH)
 * core/registry.js
 * 
 * Ovaj fajl predstavlja JEDINI IZVOR ISTINE za definiciju i specifikaciju
 * svakog vizuelnog i interaktivnog elementa u Aero browseru.
 * Nijedan element ne sme imati duplirane stilove ili logiku van svog modula.
 */

export const AeroElementRegistry = {
  // 1. DUGME (AeroButton)
  BUTTON: {
    tag: 'aero-button',
    module: '/ui/components/button.js',
    description: 'Jedina istina za tastere (klik, hover, stanja, varijante)',
    variants: ['default', 'icon', 'pill', 'primary'],
    defaultVariant: 'default'
  },

  // 2. BOX / KONTEJNER (AeroBox)
  BOX: {
    tag: 'aero-box',
    module: '/ui/components/box.js',
    description: 'Jedina istina za panele, kartice i kontejnere',
    variants: ['panel', 'card', 'pill', 'tile'],
    defaultVariant: 'panel'
  },

  // 3. TEKST (AeroText)
  TEXT: {
    tag: 'aero-text',
    module: '/ui/components/text.js',
    description: 'Jedina istina za tipografiju, naslove, labele i opise',
    variants: ['title', 'subtitle', 'label', 'body', 'muted', 'badge'],
    defaultVariant: 'body'
  },

  // 4. POLJE ZA UNOS (AeroInput)
  INPUT: {
    tag: 'aero-input',
    module: '/ui/components/input.js',
    description: 'Jedina istina za polja za unos teksta, search bar i adresu',
    variants: ['address', 'search', 'standard'],
    defaultVariant: 'standard'
  },

  // 5. IKONA (AeroIcon)
  ICON: {
    tag: 'aero-icon',
    module: '/ui/components/icon.js',
    description: 'Jedina istina za sve vektorske SVG ikonice i logotipe motora',
    categories: ['navigation', 'system', 'engines', 'shortcuts']
  },

  // 6. ZNAČKA / STATUS (AeroBadge)
  BADGE: {
    tag: 'aero-badge',
    module: '/ui/components/badge.js',
    description: 'Jedina istina za statusne pilule (LOCK SEARCH, Telemetrija, Verzija)',
    variants: ['lock', 'status', 'version', 'engine'],
    defaultVariant: 'status'
  },

  // 7. VERTIKALNI TAB (AeroTab)
  TAB: {
    tag: 'aero-tab',
    module: '/ui/components/tab.js',
    description: 'Jedina istina za vertikalne kartice tabova sa leve strane',
    states: ['normal', 'active', 'hover']
  },

  // 8. SAT I STATUS VIDŽET (AeroClockWidget)
  CLOCK_WIDGET: {
    tag: 'aero-clock-widget',
    module: '/ui/components/clock_widget.js',
    description: 'Jedina istina za analogni sat sa morfovanjem u digitalni panel',
    states: ['collapsed_analog', 'expanded_digital']
  }
};
