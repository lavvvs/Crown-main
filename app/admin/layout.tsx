"use client";

import { Separator } from "@/components/ui/separator";
import Sidebar from "./Sidebar";
import { useSearchParams } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { useEffect } from "react";

function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { toast } = useToast();
  const searchParams = useSearchParams();
  const status = searchParams.get("status");

  useEffect(() => {
    if (status === "created") {
      toast({ title: "✅ Product Created Successfully!" });
    } else if (status === "updated") {
      toast({ title: "✅ Product Updated!" });
    } else if (status === "image") {
      toast({ title: "🖼️ Product Image Updated!" });
    }
  }, [status, toast]);

  return (
    <div className="min-h-screen bg-pink-100">
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
