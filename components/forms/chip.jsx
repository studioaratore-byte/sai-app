import React from "react";

/**
 * Chip — selectable pill. Used for reason tags (외근 / 점심 직후 / 개인 일정)
 * and quick filters. Toggles between neutral and selected (tone-colored).
 */
function Chip({
  children,
  selected = false,
  onClick,
  tone = "primary",
  leftIcon,
  removable = false,
  onRemove,
  style,
}) {
  const tones = {
    primary:  { bg: "var(--primary-weak-bg)", fg: "var(--primary-weak-fg)", border: "var(--primary)" },
    negative: { bg: "var(--negative-bg)", fg: "var(--red-600)", border: "var(--negative)" },
    neutral:  { bg: "var(--grey-100)", fg: "var(--text-body)", border: "var(--grey-400)" },
  };
  const t = tones[tone] || tones.primary;

  return (
    <button
      type="button"
      onClick={onClick}
      style={{
        display: "inline-flex", alignItems: "center", gap: 6,
        height: 38, padding: "0 14px", borderRadius: "var(--radius-full)",
        border: selected ? `1.5px solid ${t.border}` : "1.5px solid transparent",
        background: selected ? t.bg : "var(--fill-weak)",
        color: selected ? t.fg : "var(--text-sub)",
        font: "var(--font-label)", fontSize: 14, letterSpacing: "var(--tracking-normal)",
        cursor: "pointer", transition: "all var(--dur-fast) var(--ease-standard)",
        WebkitTapHighlightColor: "transparent", whiteSpace: "nowrap",
        ...style,
      }}
    >
      {leftIcon}
      {children}
      {removable && (
        <span onClick={(e) => { e.stopPropagation(); onRemove?.(); }}
          aria-label="삭제"
          style={{ marginLeft: 2, fontSize: 16, lineHeight: 1, opacity: 0.6 }}>✕</span>
      )}
    </button>
  );
}
