'use client';

import Image from 'next/image';
import { ShoppingCart, Heart, Eye, Sparkles } from 'lucide-react';
import { Product } from '@/types';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useState } from 'react';

interface ProductCardProps {
  product: Product;
  onAddToCart?: (product: Product) => void;
}

export default function ProductCard({ product, onAddToCart }: ProductCardProps) {
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <Card className="group relative overflow-hidden border-0 shadow-sm hover:shadow-2xl transition-all duration-500 bg-white/80 backdrop-blur-sm">
      {/* Stock Badge - Top Right */}
      <div className="absolute top-3 right-3 z-20">
        {product.stock_status ? (
          <Badge className="bg-emerald-500/90 hover:bg-emerald-500 backdrop-blur-sm border-0 shadow-lg">
            <Sparkles className="w-3 h-3 mr-1" />
            In Stock
          </Badge>
        ) : (
          <Badge variant="destructive" className="backdrop-blur-sm shadow-lg">
            Out of Stock
          </Badge>
        )}
      </div>

      {/* Category Badge - Top Left */}
      <div className="absolute top-3 left-3 z-20">
        <Badge variant="secondary" className="bg-primary/90 text-white hover:bg-primary backdrop-blur-sm border-0 shadow-lg">
          {product.category}
        </Badge>
      </div>

      {/* Image Container */}
      <div className="relative aspect-[3/4] overflow-hidden bg-gradient-to-br from-gray-100 to-gray-50">
        <Image
          src={product.image_url}
          alt={product.name_en}
          fill
          className={`object-cover transition-all duration-700 group-hover:scale-110 ${
            imageLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          onLoad={() => setImageLoaded(true)}
          sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
        />
        
        {/* Image Overlay on Hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500">
          <div className="absolute bottom-4 left-4 right-4 flex gap-2">
            <Button
              size="sm"
              variant="secondary"
              className="flex-1 bg-white/90 hover:bg-white backdrop-blur-sm shadow-lg"
              onClick={(e) => {
                e.stopPropagation();
                // Quick view functionality
              }}
            >
              <Eye className="w-4 h-4 mr-2" />
              Quick View
            </Button>
            <Button
              size="sm"
              variant="secondary"
              className={`bg-white/90 hover:bg-white backdrop-blur-sm shadow-lg ${
                isWishlisted ? 'text-red-500' : ''
              }`}
              onClick={(e) => {
                e.stopPropagation();
                setIsWishlisted(!isWishlisted);
              }}
            >
              <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-current' : ''}`} />
            </Button>
          </div>
        </div>

        {/* Loading Skeleton */}
        {!imageLoaded && (
          <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-pulse" />
        )}
      </div>

      {/* Product Info */}
      <CardContent className="p-4 space-y-3">
        <div className="space-y-1">
          <h3 className="font-semibold text-base line-clamp-2 text-gray-900 group-hover:text-primary transition-colors duration-300">
            {product.name_en}
          </h3>
          {product.name_ps && (
            <p className="text-xs text-gray-500 line-clamp-1 font-urdu">
              {product.name_ps}
            </p>
          )}
        </div>

        {/* Price Section */}
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <div className="flex items-baseline gap-1">
              <span className="text-2xl font-bold text-primary">
                {product.price.toLocaleString()}
              </span>
              <span className="text-sm font-medium text-gray-600">PKR</span>
            </div>
          </div>
        </div>
      </CardContent>

      {/* Footer with Add to Cart */}
      <CardFooter className="p-4 pt-0">
        <Button
          onClick={() => onAddToCart?.(product)}
          disabled={!product.stock_status}
          className="w-full bg-primary hover:bg-primary-hover shadow-lg shadow-primary/30 group-hover:shadow-xl group-hover:shadow-primary/40 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none"
          size="lg"
        >
          <ShoppingCart className="w-4 h-4 mr-2 group-hover:animate-bounce" />
          <span className="font-semibold">Add to Cart</span>
        </Button>
      </CardFooter>

      {/* Decorative Corner Accent */}
      <div className="absolute -bottom-2 -right-2 w-24 h-24 bg-gradient-to-br from-primary/20 to-transparent rounded-full blur-2xl group-hover:from-primary/30 transition-all duration-500" />
    </Card>
  );
}
