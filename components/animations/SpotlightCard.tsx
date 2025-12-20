import React, { useRef, useState, forwardRef, useEffect } from "react";

interface Position {
  x: number;
  y: number;
}

type SpotlightCardProps = React.PropsWithChildren<{
  className?: string;
  spotlightColor?: `rgba(${number}, ${number}, ${number}, ${number})` | string;
}>;

const SpotlightCard = forwardRef<
  HTMLDivElement,
  SpotlightCardProps & React.ComponentProps<"div">
>(
  (
    {
      children,
      className = "",
      spotlightColor = "var(--color-primary)",
      ...props
    },
    forwardedRef
  ) => {
    const divRef = useRef<HTMLDivElement>(null);
    const [isFocused, setIsFocused] = useState<boolean>(false);
    const [position, setPosition] = useState<Position>({ x: 0, y: 0 });
    const [opacity, setOpacity] = useState<number>(0);

    const {
      onMouseMove: userOnMouseMove,
      onMouseEnter: userOnMouseEnter,
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

    const handleMouseMove: React.MouseEventHandler<HTMLDivElement> = (e) => {
      if (!divRef.current || isFocused) return;

      const rect = divRef.current.getBoundingClientRect();
      setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });

      if (typeof userOnMouseMove === "function")
        userOnMouseMove(e as React.MouseEvent<HTMLDivElement>);
    };

    const handleFocus: React.FocusEventHandler<HTMLDivElement> = (e) => {
      setIsFocused(true);
      setOpacity(0.6);
      if (typeof userOnFocus === "function")
        userOnFocus(e as React.FocusEvent<HTMLDivElement>);
    };

    const handleBlur: React.FocusEventHandler<HTMLDivElement> = (e) => {
      setIsFocused(false);
      setOpacity(0);
      if (typeof userOnBlur === "function")
        userOnBlur(e as React.FocusEvent<HTMLDivElement>);
    };

    const handleMouseEnter: React.MouseEventHandler<HTMLDivElement> = (e) => {
      setOpacity(0.6);
      if (typeof userOnMouseEnter === "function")
        userOnMouseEnter(e as React.MouseEvent<HTMLDivElement>);
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
        onMouseMove={handleMouseMove}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className={`relative rounded-3xl border border-neutral-800 bg-neutral-900! overflow-hidden p-8 ${className}`}
      >
        <div
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 ease-in-out"
          style={{
            opacity,
            background: `radial-gradient(circle at ${position.x}px ${position.y}px, ${spotlightColor}, transparent 80%)`,
          }}
        />
        {children}
      </div>
    );
  }
);

SpotlightCard.displayName = "SpotlightCard";

export default SpotlightCard;
