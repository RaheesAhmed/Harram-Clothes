'use client';

import { useState, useEffect, useRef } from 'react';
import { ShoppingCart, Search, Menu, Phone, Package } from 'lucide-react';
import { supabase } from '@/lib/supabase/client';
import { Product } from '@/types';
import Logo from './Logo';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import Image from 'next/image';

interface HeaderProps {
  cartItemCount?: number;
  onCartClick?: () => void;
  onAddToCart?: (product: Product) => void;
}

export default function Header({ cartItemCount = 0, onCartClick, onAddToCart }: HeaderProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<Product[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowResults(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    const searchProducts = async () => {
      if (searchQuery.trim().length < 2) {
        setSearchResults([]);
        return;
      }

      try {
        const { data, error } = await supabase
          .from('products')
          .select('*')
          .eq('stock_status', true)
          .or(`name_en.ilike.%${searchQuery}%,name_ps.ilike.%${searchQuery}%,category.ilike.%${searchQuery}%`)
          .limit(5);

        if (error) throw error;
        setSearchResults(data || []);
        setShowResults(true);
      } catch (error) {
        console.error('Search error:', error);
      }
    };

    const debounce = setTimeout(searchProducts, 300);
    return () => clearTimeout(debounce);
  }, [searchQuery]);

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
    setShowResults(false);
    setSearchQuery('');
  };

  return (
    <>
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-lg border-b border-gray-200 shadow-sm">
        {/* Top Bar - Contact Info */}
        <div className="bg-primary text-white py-2">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex items-center justify-between text-xs md:text-sm">
              <div className="flex items-center gap-4">
                <span className="flex items-center gap-2">
                  <Phone className="w-3 h-3" />
                  +92 317 9511031
                </span>
                <span className="hidden md:inline">Free Delivery All Pakistan</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="flex items-center gap-1">
                  <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
                  Cash on Delivery Available
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Main Header */}
        <div className="max-w-7xl mx-auto px-4">
          <nav className="flex items-center justify-between py-4 gap-4">
            {/* Logo */}
            <div className="flex-shrink-0">
              <Logo />
            </div>

            {/* Search Bar - Desktop */}
            <div className="hidden md:flex flex-1 max-w-2xl mx-8">
              <div className="relative w-full" ref={searchRef}>
                <div className="relative group">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-hover:text-primary transition-colors z-10" />
                  <Input
                    type="search"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onFocus={() => searchQuery.length >= 2 && setShowResults(true)}
                    placeholder="Search for Kadar, Velvet Shanel, Carandi..."
                    className="w-full pl-12 pr-4 py-6 rounded-full border-2 border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all shadow-sm hover:shadow-md"
                  />
                </div>

                {/* Search Results Dropdown */}
                {showResults && searchResults.length > 0 && (
                  <div className="absolute top-full mt-2 w-full bg-white rounded-xl shadow-2xl border border-gray-200 overflow-hidden z-50">
                    <div className="p-2">
                      {searchResults.map((product) => (
                        <button
                          key={product.id}
                          onClick={() => handleProductClick(product)}
                          className="w-full flex items-center gap-3 p-3 hover:bg-gray-50 rounded-lg transition-colors text-left"
                        >
                          <div className="relative w-16 h-16 flex-shrink-0 rounded-lg overflow-hidden bg-gray-100">
                            <Image
                              src={product.image_url}
                              alt={product.name_en}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="font-semibold text-gray-900 truncate">{product.name_en}</h4>
                            {product.name_ps && (
                              <p className="text-sm text-gray-600 truncate font-urdu">{product.name_ps}</p>
                            )}
                            <div className="flex items-center gap-2 mt-1">
                              <span className="text-sm font-bold text-primary">{product.price.toLocaleString()} PKR</span>
                              <Badge variant="secondary" className="text-xs">{product.category}</Badge>
                            </div>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {showResults && searchQuery.length >= 2 && searchResults.length === 0 && (
                  <div className="absolute top-full mt-2 w-full bg-white rounded-xl shadow-2xl border border-gray-200 p-6 text-center z-50">
                    <p className="text-gray-500">No products found for "{searchQuery}"</p>
                  </div>
                )}
              </div>
            </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2">
            {/* Track Order - Desktop */}
            <Button
              asChild
              variant="ghost"
              className="hidden md:flex hover:bg-gray-100 rounded-full"
            >
              <a href="/track-order">
                <Package className="w-4 h-4 mr-2" />
                Track Order
              </a>
            </Button>

            {/* Mobile Search */}
            <Button 
              variant="ghost" 
              size="icon" 
              className="md:hidden hover:bg-gray-100 rounded-full"
            >
              <Search className="w-5 h-5" />
            </Button>

            {/* Cart */}
              <Button
                onClick={onCartClick}
                variant="ghost"
                size="icon"
                className="relative hover:bg-gray-100 rounded-full"
              >
                <ShoppingCart className="w-5 h-5" />
                {cartItemCount > 0 && (
                  <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 bg-primary hover:bg-primary border-2 border-white animate-pulse">
                    {cartItemCount}
                  </Badge>
                )}
              </Button>

              {/* Mobile Menu */}
              <Sheet>
                <SheetTrigger asChild>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="md:hidden hover:bg-gray-100 rounded-full"
                  >
                    <Menu className="w-5 h-5" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-80">
                  <SheetHeader>
                    <SheetTitle>Menu</SheetTitle>
                    <SheetDescription>
                      Browse categories and explore more
                    </SheetDescription>
                  </SheetHeader>
                  <div className="mt-6 space-y-4">
                    <Input
                      type="search"
                      placeholder="Search products..."
                      className="w-full"
                    />
                  <div className="space-y-2">
                    <Button asChild variant="ghost" className="w-full justify-start">
                      <a href="/track-order">
                        <Package className="w-4 h-4 mr-2" />
                        Track Order
                      </a>
                    </Button>
                    <Button variant="ghost" className="w-full justify-start">
                      All Products
                    </Button>
                    <Button variant="ghost" className="w-full justify-start">
                      Kadar
                    </Button>
                    <Button variant="ghost" className="w-full justify-start">
                      Velvet Shanel
                    </Button>
                    <Button variant="ghost" className="w-full justify-start">
                      Carandi
                    </Button>
                  </div>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </nav>
        </div>

        {/* Mobile Search Bar */}
        <div className="md:hidden px-4 pb-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              type="search"
              placeholder="Search products..."
              className="w-full pl-10 pr-4 rounded-full border-2 border-gray-200 focus:border-primary"
            />
          </div>
        </div>
      </header>

      {/* Quick View Modal */}
      {selectedProduct && (
        <Dialog open={!!selectedProduct} onOpenChange={() => setSelectedProduct(null)}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold">{selectedProduct.name_en}</DialogTitle>
              {selectedProduct.name_ps && (
                <p className="text-lg text-gray-600 font-urdu">{selectedProduct.name_ps}</p>
              )}
            </DialogHeader>
            
            <div className="grid md:grid-cols-2 gap-6 mt-4">
              {/* Product Image */}
              <div className="relative aspect-[3/4] rounded-lg overflow-hidden bg-gray-100">
                <Image
                  src={selectedProduct.image_url}
                  alt={selectedProduct.name_en}
                  fill
                  className="object-cover"
                />
              </div>

              {/* Product Details */}
              <div className="space-y-6">
                <div>
                  <Badge className="mb-3">{selectedProduct.category}</Badge>
                  <div className="flex items-baseline gap-3 mb-4">
                    <span className="text-4xl font-bold text-primary">
                      {selectedProduct.price.toLocaleString()}
                    </span>
                    <span className="text-lg text-gray-500">PKR</span>
                  </div>
                  <Badge className="bg-emerald-500">In Stock</Badge>
                </div>

                {selectedProduct.description_en && (
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Description</h3>
                    <p className="text-gray-600 leading-relaxed">{selectedProduct.description_en}</p>
                  </div>
                )}

                {selectedProduct.description_ps && (
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">تفصیل</h3>
                    <p className="text-gray-600 leading-relaxed font-urdu">{selectedProduct.description_ps}</p>
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
                    if (onAddToCart) {
                      onAddToCart(selectedProduct);
                      setSelectedProduct(null);
                    }
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
      )}
    </>
  );
}
