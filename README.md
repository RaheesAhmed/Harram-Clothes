# 🛍️ Harram Clothes E-Commerce Store

A modern, full-featured e-commerce platform for **Harram Clothes** - a clothing business in Peshawar, Pakistan. Built with Next.js 15, Tailwind CSS 4, and Supabase.

![Harram Clothes](https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.0-38bdf8?style=for-the-badge&logo=tailwind-css)
![Supabase](https://img.shields.io/badge/Supabase-DB-3ecf8e?style=for-the-badge&logo=supabase)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)

## ✨ Features

### 🛒 Customer Features
- **Product Catalog** with category filtering (Kadar, Velvet Shanel, Carandi)
- **Smart Search** with real-time results and product quick view
- **Shopping Cart** with add/remove/quantity controls
- **Checkout System** with order placement to database
- **Order Tracking** - Track orders with Order ID
- **Bilingual Support** - English & Pashto (Urdu font)
- **WhatsApp Integration** - Contact support directly
- **Responsive Design** - Mobile-first, works on all devices

### 👨‍💼 Admin Features
- **Secure Admin Panel** with authentication
- **Product Management** - Add, Edit, Delete products
- **Image Upload** - Upload product images to Supabase Storage
- **Order Management** - View, update order status
- **Order Tracking** - Track all customer orders
- **Dashboard** - Overview of products and orders
- **Status Updates** - Mark orders as Confirmed/Completed/Cancelled

### 🎨 Design Highlights
- **Modern UI/UX** - Clean, professional design
- **Shadcn UI Components** - Premium component library
- **Smooth Animations** - Hover effects, transitions
- **Color Scheme** - Burgundy primary (#8B2635)
- **Professional Layout** - Hero section, product grid, footer

## 🛠️ Tech Stack

| Technology | Purpose |
|------------|---------|
| **Next.js 15** | React framework with App Router |
| **TypeScript** | Type-safe development |
| **Tailwind CSS 4** | Utility-first styling |
| **Shadcn UI** | Component library |
| **Supabase** | Database, Auth, Storage |
| **PostgreSQL** | Database (via Supabase) |
| **Lucide React** | Icon library |

## 📋 Prerequisites

Before you begin, ensure you have:

- **Node.js** 18+ installed
- **npm** or **yarn** package manager
- **Supabase Account** (free tier works)
- **Git** for version control

## 🚀 Quick Start

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/haram-clothes.git
cd haram-clothes/store
```

### 2. Install Dependencies

```bash
npm install
# or
yarn install
```

### 3. Environment Setup

Create a `.env.local` file in the `store` directory:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# WhatsApp Configuration
NEXT_PUBLIC_WHATSAPP_NUMBER=
```

**How to get Supabase credentials:**
1. Go to [Supabase Dashboard](https://supabase.com/dashboard)
2. Create a new project (or use existing)
3. Go to **Settings** → **API**
4. Copy **Project URL** → `NEXT_PUBLIC_SUPABASE_URL`
5. Copy **anon/public** key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
6. Copy **service_role** key → `SUPABASE_SERVICE_ROLE_KEY`

### 4. Database Setup

#### Option A: Using SQL Editor (Recommended)

1. Go to Supabase Dashboard → **SQL Editor**
2. Open `supabase_schema/main.sql` from project root
3. Copy entire content
4. Paste in SQL Editor
5. Click **Run** to execute

This will create:
- ✅ All tables (products, orders, categories)
- ✅ Row-level security policies
- ✅ Storage bucket for images
- ✅ 20 sample products
- ✅ Default categories

#### Option B: Manual Setup

Run these SQL commands in order:

```sql
-- 1. Create products table
CREATE TABLE products (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name_en TEXT NOT NULL,
  name_ps TEXT,
  category TEXT NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  description_en TEXT,
  image_url TEXT NOT NULL,
  stock_status BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT NOW()
);

-- 2. Create orders table
CREATE TABLE orders (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  customer_name TEXT NOT NULL,
  phone TEXT NOT NULL,
  address TEXT NOT NULL,
  products JSONB NOT NULL,
  total_amount DECIMAL(10,2) NOT NULL,
  status TEXT DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT NOW()
);

-- 3. Enable RLS and create policies
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;

-- See full schema in supabase_schema/main.sql
```

### 5. Create Admin User

1. Go to Supabase Dashboard → **Authentication** → **Users**
2. Click **"Add user"**
3. Enter credentials:
   - **Email:** `your email here `
   - **Password:** `yor password here `
4. Enable **Auto Confirm User**
5. Click **Create user**

### 6. Create Storage Bucket

1. Go to **Storage** in Supabase Dashboard
2. Click **"New bucket"**
3. Name: `products`
4. Make it **Public**
5. Click **Create bucket**

### 7. Run Development Server

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📁 Project Structure

```
store/
├── app/                          # Next.js App Router
│   ├── admin/                    # Admin panel routes
│   │   ├── dashboard/           # Admin dashboard
│   │   ├── products/            # Product management
│   │   │   ├── add/            # Add product page
│   │   │   └── edit/[id]/      # Edit product page
│   │   ├── orders/              # Order management
│   │   ├── login/               # Admin login
│   │   └── layout.tsx           # Admin layout with sidebar
│   ├── checkout/                # Checkout pages
│   │   ├── page.tsx            # Checkout form
│   │   └── success/            # Order success page
│   ├── track-order/             # Order tracking page
│   ├── layout.tsx               # Root layout
│   ├── page.tsx                 # Homepage
│   └── globals.css              # Global styles
├── components/                   # React components
│   ├── ui/                      # Shadcn UI components
│   ├── Header.tsx               # Navigation header
│   ├── Hero.tsx                 # Hero section
│   ├── ProductCard.tsx          # Product card
│   ├── Cart.tsx                 # Shopping cart
│   ├── Footer.tsx               # Footer
│   └── Logo.tsx                 # Logo component
├── lib/                         # Utility libraries
│   ├── supabase/               # Supabase clients
│   │   ├── client.ts           # Client-side
│   │   └── server.ts           # Server-side
│   └── utils/                  # Utility functions
│       └── whatsapp.ts         # WhatsApp integration
├── types/                       # TypeScript types
│   └── index.ts                # Type definitions
├── public/                      # Static assets
└── supabase_schema/             # Database schema
    └── main.sql                # Complete SQL schema
```



**Admin URL:** [http://localhost:3000/admin/login](http://localhost:3000/admin/login)

### Admin Capabilities

- ✅ Add/Edit/Delete products
- ✅ Upload product images
- ✅ View all orders
- ✅ Update order status
- ✅ Contact customers via WhatsApp
- ✅ Manage inventory (stock status)

## 📱 Customer Features Guide

### Shopping Flow

1. **Browse Products** - Homepage with category filters
2. **Search Products** - Real-time search with autocomplete
3. **View Details** - Click product for quick view modal
4. **Add to Cart** - Add items with quantity
5. **Checkout** - Fill delivery information
6. **Order Confirmation** - Get Order ID
7. **Track Order** - Use Order ID to track status

### Order Tracking

1. Click **"Track Order"** in header
2. Enter your **Order ID** (first 8 characters)
3. View order status and details
4. Contact support via WhatsApp if needed

## 🎨 Customization

### Colors

Edit `app/globals.css` to change theme colors:

```css
--color-primary: #8B2635;        /* Burgundy */
--color-primary-hover: #6B1E2A;  /* Dark burgundy */
```

### Logo

Replace logo in `components/Logo.tsx`:

```tsx
export default function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2">
      <span className="text-2xl font-bold text-primary">
        Your Brand
      </span>
    </Link>
  );
}
```

### WhatsApp Number

Update in `.env.local`:

```env
NEXT_PUBLIC_WHATSAPP_NUMBER=your_whatsapp_number
```

## 📦 Database Schema

### Products Table

| Column | Type | Description |
|--------|------|-------------|
| id | UUID | Primary key |
| name_en | TEXT | English name |
| name_ps | TEXT | Pashto name |
| category | TEXT | Product category |
| price | DECIMAL | Price in PKR |
| description_en | TEXT | English description |
| image_url | TEXT | Image URL |
| stock_status | BOOLEAN | In stock or not |
| created_at | TIMESTAMP | Creation date |

### Orders Table

| Column | Type | Description |
|--------|------|-------------|
| id | UUID | Primary key |
| customer_name | TEXT | Customer name |
| phone | TEXT | Phone number |
| address | TEXT | Delivery address |
| products | JSONB | Order items (JSON) |
| total_amount | DECIMAL | Total price |
| status | TEXT | Order status |
| created_at | TIMESTAMP | Order date |

## 🚀 Deployment

### Deploy to Vercel (Recommended)

1. Push code to GitHub
2. Go to [Vercel](https://vercel.com)
3. Click **"New Project"**
4. Import your GitHub repository
5. Add environment variables:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`
   - `NEXT_PUBLIC_WHATSAPP_NUMBER`
6. Click **Deploy**

### Build for Production

```bash
npm run build
npm run start
```

## 🐛 Troubleshooting

### Issue: Products not loading

**Solution:** Check Supabase connection
```bash
# Verify .env.local has correct values
# Check Supabase dashboard is accessible
```

### Issue: Images not uploading

**Solution:** Check storage bucket
1. Verify `products` bucket exists
2. Ensure bucket is public
3. Check RLS policies on storage.objects

### Issue: Admin can't login

**Solution:** Verify admin user
1. Check user exists in Supabase Auth
2. Verify email/password are correct
3. Ensure user is confirmed

### Issue: Order tracking not working

**Solution:** 
- Enter first 8 characters of Order ID
- Check orders exist in database
- Verify Supabase connection

## 📚 Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Supabase Documentation](https://supabase.com/docs)
- [Shadcn UI](https://ui.shadcn.com/)

## 🤝 Support

For support, contact:
- **WhatsApp:** +92 317 9511031
- **Location:** Peshawar, Pakistan

## 📄 License

This project is built for **Harram Clothes** business.

## 👨‍💻 Developer

Built with ❤️ using modern web technologies.

---

**Ready to launch your e-commerce store?** Follow the setup guide above and you'll be live in minutes! 🚀
