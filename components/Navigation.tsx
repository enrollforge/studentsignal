'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Menu } from 'lucide-react';
import { useState } from 'react';

export default function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-[rgba(0,0,0,0.05)]">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="font-semibold text-xl tracking-tight">
              StudentSignal<span className="text-xs align-super">™</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/#how-it-works" className="text-sm hover:text-slate-600 transition-colors">
              How It Works
            </Link>
            <Link href="/directory" className="text-sm hover:text-slate-600 transition-colors">
              Campus Directory
            </Link>
            <Link href="/about" className="text-sm hover:text-slate-600 transition-colors">
              About
            </Link>
            <Link href="/contact" className="text-sm hover:text-slate-600 transition-colors">
              Contact
            </Link>
            <Button asChild className="rounded-full">
              <Link href="/dashboard">Get Started</Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 space-y-4">
            <Link
              href="/#how-it-works"
              className="block text-sm hover:text-slate-600 transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              How It Works
            </Link>
            <Link
              href="/directory"
              className="block text-sm hover:text-slate-600 transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Campus Directory
            </Link>
            <Link
              href="/about"
              className="block text-sm hover:text-slate-600 transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              About
            </Link>
            <Link
              href="/contact"
              className="block text-sm hover:text-slate-600 transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Contact
            </Link>
            <Button asChild className="w-full rounded-full">
              <Link href="/dashboard">Get Started</Link>
            </Button>
          </div>
        )}
      </div>
    </nav>
  );
}
