// Product page — gallery interaction
document.addEventListener('alpine:init', () => {
  Alpine.data('productDetail', () => ({
    currentImage: document.querySelector('[data-main-image]')?.src || '',

    init() {
      const first = document.querySelector('.product-gallery__image');
      if (first) this.currentImage = first.src;
    }
  }));
});