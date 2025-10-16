import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Harram Clothes - Premium Clothing in Peshawar",
  description: "Shop premium quality Kadar, Velvet Shanel, and Carandi clothing. Free delivery across Pakistan. Cash on Delivery available.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
