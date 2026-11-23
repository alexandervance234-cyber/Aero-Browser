/**
 * AERO BROWSER - CLOCK WIDGET COMPONENT
 * ui/components/clock_widget.js
 * 
 * JEDINI IZVOR ISTINE za analogni i digitalni sat vidžet sa morfovanjem.
 * - Početno (Mirovanje): Kompaktni okrugli analogni sat (SVG kazaljke u realnom vremenu).
 * - Hover (Prošireno): Glatko se morfuje u veliku karticu sa digitalnim satom, datumom i statusom.
 * - Mouseleave: Vraća se u mali analogni krug bez seckanja.
 */

export class AeroClockWidget extends HTMLElement {
  constructor() {
    super();
    this.timer = null;
    this.is24h = false;
  }

  connectedCallback() {
    if (this.rendered) return;
    this.rendered = true;
    this.render();
    this.startTick();
  }

  disconnectedCallback() {
    if (this.timer) {
      clearInterval(this.timer);
      this.timer = null;
    }
  }

  startTick() {
    this.updateClock();
    this.timer = setInterval(() => this.updateClock(), 1000);
  }

  updateClock() {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();

    // 1. Ažuriranje analognog sata (SVG kazaljke rotacija oko 50 50)
    const secHand = this.querySelector('#analog-sec');
    const minHand = this.querySelector('#analog-min');
    const hourHand = this.querySelector('#analog-hour');

    if (secHand && minHand && hourHand) {
      const secDeg = seconds * 6;
      const minDeg = (minutes + seconds / 60) * 6;
      const hourDeg = ((hours % 12) + minutes / 60) * 30;

      secHand.setAttribute('transform', `rotate(${secDeg} 50 50)`);
      minHand.setAttribute('transform', `rotate(${minDeg} 50 50)`);
      hourHand.setAttribute('transform', `rotate(${hourDeg} 50 50)`);
    }

    // 2. Ažuriranje digitalnog sata
    const digitalEl = this.querySelector('#digital-clock-time');
    const dateEl = this.querySelector('#digital-clock-date');

    if (digitalEl) {
      digitalEl.textContent = this.is24h 
        ? now.toLocaleTimeString('sr-RS', { hour12: false }) 
        : now.toLocaleTimeString('en-US', { hour12: true });
    }

    if (dateEl) {
      const dateStr = now.toLocaleDateString('sr-RS', { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      });
      // Prvo slovo veliko
      dateEl.textContent = dateStr.charAt(0).toUpperCase() + dateStr.slice(1);
    }
  }

  render() {
    this.innerHTML = `
      <div class="aero-clock-morph-card" title="Aero Sat i Status">
        <!-- 1. Analogni krug (Prikazuje se u mirovanju) -->
        <div class="analog-clock-view">
          <svg class="analog-clock-svg" viewBox="0 0 100 100">
            <!-- Pozadina brojčanika -->
            <circle cx="50" cy="50" r="47" class="analog-face" />
            
            <!-- 12 oznaka za sate -->
            <line x1="50" y1="8" x2="50" y2="15" class="analog-tick-major" />
            <line x1="92" y1="50" x2="85" y2="50" class="analog-tick-major" />
            <line x1="50" y1="92" x2="50" y2="85" class="analog-tick-major" />
            <line x1="8" y1="50" x2="15" y2="50" class="analog-tick-major" />
            
            <circle cx="71.2" cy="28.8" r="1.8" class="analog-tick-minor" />
            <circle cx="71.2" cy="71.2" r="1.8" class="analog-tick-minor" />
            <circle cx="28.8" cy="71.2" r="1.8" class="analog-tick-minor" />
            <circle cx="28.8" cy="28.8" r="1.8" class="analog-tick-minor" />

            <!-- Kazaljke -->
            <line id="analog-hour" x1="50" y1="50" x2="50" y2="28" class="analog-hand analog-hour" />
            <line id="analog-min" x1="50" y1="50" x2="50" y2="20" class="analog-hand analog-min" />
            <line id="analog-sec" x1="50" y1="56" x2="50" y2="14" class="analog-hand analog-sec" />
            
            <!-- Centralni pin -->
            <circle cx="50" cy="50" r="3.5" class="analog-pin" />
          </svg>
        </div>

        <!-- 2. Prošireni digitalni vidžet (Prikazuje se na Hover) -->
        <div class="digital-widget-view">
          <div class="widget-clock" id="digital-clock-time" title="Klikni da promeniš format (12h / 24h)">--:--:--</div>
          <div class="widget-date" id="digital-clock-date">Učitavanje...</div>
          <div class="widget-badge-wrapper" id="btn-telemetry-badge" title="Aero nulta telemetrija aktivna">
            <aero-badge variant="status" text="● Sistem: 0% Telemetrije"></aero-badge>
          </div>
        </div>
      </div>
    `;

    // Klikabilnost elemenata unutar proširenog prikaza
    const digitalEl = this.querySelector('#digital-clock-time');
    if (digitalEl) {
      digitalEl.addEventListener('click', (e) => {
        e.stopPropagation();
        this.is24h = !this.is24h;
        this.updateClock();
      });
    }

    const badgeEl = this.querySelector('#btn-telemetry-badge');
    if (badgeEl) {
      badgeEl.addEventListener('click', (e) => {
        e.stopPropagation();
        alert("🛡️ Aero BROWSER Štiti Tvoju Privatnost:\n\n• 0% Telemetrije\n• 0% AI Praćenja\n• 100% Slobodan i Otvoren Kod");
      });
    }
  }
}

if (!customElements.get('aero-clock-widget')) {
  customElements.define('aero-clock-widget', AeroClockWidget);
}
