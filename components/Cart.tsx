'use client';

import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { X, Minus, Plus, ShoppingBag, Trash2, ArrowRight } from 'lucide-react';
import { CartItem } from '@/types';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';

interface CartProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemoveItem: (productId: string) => void;
  onCheckout: () => void;
}

export default function Cart({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onCheckout,
}: CartProps) {
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="w-full sm:max-w-lg flex flex-col p-0 h-full">
        {/* Header */}
        <SheetHeader className="px-6 py-4 border-b flex-shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
              <ShoppingBag className="w-5 h-5 text-primary" />
            </div>
            <div>
              <SheetTitle className="text-xl font-bold">Shopping Cart</SheetTitle>
              <SheetDescription>
                {itemCount} {itemCount === 1 ? 'item' : 'items'} in your cart
              </SheetDescription>
            </div>
          </div>
        </SheetHeader>

        {/* Cart Items */}
        {items.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center px-6 py-12 overflow-auto">
            <div className="w-24 h-24 rounded-full bg-gray-100 flex items-center justify-center mb-4">
              <ShoppingBag className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Your cart is empty</h3>
            <p className="text-gray-500 text-center mb-6">
              Looks like you haven't added any items to your cart yet
            </p>
            <Button onClick={onClose} className="bg-primary hover:bg-primary-hover">
              Continue Shopping
            </Button>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-hidden">
              <ScrollArea className="h-full px-6 py-4">
                <div className="space-y-4">
                {items.map((item) => (
                  <div
                    key={item.id}
                    className="group relative bg-white rounded-xl border border-gray-200 p-4 hover:shadow-md transition-all duration-300"
                  >
                    <div className="flex gap-4">
                      {/* Product Image */}
                      <div className="relative w-24 h-24 flex-shrink-0 rounded-lg overflow-hidden bg-gray-100">
                        <Image
                          src={item.image_url}
                          alt={item.name_en}
                          fill
                          className="object-cover"
                        />
                      </div>

                      {/* Product Details */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2 mb-2">
                          <div className="flex-1 min-w-0">
                            <h4 className="font-semibold text-sm line-clamp-2 text-gray-900 mb-1">
                              {item.name_en}
                            </h4>
                            <Badge variant="secondary" className="text-xs">
                              {item.category}
                            </Badge>
                          </div>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => onRemoveItem(item.id)}
                            className="h-8 w-8 rounded-full hover:bg-red-50 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>

                        {/* Price and Quantity Controls */}
                        <div className="flex items-center justify-between mt-3">
                          <div className="flex items-baseline gap-1">
                            <span className="text-lg font-bold text-primary">
                              {(item.price * item.quantity).toLocaleString()}
                            </span>
                            <span className="text-xs text-gray-500">PKR</span>
                          </div>

                          {/* Quantity Controls */}
                          <div className="flex items-center gap-2 bg-gray-50 rounded-full p-1">
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => onUpdateQuantity(item.id, Math.max(1, item.quantity - 1))}
                              className="h-7 w-7 rounded-full hover:bg-white"
                              disabled={item.quantity <= 1}
                            >
                              <Minus className="w-3 h-3" />
                            </Button>
                            <span className="text-sm font-semibold w-8 text-center">
                              {item.quantity}
                            </span>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                              className="h-7 w-7 rounded-full hover:bg-white"
                            >
                              <Plus className="w-3 h-3" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
                </div>
              </ScrollArea>
            </div>

            {/* Footer with Summary */}
            <div className="border-t bg-gray-50 px-6 py-4 space-y-4 flex-shrink-0">
              {/* Subtotal */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Subtotal ({itemCount} items)</span>
                  <span className="font-semibold">{subtotal.toLocaleString()} PKR</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Delivery</span>
                  <span className="font-semibold text-green-600">FREE</span>
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <span className="text-base font-semibold text-gray-900">Total</span>
                  <div className="text-right">
                    <span className="text-2xl font-bold text-primary">
                      {subtotal.toLocaleString()}
                    </span>
                    <span className="text-sm text-gray-600 ml-1">PKR</span>
                  </div>
                </div>
              </div>

              {/* Checkout Button */}
              <Button
                onClick={() => {
                  localStorage.setItem('cart', JSON.stringify(items));
                  onCheckout();
                }}
                className="w-full bg-primary hover:bg-primary-hover shadow-lg hover:shadow-xl transition-all duration-300 py-6 text-base font-semibold group"
                size="lg"
              >
                Proceed to Checkout
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>

              {/* Payment Info */}
              <div className="flex items-center justify-center gap-2 text-xs text-gray-500">
                <Badge variant="outline" className="border-green-200 bg-green-50 text-green-700">
                  Cash on Delivery
                </Badge>
                <span>•</span>
                <span>Free Delivery All Pakistan</span>
              </div>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
