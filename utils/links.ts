type NavLink = {
  href: string;
  label: string;
};

export const links: NavLink[] = [
  { href: "/", label: "Home" },
  { href: "/category/all-products", label: "Products" },
  { href: "/about-us", label: "About" },
  { href: "/contact-us", label: "Contact" },
  { href: "/admin/products/create", label: "dashboard" },
];

export const adminLinks: NavLink[] = [
  { href: "/admin/sales", label: "sales" },
  { href: "/admin/products", label: "my products" },
  { href: "/admin/products/create", label: "create product" },
];
