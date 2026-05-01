import { Minus, Plus } from 'lucide-react';

interface QuantitySelectorProps {
  quantity: number;
  onChange: (quantity: number) => void;
  size?: 'sm' | 'md';
}

export default function QuantitySelector({ quantity, onChange, size = 'md' }: QuantitySelectorProps) {
  const btnClass = size === 'sm' 
    ? 'w-8 h-8' 
    : 'w-9 h-9';
  
  const iconClass = size === 'sm'
    ? 'w-3.5 h-3.5'
    : 'w-4 h-4';

  return (
    <div className="flex items-center gap-1">
      <button
        onClick={() => onChange(quantity - 1)}
        className={`${btnClass} rounded-full bg-[var(--charcoal-surface)] text-white flex items-center justify-center hover:bg-[var(--flame-orange)] transition-colors`}
      >
        <Minus className={iconClass} />
      </button>
      <span className={`text-white font-bold text-center min-w-[40px] ${size === 'sm' ? 'text-sm' : 'text-base'}`}>
        {quantity}
      </span>
      <button
        onClick={() => onChange(quantity + 1)}
        className={`${btnClass} rounded-full bg-[var(--charcoal-surface)] text-white flex items-center justify-center hover:bg-[var(--flame-orange)] transition-colors`}
      >
        <Plus className={iconClass} />
      </button>
    </div>
  );
}
