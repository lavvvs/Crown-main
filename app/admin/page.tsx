// app/admin/page.tsx
import { redirect } from "next/navigation";

export default function AdminPage() {
  redirect("/admin/sales"); // 🔁 redirects to actual dashboard
}
