import React from "react";

/**
 * ListRow — the workhorse TDS row. Left slot (Asset/avatar/icon),
 * center (title + optional description), right slot (value / chevron /
 * control). Whole row is pressable when `onClick` is set.
 */
function ListRow({
  left,
  title,
  description,
  right,
  onClick,
  chevron = false,
  style,
}) {
  const [pressed, setPressed] = React.useState(false);
  const pressable = !!onClick;

  return (
    <div
      role={pressable ? "button" : undefined}
      onClick={onClick}
      onPointerDown={() => pressable && setPressed(true)}
      onPointerUp={() => setPressed(false)}
      onPointerLeave={() => setPressed(false)}
      style={{
        display: "flex",
        alignItems: "center",
        gap: 14,
        padding: "12px var(--screen-pad-x)",
        minHeight: 60,
        background: pressed ? "var(--fill-weak)" : "transparent",
        cursor: pressable ? "pointer" : "default",
        transition: "background var(--dur-fast) var(--ease-standard)",
        WebkitTapHighlightColor: "transparent",
        ...style,
      }}
    >
      {left && <div style={{ flexShrink: 0, display: "flex" }}>{left}</div>}

      <div style={{ flex: 1, minWidth: 0, display: "flex", flexDirection: "column", gap: 2 }}>
        <span style={{
          font: "var(--font-head)",
          color: "var(--text-strong)",
          letterSpacing: "var(--tracking-normal)",
          overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap",
        }}>{title}</span>
        {description && (
          <span style={{
            font: "var(--font-caption-1)",
            color: "var(--text-sub)",
            letterSpacing: "var(--tracking-normal)",
          }}>{description}</span>
        )}
      </div>

      {right && <div style={{ flexShrink: 0, display: "flex", alignItems: "center", gap: 6 }}>{right}</div>}
      {chevron && (
        <span aria-hidden style={{
          flexShrink: 0, color: "var(--grey-400)", fontSize: 20, lineHeight: 1,
          fontFamily: "var(--font-sans)",
        }}>›</span>
      )}
    </div>
  );
}
