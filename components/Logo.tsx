import Link from 'next/link';
import { Shirt } from 'lucide-react';

interface LogoProps {
  className?: string;
}

export default function Logo({ className = '' }: LogoProps) {
  return (
    <Link 
      href="/" 
      className={`flex items-center gap-2 group ${className}`}
    >
      <div className="relative">
        <div className="absolute inset-0 bg-primary/10 rounded-lg blur-sm group-hover:blur-md transition-all"></div>
        <div className="relative bg-primary text-white p-2 rounded-lg group-hover:scale-105 transition-transform">
          <Shirt className="w-5 h-5" strokeWidth={2.5} />
        </div>
      </div>
      <div className="flex flex-col">
        <span className="font-bold text-xl text-primary tracking-tight leading-none">
          HARRAM
        </span>
        <span className="text-[10px] font-medium text-gray-600 tracking-widest uppercase leading-none">
          Clothes
        </span>
      </div>
    </Link>
  );
}
