import React from "react";

/**
 * Tab — segmented top tabs. TDS "underline" style (label + moving indicator)
 * or "capsule" (pill segmented control). Controlled via `value`/`onChange`.
 */
function Tab({ items = [], value, onChange, variant = "underline", style }) {
  const activeIndex = Math.max(0, items.findIndex((it) => (it.value ?? it) === value));

  if (variant === "capsule") {
    return (
      <div style={{
        display: "flex", gap: 4, padding: 4,
        background: "var(--fill-weak)", borderRadius: "var(--radius-full)",
        ...style,
      }}>
        {items.map((it, i) => {
          const v = it.value ?? it;
          const label = it.label ?? it;
          const active = i === activeIndex;
          return (
            <button key={v} type="button" onClick={() => onChange?.(v)}
              style={{
                flex: 1, height: 40, border: "none", borderRadius: "var(--radius-full)",
                background: active ? "var(--surface-card)" : "transparent",
                color: active ? "var(--text-strong)" : "var(--text-weak)",
                font: "var(--font-label)", letterSpacing: "var(--tracking-normal)",
                boxShadow: active ? "var(--shadow-xs)" : "none",
                cursor: "pointer", transition: "all var(--dur-base) var(--ease-standard)",
                WebkitTapHighlightColor: "transparent",
              }}>
              {label}
            </button>
          );
        })}
      </div>
    );
  }

  return (
    <div style={{ position: "relative", display: "flex", borderBottom: "1px solid var(--border-subtle)", ...style }}>
      {items.map((it, i) => {
        const v = it.value ?? it;
        const label = it.label ?? it;
        const active = i === activeIndex;
        return (
          <button key={v} type="button" onClick={() => onChange?.(v)}
            style={{
              flex: 1, height: 48, border: "none", background: "transparent",
              color: active ? "var(--text-strong)" : "var(--text-weak)",
              font: active ? "var(--font-label)" : "var(--font-body-2)",
              letterSpacing: "var(--tracking-normal)", cursor: "pointer",
              transition: "color var(--dur-base) var(--ease-standard)",
              WebkitTapHighlightColor: "transparent",
            }}>
            {label}
          </button>
        );
      })}
      <span aria-hidden style={{
        position: "absolute", bottom: -1, height: 2,
        width: `${100 / Math.max(1, items.length)}%`,
        left: `${(100 / Math.max(1, items.length)) * activeIndex}%`,
        background: "var(--text-strong)",
        transition: "left var(--dur-base) var(--ease-out)",
        borderRadius: 2,
      }} />
    </div>
  );
}
