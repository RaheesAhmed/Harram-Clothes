'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase/client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { ArrowLeft, Loader2, Upload, X, Plus, ImageIcon } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

const CATEGORIES = ['Kadar', 'Velvet Shanel', 'Carandi'];
const MAX_IMAGES = 5;

interface ImagePreview {
  file: File;
  preview: string;
}

export default function AddProductPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [images, setImages] = useState<ImagePreview[]>([]);
  
  const [formData, setFormData] = useState({
    name_en: '',
    name_ps: '',
    category: '',
    price: '',
    description_en: '',
    description_ps: '',
    stock_status: true,
  });

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    
    if (images.length + files.length > MAX_IMAGES) {
      alert(`You can only upload maximum ${MAX_IMAGES} images`);
      return;
    }

    files.forEach(file => {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImages(prev => [...prev, { file, preview: reader.result as string }]);
      };
      reader.readAsDataURL(file);
    });
    
    e.target.value = '';
  };

  const removeImage = (index: number) => {
    setImages(prev => prev.filter((_, i) => i !== index));
  };

  const uploadImages = async (files: File[]): Promise<string[]> => {
    const uploadPromises = files.map(async (file) => {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
      
      const { error } = await supabase.storage
        .from('products')
        .upload(fileName, file);

      if (error) throw error;

      const { data: { publicUrl } } = supabase.storage
        .from('products')
        .getPublicUrl(fileName);

      return publicUrl;
    });

    return Promise.all(uploadPromises);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (images.length === 0) {
      alert('Please upload at least one image');
      return;
    }

    if (!formData.category) {
      alert('Please select a category');
      return;
    }

    setLoading(true);

    try {
      const imageUrls = await uploadImages(images.map(img => img.file));
      const primaryImage = imageUrls[0];

      const { error } = await supabase
        .from('products')
        .insert({
          name_en: formData.name_en,
          name_ps: formData.name_ps || null,
          category: formData.category,
          price: parseFloat(formData.price),
          description_en: formData.description_en || null,
          description_ps: formData.description_ps || null,
          image_url: primaryImage,
          stock_status: formData.stock_status,
        });

      if (error) throw error;

      alert('Product added successfully!');
      router.push('/admin/products');
    } catch (error) {
      console.error('Error adding product:', error);
      alert('Failed to add product. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-6">
          <Button variant="ghost" asChild className="mb-4 hover:bg-white">
            <Link href="/admin/products">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Products
            </Link>
          </Button>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Add New Product</h1>
              <p className="text-gray-600 mt-1">Create a new product listing for your store</p>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Images Section */}
          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ImageIcon className="w-5 h-5" />
                Product Images
              </CardTitle>
              <CardDescription>
                Upload up to {MAX_IMAGES} high-quality images. The first image will be the main product image.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
                {/* Image Previews */}
                {images.map((img, index) => (
                  <div key={index} className="relative group aspect-square rounded-lg overflow-hidden border-2 border-gray-200">
                    <Image src={img.preview} alt={`Preview ${index + 1}`} fill className="object-cover" />
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <Button
                        type="button"
                        size="sm"
                        variant="destructive"
                        onClick={() => removeImage(index)}
                        className="rounded-full"
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                    {index === 0 && (
                      <div className="absolute top-2 left-2">
                        <span className="bg-primary text-white text-xs font-medium px-2 py-1 rounded">Main</span>
                      </div>
                    )}
                  </div>
                ))}
                
                {/* Upload Button */}
                {images.length < MAX_IMAGES && (
                  <label className="aspect-square rounded-lg border-2 border-dashed border-gray-300 hover:border-primary hover:bg-primary/5 cursor-pointer flex flex-col items-center justify-center gap-2 transition-all">
                    <Plus className="w-8 h-8 text-gray-400" />
                    <span className="text-sm text-gray-500">Add Image</span>
                    <input
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={handleImageSelect}
                      className="hidden"
                    />
                  </label>
                )}
              </div>
              
              {images.length === 0 && (
                <div className="text-center py-8 border-2 border-dashed border-gray-200 rounded-lg mt-4">
                  <ImageIcon className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                  <p className="text-gray-600 mb-2">No images uploaded yet</p>
                  <p className="text-sm text-gray-500">Click "Add Image" to upload product photos</p>
                </div>
              )}
            </CardContent>
          </Card>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Basic Information */}
            <Card className="shadow-sm">
              <CardHeader>
                <CardTitle>Basic Information</CardTitle>
                <CardDescription>Essential product details</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name_en">Product Name (English) *</Label>
                  <Input
                    id="name_en"
                    value={formData.name_en}
                    onChange={(e) => setFormData({ ...formData, name_en: e.target.value })}
                    placeholder="Premium Velvet Shanel"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="name_ps">Product Name (Pashto)</Label>
                  <Input
                    id="name_ps"
                    value={formData.name_ps}
                    onChange={(e) => setFormData({ ...formData, name_ps: e.target.value })}
                    placeholder="پریمیم ویلویټ شانل"
                    className="font-urdu"
                  />
                </div>

                <div className="space-y-2">
                  <Label>Category *</Label>
                  <Select value={formData.category} onValueChange={(value) => setFormData({ ...formData, category: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {CATEGORIES.map((cat) => (
                        <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="price">Price (PKR) *</Label>
                  <Input
                    id="price"
                    type="number"
                    step="0.01"
                    min="0"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    placeholder="2500"
                    required
                  />
                </div>

                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <Label className="font-medium">In Stock</Label>
                    <p className="text-sm text-gray-600">Product availability status</p>
                  </div>
                  <Switch
                    checked={formData.stock_status}
                    onCheckedChange={(checked) => setFormData({ ...formData, stock_status: checked })}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Description */}
            <Card className="shadow-sm">
              <CardHeader>
                <CardTitle>Product Description</CardTitle>
                <CardDescription>Detailed product information</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="description_en">Description (English)</Label>
                  <Textarea
                    id="description_en"
                    value={formData.description_en}
                    onChange={(e) => setFormData({ ...formData, description_en: e.target.value })}
                    placeholder="Describe the product features, materials, quality..."
                    rows={6}
                    className="resize-none"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description_ps">Description (Pashto)</Label>
                  <Textarea
                    id="description_ps"
                    value={formData.description_ps}
                    onChange={(e) => setFormData({ ...formData, description_ps: e.target.value })}
                    placeholder="د محصول ځانګړتیاوې، مواد، کیفیت..."
                    rows={6}
                    className="resize-none font-urdu"
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-4 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => router.back()}
              disabled={loading}
              className="w-full sm:w-auto"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={loading || images.length === 0}
              className="w-full sm:flex-1 bg-primary hover:bg-primary-hover"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Creating Product...
                </>
              ) : (
                <>
                  <Upload className="w-4 h-4 mr-2" />
                  Create Product
                </>
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
