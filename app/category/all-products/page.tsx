import { Sidebar } from "@/components/sidebar";
import { ProductGrid } from "@/components/product-grid";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { CurrencyProvider } from "@/contexts/currency-context";

export default function AllProductsPage() {
  return (
    <CurrencyProvider>
      <div className="min-h-screen bg-pink-50">
        <Navigation currentPage="products" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-pink-800 mb-2">
              All Products
            </h1>
            <p className="text-pink-600">
              Discover our complete collection of premium hair extensions
            </p>
          </div>

          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar */}
            <div className="lg:w-1/4">
              <Sidebar />
            </div>

            {/* Product Grid */}
            <div className="lg:w-3/4">
              <div className="mb-6 flex justify-between items-center">
                <p className="text-pink-600">Showing 24 of 156 products</p>
                <select className="border border-pink-300 bg-pink-100 text-pink-700 rounded-md px-3 py-2 text-sm">
                  <option>Sort by: Featured</option>
                  <option>Price: Low to High</option>
                  <option>Price: High to Low</option>
                  <option>Newest First</option>
                  <option>Best Selling</option>
                </select>
              </div>
              <ProductGrid />
            </div>
          </div>
        </div>

        <Footer />
      </div>
    </CurrencyProvider>
  );
}
