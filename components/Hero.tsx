'use client';

import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Sparkles, Truck, Shield, Clock } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-primary via-primary-hover to-primary py-16 md:py-24">
      {/* Animated Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.15)_0%,transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(255,255,255,0.15)_0%,transparent_50%)]" />
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.1) 1px, transparent 1px)',
          backgroundSize: '40px 40px'
        }} />
      </div>

      {/* Floating Elements */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-white/5 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-20 right-10 w-40 h-40 bg-white/5 rounded-full blur-3xl animate-pulse delay-700" />

      <div className="container relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* Top Badge */}
          <div className="flex justify-center mb-8 animate-fade-in">
            <Badge className="bg-white/20 backdrop-blur-md border-0 text-white px-6 py-2 text-sm font-medium hover:bg-white/30 transition-all duration-300 shadow-lg">
              <Sparkles className="w-4 h-4 mr-2 animate-pulse" />
              Premium Traditional Collection • Peshawar
            </Badge>
          </div>

          {/* Main Content */}
          <div className="text-center space-y-8">
            {/* Headline */}
            <div className="space-y-4">
              <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white leading-tight animate-slide-up">
                Discover Elegance in
                <br />
                <span className="bg-gradient-to-r from-white via-gray-100 to-white bg-clip-text text-transparent animate-shimmer">
                  Traditional Clothing
                </span>
              </h1>
              <p className="text-lg md:text-xl text-white/90 max-w-3xl mx-auto leading-relaxed animate-slide-up delay-100">
                Exquisite collection of Kadar, Velvet Shanel, and Carandi. 
                Premium quality, authentic designs, delivered to your doorstep across Pakistan.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-slide-up delay-200">
              <Button 
                size="lg"
                className="bg-white text-primary hover:bg-gray-50 shadow-2xl hover:shadow-3xl hover:scale-105 transition-all duration-300 px-8 py-6 text-lg font-semibold group"
              >
                Shop Collection
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
              
            </div>

            {/* Feature Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-4xl mx-auto mt-12 animate-slide-up delay-300">
              <Card className="bg-white/10 backdrop-blur-md border-white/20 hover:bg-white/15 transition-all duration-300 group">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-white/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Truck className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-semibold text-white mb-1">Free Delivery</h3>
                  <p className="text-sm text-white/80">All across Pakistan</p>
                </CardContent>
              </Card>

              <Card className="bg-white/10 backdrop-blur-md border-white/20 hover:bg-white/15 transition-all duration-300 group">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-white/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Shield className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-semibold text-white mb-1">Cash on Delivery</h3>
                  <p className="text-sm text-white/80">Pay when you receive</p>
                </CardContent>
              </Card>

              <Card className="bg-white/10 backdrop-blur-md border-white/20 hover:bg-white/15 transition-all duration-300 group">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-white/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Clock className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-semibold text-white mb-1">Quick Service</h3>
                  <p className="text-sm text-white/80">Fast response time</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
          <path d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="white"/>
        </svg>
      </div>
    </section>
  );
}
