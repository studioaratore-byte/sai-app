import React from "react";

/**
 * Border — TDS divider. Horizontal by default.
 * variant "line" (1px hairline) or "block" (thick grey separator between
 * sections). Supports left/right inset.
 */
function Border({ variant = "line", inset = 0, vertical = false, style }) {
  if (vertical) {
    return (
      <div
        style={{
          width: 1,
          alignSelf: "stretch",
          background: "var(--border-subtle)",
          ...style,
        }}
      />
    );
  }
  const isBlock = variant === "block";
  return (
    <div
      style={{
        height: isBlock ? 8 : 1,
        marginLeft: inset,
        marginRight: inset,
        background: isBlock ? "var(--surface-sunken)" : "var(--border-subtle)",
        borderTop: isBlock ? "1px solid var(--border-subtle)" : "none",
        borderBottom: isBlock ? "1px solid var(--border-subtle)" : "none",
        ...style,
      }}
    />
  );
}
