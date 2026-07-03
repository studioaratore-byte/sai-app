import React from "react";

/**
 * NavigationBar — the 56px top app bar. Back (or close) affordance on the
 * left, optional centered title, optional right action. Title can fade in
 * on scroll (pass `titleVisible`).
 */
function NavigationBar({
  onBack,
  backIcon = "‹",
  title,
  titleVisible = true,
  right,
  transparent = false,
  style,
}) {
  return (
    <div
      style={{
        position: "sticky",
        top: 0,
        height: "var(--navbar-h)",
        display: "grid",
        gridTemplateColumns: "44px 1fr 44px",
        alignItems: "center",
        background: transparent ? "transparent" : "var(--surface-card)",
        zIndex: 30,
        ...style,
      }}
    >
      <button
        type="button"
        onClick={onBack}
        aria-label="뒤로"
        style={{
          height: 44, width: 44, border: "none", background: "transparent",
          color: "var(--text-strong)", fontSize: 28, lineHeight: 1, cursor: "pointer",
          display: "flex", alignItems: "center", justifyContent: "center",
          WebkitTapHighlightColor: "transparent",
        }}
      >
        {backIcon}
      </button>

      <span style={{
        textAlign: "center",
        font: "var(--font-title-3)",
        color: "var(--text-strong)",
        letterSpacing: "var(--tracking-normal)",
        opacity: titleVisible ? 1 : 0,
        transition: "opacity var(--dur-base) var(--ease-standard)",
        overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap",
      }}>{title}</span>

      <div style={{ display: "flex", alignItems: "center", justifyContent: "flex-end", paddingRight: 8 }}>
        {right}
      </div>
    </div>
  );
}
