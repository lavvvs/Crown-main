"use client";

import { Checkbox } from "@/components/ui/checkbox";

type CheckboxInputProps = {
  name: string;
  label: string;
  defaultChecked?: boolean;
};

function CheckboxInput({
  name,
  label,
  defaultChecked = false,
}: CheckboxInputProps) {
  return (
    <div className="flex items-center space-x-3">
      <Checkbox
        id={name}
        name={name}
        defaultChecked={defaultChecked}
        className="data-[state=checked]:bg-pink-600 data-[state=checked]:border-pink-600 border-pink-300 focus-visible:ring-pink-500"
      />
      <label
        htmlFor={name}
        className="text-sm text-pink-800 font-medium capitalize cursor-pointer"
      >
        {label}
      </label>
    </div>
  );
}

export default CheckboxInput;
