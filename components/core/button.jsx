import React from "react";

/**
 * Button — TDS primary action control.
 * Variants: primary (Toss Blue), weak (tinted), dark (near-black), ghost.
 * Sizes: lg / md / sm. Presses shrink slightly (TDS motion).
 */
function Button({
  children,
  variant = "primary",
  size = "md",
  fullWidth = false,
  disabled = false,
  loading = false,
  leftIcon = null,
  rightIcon = null,
  onClick,
  style,
  ...rest
}) {
  const [pressed, setPressed] = React.useState(false);

  const sizes = {
    lg: { height: "var(--button-h-lg)", font: "var(--font-label)", fs: 17, px: 20, radius: "var(--radius-lg)" },
    md: { height: "var(--button-h-md)", font: "var(--font-label)", fs: 15, px: 18, radius: "var(--radius-md)" },
    sm: { height: "var(--button-h-sm)", font: "var(--font-caption-2)", fs: 14, px: 14, radius: "var(--radius-sm)" },
  };
  const s = sizes[size] || sizes.md;

  const palettes = {
    primary: { bg: "var(--primary)", fg: "var(--text-on-primary)", press: "var(--primary-pressed)" },
    weak:    { bg: "var(--primary-weak-bg)", fg: "var(--primary-weak-fg)", press: "var(--blue-100)" },
    dark:    { bg: "var(--fill-dark)", fg: "var(--grey-0)", press: "var(--grey-900)" },
    ghost:   { bg: "transparent", fg: "var(--text-body)", press: "var(--fill-weak)" },
  };
  const p = palettes[variant] || palettes.primary;

  const base = {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    height: s.height,
    padding: `0 ${s.px}px`,
    width: fullWidth ? "100%" : "auto",
    border: "none",
    borderRadius: s.radius,
    background: disabled ? "var(--fill-medium)" : (pressed ? p.press : p.bg),
    color: disabled ? "var(--text-disabled)" : p.fg,
    font: s.font,
    fontSize: s.fs,
    letterSpacing: "var(--tracking-normal)",
    cursor: disabled ? "not-allowed" : "pointer",
    transform: pressed && !disabled ? "scale(var(--press-scale))" : "scale(1)",
    transition: "transform var(--dur-fast) var(--ease-standard), background var(--dur-fast) var(--ease-standard)",
    WebkitTapHighlightColor: "transparent",
    userSelect: "none",
    ...style,
  };

  return (
    <button
      type="button"
      disabled={disabled || loading}
      onClick={onClick}
      onPointerDown={() => setPressed(true)}
      onPointerUp={() => setPressed(false)}
      onPointerLeave={() => setPressed(false)}
      style={base}
      {...rest}
    >
      {loading ? <Spinner color={p.fg} /> : (
        <>
          {leftIcon}
          {children}
          {rightIcon}
        </>
      )}
    </button>
  );
}

function Spinner({ color }) {
  return (
    <span
      aria-label="로딩 중"
      style={{
        width: 18,
        height: 18,
        border: `2.5px solid ${color}`,
        borderTopColor: "transparent",
        borderRadius: "50%",
        display: "inline-block",
        animation: "sai-spin 0.7s linear infinite",
      }}
    />
  );
}
