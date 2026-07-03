import React from "react";

/**
 * VetoCell — a single time slot the user can tap to veto ("erase").
 * Neutral by default; tapping crosses it out in red (the core 사이 gesture).
 * In aggregate mode it shows how many people vetoed it via a red fill scale.
 * Pass `reasons` in aggregate mode for an expanded cell that breaks the
 * veto tally into per-reason chips ("외근 2", "점심 직후 1").
 */
function VetoCell({
  label,
  sublabel,
  vetoed = false,
  onToggle,
  vetoCount = 0,
  totalPeople = 0,
  reasons = [],
  mode = "input",
  disabled = false,
  style,
}) {
  const [pressed, setPressed] = React.useState(false);

  // ── Expanded aggregate cell: count line + reason chips ──
  if (mode === "aggregate" && reasons && reasons.length > 0) {
    return (
      <div
        style={{
          display: "flex", flexDirection: "column", gap: 10,
          padding: "14px 16px", borderRadius: "var(--radius-md)",
          background: "var(--veto-bg)", border: "1px solid transparent",
          textAlign: "left", ...style,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span aria-hidden style={{ fontSize: 16 }}>🙅</span>
          <span style={{ font: "var(--font-head)", color: "var(--text-strong)", letterSpacing: "var(--tracking-normal)" }}>
            {sublabel ? `${sublabel} ` : ""}{label}
          </span>
          <span style={{ marginLeft: "auto", font: "var(--font-body-2)", color: "var(--red-600)", letterSpacing: "var(--tracking-normal)" }}>
            {vetoCount}명이 부담스러워해요
          </span>
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
          {reasons.map((r) => (
            <span key={r.label} style={{
              display: "inline-flex", alignItems: "center", gap: 4,
              height: 28, padding: "0 11px", borderRadius: "var(--radius-full)",
              background: "var(--surface-card)", color: "var(--red-600)",
              font: "var(--font-caption-2)", letterSpacing: "var(--tracking-normal)",
            }}>
              {r.label}<b style={{ fontWeight: 700 }}>{r.count}</b>
            </span>
          ))}
        </div>
      </div>
    );
  }

  // ── Compact cell (input toggle, or aggregate intensity swatch) ──
  const share = totalPeople > 0 ? vetoCount / totalPeople : 0;
  const clear = mode === "aggregate" && vetoCount === 0;

  let bg = "var(--neutral-slot)";
  let fg = "var(--text-body)";
  let border = "1.5px solid transparent";

  if (mode === "input") {
    if (vetoed) { bg = "var(--veto-bg)"; fg = "var(--veto)"; border = "1.5px solid var(--veto)"; }
  } else {
    if (clear) { bg = "var(--available-bg)"; fg = "var(--available)"; border = "1.5px solid var(--available)"; }
    else {
      bg = `color-mix(in srgb, var(--veto) ${Math.round(share * 100)}%, var(--grey-50))`;
      fg = share > 0.5 ? "#fff" : "var(--red-600)";
    }
  }

  return (
    <button
      type="button"
      disabled={disabled}
      onClick={() => mode === "input" && onToggle?.(!vetoed)}
      onPointerDown={() => setPressed(true)}
      onPointerUp={() => setPressed(false)}
      onPointerLeave={() => setPressed(false)}
      style={{
        position: "relative",
        display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
        gap: 2, minHeight: 56, padding: "8px 10px", borderRadius: "var(--radius-md)",
        background: bg, color: fg, border,
        font: "var(--font-label)", letterSpacing: "var(--tracking-normal)",
        cursor: mode === "input" && !disabled ? "pointer" : "default",
        transform: pressed && mode === "input" ? "scale(var(--press-scale))" : "scale(1)",
        transition: "all var(--dur-fast) var(--ease-standard)",
        WebkitTapHighlightColor: "transparent",
        ...style,
      }}
    >
      <span style={{ textDecoration: mode === "input" && vetoed ? "line-through" : "none", opacity: mode === "input" && vetoed ? 0.85 : 1 }}>
        {label}
      </span>
      {sublabel && <span style={{ font: "var(--font-caption-2)", opacity: 0.8 }}>{sublabel}</span>}
      {mode === "aggregate" && vetoCount > 0 && (
        <span style={{
          position: "absolute", top: 6, right: 8,
          font: "var(--font-caption-2)", fontSize: 11, opacity: 0.9,
        }}>{vetoCount}</span>
      )}
      {mode === "aggregate" && clear && (
        <span style={{ position: "absolute", top: 5, right: 7, fontSize: 12 }}>✓</span>
      )}
    </button>
  );
}
