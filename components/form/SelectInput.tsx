// components/form/SelectInput.tsx
import React from "react";

interface SelectInputProps {
  name: string;
  label: string;
  options: string[];
  defaultValue?: string | string[];
  multiple?: boolean;
}

function SelectInput({
  name,
  label,
  options,
  defaultValue,
  multiple = false,
}: SelectInputProps) {
  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={name} className="font-medium text-sm text-pink-700">
        {label}
      </label>
      <select
        id={name}
        name={multiple ? `${name}[]` : name}
        defaultValue={defaultValue}
        multiple={multiple}
        className="border border-pink-300 bg-pink-50 text-pink-800 p-2 rounded-md focus:outline-pink-400"
        required={!multiple}
      >
        {!multiple && (
          <option value="" disabled>
            Select {label}
          </option>
        )}
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
    </div>
  );
}

export default SelectInput;
