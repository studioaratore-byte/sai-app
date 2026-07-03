import React from "react";

/**
 * Checkbox — TDS check. Circle (default, for list selection) or square
 * (for terms/agreements). Blue filled when checked.
 */
function Checkbox({ checked = false, onChange, shape = "circle", disabled = false, label, style }) {
  const box = (
    <span style={{
      width: 24, height: 24, flexShrink: 0,
      borderRadius: shape === "circle" ? "50%" : "var(--radius-xs)",
      background: checked ? "var(--primary)" : "var(--grey-200)",
      display: "flex", alignItems: "center", justifyContent: "center",
      transition: "background var(--dur-fast) var(--ease-standard)",
    }}>
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
        <path d="M2.5 7.5L5.5 10.5L11.5 4" stroke={checked ? "#fff" : "var(--grey-400)"}
          strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </span>
  );

  return (
    <button
      type="button"
      role="checkbox"
      aria-checked={checked}
      disabled={disabled}
      onClick={() => !disabled && onChange?.(!checked)}
      style={{
        display: "inline-flex", alignItems: "center", gap: 10, border: "none",
        background: "transparent", padding: 0, cursor: disabled ? "not-allowed" : "pointer",
        opacity: disabled ? 0.5 : 1, WebkitTapHighlightColor: "transparent",
        ...style,
      }}
    >
      {box}
      {label && <span style={{ font: "var(--font-body-1)", color: "var(--text-body)", letterSpacing: "var(--tracking-normal)" }}>{label}</span>}
    </button>
  );
}
