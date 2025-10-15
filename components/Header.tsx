'use client';

import { ShoppingCart } from 'lucide-react';
import Logo from './Logo';

interface HeaderProps {
  cartItemCount?: number;
  onCartClick?: () => void;
}

export default function Header({ cartItemCount = 0, onCartClick }: HeaderProps) {
  return (
    <header className="header">
      <div className="container">
        <nav className="flex items-center justify-between py-4">
          <Logo />
          
          <div className="flex items-center gap-6">
            <button
              onClick={onCartClick}
              className="relative p-2 hover:bg-gray-100 rounded-full transition-colors"
              aria-label="Shopping cart"
            >
              <ShoppingCart className="w-6 h-6 text-gray-700" />
              {cartItemCount > 0 && (
                <span className="cart-badge">
                  {cartItemCount}
                </span>
              )}
            </button>
          </div>
        </nav>
      </div>
    </header>
  );
}
