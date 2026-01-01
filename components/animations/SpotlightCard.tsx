import React, { useRef, useState, forwardRef, useEffect } from "react";

type SpotlightCardProps = React.PropsWithChildren<{
  className?: string;
  spotlightColor?: `rgba(${number}, ${number}, ${number}, ${number})` | string;
}>;

const SpotlightCard = forwardRef<
  HTMLDivElement,
  SpotlightCardProps & React.ComponentProps<"div">
>(({ children, className = "", ...props }, forwardedRef) => {
  const divRef = useRef<HTMLDivElement>(null);
  const [opacity, setOpacity] = useState<number>(0);

  const {
    onMouseLeave: userOnMouseLeave,
    onFocus: userOnFocus,
    onBlur: userOnBlur,
    ...rest
  } = props as React.ComponentProps<"div">;

  // forward the internal ref to parent
  useEffect(() => {
    if (!forwardedRef) return;
    if (typeof forwardedRef === "function") {
      forwardedRef(divRef.current);
    } else {
      try {
        (
          forwardedRef as React.MutableRefObject<HTMLDivElement | null>
        ).current = divRef.current;
      } catch {
        // ignore
      }
    }
  }, [forwardedRef]);

  const handleFocus: React.FocusEventHandler<HTMLDivElement> = (e) => {
    setOpacity(0.6);
    if (typeof userOnFocus === "function")
      userOnFocus(e as React.FocusEvent<HTMLDivElement>);
  };

  const handleBlur: React.FocusEventHandler<HTMLDivElement> = (e) => {
    setOpacity(0);
    if (typeof userOnBlur === "function")
      userOnBlur(e as React.FocusEvent<HTMLDivElement>);
  };

  const handleMouseLeave: React.MouseEventHandler<HTMLDivElement> = (e) => {
    setOpacity(0);
    if (typeof userOnMouseLeave === "function")
      userOnMouseLeave(e as React.MouseEvent<HTMLDivElement>);
  };

  return (
    <div
      ref={divRef}
      {...rest}
      onFocus={handleFocus}
      onBlur={handleBlur}
      onMouseLeave={handleMouseLeave}
      className={`shadow-[0_7px_7px_rgba(0,0,0,0.6),inset_0_1px_0_rgba(255,255,255,0.25)] hover:shadow-[0_7px_7px_var(--color-info),inset_0_1px_0_rgba(255,255,255,0.25)] hover:-translate-y-2 backdrop-blur-[20px] backdrop-saturate-160 relative rounded-3xl border border-neutral-800 bg-neutral-900! overflow-hidden ${className}`}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 ease-in-out"
        style={{
          opacity,
        }}
      />
      {children}
    </div>
  );
});

SpotlightCard.displayName = "SpotlightCard";

export default SpotlightCard;
