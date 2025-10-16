'use client';

import { ShoppingCart, Search, Menu, Heart, User, Phone } from 'lucide-react';
import Logo from './Logo';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';

interface HeaderProps {
  cartItemCount?: number;
  onCartClick?: () => void;
}

export default function Header({ cartItemCount = 0, onCartClick }: HeaderProps) {
  return (
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
            <div className="relative w-full group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-hover:text-primary transition-colors" />
              <Input
                type="search"
                placeholder="Search for Kadar, Velvet Shanel, Carandi..."
                className="w-full pl-12 pr-4 py-6 rounded-full border-2 border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all shadow-sm hover:shadow-md"
              />
              <Button 
                size="sm" 
                className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-primary hover:bg-primary-hover shadow-lg"
              >
                Search
              </Button>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2">
            {/* Mobile Search */}
            <Button 
              variant="ghost" 
              size="icon" 
              className="md:hidden hover:bg-gray-100 rounded-full"
            >
              <Search className="w-5 h-5" />
            </Button>

            {/* Wishlist */}
            <Button 
              variant="ghost" 
              size="icon" 
              className="hidden sm:flex hover:bg-gray-100 rounded-full relative group"
            >
              <Heart className="w-5 h-5 group-hover:text-red-500 transition-colors" />
            </Button>

            {/* Account */}
            <Button 
              variant="ghost" 
              size="icon" 
              className="hidden sm:flex hover:bg-gray-100 rounded-full"
            >
              <User className="w-5 h-5" />
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
  );
}
