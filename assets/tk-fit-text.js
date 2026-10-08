/**
 * <tk-fit-text> — scales its text so it spans the full width of its container.
 * Used for the oversized footer wordmark. Pure progressive enhancement: without JS
 * the CSS clamp() font-size fallback is used. Re-fits on resize and after web fonts load.
 */
if (!customElements.get('tk-fit-text')) {
  class TkFitText extends HTMLElement {
    connectedCallback() {
      this.fit = this.fit.bind(this);
      this.observer = new ResizeObserver(() => window.requestAnimationFrame(this.fit));
      this.observer.observe(this.parentElement || this);
      if (document.fonts && document.fonts.ready) {
        document.fonts.ready.then(this.fit);
      }
      this.fit();
    }

    disconnectedCallback() {
      if (this.observer) this.observer.disconnect();
    }

    fit() {
      const container = this.parentElement || this;
      const available = container.clientWidth;
      if (!available) return;

      const max = parseFloat(this.dataset.max || '420');
      const min = parseFloat(this.dataset.min || '64');

      // Measure at a known size, then scale linearly (text width ∝ font-size).
      this.style.fontSize = '100px';
      const measured = this.getBoundingClientRect().width;
      if (!measured) return;

      const next = Math.max(min, Math.min(max, (available / measured) * 100 * 0.995));
      this.style.fontSize = `${next}px`;
    }
  }

  customElements.define('tk-fit-text', TkFitText);
}
