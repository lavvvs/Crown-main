import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { CurrencyProvider } from "@/contexts/currency-context";
import HomePageClient from "@/components/HomePageClient"; // ✅ Import client component
import { fetchAllProducts } from "@/utils/actions";

export default async function HomePage() {
  const Products = await fetchAllProducts();

  return (
    <CurrencyProvider>
      <div className="min-h-screen bg-pink-50 text-pink-900">
        <Navigation currentPage="home" />

        {/* Hero Section (no changes here) */}
        <section className="relative h-screen min-h-[600px] overflow-hidden">
          {/* Background Image + Overlay */}
          <div className="absolute inset-0 z-0">
            <Image
              src="/img4.png"
              alt="Luxury Hair Extensions"
              fill
              className="object-cover object-left md:object-center"
              priority
            />
            <div className="absolute inset-0 bg-pink-900 bg-opacity-10"></div>
          </div>

          {/* Content Wrapper */}
          <div className="relative z-10 h-full w-full flex flex-col-reverse md:flex-col items-center justify-between md:justify-center text-center px-4 sm:px-6 lg:px-8 text-white">
            <div className="mb-10 md:mb-0 max-w-4xl">
              <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight drop-shadow-lg">
                Crown Enterprises
              </h1>
              <Button
                asChild
                size="lg"
                className="bg-pink-600 text-white hover:bg-pink-700 text-lg px-8 py-4 h-auto font-semibold transition-all duration-300 transform hover:scale-105 shadow-md"
              >
                <Link href="/category/all-products">Shop Now</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* ✅ Replace the static layout with the client component */}
          <HomePageClient initialProducts={Products} />
        </div>

        {/* Footer */}
        <Footer />
      </div>
    </CurrencyProvider>
  );
}