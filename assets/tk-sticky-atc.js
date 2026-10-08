/**
 * <tk-sticky-atc> — mobile sticky Add to cart (snippets/tk-sticky-atc.liquid).
 * Shows when the main ATC button is scrolled out of view (IntersectionObserver),
 * hides when a drawer/modal is open. Submits the main product form (no duplicate cart logic).
 * Syncs price/availability on Dawn's variantChange pub/sub event.
 */
if (!customElements.get('tk-sticky-atc')) {
  class TkStickyAtc extends HTMLElement {
    connectedCallback() {
      this.sectionId = this.dataset.sectionId;
      this.mq = window.matchMedia('(max-width: 749px)');
      this.mainBtn = document.getElementById('ProductSubmitButton-' + this.sectionId);
      this.priceEl = this.querySelector('[data-tk-sticky-price]');
      this.btn = this.querySelector('[data-tk-sticky-btn]');
      this.label = this.querySelector('[data-tk-sticky-label]');

      if (this.mainBtn && 'IntersectionObserver' in window) {
        this.observer = new IntersectionObserver(
          (entries) => {
            const outOfView = !entries[0].isIntersecting;
            this.hidden = !(outOfView && this.mq.matches);
          },
          { rootMargin: '0px 0px -100% 0px' }
        );
        this.observer.observe(this.mainBtn);
      }

      this.onVariant = this.onVariant.bind(this);
      if (window.subscribe && window.PUB_SUB_EVENTS) {
        this.unsub = window.subscribe(window.PUB_SUB_EVENTS.variantChange, this.onVariant);
      }
    }

    disconnectedCallback() {
      if (this.observer) this.observer.disconnect();
      if (this.unsub) this.unsub();
    }

    onVariant(event) {
      const variant = event.data && event.data.variant;
      if (!variant || event.data.sectionId !== this.sectionId) return;
      if (this.btn) this.btn.disabled = !variant.available;
      if (this.label) {
        this.label.textContent = variant.available
          ? (window.variantStrings && window.variantStrings.addToCart) || 'Add to cart'
          : (window.variantStrings && window.variantStrings.soldOut) || 'Sold out';
      }
      if (this.priceEl && variant.price != null && window.Shopify) {
        this.priceEl.textContent = window.Shopify.formatMoney
          ? window.Shopify.formatMoney(variant.price, window.Shopify.money_format)
          : this.priceEl.textContent;
      }
    }
  }

  customElements.define('tk-sticky-atc', TkStickyAtc);
}
