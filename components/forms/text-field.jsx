import React from "react";

/**
 * TextField — TDS underline text input. Label floats to a small caption
 * once filled/focused. Blue underline on focus, red + helper on error.
 */
function TextField({
  label,
  value = "",
  onChange,
  placeholder,
  helper,
  error = false,
  type = "text",
  maxLength,
  suffix,
  style,
  ...rest
}) {
  const [focused, setFocused] = React.useState(false);
  const floated = focused || (value && String(value).length > 0);
  const line = error ? "var(--negative)" : focused ? "var(--primary)" : "var(--border-default)";

  return (
    <div style={{ display: "flex", flexDirection: "column", ...style }}>
      {label && (
        <span style={{
          font: "var(--font-caption-2)",
          color: error ? "var(--negative)" : focused ? "var(--primary)" : "var(--text-weak)",
          letterSpacing: "var(--tracking-normal)",
          height: floated ? 16 : 0,
          opacity: floated ? 1 : 0,
          transition: "all var(--dur-base) var(--ease-standard)",
          marginBottom: floated ? 4 : 0,
        }}>{label}</span>
      )}
      <div style={{ display: "flex", alignItems: "center", gap: 8, borderBottom: `2px solid ${line}`, paddingBottom: 8, transition: "border-color var(--dur-base) var(--ease-standard)" }}>
        <input
          type={type}
          value={value}
          maxLength={maxLength}
          placeholder={label && !floated ? label : placeholder}
          onChange={(e) => onChange?.(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          style={{
            flex: 1, minWidth: 0, border: "none", outline: "none", background: "transparent",
            font: "var(--font-title-3)", color: "var(--text-strong)",
            letterSpacing: "var(--tracking-normal)", padding: 0,
          }}
          {...rest}
        />
        {suffix && <span style={{ font: "var(--font-body-2)", color: "var(--text-sub)" }}>{suffix}</span>}
      </div>
      {helper && (
        <span style={{
          marginTop: 6,
          font: "var(--font-caption-1)",
          color: error ? "var(--negative)" : "var(--text-weak)",
          letterSpacing: "var(--tracking-normal)",
        }}>{helper}</span>
      )}
    </div>
  );
}
