import { Label } from "../ui/label";
import { Input } from "../ui/input";

type FormInputProps = {
  name: string;
  type: string;
  label?: string;
  defaultValue?: string;
  placeholder?: string;
};

function FormInput({
  name,
  type,
  label,
  defaultValue,
  placeholder,
}: FormInputProps) {
  return (
    <div className="mb-4">
      <Label
        htmlFor={name}
        className="capitalize text-pink-700 font-medium mb-2 block"
      >
        {label || name}
      </Label>
      <Input
        id={name}
        name={name}
        type={type}
        defaultValue={defaultValue}
        placeholder={placeholder}
        required
        className="bg-pink-50 text-pink-800 border border-pink-300 placeholder-pink-400 focus:ring-pink-500 focus:border-pink-500"
      />
    </div>
  );
}

export default FormInput;
