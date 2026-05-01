import { Phone } from 'lucide-react';

interface WhatsAppButtonProps {
  fullWidth?: boolean;
  className?: string;
}

export default function WhatsAppButton({ fullWidth = false, className = '' }: WhatsAppButtonProps) {
  return (
    <a
      href="https://wa.me/79001234567?text=Здравствуйте! Интересует продукция HeatForge"
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center justify-center gap-3 bg-[#25D366] text-white font-semibold px-8 py-4 rounded-xl hover:brightness-110 hover:scale-[1.02] transition-all shadow-[0_8px_30px_rgba(37,211,102,0.3)] ${fullWidth ? 'w-full' : ''} ${className}`}
    >
      <Phone className="w-5 h-5" />
      Написать в WhatsApp
    </a>
  );
}
