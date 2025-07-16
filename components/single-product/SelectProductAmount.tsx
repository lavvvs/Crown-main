import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export enum Mode {
  SingleProduct = "singleProduct",
  CartItem = "cartItem",
}

type SelectProductAmountProps = {
  mode: Mode.SingleProduct;
  amount: number;
  setAmount: (value: number) => void;
};

type SelectCartItemAmountProps = {
  mode: Mode.CartItem;
  amount: number;
  setAmount: (value: number) => Promise<void>;
  isLoading: boolean;
};

function SelectProductAmount(
  props: SelectProductAmountProps | SelectCartItemAmountProps
) {
  const { mode, amount, setAmount } = props;
  const cartItem = mode === Mode.CartItem;

  return (
    <>
      <h4 className="mb-2 text-pink-700 font-medium">Amount :</h4>
      <Select
        defaultValue={amount.toString()}
        onValueChange={(value) => setAmount(Number(value))}
        disabled={cartItem ? props.isLoading : false}
      >
        <SelectTrigger
          className={`${
            cartItem ? "w-[100px]" : "w-[150px]"
          } bg-white text-pink-700 border border-pink-300
    focus:outline-none focus-visible:outline-none
    focus:ring-0 focus-visible:ring-0
    ring-0
    focus:border-pink-500 focus-visible:border-pink-500
    data-[state=open]:ring-2 data-[state=open]:ring-pink-500
    shadow-none`}
        >
          <SelectValue placeholder={amount} />
        </SelectTrigger>

        <SelectContent className="bg-pink-50 text-pink-700 border border-pink-200">
          {Array.from({ length: cartItem ? amount + 10 : 10 }, (_, index) => {
            const selectValue = (index + 1).toString();
            return (
              <SelectItem
                key={selectValue}
                value={selectValue}
                className="hover:bg-pink-100 focus:bg-pink-700 text-pink-700"
              >
                {selectValue}
              </SelectItem>
            );
          })}
        </SelectContent>
      </Select>
    </>
  );
}

export default SelectProductAmount;
