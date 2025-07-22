"use client";

import Link from 'next/link';
import { Home, Info, Rss, Mail } from 'lucide-react';

const BottomNav = () => {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-950 border-t border-gray-200 dark:border-gray-800 p-2 md:hidden z-30">
      <div className="container mx-auto flex justify-around items-center">
        <Link href="/" className="flex flex-col items-center text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white transition-colors">
          <Home className="w-6 h-6" />
          <span className="text-xs mt-1">Home</span>
        </Link>
        <Link href="/about" className="flex flex-col items-center text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white transition-colors">
          <Info className="w-6 h-6" />
          <span className="text-xs mt-1">About</span>
        </Link>
        <Link href="/blog" className="flex flex-col items-center text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white transition-colors">
          <Rss className="w-6 h-6" />
          <span className="text-xs mt-1">Blog</span>
        </Link>
        <Link href="/contact.html" className="flex flex-col items-center text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white transition-colors">
          <Mail className="w-6 h-6" />
          <span className="text-xs mt-1">Contact</span>
        </Link>
      </div>
    </nav>
  );
};

export default BottomNav;