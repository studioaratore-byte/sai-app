import React from "react";

/**
 * Switch — TDS toggle. Blue when on. Used for required/optional flags,
 * settings, and inline row toggles.
 */
function Switch({ checked = false, onChange, disabled = false, style }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      disabled={disabled}
      onClick={() => !disabled && onChange?.(!checked)}
      style={{
        width: 52, height: 32, borderRadius: "var(--radius-full)", border: "none",
        padding: 3, cursor: disabled ? "not-allowed" : "pointer",
        background: checked ? "var(--primary)" : "var(--grey-300)",
        opacity: disabled ? 0.5 : 1,
        transition: "background var(--dur-base) var(--ease-standard)",
        display: "flex", alignItems: "center",
        WebkitTapHighlightColor: "transparent",
      }}
    >
      <span style={{
        width: 26, height: 26, borderRadius: "50%", background: "var(--grey-0)",
        boxShadow: "var(--shadow-sm)",
        transform: checked ? "translateX(20px)" : "translateX(0)",
        transition: "transform var(--dur-base) var(--ease-out)",
      }} />
    </button>
  );
}
