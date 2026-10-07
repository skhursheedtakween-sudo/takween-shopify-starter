/* assets/tk-announcement-bar.js */
if (!customElements.get('tk-announcement-bar')) {
  class TkAnnouncementBar extends HTMLElement {
    constructor() {
      super();
      this.slides = Array.from(this.querySelectorAll('.tk-announcement__slide'));
      this.currentIndex = 0;
      this.timer = null;
      this.isPaused = false;
      this.rotationSpeed = parseInt(this.dataset.speed || '5', 10) * 1000;
      this.autoRotate = this.dataset.autoRotate === 'true';

      this.prevBtn = this.querySelector('.tk-announcement__btn--prev');
      this.nextBtn = this.querySelector('.tk-announcement__btn--next');
      this.playPauseBtn = this.querySelector('.tk-announcement__pause-btn');
      this.sliderTrack = this.querySelector('.tk-announcement__slides');
      this.dismissBtn = this.querySelector('.tk-announcement__dismiss');

      // Check dismissal state in sessionStorage
      if (this.dataset.dismissible === 'true') {
        try {
          if (sessionStorage.getItem('tk-announcement-dismissed') === 'true') {
            this.style.display = 'none';
            return;
          }
        } catch (e) {
          // Ignore sessionStorage errors
        }
      }

      // Check prefers-reduced-motion
      this.reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (this.reducedMotion) {
        this.autoRotate = false;
      }
    }

    connectedCallback() {
      if (this.slides.length <= 1) return;

      if (this.prevBtn) {
        this.prevBtn.addEventListener('click', () => {
          this.pause();
          this.prevSlide();
        });
      }

      if (this.nextBtn) {
        this.nextBtn.addEventListener('click', () => {
          this.pause();
          this.nextSlide();
        });
      }

      if (this.playPauseBtn) {
        this.playPauseBtn.addEventListener('click', () => this.togglePlayPause());
      }

      if (this.dismissBtn) {
        this.dismissBtn.addEventListener('click', () => this.dismiss());
      }

      // Theme editor block select event
      document.addEventListener('shopify:block:select', (event) => {
        const block = event.target;
        if (block && this.contains(block)) {
          const index = this.slides.indexOf(block);
          if (index !== -1) {
            this.pause();
            this.goToSlide(index);
          }
        }
      });

      if (this.autoRotate && !this.reducedMotion) {
        this.startAutoRotate();
      }
    }

    disconnectedCallback() {
      this.stopAutoRotate();
    }

    dismiss() {
      this.style.display = 'none';
      try {
        sessionStorage.setItem('tk-announcement-dismissed', 'true');
      } catch (e) {
        // Ignore
      }
    }

    goToSlide(index) {
      if (index < 0) {
        this.currentIndex = this.slides.length - 1;
      } else if (index >= this.slides.length) {
        this.currentIndex = 0;
      } else {
        this.currentIndex = index;
      }

      this.slides.forEach((slide, idx) => {
        const isActive = idx === this.currentIndex;
        slide.classList.toggle('is-active', isActive);
        slide.setAttribute('aria-hidden', isActive ? 'false' : 'true');
      });
    }

    prevSlide() {
      this.goToSlide(this.currentIndex - 1);
    }

    nextSlide() {
      this.goToSlide(this.currentIndex + 1);
    }

    startAutoRotate() {
      this.stopAutoRotate();
      this.timer = setInterval(() => {
        if (!this.isPaused) {
          this.nextSlide();
        }
      }, this.rotationSpeed);
      if (this.playPauseBtn) {
        this.playPauseBtn.setAttribute('aria-label', 'Pause announcement rotation');
        this.playPauseBtn.classList.remove('is-paused');
      }
    }

    stopAutoRotate() {
      if (this.timer) {
        clearInterval(this.timer);
        this.timer = null;
      }
    }

    pause() {
      this.isPaused = true;
      if (this.playPauseBtn) {
        this.playPauseBtn.setAttribute('aria-label', 'Play announcement rotation');
        this.playPauseBtn.classList.add('is-paused');
      }
    }

    togglePlayPause() {
      if (this.isPaused) {
        this.isPaused = false;
        this.startAutoRotate();
      } else {
        this.pause();
        this.stopAutoRotate();
      }
    }
  }

  customElements.define('tk-announcement-bar', TkAnnouncementBar);
}
