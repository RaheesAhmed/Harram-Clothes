'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Search, Package, Phone, MapPin, Calendar, Loader2, AlertCircle } from 'lucide-react';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function TrackOrderPage() {
  const [orderId, setOrderId] = useState('');
  const [order, setOrder] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!orderId.trim()) {
      setError('Please enter an order ID');
      return;
    }

    setLoading(true);
    setError('');
    setOrder(null);

    try {
      // Fetch all orders and filter client-side since we can't ILIKE on UUID
      const { data: allOrders, error: searchError } = await supabase
        .from('orders')
        .select('*');

      if (searchError) {
        setError('Failed to fetch orders. Please try again.');
        return;
      }

      // Find order by partial ID match
      const foundOrder = allOrders?.find(order => 
        order.id.toLowerCase().startsWith(orderId.trim().toLowerCase())
      );

      if (!foundOrder) {
        setError('Order not found. Please check your order ID and try again.');
        return;
      }

      setOrder(foundOrder);
    } catch (err) {
      setError('Failed to fetch order. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const getStatusInfo = (status: string) => {
    switch (status) {
      case 'pending':
        return {
          color: 'bg-yellow-500',
          text: 'Pending Confirmation',
          description: 'Your order has been received and is awaiting confirmation.',
        };
      case 'confirmed':
        return {
          color: 'bg-blue-500',
          text: 'Confirmed',
          description: 'Your order has been confirmed and is being prepared for delivery.',
        };
      case 'completed':
        return {
          color: 'bg-green-500',
          text: 'Delivered',
          description: 'Your order has been successfully delivered.',
        };
      case 'cancelled':
        return {
          color: 'bg-red-500',
          text: 'Cancelled',
          description: 'This order has been cancelled.',
        };
      default:
        return {
          color: 'bg-gray-500',
          text: status,
          description: '',
        };
    }
  };

  const statusInfo = order ? getStatusInfo(order.status) : null;

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Track Your Order</h1>
            <p className="text-gray-600">Enter your order ID to check the status</p>
          </div>

          {/* Search Form */}
          <Card className="mb-8">
            <CardContent className="pt-6">
              <form onSubmit={handleSearch} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="orderId">Order ID</Label>
                  <div className="flex gap-2">
                    <Input
                      id="orderId"
                      value={orderId}
                      onChange={(e) => setOrderId(e.target.value)}
                      placeholder="Enter your order ID (e.g., 1a2b3c4d)"
                      className="flex-1"
                    />
                    <Button type="submit" disabled={loading} className="bg-primary hover:bg-primary-hover">
                      {loading ? (
                        <>
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                          Searching...
                        </>
                      ) : (
                        <>
                          <Search className="w-4 h-4 mr-2" />
                          Track
                        </>
                      )}
                    </Button>
                  </div>
                </div>
                
                {error && (
                  <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
                    <AlertCircle className="w-4 h-4 flex-shrink-0" />
                    <p>{error}</p>
                  </div>
                )}
              </form>
            </CardContent>
          </Card>

          {/* Order Details */}
          {order && (
            <div className="space-y-6">
              {/* Status Card */}
              <Card className={`border-2 ${statusInfo?.color.replace('bg-', 'border-')}`}>
                <CardContent className="pt-6">
                  <div className="text-center">
                    <div className={`w-16 h-16 ${statusInfo?.color} rounded-full flex items-center justify-center mx-auto mb-4`}>
                      <Package className="w-8 h-8 text-white" />
                    </div>
                    <Badge className={`${statusInfo?.color} text-white mb-2`}>
                      {statusInfo?.text}
                    </Badge>
                    <p className="text-gray-600 text-sm">{statusInfo?.description}</p>
                  </div>
                </CardContent>
              </Card>

              {/* Order Info */}
              <Card>
                <CardHeader>
                  <CardTitle>Order Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-600">Order ID</p>
                      <p className="font-semibold text-gray-900">#{order.id.slice(0, 8)}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Order Date</p>
                      <p className="font-semibold text-gray-900">
                        {new Date(order.created_at).toLocaleDateString()}
                      </p>
                    </div>
                  </div>

                  <div className="border-t pt-4">
                    <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                      <Package className="w-4 h-4" />
                      Customer Details
                    </h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Name:</span>
                        <span className="font-medium">{order.customer_name}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Phone:</span>
                        <span className="font-medium">{order.phone}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Address:</span>
                        <span className="font-medium text-right max-w-xs">{order.address}</span>
                      </div>
                    </div>
                  </div>

                  <div className="border-t pt-4">
                    <h3 className="font-semibold text-gray-900 mb-3">Order Items</h3>
                    <div className="space-y-2">
                      {order.products.map((item: any, index: number) => (
                        <div key={index} className="flex justify-between text-sm p-3 bg-gray-50 rounded-lg">
                          <div>
                            <p className="font-medium">{item.name_en}</p>
                            <p className="text-gray-600">Quantity: {item.quantity}</p>
                          </div>
                          <span className="font-semibold">{(item.price * item.quantity).toLocaleString()} PKR</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="border-t pt-4">
                    <div className="flex justify-between text-lg font-bold">
                      <span>Total Amount:</span>
                      <span className="text-primary">{order.total_amount.toLocaleString()} PKR</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Contact Card */}
              <Card>
                <CardContent className="pt-6">
                  <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                    <Phone className="w-4 h-4 text-primary" />
                    Need Help?
                  </h3>
                  <p className="text-gray-600 text-sm mb-4">
                    If you have any questions about your order, contact us on WhatsApp.
                  </p>
                  <Button
                    asChild
                    variant="outline"
                    className="w-full border-green-500 text-green-700 hover:bg-green-50"
                  >
                    <a
                      href="https://wa.me/923179511031"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Phone className="w-4 h-4 mr-2" />
                      Contact on WhatsApp: +92 317 9511031
                    </a>
                  </Button>
                </CardContent>
              </Card>

              <div className="text-center">
                <Button asChild variant="outline">
                  <Link href="/">Back to Home</Link>
                </Button>
              </div>
            </div>
          )}

          {/* Help Text */}
          {!order && !loading && (
            <Card>
              <CardContent className="pt-6">
                <div className="text-center text-gray-600 text-sm space-y-2">
                  <p className="font-medium">How to track your order:</p>
                  <ol className="text-left max-w-md mx-auto space-y-1">
                    <li>1. Check your confirmation page or email for the Order ID</li>
                    <li>2. Enter the Order ID in the search box above</li>
                    <li>3. Click "Track" to view your order status</li>
                  </ol>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
