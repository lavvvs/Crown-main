"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ShoppingCart, Heart } from "lucide-react";
import { useCurrency } from "@/contexts/currency-context";

const products = [
  {
    id: 1,
    name: "Virgin Brazilian Straight",
    price: 89.99,
    originalPrice: 119.99,
    image: "/placeholder.svg?height=300&width=300",
    rating: 5,
    reviews: 124,
  },
  {
    id: 2,
    name: "613 Blonde Body Wave",
    price: 149.99,
    originalPrice: 199.99,
    image: "/placeholder.svg?height=300&width=300",
    rating: 5,
    reviews: 89,
  },
  {
    id: 3,
    name: "Peruvian Deep Wave",
    price: 99.99,
    originalPrice: 129.99,
    image: "/placeholder.svg?height=300&width=300",
    rating: 4,
    reviews: 156,
  },
  {
    id: 4,
    name: "Malaysian Curly Bundle",
    price: 79.99,
    originalPrice: 109.99,
    image: "/placeholder.svg?height=300&width=300",
    rating: 5,
    reviews: 203,
  },
  {
    id: 5,
    name: "Indian Straight Closure",
    price: 59.99,
    originalPrice: 79.99,
    image: "/placeholder.svg?height=300&width=300",
    rating: 4,
    reviews: 67,
  },
  {
    id: 6,
    name: "Cambodian Water Wave",
    price: 119.99,
    originalPrice: 159.99,
    image: "/placeholder.svg?height=300&width=300",
    rating: 5,
    reviews: 91,
  },
];

export function ProductGrid() {
  const { formatPrice } = useCurrency();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.map((product) => (
        <Card
          key={product.id}
          className="group overflow-hidden border-0 shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 bg-pink-50 text-pink-900"
        >
          <div className="relative overflow-hidden">
            <Image
              src={product.image}
              alt={product.name}
              width={300}
              height={300}
              className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <Button
                size="sm"
                variant="secondary"
                className="rounded-full p-2 h-auto bg-pink-100 text-pink-600 hover:bg-pink-200"
              >
                <Heart size={16} />
              </Button>
            </div>
            {product.originalPrice > product.price && (
              <div className="absolute top-3 left-3 bg-rose-500 text-white px-2 py-1 rounded-md text-xs font-semibold">
                SALE
              </div>
            )}
          </div>

          <CardContent className="p-4">
            <h3 className="font-semibold mb-2 line-clamp-2 text-pink-900">
              {product.name}
            </h3>

            <div className="flex items-center mb-2">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <span
                    key={i}
                    className={
                      i < product.rating ? "text-yellow-400" : "text-gray-300"
                    }
                  >
                    ★
                  </span>
                ))}
              </div>
              <span className="text-sm text-pink-600 ml-2">
                ({product.reviews})
              </span>
            </div>

            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <span className="text-xl font-bold text-pink-700">
                  {formatPrice(product.price)}
                </span>
                {product.originalPrice > product.price && (
                  <span className="text-sm line-through text-pink-500">
                    {formatPrice(product.originalPrice)}
                  </span>
                )}
              </div>
            </div>

            <Button className="w-full bg-pink-600 hover:bg-pink-700 text-white transition-colors duration-300">
              <ShoppingCart size={16} className="mr-2" />
              Add to Cart
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
