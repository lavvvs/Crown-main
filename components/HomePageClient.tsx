"use client";

import { useCallback, useState } from "react";
import { Product } from "@prisma/client";
import { Sidebar, FilterState } from "./sidebar";
import { ProductGrid } from "./product-grid";

interface Props {
  initialProducts: Product[];
}

export default function HomePageClient({ initialProducts }: Props) {
  const [filteredProducts, setFilteredProducts] = useState(initialProducts);
  const [activeCategory, setActiveCategory] = useState("All Products");

  const handleFilterChange = useCallback(
    (filters: FilterState) => {
      // Update the title based on the selected category
      setActiveCategory(filters.category || "All Products");

      const filtered = initialProducts.filter((product) => {
        // 1. Category Filter
        const matchCategory =
          !filters.category ||
          filters.category === "All Products" ||
          product.categories?.includes(filters.category);

        // 2. Price Range Filter
        const inPriceRange =
          product.price >= filters.priceRange[0] &&
          product.price <= filters.priceRange[1];

        // 3. Other Array-based Filters
        const matchArray = (values: string[], selected: string[]) =>
          selected.length === 0 || selected.some((s) => values.includes(s));

        const matchColor = matchArray(product.color, filters.color);
        const matchLength = matchArray(product.length, filters.length);
        const matchTexture = matchArray(product.texture, filters.texture);
        const matchType = matchArray(product.categories ?? [], filters.type);

        return (
          matchCategory && // ✅ Added category check
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
        {/* The title now dynamically updates based on the selected category */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-pink-800 mb-2 capitalize">
            {activeCategory === "All Products" ? "Featured Products" : activeCategory}
          </h2>
          <p className="text-pink-600">
            {activeCategory === "All Products"
              ? "Discover our premium collection of hair extensions"
              : `Browse the ${activeCategory} collection`}
          </p>
        </div>
        <ProductGrid products={filteredProducts} />
      </div>
    </div>
  );
}