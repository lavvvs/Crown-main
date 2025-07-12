import { Label } from "../ui/label";
import { Input } from "../ui/input";

function ImageInput() {
  const name = "image";

  return (
    <div className="mb-4">
      <Label
        htmlFor={name}
        className="capitalize text-pink-700 font-medium mb-2 block"
      >
        Image
      </Label>
      <Input
        id={name}
        name={name}
        type="file"
        required
        accept="image/*"
        className="bg-pink-50 text-pink-800 border border-pink-300 file:text-pink-700 file:bg-pink-100 file:border-pink-400 hover:border-pink-500 transition-all"
      />
    </div>
  );
}

export default ImageInput;
