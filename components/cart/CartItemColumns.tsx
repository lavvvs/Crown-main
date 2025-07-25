import { formatCurrency } from "@/utils/format";
import Image from "next/image";
import Link from "next/link";

// First Column (Product Image)
export const FirstColumn = ({
  name,
  image,
}: {
  image: string;
  name: string;
}) => {
  return (
    <div className="relative h-24 w-24 sm:h-32 sm:w-32 border-2 border-pink-300 rounded-md shadow-sm">
      <Image
        src={image}
        alt={name}
        fill
        sizes="(max-width:768px) 100vw, (max-width:1200px) 50vw, 33vw"
        priority
        className="w-full rounded-md object-cover"
      />
    </div>
  );
};

// Second Column (Product Name)
export const SecondColumn = ({
  name,
  productId,
}: {
  name: string;
  productId: string;
}) => {
  return (
    <div className="sm:w-48">
      <Link href={`/products/${productId}`}>
        <h3 className="capitalize font-semibold text-pink-700 hover:underline">
          {name}
        </h3>
      </Link>
    </div>
  );
};

// Fourth Column (Product Price)
export const FourthColumn = ({ price }: { price: number }) => {
  return (
    <p className="font-semibold text-pink-600 md:ml-auto">
      {formatCurrency(price)}
    </p>
  );
};
