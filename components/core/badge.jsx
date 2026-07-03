import React from "react";

/**
 * Badge — compact status/count label.
 * Tones map to semantic colors. Two shapes: pill (default) and dot.
 */
function Badge({ children, tone = "neutral", weak = true, style }) {
  const tones = {
    neutral: { strong: "var(--grey-600)", weakBg: "var(--grey-100)", weakFg: "var(--grey-700)" },
    primary: { strong: "var(--primary)", weakBg: "var(--primary-weak-bg)", weakFg: "var(--primary-weak-fg)" },
    positive:{ strong: "var(--positive)", weakBg: "var(--positive-bg)", weakFg: "var(--green-600)" },
    negative:{ strong: "var(--negative)", weakBg: "var(--negative-bg)", weakFg: "var(--red-600)" },
    warning: { strong: "var(--warning)", weakBg: "var(--warning-bg)", weakFg: "#B77900" },
  };
  const t = tones[tone] || tones.neutral;
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        height: 22,
        padding: "0 8px",
        borderRadius: "var(--radius-full)",
        background: weak ? t.weakBg : t.strong,
        color: weak ? t.weakFg : "var(--grey-0)",
        font: "var(--font-caption-2)",
        letterSpacing: "var(--tracking-normal)",
        whiteSpace: "nowrap",
        ...style,
      }}
    >
      {children}
    </span>
  );
}
