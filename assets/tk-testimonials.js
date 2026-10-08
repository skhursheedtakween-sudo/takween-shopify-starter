/**
 * <tk-testimonials> — single-quote slider for sections/tk-testimonials.liquid.
 * No autoplay (nothing moves unless the shopper asks). Prev/next buttons, ←/→ keys,
 * live counter, and Theme Editor block selection jumps to that quote.
 */
if (!customElements.get('tk-testimonials')) {
  class TkTestimonials extends HTMLElement {
    connectedCallback() {
      this.slides = Array.from(this.querySelectorAll('.tk-testi__slide'));
      this.current = 0;
      this.counter = this.querySelector('[data-tk-current]');
      if (this.slides.length < 2) return;

      this.querySelector('[data-tk-prev]')?.addEventListener('click', () => this.go(this.current - 1));
      this.querySelector('[data-tk-next]')?.addEventListener('click', () => this.go(this.current + 1));
      this.addEventListener('keydown', (event) => {
        if (event.key === 'ArrowLeft') this.go(this.current - 1);
        if (event.key === 'ArrowRight') this.go(this.current + 1);
      });

      this.onBlockSelect = (event) => {
        const index = this.slides.findIndex((slide) => slide === event.target || slide.contains(event.target));
        if (index > -1) this.go(index);
      };
      document.addEventListener('shopify:block:select', this.onBlockSelect);
    }

    disconnectedCallback() {
      if (this.onBlockSelect) document.removeEventListener('shopify:block:select', this.onBlockSelect);
    }

    go(index) {
      const total = this.slides.length;
      this.current = (index + total) % total;
      this.slides.forEach((slide, i) => {
        slide.hidden = i !== this.current;
      });
      if (this.counter) this.counter.textContent = String(this.current + 1);
    }
  }

  customElements.define('tk-testimonials', TkTestimonials);
}
