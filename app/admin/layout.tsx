import { Separator } from "@/components/ui/separator";
import Sidebar from "./Sidebar";

function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-pink-100">
      {" "}
      {/* 👈 page-wide background */}
      <h2 className="text-3xl font-semibold text-pink-700 pl-4 pt-6">
        Dashboard
      </h2>
      <Separator className="mt-3 bg-pink-300 mx-4" />
      <section className="grid lg:grid-cols-12 gap-8 mt-10 bg-pink-50 p-6 rounded-xl shadow-sm border border-pink-200 mx-4">
        {/* Sidebar */}
        <div className="lg:col-span-3 bg-white p-4 rounded-lg border border-pink-200 shadow-md">
          <Sidebar />
        </div>

        {/* Main content */}
        <div className="lg:col-span-9 bg-white p-6 rounded-lg border border-pink-200 shadow-md">
          {children}
        </div>
      </section>
    </div>
  );
}
export default DashboardLayout;
