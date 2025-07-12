"use client";
import { adminLinks } from "@/utils/links";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";

function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="bg-pink-50 p-4 rounded-xl shadow-md border border-pink-100 w-full">
      <h2 className="text-pink-700 font-semibold text-lg mb-4">Admin Panel</h2>
      <div className="flex flex-col space-y-2">
        {adminLinks.map((link) => {
          const isActivePage = pathname === link.href;

          return (
            <Button
              key={link.href}
              asChild
              className={`w-full justify-start text-left px-4 py-2 rounded-lg transition-all duration-200
                ${
                  isActivePage
                    ? "bg-pink-600 text-white shadow-md hover:bg-pink-700"
                    : "bg-white text-pink-700 border border-pink-300 hover:bg-pink-100 hover:text-pink-900"
                }`}
              variant="ghost"
            >
              <Link href={link.href} className="capitalize w-full">
                {link.label}
              </Link>
            </Button>
          );
        })}
      </div>
    </aside>
  );
}

export default Sidebar;
