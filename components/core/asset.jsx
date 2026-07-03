import React from "react";

/**
 * Asset — TDS graphic slot for a 3D icon / emoji illustration.
 * Toss leans on soft 3D emoji inside a tinted rounded container.
 * Pass an `emoji` (fastest), an image `src`, or arbitrary children.
 */
function Asset({
  emoji,
  src,
  alt = "",
  size = 48,
  tone = "neutral",
  shape = "circle",
  children,
  style,
}) {
  const tones = {
    neutral: "var(--grey-100)",
    primary: "var(--primary-weak-bg)",
    positive: "var(--positive-bg)",
    negative: "var(--negative-bg)",
    warning: "var(--warning-bg)",
    none: "transparent",
  };
  const radius = shape === "circle" ? "var(--radius-full)"
    : shape === "squircle" ? "var(--radius-lg)" : "0";

  return (
    <div
      style={{
        width: size,
        height: size,
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: radius,
        background: tones[tone] ?? tones.neutral,
        flexShrink: 0,
        overflow: "hidden",
        ...style,
      }}
    >
      {emoji ? (
        <span style={{ fontSize: Math.round(size * 0.56), lineHeight: 1 }}>{emoji}</span>
      ) : src ? (
        <img src={src} alt={alt} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
      ) : (
        children
      )}
    </div>
  );
}
