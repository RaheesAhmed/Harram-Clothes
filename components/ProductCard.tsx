'use client';

import Image from 'next/image';
import { ShoppingCart } from 'lucide-react';
import { Product } from '@/types';

interface ProductCardProps {
  product: Product;
  onAddToCart?: (product: Product) => void;
}

export default function ProductCard({ product, onAddToCart }: ProductCardProps) {
  return (
    <div className="product-card">
      <div className="relative overflow-hidden">
        <Image
          src={product.image_url}
          alt={product.name_en}
          width={400}
          height={533}
          className="product-image"
          priority={false}
        />
      </div>
      
      <div className="product-info">
        <h3 className="product-name">{product.name_en}</h3>
        <div className="flex items-center justify-between mt-2">
          <p className="product-price">Rs. {product.price.toLocaleString()}</p>
          {product.stock_status ? (
            <span className="text-xs font-medium text-green-600">In Stock</span>
          ) : (
            <span className="text-xs font-medium text-red-600">Out of Stock</span>
          )}
        </div>
        
        <button
          onClick={() => onAddToCart?.(product)}
          disabled={!product.stock_status}
          className="btn btn-primary w-full mt-3 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <ShoppingCart className="w-4 h-4 mr-2" />
          Add to Cart
        </button>
      </div>
    </div>
  );
}
