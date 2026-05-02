// Cart page
document.addEventListener('alpine:init', () => {
  Alpine.data('cartPage', () => ({
    init() {
      // Cart is driven by Alpine.store('cart')
    }
  }));

  Alpine.data('checkoutForm', () => ({
    form: { name: '', phone: '', email: '', city: '', address: '' },

    submit() {
      console.log('Checkout submitted:', this.form);
      // TODO: send to backend API
    }
  }));
});