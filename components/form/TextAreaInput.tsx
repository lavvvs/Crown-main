import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

type TextAreaInputProps = {
  name: string;
  labelText?: string;
  defaultValue?: string;
};

function TextAreaInput({ name, labelText, defaultValue }: TextAreaInputProps) {
  return (
    <div className="mb-4">
      <Label
        htmlFor={name}
        className="capitalize text-sm font-medium text-pink-700"
      >
        {labelText || name}
      </Label>
      <Textarea
        id={name}
        name={name}
        defaultValue={defaultValue}
        rows={5}
        required
        className="mt-2 w-full rounded-lg border border-pink-300 bg-pink-50 text-pink-800 placeholder-pink-400 focus:ring-2 focus:ring-pink-400 focus:outline-none p-3 leading-relaxed shadow-sm scrollbar-hide overflow-y-scroll"
      />
    </div>
  );
}

export default TextAreaInput;
