/**
 * <tk-tabs> — accessible tabs (WAI-ARIA tabs pattern, manual activation on click/Enter,
 * arrow keys move focus + activate). Used by sections/tk-featured-collection.liquid.
 * Expects [role=tab] buttons with aria-controls → [role=tabpanel] elements inside.
 * Optional: a [data-tk-view-all] link whose href follows the active tab's data-view-all.
 * Theme Editor: selecting a tab block in the editor activates its tab.
 */
if (!customElements.get('tk-tabs')) {
  class TkTabs extends HTMLElement {
    connectedCallback() {
      this.tabs = Array.from(this.querySelectorAll('[role="tab"]'));
      if (!this.tabs.length) return;
      this.viewAll = this.querySelector('[data-tk-view-all]');

      this.tabs.forEach((tab, index) => {
        tab.addEventListener('click', () => this.select(index, false));
        tab.addEventListener('keydown', (event) => this.onKeydown(event, index));
      });

      this.onBlockSelect = this.onBlockSelect.bind(this);
      document.addEventListener('shopify:block:select', this.onBlockSelect);
    }

    disconnectedCallback() {
      document.removeEventListener('shopify:block:select', this.onBlockSelect);
    }

    onKeydown(event, index) {
      const last = this.tabs.length - 1;
      let next = null;
      if (event.key === 'ArrowRight') next = index === last ? 0 : index + 1;
      if (event.key === 'ArrowLeft') next = index === 0 ? last : index - 1;
      if (event.key === 'Home') next = 0;
      if (event.key === 'End') next = last;
      if (next === null) return;
      event.preventDefault();
      this.select(next, true);
    }

    onBlockSelect(event) {
      const index = this.tabs.findIndex((tab) => tab.contains(event.target) || tab === event.target);
      if (index > -1) this.select(index, false);
    }

    select(index, moveFocus) {
      this.tabs.forEach((tab, i) => {
        const active = i === index;
        tab.setAttribute('aria-selected', active ? 'true' : 'false');
        tab.tabIndex = active ? 0 : -1;
        const panel = document.getElementById(tab.getAttribute('aria-controls'));
        if (panel) panel.hidden = !active;
      });

      const activeTab = this.tabs[index];
      if (this.viewAll && activeTab.dataset.viewAll) {
        this.viewAll.href = activeTab.dataset.viewAll;
      }
      if (moveFocus) activeTab.focus();
    }
  }

  customElements.define('tk-tabs', TkTabs);
}
