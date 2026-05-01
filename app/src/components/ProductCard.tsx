import { Link } from 'react-router-dom';
import { useCartStore } from '@/store/cart';
import { toast } from 'react-toastify';
import { ShoppingCart } from 'lucide-react';
import type { Product } from '@/types';

interface ProductCardProps {
  product: Product;
  compact?: boolean;
}

export default function ProductCard({ product, compact = false }: ProductCardProps) {
  const addItem = useCartStore((s) => s.addItem);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(
      {
        id: product.id,
        name: product.name,
        price: product.price,
        oldPrice: product.oldPrice,
        image: product.images[0],
      },
      1
    );
    toast.success(`${product.name} добавлен в корзину!`);
  };

  const discount = product.oldPrice
    ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)
    : 0;

  return (
    <Link
      to={`/product/${product.slug}`}
      className="group block bg-[var(--charcoal-panel)] rounded-xl overflow-hidden border border-white/[0.04] transition-all duration-400 ease-crucible hover:-translate-y-1 hover:border-[var(--copper)]/20 hover:shadow-[0_12px_40px_rgba(0,0,0,0.4)]"
    >
      {/* Image */}
      <div className="relative overflow-hidden" style={{ aspectRatio: '1/1' }}>
        <img
          src={product.images[0]}
          alt={product.name}
          className="w-full h-full object-contain bg-[var(--charcoal-panel)] p-4 transition-transform duration-600 ease-smelt group-hover:scale-105"
          loading="lazy"
        />
        
        {/* Badge */}
        {product.badge && (
          <span className={`absolute top-3 left-3 text-[10px] font-bold text-white px-2.5 py-1 rounded uppercase ${
            product.badge === 'sale' ? 'bg-gradient-ember' :
            product.badge === 'new' ? 'bg-green-600' :
            'bg-gradient-fire'
          }`}>
            {product.badge === 'bestseller' ? 'Бестселлер' :
             product.badge === 'new' ? 'Новинка' :
             `-${discount}%`}
          </span>
        )}

        {/* Add to cart button */}
        <button
          onClick={handleAddToCart}
          className="absolute bottom-3 right-3 w-11 h-11 bg-[var(--flame-orange)] text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-200 ease-surge hover:bg-[var(--ember-glow)] hover:scale-110"
        >
          <ShoppingCart className="w-5 h-5" />
        </button>
      </div>

      {/* Info */}
      <div className={`p-4 ${compact ? 'p-3' : 'p-4'}`}>
        <span className="text-xs text-[var(--copper)] uppercase tracking-wide">
          {product.category === 'grill' ? 'Гриль' : 'Аксессуар'}
        </span>
        <h3 className="text-white font-semibold text-base mt-1 truncate">
          {product.name}
        </h3>
        <div className="flex items-center gap-2 mt-2">
          <span className="text-[var(--flame-orange)] font-bold text-lg">
            {product.price.toLocaleString('ru-RU')} ₽
          </span>
          {product.oldPrice && (
            <span className="text-[var(--smoke)] line-through text-sm">
              {product.oldPrice.toLocaleString('ru-RU')} ₽
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
