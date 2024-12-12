import { cn } from "../utils";

export default function Button({
  className,
  ...props
}: React.ComponentPropsWithRef<"button">) {
  return (
    <button
      className={cn(
        "px-5 py-3 rounded-[10px] bg-[#0e0e0e] text-white text-lg font-semibold flex items-center justify-center",
        className
      )}
      {...props}
    />
  );
}
