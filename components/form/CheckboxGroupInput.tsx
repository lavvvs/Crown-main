"use client";

import { useId } from "react";
import { Checkbox } from "@/components/ui/checkbox";

type Props = {
  name: string;
  label: string;
  options: string[];
  defaultValues?: string[]; // ✅ to preselect previously saved values
};

export default function CheckboxGroupInput({
  name,
  label,
  options,
  defaultValues = [],
}: Props) {
  const id = useId();

  return (
    <div>
      <label className="block font-semibold mb-2 text-pink-700">{label}</label>
      <div className="grid grid-cols-2 gap-3">
        {options.map((option, index) => {
          const optionId = `${id}-${index}`;
          const isChecked = defaultValues.includes(option); // ✅ preselect logic
          return (
            <div key={optionId} className="flex items-center space-x-3">
              <Checkbox
                id={optionId}
                name={`${name}[]`}
                value={option}
                defaultChecked={isChecked}
                className="data-[state=checked]:bg-pink-600 data-[state=checked]:border-pink-600 border-pink-300 focus-visible:ring-pink-500"
              />
              <label
                htmlFor={optionId}
                className="text-sm text-pink-800 font-medium capitalize cursor-pointer"
              >
                {option}
              </label>
            </div>
          );
        })}
      </div>
    </div>
  );
}
