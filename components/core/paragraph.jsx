import React from "react";

/**
 * Paragraph — typographic text block wired to the TDS type ramp.
 * Pick a `typography` token and optional `color` alias; renders the
 * right element for headings vs body.
 */
function Paragraph({
  children,
  typography = "body-1",
  color = "body",
  align = "left",
  as,
  style,
  ...rest
}) {
  const fontVar = {
    "display-1": "var(--font-display-1)",
    "display-2": "var(--font-display-2)",
    "title-1": "var(--font-title-1)",
    "title-2": "var(--font-title-2)",
    "title-3": "var(--font-title-3)",
    "head": "var(--font-head)",
    "body-1": "var(--font-body-1)",
    "body-2": "var(--font-body-2)",
    "label": "var(--font-label)",
    "caption-1": "var(--font-caption-1)",
    "caption-2": "var(--font-caption-2)",
  }[typography] || "var(--font-body-1)";

  const colorVar = {
    strong: "var(--text-strong)",
    body: "var(--text-body)",
    sub: "var(--text-sub)",
    weak: "var(--text-weak)",
    accent: "var(--text-accent)",
    negative: "var(--negative)",
    positive: "var(--positive)",
  }[color] || "var(--text-body)";

  const Tag = as || (typography.startsWith("display") || typography.startsWith("title") ? "h2" : "p");
  const tight = typography.startsWith("display") || typography === "title-1";

  return (
    <Tag
      style={{
        margin: 0,
        font: fontVar,
        color: colorVar,
        textAlign: align,
        letterSpacing: tight ? "var(--tracking-tight)" : "var(--tracking-normal)",
        textWrap: "pretty",
        ...style,
      }}
      {...rest}
    >
      {children}
    </Tag>
  );
}
