'use client';

import { useState } from 'react';
import Header from '@/components/Header';
import ProductCard from '@/components/ProductCard';
import { Product } from '@/types';

const MOCK_PRODUCTS: Product[] = [
  {
    id: '1',
    name_en: 'Premium Velvet Shanel',
    category: 'Velvet Shanel',
    price: 2500,
    description_en: 'High-quality velvet shanel with intricate embroidery',
    image_url: 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=400&h=533&fit=crop',
    stock_status: true,
    created_at: new Date().toISOString(),
  },
  {
    id: '2',
    name_en: 'Classic Kadar',
    category: 'Kadar',
    price: 1800,
    description_en: 'Traditional kadar with modern design',
    image_url: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=400&h=533&fit=crop',
    stock_status: true,
    created_at: new Date().toISOString(),
  },
  {
    id: '3',
    name_en: 'Elegant Carandi',
    category: 'Carandi',
    price: 2200,
    description_en: 'Beautiful carandi with delicate details',
    image_url: 'https://images.unsplash.com/photo-1539533113208-f6df8cc8b543?w=400&h=533&fit=crop',
    stock_status: true,
    created_at: new Date().toISOString(),
  },
  {
    id: '4',
    name_en: 'Luxury Velvet Shanel',
    category: 'Velvet Shanel',
    price: 3000,
    description_en: 'Premium quality velvet with golden embellishments',
    image_url: 'https://images.unsplash.com/photo-1596783074918-c84cb06531ca?w=400&h=533&fit=crop',
    stock_status: true,
    created_at: new Date().toISOString(),
  },
  {
    id: '5',
    name_en: 'Designer Kadar',
    category: 'Kadar',
    price: 2100,
    description_en: 'Contemporary kadar with unique patterns',
    image_url: 'https://images.unsplash.com/photo-1593030761757-71fae45fa0e7?w=400&h=533&fit=crop',
    stock_status: true,
    created_at: new Date().toISOString(),
  },
  {
    id: '6',
    name_en: 'Royal Carandi',
    category: 'Carandi',
    price: 2800,
    description_en: 'Exquisite carandi with royal finish',
    image_url: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=400&h=533&fit=crop',
    stock_status: false,
    created_at: new Date().toISOString(),
  },
  {
    id: '7',
    name_en: 'Embroidered Velvet Shanel',
    category: 'Velvet Shanel',
    price: 2700,
    description_en: 'Hand-embroidered velvet shanel',
    image_url: 'https://images.unsplash.com/photo-1617019114583-affb34d1b3cd?w=400&h=533&fit=crop',
    stock_status: true,
    created_at: new Date().toISOString(),
  },
  {
    id: '8',
    name_en: 'Traditional Kadar',
    category: 'Kadar',
    price: 1900,
    description_en: 'Classic traditional kadar design',
    image_url: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400&h=533&fit=crop',
    stock_status: true,
    created_at: new Date().toISOString(),
  },
];

const CATEGORIES = ['All', 'Kadar', 'Velvet Shanel', 'Carandi'];

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [cart, setCart] = useState<Product[]>([]);

  const filteredProducts = selectedCategory === 'All' 
    ? MOCK_PRODUCTS 
    : MOCK_PRODUCTS.filter(product => product.category === selectedCategory);

  const handleAddToCart = (product: Product) => {
    setCart(prev => [...prev, product]);
  };

  return (
    <div className="min-h-screen bg-white">
      <Header cartItemCount={cart.length} onCartClick={() => {}} />
      
      <main>
        <div className="hero">
          <div className="container">
            <h1 className="hero-title">Welcome to Harram Clothes</h1>
            <p className="hero-subtitle">
              Premium Quality Clothing • Free Delivery • Cash on Delivery
            </p>
          </div>
        </div>

        <div className="container">
          <div className="category-filter">
            {CATEGORIES.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`category-btn ${selectedCategory === category ? 'active' : ''}`}
              >
                {category}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 mb-8">
            {filteredProducts.map((product) => (
              <ProductCard 
                key={product.id} 
                product={product} 
                onAddToCart={handleAddToCart}
              />
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <div className="text-center py-12">
              <p className="text-xl text-gray-500">No products found in this category</p>
            </div>
          )}
        </div>
      </main>

      <footer className="bg-gray-50 border-t border-gray-200 mt-12">
        <div className="container py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="font-bold text-lg mb-4 text-primary">Harram Clothes</h3>
              <p className="text-sm text-gray-600">
                Premium quality clothing in Peshawar. Shop the finest collection of traditional wear.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Contact</h4>
              <p className="text-sm text-gray-600 mb-2">📞 +92 317 9511031</p>
              <p className="text-sm text-gray-600 mb-2">📍 Peshawar, Pakistan</p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Information</h4>
              <p className="text-sm text-gray-600 mb-2">✓ Free Delivery Across Pakistan</p>
              <p className="text-sm text-gray-600 mb-2">✓ Cash on Delivery Available</p>
              <p className="text-sm text-gray-600">✓ 100% Quality Guarantee</p>
            </div>
          </div>
          
          <div className="border-t border-gray-200 mt-8 pt-6 text-center">
            <p className="text-sm text-gray-600">
              © 2025 Harram Clothes. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
