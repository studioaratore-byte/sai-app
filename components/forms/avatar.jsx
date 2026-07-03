import React from "react";

/**
 * Avatar — participant marker. Since 사이 keeps identities anonymous,
 * the default is an initialed chip in a soft two-tone (pastel bg + clear hued fg);
 * set `anonymous` for a masked placeholder. `stack` tightens group margins.
 */
const AV_TONES = [
  { bg: "#E4EEFC", fg: "#3B6FC9" }, // blue
  { bg: "#DFF2F0", fg: "#1F7F78" }, // teal
  { bg: "#E3F3E4", fg: "#3F8548" }, // green
  { bg: "#FBEEDF", fg: "#A9702C" }, // apricot
  { bg: "#FBE9EC", fg: "#BA5468" }, // rose
  { bg: "#ECEAFA", fg: "#6B5FC0" }, // lavender
];

function Avatar({ name = "", size = 40, anonymous = false, index = 0, style }) {
  const initial = name ? name.trim().slice(0, 1) : "?";
  const tone = AV_TONES[index % AV_TONES.length];
  const bg = anonymous ? "var(--grey-200)" : tone.bg;
  const fg = anonymous ? "var(--grey-500)" : tone.fg;

  return (
    <span
      title={anonymous ? "익명" : name}
      style={{
        width: size, height: size, borderRadius: "50%",
        background: bg, color: fg,
        display: "inline-flex", alignItems: "center", justifyContent: "center",
        font: "var(--font-label)", fontSize: Math.round(size * 0.4), fontWeight: 600,
        border: "2px solid var(--surface-card)",
        boxSizing: "border-box", flexShrink: 0, userSelect: "none",
        ...style,
      }}
    >
      {anonymous ? (
        <svg width={size * 0.5} height={size * 0.5} viewBox="0 0 24 24" fill="none" aria-hidden>
          <circle cx="12" cy="8" r="4" fill="currentColor" opacity="0.85" />
          <path d="M4 20c0-4 3.6-6 8-6s8 2 8 6" fill="currentColor" opacity="0.85" />
        </svg>
      ) : initial}
    </span>
  );
}

/** AvatarStack — overlapping row of avatars with a +N overflow chip. */
function AvatarStack({ people = [], max = 4, size = 36, anonymous = false }) {
  const shown = people.slice(0, max);
  const extra = people.length - shown.length;
  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      {shown.map((p, i) => (
        <span key={i} style={{ marginLeft: i === 0 ? 0 : -10, zIndex: shown.length - i }}>
          <Avatar name={p} index={i} anonymous={anonymous} size={size} />
        </span>
      ))}
      {extra > 0 && (
        <span style={{
          marginLeft: -10, width: size, height: size, borderRadius: "50%",
          background: "var(--grey-100)", color: "var(--text-sub)",
          border: "2px solid var(--surface-card)", boxSizing: "border-box",
          display: "inline-flex", alignItems: "center", justifyContent: "center",
          font: "var(--font-caption-2)", fontSize: Math.round(size * 0.36),
        }}>+{extra}</span>
      )}
    </div>
  );
}
