import * as React from "react";
import { cn } from "@/lib/utils";

interface SliderProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange"> {
  onChange?: (value: number) => void;
}

export const Slider = React.forwardRef<HTMLInputElement, SliderProps>(
  ({ className, onChange, ...props }, ref) => (
    <input
      ref={ref}
      type="range"
      onChange={(e) => onChange?.(Number(e.target.value))}
      className={cn(
        "h-2 w-full cursor-pointer appearance-none rounded-full bg-muted accent-[var(--primary)]",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
        className
      )}
      {...props}
    />
  )
);
Slider.displayName = "Slider";
