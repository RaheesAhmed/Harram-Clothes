'use client';

import { useState } from 'react';
import { Product } from '@/types';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { ShoppingCart, Eye } from 'lucide-react';
import Image from 'next/image';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
}

export default function ProductCard({ product, onAddToCart }: ProductCardProps) {
  const [showQuickView, setShowQuickView] = useState(false);

  return (
    <>
      <div className="group bg-white rounded-xl overflow-hidden border border-gray-100 hover:border-primary/20 hover:shadow-xl transition-all duration-300">
        {/* Image Container */}
        <div className="relative aspect-[3/4] overflow-hidden bg-gray-50">
          <Image
            src={product.image_url}
            alt={product.name_en}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
          
          {/* Category Badge */}
          <div className="absolute top-3 left-3">
            <Badge className="bg-gray-900/90 text-white border-0 backdrop-blur-sm">
              {product.category}
            </Badge>
          </div>

          {/* Stock Badge */}
          <div className="absolute top-3 right-3">
            <Badge className="bg-emerald-500 text-white border-0">
              In Stock
            </Badge>
          </div>

          {/* Quick View Button - Shows on Hover */}
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            <Button
              onClick={() => setShowQuickView(true)}
              className="bg-white text-gray-900 hover:bg-gray-100"
            >
              <Eye className="w-4 h-4 mr-2" />
              Quick View
            </Button>
          </div>
        </div>

        {/* Product Info */}
        <div className="p-4 space-y-3">
          {/* Product Name - English & Pashto */}
          <div>
            <h3 className="font-semibold text-gray-900 line-clamp-2 text-sm md:text-base">
              {product.name_en}
            </h3>
            {product.name_ps && (
              <p className="text-sm text-gray-600 mt-1 font-urdu">
                {product.name_ps}
              </p>
            )}
          </div>

          {/* Price */}
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold text-primary">
              {product.price.toLocaleString()}
            </span>
            <span className="text-sm text-gray-500">PKR</span>
          </div>

          {/* Free Delivery */}
          <p className="text-xs text-emerald-600 font-medium">
            ✓ Free Delivery All Pakistan
          </p>

          {/* Add to Cart Button */}
          <Button
            onClick={() => onAddToCart(product)}
            className="w-full bg-primary hover:bg-primary-hover text-white font-semibold py-6 rounded-lg shadow-lg shadow-primary/30 hover:shadow-xl hover:shadow-primary/40 transition-all duration-300"
          >
            <ShoppingCart className="w-4 h-4 mr-2" />
            Add to Cart
          </Button>
        </div>
      </div>

      {/* Quick View Modal */}
      <Dialog open={showQuickView} onOpenChange={setShowQuickView}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold">{product.name_en}</DialogTitle>
            {product.name_ps && (
              <p className="text-lg text-gray-600 font-urdu">{product.name_ps}</p>
            )}
          </DialogHeader>
          
          <div className="grid md:grid-cols-2 gap-6 mt-4">
            {/* Product Image */}
            <div className="relative aspect-[3/4] rounded-lg overflow-hidden bg-gray-100">
              <Image
                src={product.image_url}
                alt={product.name_en}
                fill
                className="object-cover"
              />
            </div>

            {/* Product Details */}
            <div className="space-y-6">
              <div>
                <Badge className="mb-3">{product.category}</Badge>
                <div className="flex items-baseline gap-3 mb-4">
                  <span className="text-4xl font-bold text-primary">
                    {product.price.toLocaleString()}
                  </span>
                  <span className="text-lg text-gray-500">PKR</span>
                </div>
                <Badge className="bg-emerald-500">In Stock</Badge>
              </div>

              {product.description_en && (
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Description</h3>
                  <p className="text-gray-600 leading-relaxed">{product.description_en}</p>
                </div>
              )}

              {product.description_ps && (
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">تفصیل</h3>
                  <p className="text-gray-600 leading-relaxed font-urdu">{product.description_ps}</p>
                </div>
              )}

              <div className="border-t pt-6 space-y-3">
                <p className="flex items-center gap-2 text-sm text-emerald-600 font-medium">
                  <span className="text-lg">✓</span> Free Delivery All Pakistan
                </p>
                <p className="flex items-center gap-2 text-sm text-emerald-600 font-medium">
                  <span className="text-lg">✓</span> Cash on Delivery Available
                </p>
              </div>

              <Button
                onClick={() => {
                  onAddToCart(product);
                  setShowQuickView(false);
                }}
                className="w-full bg-primary hover:bg-primary-hover text-white font-semibold py-6 text-lg"
                size="lg"
              >
                <ShoppingCart className="w-5 h-5 mr-2" />
                Add to Cart
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
