import { Card, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { formatCurrency } from "@/utils/format";
import FormContainer from "../form/FormContainer";
import { SubmitButton } from "../form/Buttons";
import { Cart } from "@prisma/client";

function CartTotals({ cart }: { cart: Cart }) {
  const { cartTotal, shipping, tax, orderTotal } = cart;

  return (
    <div>
      <Card className="p-8 bg-pink-100 border-2 border-pink-300 shadow-md rounded-xl">
        <CartTotalRow label="Subtotal" amount={cartTotal} />
        <CartTotalRow label="Shipping" amount={shipping} />
        <CartTotalRow label="Tax" amount={tax} />
        <CardTitle className="mt-8 text-lg font-bold text-pink-700">
          <CartTotalRow label="Order Total" amount={orderTotal} lastRow />
        </CardTitle>
      </Card>

      <SubmitButton
        text="Place Order"
        className="w-full mt-8 bg-pink-600 hover:bg-pink-700 text-white font-semibold rounded-lg py-3 transition"
      />
    </div>
  );
}

function CartTotalRow({
  label,
  amount,
  lastRow,
}: {
  label: string;
  amount: number;
  lastRow?: boolean;
}) {
  return (
    <>
      <p className="flex justify-between text-sm font-medium text-pink-900">
        <span>{label}</span>
        <span>{formatCurrency(amount)}</span>
      </p>
      {!lastRow && <Separator className="my-2 bg-pink-300" />}
    </>
  );
}

export default CartTotals;
