import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { CurrencyProvider } from "@/contexts/currency-context";
import { fetchAllProducts } from "@/utils/actions";
import AllProductsClient from "@/components/AllProductsClient"; // ✅ Import the new client component

export default async function AllProductsPage() {
  const products = await fetchAllProducts();

  return (
    <CurrencyProvider>
      <div className="min-h-screen bg-pink-50">
        <Navigation currentPage="products" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <AllProductsClient initialProducts={products} />
        </div>

        <Footer />
      </div>
    </CurrencyProvider>
  );
}
