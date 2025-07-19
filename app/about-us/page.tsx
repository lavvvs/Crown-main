import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Award, Heart, Shield, Star } from "lucide-react";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { CurrencyProvider } from "@/contexts/currency-context";

export default function AboutPage() {
  return (
    <CurrencyProvider>
      <div className="min-h-screen bg-pink-50 text-pink-950">
        <Navigation currentPage="about" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-pink-900">
              Our Story
            </h1>
            <p className="text-xl text-pink-600 max-w-3xl mx-auto leading-relaxed">
              Founded with a passion for authentic beauty, Crown Enterprises has been
              transforming lives through premium hair extensions for over a
              decade.
            </p>
          </div>

          {/* Main Content */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-pink-800">
                Premium Quality, Authentic Beauty
              </h2>
              <p className="text-lg text-pink-600 leading-relaxed">
                At Crown Enterprises, we believe that every woman deserves to feel
                confident and beautiful. Our journey began with a simple
                mission: to provide the highest quality, 100% virgin Indian
                human hair extensions that look and feel completely natural.
              </p>
              <p className="text-lg text-pink-600 leading-relaxed">
                We source our hair directly from trusted suppliers across India
                who share our commitment to ethical practices and exceptional
                quality. Each bundle undergoes rigorous testing to ensure it
                meets our exacting standards for texture, durability, and
                authenticity.
              </p>
              <p className="text-lg text-pink-600 leading-relaxed">
                Our dedication to excellence has earned us the trust of
                thousands of customers worldwide, from everyday women to
                professional stylists and celebrities who demand nothing but the
                best.
              </p>
            </div>

            <div className="relative">
              <Image
                src="/logo.png"
                alt="Luxury hair extensions showcase"
                width={500}
                height={600}
                className="rounded-lg shadow-2xl"
              />
            </div>
          </div>

          {/* Values Section */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-center mb-12 text-pink-800">
              What Sets Us Apart
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <Card className="text-center border-0 shadow-lg bg-pink-100">
                <CardContent className="p-6">
                  <div className="w-16 h-16 bg-pink-700 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Award className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3 text-pink-800">
                    Premium Quality
                  </h3>
                  <p className="text-pink-600">
                    100% virgin Indian human hair sourced from the finest
                    suppliers
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center border-0 shadow-lg bg-pink-100">
                <CardContent className="p-6">
                  <div className="w-16 h-16 bg-pink-700 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Heart className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3 text-pink-800">
                    Ethical Sourcing
                  </h3>
                  <p className="text-pink-600">
                    Committed to fair trade practices and supporting our
                    supplier communities
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center border-0 shadow-lg bg-pink-100">
                <CardContent className="p-6">
                  <div className="w-16 h-16 bg-pink-700 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Shield className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3 text-pink-800">
                    Quality Guarantee
                  </h3>
                  <p className="text-pink-600">
                    Every product comes with our satisfaction guarantee and
                    quality assurance
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center border-0 shadow-lg bg-pink-100">
                <CardContent className="p-6">
                  <div className="w-16 h-16 bg-pink-700 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Star className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3 text-pink-800">
                    Expert Support
                  </h3>
                  <p className="text-pink-600">
                    Professional styling advice and customer support from hair
                    experts
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Mission Statement */}
          <div className="bg-pink-200 rounded-2xl p-8 md:p-12 text-center">
            <h2 className="text-3xl font-bold mb-6 text-pink-900">
              Our Mission
            </h2>
            <p className="text-xl text-pink-700 leading-relaxed max-w-4xl mx-auto">
              To empower women around the world by providing them with the
              finest quality Indian hair extensions that enhance their natural
              beauty and boost their confidence. We are committed to maintaining
              the highest standards of quality, authenticity, and customer
              service in everything we do.
            </p>
          </div>
        </div>

        <Footer />
      </div>
    </CurrencyProvider>
  );
}
