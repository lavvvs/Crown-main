"use client";

import { useCallback, useState } from "react";
import { Product } from "@prisma/client";
import { Sidebar, FilterState } from "./sidebar";
import { ProductGrid } from "./product-grid";

interface Props {
  initialProducts: Product[];
}

export default function AllProductsClient({ initialProducts }: Props) {
  const [filteredProducts, setFilteredProducts] = useState(initialProducts);
  const [activeCategory, setActiveCategory] = useState("All Products");

  const handleFilterChange = useCallback(
    (filters: FilterState) => {
      setActiveCategory(filters.category || "All Products");

      const filtered = initialProducts.filter((product) => {
        const matchCategory =
          !filters.category ||
          filters.category === "All Products" ||
          product.categories?.includes(filters.category);

        const inPriceRange =
          product.price >= filters.priceRange[0] &&
          product.price <= filters.priceRange[1];

        const matchArray = (values: string[], selected: string[]) =>
          selected.length === 0 || selected.some((s) => values.includes(s));

        const matchColor = matchArray(product.color, filters.color);
        const matchLength = matchArray(product.length, filters.length);
        const matchTexture = matchArray(product.texture, filters.texture);
        const matchType = matchArray(product.categories ?? [], filters.type);

        return (
          matchCategory &&
          inPriceRange &&
          matchColor &&
          matchLength &&
          matchTexture &&
          matchType
        );
      });

      setFilteredProducts(filtered);
    },
    [initialProducts]
  );

  return (
    <div className="flex flex-col lg:flex-row gap-8">
      <div className="lg:w-1/4">
        <Sidebar onFilterChange={handleFilterChange} />
      </div>

      <div className="lg:w-3/4">
        <div className="mb-6 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-pink-800 mb-1 capitalize">
              {activeCategory}
            </h1>
            <p className="text-pink-600">
              Showing {filteredProducts.length} products
            </p>
          </div>
        </div>

        <ProductGrid products={filteredProducts} />
      </div>
    </div>
  );
}
