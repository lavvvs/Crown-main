import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Mail, Phone, MapPin, Clock } from "lucide-react";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { CurrencyProvider } from "@/contexts/currency-context";

export default function ContactPage() {
  return (
    <CurrencyProvider>
      <div className="min-h-screen bg-pink-50 text-pink-900">
        <Navigation currentPage="contact" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-pink-900">
              We'd Love to Hear From You
            </h1>
            <p className="text-xl text-pink-600 max-w-2xl mx-auto">
              Have questions about our products or need personalized
              recommendations? Our team is here to help you find the perfect
              hair extensions.
            </p>
          </div>

          {/* Form & Info */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <Card className="shadow-lg border-0 bg-white">
              <CardContent className="p-8">
                <h2 className="text-2xl font-semibold text-pink-800 mb-6">
                  Send us a message
                </h2>
                <form className="space-y-6">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-pink-700 mb-2"
                    >
                      Full Name
                    </label>
                    <Input
                      id="name"
                      type="text"
                      placeholder="Enter your full name"
                      className="w-full bg-pink-100 border border-pink-300 placeholder-pink-500"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-pink-700 mb-2"
                    >
                      Email Address
                    </label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter your email address"
                      className="w-full bg-pink-100 border border-pink-300 placeholder-pink-500"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="message"
                      className="block text-sm font-medium text-pink-700 mb-2"
                    >
                      Message
                    </label>
                    <Textarea
                      id="message"
                      placeholder="Tell us how we can help you..."
                      rows={6}
                      className="w-full bg-pink-100 border border-pink-300 placeholder-pink-500"
                    />
                  </div>

                  <Button className="w-full bg-pink-700 hover:bg-pink-800 text-white py-3 text-lg">
                    Send Message
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Contact Information */}
            <div className="space-y-8">
              <Card className="shadow-lg border-0 bg-pink-100 text-pink-900">
                <CardContent className="p-8">
                  <h2 className="text-2xl font-semibold mb-6 text-pink-800">
                    Get in touch
                  </h2>
                  <div className="space-y-6">
                    <div className="flex items-start space-x-4">
                      <Mail className="h-6 w-6 text-pink-500" />
                      <div>
                        <h3 className="text-lg font-medium">Email</h3>
                        <p className="text-pink-600">chennai@Crown Enterprises.com</p>
                        <p className="text-pink-600">support@Crown Enterprises.com</p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-4">
                      <Phone className="h-6 w-6 text-pink-500" />
                      <div>
                        <h3 className="text-lg font-medium">Phone</h3>
                        <p className="text-pink-600">+91 1111111111</p>
                        <p className="text-pink-600">+91 1111111111</p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-4">
                      <MapPin className="h-6 w-6 text-pink-500" />
                      <div>
                        <h3 className="text-lg font-medium">Address</h3>
                        <p className="text-pink-600">
                          123 Beauty Street
                          <br />
                          Chennai, Tamil Nadu 600001
                          <br />
                          India
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-4">
                      <Clock className="h-6 w-6 text-pink-500" />
                      <div>
                        <h3 className="text-lg font-medium">Business Hours</h3>
                        <p className="text-pink-600">
                          Monday - Saturday: 9:00 AM - 7:00 PM
                          <br />
                          Sunday: 10:00 AM - 5:00 PM
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Help Box */}
              <Card className="shadow-lg border-0 bg-pink-700 text-white">
                <CardContent className="p-8">
                  <h3 className="text-xl font-semibold mb-4">
                    Need immediate help?
                  </h3>
                  <p className="text-pink-200 mb-4">
                    Our customer service team is available to assist you with
                    any questions about our products, shipping, or returns.
                  </p>
                  <Button
                    variant="outline"
                    className="border-pink-300 bg-pink-100 text-pink-800 hover:bg-pink-100 hover:text-pink-800 hover:border-pink-800 transform transition duration-200 ease-in-out hover:scale-105 hover:shadow-md hover:shadow-pink-300"
                  >
                    Live Chat Support
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        <Footer />
      </div>
    </CurrencyProvider>
  );
}
