import React from "react";

/**
 * TopBar — the large bold screen title block (TDS "Top").
 * Sits just under the NavigationBar; big title + optional description.
 * This is the first thing the user reads on a screen.
 */
function TopBar({ title, description, align = "left", style }) {
  return (
    <header style={{ padding: "8px var(--screen-pad-x) 16px", textAlign: align, ...style }}>
      <h1 style={{
        margin: 0,
        font: "var(--font-title-1)",
        color: "var(--text-strong)",
        letterSpacing: "var(--tracking-tight)",
        textWrap: "balance",
      }}>{title}</h1>
      {description && (
        <p style={{
          margin: "8px 0 0",
          font: "var(--font-body-2)",
          color: "var(--text-sub)",
          letterSpacing: "var(--tracking-normal)",
          textWrap: "pretty",
        }}>{description}</p>
      )}
    </header>
  );
}
