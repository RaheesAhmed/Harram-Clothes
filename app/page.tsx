'use client';

import { useState } from 'react';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Footer from '@/components/Footer';
import ProductCard from '@/components/ProductCard';
import { Product } from '@/types';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';

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
        <Hero />

        <div className="container">
          {/* Category Filter Section */}
          <div className="py-8 md:py-12">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                  Shop by Category
                </h2>
                <p className="text-sm text-gray-600 mt-1">
                  Explore our premium collection
                </p>
              </div>
              <Badge variant="secondary" className="bg-primary/10 text-primary border-0">
                {filteredProducts.length} Products
              </Badge>
            </div>

            <Tabs value={selectedCategory} onValueChange={setSelectedCategory} className="w-full">
              <TabsList className="w-full h-auto flex-wrap justify-start gap-2 bg-gray-100/50 p-2 rounded-xl">
                {CATEGORIES.map((category) => {
                  const count = category === 'All' 
                    ? MOCK_PRODUCTS.length 
                    : MOCK_PRODUCTS.filter(p => p.category === category).length;
                  
                  return (
                    <TabsTrigger
                      key={category}
                      value={category}
                      className="data-[state=active]:bg-primary data-[state=active]:text-white data-[state=active]:shadow-lg data-[state=active]:shadow-primary/30 rounded-lg px-6 py-3 font-semibold transition-all duration-300 hover:bg-white"
                    >
                      <span>{category}</span>
                      <Badge 
                        variant="secondary" 
                        className="ml-2 data-[state=active]:bg-white/20 data-[state=active]:text-white bg-gray-200 text-gray-700 border-0"
                      >
                        {count}
                      </Badge>
                    </TabsTrigger>
                  );
                })}
              </TabsList>
            </Tabs>
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

      <Footer />
    </div>
  );
}
