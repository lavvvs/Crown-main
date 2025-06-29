import Image from "next/image";
import Link from "next/link";
import { Phone, Mail, Tag, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Footer() {
  const shopLinks = [
    "Hair Extensions",
    "Closures",
    "Frontals",
    "Blonde Hair",
    "Ponytail Extensions",
  ];

  const policyLinks = [
    "Privacy Policy",
    "Terms and Conditions",
    "Shipping & Returns",
    "FAQ",
    "Delivery Timeline",
  ];

  const socialIcons = [
    { name: "Instagram", icon: "📷", href: "#" },
    { name: "Facebook", icon: "📘", href: "#" },
    { name: "YouTube", icon: "📺", href: "#" },
    { name: "Twitter", icon: "🐦", href: "#" },
  ];

  return (
    <>
      <footer className="bg-pink-50 text-pink-900 border-t border-pink-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
            {/* Company Info */}
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-pink-800 mb-2">
                  Crown Enterprise
                </h2>
                <p className="text-pink-600 text-sm font-medium mb-4">
                  House of real Indian human hair
                </p>
                <p className="text-pink-700 text-sm leading-relaxed">
                  We are dedicated to providing the finest quality Indian human
                  hair extensions, wigs, and accessories.
                </p>
              </div>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <Phone size={18} className="text-pink-600 flex-shrink-0" />
                  <a
                    href="tel:+911111111111"
                    className="text-pink-700 hover:text-pink-800 transition-colors"
                  >
                    +91 1111111111
                  </a>
                </div>
                <div className="flex items-center space-x-3">
                  <Mail size={18} className="text-pink-600 flex-shrink-0" />
                  <a
                    href="mailto:chennai@geniushairs.com"
                    className="text-pink-700 hover:text-pink-800 transition-colors"
                  >
                    chennai@example.com
                  </a>
                </div>
              </div>
            </div>

            {/* Shop Links */}
            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-pink-800">Shop</h3>
              <ul className="space-y-3">
                {shopLinks.map((link, i) => (
                  <li key={i}>
                    <Link
                      href={`/category/${link
                        .toLowerCase()
                        .replace(/\s+/g, "-")}`}
                      className="flex items-center space-x-3 text-pink-600 hover:text-pink-800 transition-colors group"
                    >
                      <Tag
                        size={16}
                        className="text-pink-500 group-hover:text-pink-700 flex-shrink-0"
                      />
                      <span className="text-sm">{link}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Policy Links */}
            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-pink-800">Policy</h3>
              <ul className="space-y-3">
                {policyLinks.map((link, i) => (
                  <li key={i}>
                    <Link
                      href={`/policy/${link
                        .toLowerCase()
                        .replace(/\s+/g, "-")
                        .replace("&", "and")}`}
                      className="flex items-center space-x-3 text-pink-600 hover:text-pink-800 transition-colors group"
                    >
                      <Tag
                        size={16}
                        className="text-pink-500 group-hover:text-pink-700 flex-shrink-0"
                      />
                      <span className="text-sm">{link}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Social + Payments */}
            <div className="space-y-6">
              {/* Alibaba Logo */}
              <div>
                <Image
                  src="/placeholder.svg?height=40&width=120"
                  alt="Alibaba Partner"
                  width={120}
                  height={40}
                  className="bg-white border border-pink-200 rounded px-2 py-1"
                />
              </div>

              {/* Social Media */}
              <div>
                <h4 className="text-lg font-medium text-pink-800 mb-4">
                  Follow Us
                </h4>
                <div className="flex space-x-4">
                  {socialIcons.map((social, i) => (
                    <Link
                      key={i}
                      href={social.href}
                      className="w-10 h-10 bg-pink-100 hover:bg-pink-600 text-pink-600 hover:text-white rounded-full flex items-center justify-center transition-all duration-300 group"
                    >
                      <span className="text-lg group-hover:scale-110 transition-transform">
                        {social.icon}
                      </span>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Payments */}
              <div>
                <h4 className="text-lg font-medium text-pink-800 mb-4">
                  Secure Payments
                </h4>
                <div className="space-y-4">
                  <Image
                    src="/placeholder.svg?height=30&width=100"
                    alt="Razorpay"
                    width={100}
                    height={30}
                    className="bg-white border border-pink-200 rounded px-2 py-1"
                  />
                  <div className="grid grid-cols-4 gap-2">
                    {["Visa", "Mastercard", "RuPay", "UPI"].map((name, i) => (
                      <div
                        key={i}
                        className="bg-white border border-pink-100 rounded p-1 flex items-center justify-center"
                      >
                        <Image
                          src={`/placeholder.svg?height=20&width=32`}
                          alt={name}
                          width={32}
                          height={20}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-pink-200 bg-pink-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 text-center">
            <p className="text-sm text-pink-600">
              © 2025 Crown Enterprise. All Rights Reserved.
            </p>
          </div>
        </div>
      </footer>

      {/* WhatsApp Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          asChild
          size="lg"
          className="bg-green-500 hover:bg-green-600 text-white rounded-full w-14 h-14 p-0 shadow-lg hover:shadow-xl transition-all duration-300 animate-pulse hover:animate-none"
        >
          <a
            href="https://wa.me/911111111111"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Contact us on WhatsApp"
          >
            <MessageCircle size={24} />
          </a>
        </Button>
      </div>
    </>
  );
}
