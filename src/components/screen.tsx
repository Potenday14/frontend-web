import { AppScreen, AppScreenProps } from "@stackflow/plugin-basic-ui";
import React, { useRef } from "react";
import { cn } from "./utils";

type ScreenProps = AppScreenProps & {
  className?: string;
  bottom?: React.ReactNode;
  bottomClassName?: string;
  onScroll?: (e: React.UIEvent<HTMLDivElement>) => void;
};

export default function Screen({
  bottom,
  bottomClassName,
  onScroll,
  children,
  className,
  ...props
}: ScreenProps) {
  const realRef = useRef<HTMLDivElement>(null);
  const dummyRef = useRef<HTMLDivElement>(null);
  const viewRef = useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const real = realRef.current;
    const dummy = dummyRef.current;
    if (real && dummy) {
      dummy.style.height = `${real.clientHeight}px`;
    }
  }, []);

  return (
    <AppScreen {...props}>
      <div className="h-full flex flex-col">
        <div
          ref={viewRef}
          onScroll={onScroll}
          className={cn("flex-1 overflow-y-auto", className)}
        >
          {children}
        </div>
        <div ref={dummyRef} />
        {bottom && (
          <div
            ref={realRef}
            className={cn(
              "fixed bottom-0 pt-2 pb-[29px] px-4 w-full flex flex-col",
              bottomClassName
            )}
          >
            {bottom}
          </div>
        )}
      </div>
    </AppScreen>
  );
}
