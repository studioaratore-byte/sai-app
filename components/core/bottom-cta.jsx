import React from "react";

/**
 * BottomCTA — fixed bottom action dock.
 * Pins one or two buttons to the screen bottom with a white→transparent
 * protection gradient above and safe-area padding below. TDS pattern for
 * the primary next/confirm action.
 */
function BottomCTA({ children, gradient = true, style }) {
  return (
    <div
      style={{
        position: "relative",
        flexShrink: 0,
        padding: `14px var(--screen-pad-x) calc(26px + env(safe-area-inset-bottom, 0px))`,
        background: gradient
          ? "linear-gradient(to top, var(--surface-card) 72%, rgba(255,255,255,0))"
          : "var(--surface-card)",
        display: "flex",
        gap: 8,
        zIndex: 20,
        ...style,
      }}
    >
      {children}
    </div>
  );
}
