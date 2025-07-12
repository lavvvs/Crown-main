"use client";

import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { useEffect } from "react";

const name = "price";

type FormInputNumberProps = {
  defaultValue?: number;
};

function PriceInput({ defaultValue }: FormInputNumberProps) {
  // Remove default spinner styling on mount (optional if global CSS handles it)
  useEffect(() => {
    const input = document.getElementById(name) as HTMLInputElement | null;
    if (input) {
      input.style.appearance = "textfield";
      input.style.border = "1px solid #f9a8d4"; // soft pink
    }
  }, []);

  return (
    <div className="mb-4">
      <Label htmlFor={name} className="capitalize text-pink-700">
        Price ($)
      </Label>
      <Input
        id={name}
        type="number"
        name={name}
        min={0}
        defaultValue={defaultValue || 100}
        required
        className="mt-2 w-full rounded-lg border border-pink-300 bg-pink-50 text-pink-800 placeholder-pink-400 focus:ring-2 focus:ring-pink-400 focus:outline-none p-3 leading-relaxed shadow-sm 
          [appearance:textfield] 
          [&::-webkit-outer-spin-button]:appearance-none 
          [&::-webkit-inner-spin-button]:appearance-none"
      />
    </div>
  );
}

export default PriceInput;
