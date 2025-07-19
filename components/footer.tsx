import Image from "next/image";
import Link from "next/link";
import {
  Phone,
  Mail,
  Tag,
  MessageCircle,
  Instagram,
  Facebook,
  Youtube,
  Twitter,
} from "lucide-react";
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
    { name: "Instagram", icon: Instagram, href: "#" },
    { name: "Facebook", icon: Facebook, href: "#" },
    { name: "YouTube", icon: Youtube, href: "#" },
    { name: "Twitter", icon: Twitter, href: "#" },
  ];

  return (
    <>
      <footer className="bg-pink-50 text-pink-900 border-t border-pink-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex flex-col lg:flex-row justify-between gap-8 lg:gap-12">

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
              {/* Logo */}
              <div>
                <Image
                  src="/logo.png"
                  alt="Crown Enterprises"
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
                      aria-label={social.name}
                      className="w-10 h-10 bg-pink-100 hover:bg-pink-600 text-pink-600 hover:text-white rounded-full flex items-center justify-center transition-all duration-300 group"
                    >
                      <social.icon
                        size={20}
                        className="group-hover:scale-110 transition-transform"
                      />
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
                    src="/westen.png"
                    alt="Western Union"
                    width={100}
                    height={30}
                    className="bg-white border border-pink-200 rounded px-2 py-1"
                  />
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

      {/* WhatsApp Floating Button */}
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
            <MessageCircle size={25} />
          </a>
        </Button>
      </div>
    </>
  );
}
