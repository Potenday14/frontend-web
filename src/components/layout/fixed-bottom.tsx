import React, { useRef } from "react";
import { cn } from "../utils";

export interface FixedBottomProps extends React.ComponentProps<"div"> {
  bottom?: React.ReactNode;
}

export default function FixedBottom({
  className,
  children,
  bottom,
  ...props
}: FixedBottomProps) {
  const realRef = useRef<HTMLDivElement>(null);
  const dummyRef = useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const real = realRef.current;
    const dummy = dummyRef.current;
    if (real && dummy) {
      dummy.style.height = `${real.clientHeight}px`;
    }
  }, []);

  return (
    <div className="h-full flex flex-col" {...props}>
      <div className={cn("flex-1 overflow-y-auto", className)} {...props}>
        {children}
      </div>
      <div ref={dummyRef} />
      <div
        ref={realRef}
        className={cn(
          "fixed bottom-0 py-2 px-4 w-full flex flex-col",
          className
        )}
      >
        {bottom}
      </div>
    </div>
  );
}
