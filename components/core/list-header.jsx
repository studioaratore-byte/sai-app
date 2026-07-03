import React from "react";

/**
 * ListHeader — section header above a group of ListRows.
 * Bold title, optional description line, optional right-aligned action.
 */
function ListHeader({ title, description, action, style }) {
  return (
    <div style={{ padding: "20px var(--screen-pad-x) 8px", ...style }}>
      <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: 12 }}>
        <span style={{
          font: "var(--font-title-3)",
          color: "var(--text-strong)",
          letterSpacing: "var(--tracking-normal)",
        }}>{title}</span>
        {action && <div style={{ flexShrink: 0 }}>{action}</div>}
      </div>
      {description && (
        <p style={{
          margin: "4px 0 0",
          font: "var(--font-caption-1)",
          color: "var(--text-sub)",
          letterSpacing: "var(--tracking-normal)",
        }}>{description}</p>
      )}
    </div>
  );
}
