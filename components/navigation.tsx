
"use client";

import Link from "next/link";
import { CurrencySelector } from "./currency-selector";
import { ShoppingCart, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import LinksDropdown from "./LinksDropdown";
import Image from "next/image";

interface NavigationProps {
  currentPage?: string;
}

export function Navigation({ currentPage = "home" }: NavigationProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { href: "/", label: "Home", key: "home" },
    { href: "/category/all-products", label: "Products", key: "products" },
    { href: "/about-us", label: "About", key: "about" },
    { href: "/contact-us", label: "Contact", key: "contact" },
  ];

  return (
    <nav className="bg-pink-50 border-b border-pink-200 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Image
            src="/logo.png"
            alt="Crown Logo"
            width={50}
            height={50}
            className="cursor-pointer rounded-full border border-pink-300"
          />
          {/* <div className="flex-shrink-0">
            <Link
              href="/"
              className="text-2xl font-bold text-pink-700 hover:text-pink-900 transition-colors"
            >
              Crown Enterprises
            </Link>
          </div> */}

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.key}
                href={item.href}
                className={`px-3 py-2 text-sm font-medium transition-colors ${
                  currentPage === item.key
                    ? "text-pink-700 border-b-2 border-pink-700"
                    : "text-pink-500 hover:text-pink-700"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Right side items */}
          <div className="flex items-center space-x-4">
            <CurrencySelector />
            <LinksDropdown />

            {/* Shopping Cart */}
            <Button
              variant="ghost"
              size="sm"
              className="relative text-pink-700 hover:text-pink-900 hover:bg-pink-100 hover:border border-pink-400"
            >
              <ShoppingCart size={20} />
              <span className="absolute -top-1 -right-1 bg-pink-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                0
              </span>
            </Button>

            {/* Mobile menu toggle */}
            <div className="md:hidden">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="text-pink-700 hover:text-pink-900  hover:bg-pink-100 hover:border border-pink-400"
              >
                {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t bg-pink-100 transition-all duration-300 ease-in-out">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navItems.map((item) => (
                <Link
                  key={item.key}
                  href={item.href}
                  className={`block px-3 py-2 text-base font-medium rounded-md transition-colors duration-200 ease-in-out ${
                    currentPage === item.key
                      ? "text-pink-800 bg-pink-200"
                      : "text-pink-600 hover:text-pink-800 hover:bg-pink-200"
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
