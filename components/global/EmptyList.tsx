import { cn } from "@/lib/utils";

function EmptyList({
  heading = "No items found.",
  className,
}: {
  heading?: string;
  className?: string;
}) {
  return (
    <h2
      className={cn(
        "text-xl text-pink-700 bg-pink-100 py-3 px-6 rounded-md text-center shadow-sm",
        className
      )}
    >
      {heading}
    </h2>
  );
}

export default EmptyList;
