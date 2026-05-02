import Alpine from 'alpinejs';

// ─── CART STORE ───────────────────────────────────────────────────────────────
Alpine.store('cart', {
  items: JSON.parse(localStorage.getItem('hf_cart') || '[]'),

  get count() {
    return this.items.reduce((sum, item) => sum + item.quantity, 0);
  },

  save() {
    localStorage.setItem('hf_cart', JSON.stringify(this.items));
  },

  add(product, quantity = 1) {
    const existing = this.items.find(i => i.id === product.id);
    if (existing) {
      existing.quantity += quantity;
    } else {
      this.items.push({ ...product, quantity });
    }
    this.save();
  },

  remove(id) {
    this.items = this.items.filter(i => i.id !== id);
    this.save();
  },

  increment(id) {
    const item = this.items.find(i => i.id === id);
    if (item) { item.quantity++; this.save(); }
  },

  decrement(id) {
    const item = this.items.find(i => i.id === id);
    if (item) {
      if (item.quantity > 1) { item.quantity--; }
      else { this.remove(id); }
      this.save();
    }
  },

  total() {
    return this.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  },

  clear() {
    this.items = [];
    this.save();
  }
});

// ─── START ALPINE ─────────────────────────────────────────────────────────────
window.Alpine = Alpine;
Alpine.start();