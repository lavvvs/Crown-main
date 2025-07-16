import CartItemsList from "@/components/cart/CartItemsList";
import CartTotals from "@/components/cart/CartTotals";
import SectionTitle from "@/components/global/SectionTitle";
import { fetchOrCreateCart, updateCart } from "@/utils/actions";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

async function CartPage() {
  const { userId } = await auth();
  if (!userId) redirect("/");
  const previousCart = await fetchOrCreateCart({ userId });
  const { currentCart, cartItems } = await updateCart(previousCart);

  if (cartItems.length === 0)
    return (
      <div className="min-h-screen bg-pink-50 text-pink-700 py-20 text-center">
        <SectionTitle text="Empty Cart" />
        <p className="mt-4 text-pink-500 font-medium">
          Looks like your cart is waiting to be filled with love 💖
        </p>
      </div>
    );

  return (
    <div className="min-h-screen bg-pink-50 text-pink-700 py-12 px-4">
      <SectionTitle text="Shopping Cart" />
      <div className="mt-8 grid gap-6 lg:grid-cols-12">
        <div className="lg:col-span-8 space-y-4">
          <div className="rounded-2xl bg-white p-4 shadow-md border border-pink-200">
            <CartItemsList cartItems={cartItems} />
          </div>
        </div>
        <div className="lg:col-span-4">
          <div className="rounded-2xl bg-pink-100 p-6 shadow-lg border-2 border-pink-300">
            <CartTotals cart={currentCart} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default CartPage;
