"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ShoppingCart, Heart, Star } from "lucide-react";
import { useCurrency } from "@/contexts/currency-context";
import { Product } from "@prisma/client";

import FormContainer from "@/components/form/FormContainer";
import { SubmitButton } from "@/components/form/Buttons";
import { addToCartAction } from "@/utils/actions";

type Props = {
  products: Product[];
};

export function ProductGrid({ products }: Props) {
  const { formatPrice } = useCurrency();

  if (!products || products.length === 0) {
    return (
      <p className="text-center text-pink-600 mt-12">No products found.</p>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.map((product) => (
        <Card
          key={product.id}
          className="group overflow-hidden border-0 shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 bg-pink-50 text-pink-900"
        >
          {/* Product Image */}
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
          </div>

          {/* Product Content */}
          <CardContent className="p-4">
            <CardTitle className="text-lg font-semibold mb-2 line-clamp-2 text-pink-900">
              {product.name}
            </CardTitle>

            {/* Rating */}
            <div className="flex items-center gap-1 mb-2 text-yellow-500">
              {Array.from({ length: 5 }, (_, i) => (
                <Star
                  key={i}
                  size={16}
                  fill={
                    i < Math.round(product.rating || 0) ? "#facc15" : "none"
                  }
                  stroke="#facc15"
                />
              ))}
              <span className="text-sm ml-1 text-yellow-700 font-medium">
                {product.rating?.toFixed(1) || "0.0"}
              </span>
            </div>

            {/* Price */}
            <div className="flex items-center justify-between mb-4">
              <span className="text-xl font-bold text-pink-700">
                {formatPrice(product.price)}
              </span>
            </div>

            {/* ✅ Add to Cart Form */}
            <FormContainer action={addToCartAction} redirectTo="/cart">
              <input type="hidden" name="productId" value={product.id} />
              <input type="hidden" name="amount" value="1" />
              <SubmitButton
                text="Add to Cart"
                className="w-full bg-pink-600 hover:bg-pink-700 text-white"
              >
                <ShoppingCart size={16} className="mr-2" />
              </SubmitButton>
            </FormContainer>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
