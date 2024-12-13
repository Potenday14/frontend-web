import { cn } from "../utils";

export default function Button({
  className,
  ...props
}: React.ComponentPropsWithRef<"button">) {
  return (
    <button
      className={cn(
        "px-5 py-3 rounded-[10px] bg-gray-950 text-white text-lg font-semibold flex items-center justify-center disabled:bg-gray-100",
        className
      )}
      {...props}
    />
  );
}
