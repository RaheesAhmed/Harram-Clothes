export interface Product {
  id: string;
  name_en: string;
  name_ps?: string;
  category: string;
  price: number;
  description_en?: string;
  description_ps?: string;
  image_url: string;
  stock_status: boolean;
  created_at: string;
  updated_at?: string;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface Order {
  customer_name: string;
  phone: string;
  address: string;
  products: CartItem[];
  total_amount: number;
}

export interface Category {
  id: string;
  name_en: string;
  name_ps?: string;
}
