import { CartItem } from '@/types';

export interface OrderDetails {
  customerName: string;
  phone: string;
  address: string;
  items: CartItem[];
  total: number;
}

export function formatWhatsAppMessage(order: OrderDetails): string {
  const productList = order.items
    .map(item => `- ${item.name_en} (x${item.quantity}) - Rs. ${(item.price * item.quantity).toLocaleString()}`)
    .join('\n');

  const message = `*New Order - Harram Clothes*

*Customer Details:*
Name: ${order.customerName}
Phone: ${order.phone}
Address: ${order.address}

*Order Items:*
${productList}

*Total Amount: Rs. ${order.total.toLocaleString()}*

Delivery: FREE (All Pakistan)
Payment: Cash on Delivery`;

  return encodeURIComponent(message);
}

export function sendToWhatsApp(order: OrderDetails) {
  const whatsappNumber = '+923179511031';
  const message = formatWhatsAppMessage(order);
  
  // Direct WhatsApp link - works better than wa.me sometimes
  const whatsappUrl = `https://api.whatsapp.com/send?phone=${whatsappNumber}&text=${message}`;
  
  window.location.href = whatsappUrl;
}
