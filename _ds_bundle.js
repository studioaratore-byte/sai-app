/* @ds-bundle: {"format":4,"namespace":"TDSDesignSystem_58842e","components":[{"name":"ProposalCard","sourcePath":"components/app/ProposalCard.jsx"},{"name":"VetoCell","sourcePath":"components/app/VetoCell.jsx"},{"name":"Asset","sourcePath":"components/core/Asset.jsx"},{"name":"Badge","sourcePath":"components/core/Badge.jsx"},{"name":"Border","sourcePath":"components/core/Border.jsx"},{"name":"BottomCTA","sourcePath":"components/core/BottomCTA.jsx"},{"name":"Button","sourcePath":"components/core/Button.jsx"},{"name":"ListHeader","sourcePath":"components/core/ListHeader.jsx"},{"name":"ListRow","sourcePath":"components/core/ListRow.jsx"},{"name":"Paragraph","sourcePath":"components/core/Paragraph.jsx"},{"name":"Avatar","sourcePath":"components/forms/Avatar.jsx"},{"name":"AvatarStack","sourcePath":"components/forms/Avatar.jsx"},{"name":"Checkbox","sourcePath":"components/forms/Checkbox.jsx"},{"name":"Chip","sourcePath":"components/forms/Chip.jsx"},{"name":"Switch","sourcePath":"components/forms/Switch.jsx"},{"name":"TextField","sourcePath":"components/forms/TextField.jsx"},{"name":"ICON_NAMES","sourcePath":"components/icons/Icon.jsx"},{"name":"Icon","sourcePath":"components/icons/Icon.jsx"},{"name":"NavigationBar","sourcePath":"components/navigation/NavigationBar.jsx"},{"name":"Tab","sourcePath":"components/navigation/Tab.jsx"},{"name":"TopBar","sourcePath":"components/navigation/TopBar.jsx"}],"sourceHashes":{"components/app/ProposalCard.jsx":"cc998cab1e6e","components/app/VetoCell.jsx":"a86f0803cbe2","components/core/Asset.jsx":"bfef94b3bf70","components/core/Badge.jsx":"6689724c70d2","components/core/Border.jsx":"ee6384161986","components/core/BottomCTA.jsx":"3fa58163da78","components/core/Button.jsx":"008902ff7234","components/core/ListHeader.jsx":"b0348d82f556","components/core/ListRow.jsx":"88335baf8ac3","components/core/Paragraph.jsx":"b3b346a0d146","components/forms/Avatar.jsx":"14bee99153a0","components/forms/Checkbox.jsx":"1aad0d352e0d","components/forms/Chip.jsx":"670dd3abced0","components/forms/Switch.jsx":"77b558c4e2f9","components/forms/TextField.jsx":"47e1e3e0ac8c","components/icons/Icon.jsx":"e224e4f4d1ef","components/navigation/NavigationBar.jsx":"99380b8ebcd4","components/navigation/Tab.jsx":"538b1890abfa","components/navigation/TopBar.jsx":"77e3e9c14c25","ui_kits/sai/frame.jsx":"4ad0a3095a59","ui_kits/sai/screens-a.jsx":"4a570dac21fd","ui_kits/sai/screens-b.jsx":"e7c53108cb4e","ui_kits/sai/screens-c.jsx":"88d83a361168"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.TDSDesignSystem_58842e = window.TDSDesignSystem_58842e || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// components/app/VetoCell.jsx
try { (() => {
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
  style
}) {
  const [pressed, setPressed] = React.useState(false);

  // ── Expanded aggregate cell: count line + reason chips ──
  if (mode === "aggregate" && reasons && reasons.length > 0) {
    return /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        flexDirection: "column",
        gap: 10,
        padding: "14px 16px",
        borderRadius: "var(--radius-md)",
        background: "var(--veto-bg)",
        border: "1px solid transparent",
        textAlign: "left",
        ...style
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        alignItems: "center",
        gap: 8
      }
    }, /*#__PURE__*/React.createElement("span", {
      "aria-hidden": true,
      style: {
        fontSize: 16
      }
    }, "\uD83D\uDE45"), /*#__PURE__*/React.createElement("span", {
      style: {
        font: "var(--font-head)",
        color: "var(--text-strong)",
        letterSpacing: "var(--tracking-normal)"
      }
    }, sublabel ? `${sublabel} ` : "", label), /*#__PURE__*/React.createElement("span", {
      style: {
        marginLeft: "auto",
        font: "var(--font-body-2)",
        color: "var(--red-600)",
        letterSpacing: "var(--tracking-normal)"
      }
    }, vetoCount, "\uBA85\uC774 \uBD80\uB2F4\uC2A4\uB7EC\uC6CC\uD574\uC694")), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        flexWrap: "wrap",
        gap: 6
      }
    }, reasons.map(r => /*#__PURE__*/React.createElement("span", {
      key: r.label,
      style: {
        display: "inline-flex",
        alignItems: "center",
        gap: 4,
        height: 28,
        padding: "0 11px",
        borderRadius: "var(--radius-full)",
        background: "var(--surface-card)",
        color: "var(--red-600)",
        font: "var(--font-caption-2)",
        letterSpacing: "var(--tracking-normal)"
      }
    }, r.label, /*#__PURE__*/React.createElement("b", {
      style: {
        fontWeight: 700
      }
    }, r.count)))));
  }

  // ── Compact cell (input toggle, or aggregate intensity swatch) ──
  const share = totalPeople > 0 ? vetoCount / totalPeople : 0;
  const clear = mode === "aggregate" && vetoCount === 0;
  let bg = "var(--neutral-slot)";
  let fg = "var(--text-body)";
  let border = "1.5px solid transparent";
  if (mode === "input") {
    if (vetoed) {
      bg = "var(--veto-bg)";
      fg = "var(--veto)";
      border = "1.5px solid var(--veto)";
    }
  } else {
    if (clear) {
      bg = "var(--available-bg)";
      fg = "var(--available)";
      border = "1.5px solid var(--available)";
    } else {
      bg = `color-mix(in srgb, var(--veto) ${Math.round(share * 100)}%, var(--grey-50))`;
      fg = share > 0.5 ? "#fff" : "var(--red-600)";
    }
  }
  return /*#__PURE__*/React.createElement("button", {
    type: "button",
    disabled: disabled,
    onClick: () => mode === "input" && onToggle?.(!vetoed),
    onPointerDown: () => setPressed(true),
    onPointerUp: () => setPressed(false),
    onPointerLeave: () => setPressed(false),
    style: {
      position: "relative",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      gap: 2,
      minHeight: 56,
      padding: "8px 10px",
      borderRadius: "var(--radius-md)",
      background: bg,
      color: fg,
      border,
      font: "var(--font-label)",
      letterSpacing: "var(--tracking-normal)",
      cursor: mode === "input" && !disabled ? "pointer" : "default",
      transform: pressed && mode === "input" ? "scale(var(--press-scale))" : "scale(1)",
      transition: "all var(--dur-fast) var(--ease-standard)",
      WebkitTapHighlightColor: "transparent",
      ...style
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      textDecoration: mode === "input" && vetoed ? "line-through" : "none",
      opacity: mode === "input" && vetoed ? 0.85 : 1,
      animation: mode === "input" && vetoed ? "sai-erase 0.32s var(--ease-out)" : "none",
      willChange: "opacity, transform"
    }
  }, label), sublabel && /*#__PURE__*/React.createElement("span", {
    style: {
      font: "var(--font-caption-2)",
      opacity: 0.8
    }
  }, sublabel), mode === "aggregate" && vetoCount > 0 && /*#__PURE__*/React.createElement("span", {
    style: {
      position: "absolute",
      top: 6,
      right: 8,
      font: "var(--font-caption-2)",
      fontSize: 11,
      opacity: 0.9
    }
  }, vetoCount), mode === "aggregate" && clear && /*#__PURE__*/React.createElement("span", {
    style: {
      position: "absolute",
      top: 5,
      right: 7,
      fontSize: 12
    }
  }, "\u2713"));
}
Object.assign(__ds_scope, { VetoCell });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/app/VetoCell.jsx", error: String((e && e.message) || e) }); }

// components/core/Asset.jsx
try { (() => {
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
  style
}) {
  const tones = {
    neutral: "var(--grey-100)",
    primary: "var(--primary-weak-bg)",
    positive: "var(--positive-bg)",
    negative: "var(--negative-bg)",
    warning: "var(--warning-bg)",
    none: "transparent"
  };
  const radius = shape === "circle" ? "var(--radius-full)" : shape === "squircle" ? "var(--radius-lg)" : "0";
  return /*#__PURE__*/React.createElement("div", {
    style: {
      width: size,
      height: size,
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      borderRadius: radius,
      background: tones[tone] ?? tones.neutral,
      flexShrink: 0,
      overflow: "hidden",
      ...style
    }
  }, emoji ? /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: Math.round(size * 0.56),
      lineHeight: 1
    }
  }, emoji) : src ? /*#__PURE__*/React.createElement("img", {
    src: src,
    alt: alt,
    style: {
      width: "100%",
      height: "100%",
      objectFit: "cover"
    }
  }) : children);
}
Object.assign(__ds_scope, { Asset });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Asset.jsx", error: String((e && e.message) || e) }); }

// components/core/Badge.jsx
try { (() => {
/**
 * Badge — compact status/count label.
 * Tones map to semantic colors. Two shapes: pill (default) and dot.
 */
function Badge({
  children,
  tone = "neutral",
  weak = true,
  style
}) {
  const tones = {
    neutral: {
      strong: "var(--grey-600)",
      weakBg: "var(--grey-100)",
      weakFg: "var(--grey-700)"
    },
    primary: {
      strong: "var(--primary)",
      weakBg: "var(--primary-weak-bg)",
      weakFg: "var(--primary-weak-fg)"
    },
    positive: {
      strong: "var(--positive)",
      weakBg: "var(--positive-bg)",
      weakFg: "var(--green-600)"
    },
    negative: {
      strong: "var(--negative)",
      weakBg: "var(--negative-bg)",
      weakFg: "var(--red-600)"
    },
    warning: {
      strong: "var(--warning)",
      weakBg: "var(--warning-bg)",
      weakFg: "#B77900"
    }
  };
  const t = tones[tone] || tones.neutral;
  return /*#__PURE__*/React.createElement("span", {
    style: {
      display: "inline-flex",
      alignItems: "center",
      height: 22,
      padding: "0 8px",
      borderRadius: "var(--radius-full)",
      background: weak ? t.weakBg : t.strong,
      color: weak ? t.weakFg : "var(--grey-0)",
      font: "var(--font-caption-2)",
      letterSpacing: "var(--tracking-normal)",
      whiteSpace: "nowrap",
      ...style
    }
  }, children);
}
Object.assign(__ds_scope, { Badge });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Badge.jsx", error: String((e && e.message) || e) }); }

// components/core/Border.jsx
try { (() => {
/**
 * Border — TDS divider. Horizontal by default.
 * variant "line" (1px hairline) or "block" (thick grey separator between
 * sections). Supports left/right inset.
 */
function Border({
  variant = "line",
  inset = 0,
  vertical = false,
  style
}) {
  if (vertical) {
    return /*#__PURE__*/React.createElement("div", {
      style: {
        width: 1,
        alignSelf: "stretch",
        background: "var(--border-subtle)",
        ...style
      }
    });
  }
  const isBlock = variant === "block";
  return /*#__PURE__*/React.createElement("div", {
    style: {
      height: isBlock ? 8 : 1,
      marginLeft: inset,
      marginRight: inset,
      background: isBlock ? "var(--surface-sunken)" : "var(--border-subtle)",
      borderTop: isBlock ? "1px solid var(--border-subtle)" : "none",
      borderBottom: isBlock ? "1px solid var(--border-subtle)" : "none",
      ...style
    }
  });
}
Object.assign(__ds_scope, { Border });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Border.jsx", error: String((e && e.message) || e) }); }

// components/core/BottomCTA.jsx
try { (() => {
/**
 * BottomCTA — fixed bottom action dock.
 * Pins one or two buttons to the screen bottom with a white→transparent
 * protection gradient above and safe-area padding below. TDS pattern for
 * the primary next/confirm action.
 */
function BottomCTA({
  children,
  gradient = true,
  style
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      flexShrink: 0,
      padding: `14px var(--screen-pad-x) calc(26px + env(safe-area-inset-bottom, 0px))`,
      background: gradient ? "linear-gradient(to top, var(--surface-card) 72%, rgba(255,255,255,0))" : "var(--surface-card)",
      display: "flex",
      gap: 8,
      zIndex: 20,
      ...style
    }
  }, children);
}
Object.assign(__ds_scope, { BottomCTA });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/BottomCTA.jsx", error: String((e && e.message) || e) }); }

// components/core/Button.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
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
    lg: {
      height: "var(--button-h-lg)",
      font: "var(--font-label)",
      fs: 17,
      px: 20,
      radius: "var(--radius-lg)"
    },
    md: {
      height: "var(--button-h-md)",
      font: "var(--font-label)",
      fs: 15,
      px: 18,
      radius: "var(--radius-md)"
    },
    sm: {
      height: "var(--button-h-sm)",
      font: "var(--font-caption-2)",
      fs: 14,
      px: 14,
      radius: "var(--radius-sm)"
    }
  };
  const s = sizes[size] || sizes.md;
  const palettes = {
    primary: {
      bg: "var(--primary)",
      fg: "var(--text-on-primary)",
      press: "var(--primary-pressed)"
    },
    weak: {
      bg: "var(--primary-weak-bg)",
      fg: "var(--primary-weak-fg)",
      press: "var(--blue-100)"
    },
    dark: {
      bg: "var(--fill-dark)",
      fg: "var(--grey-0)",
      press: "var(--grey-900)"
    },
    ghost: {
      bg: "transparent",
      fg: "var(--text-body)",
      press: "var(--fill-weak)"
    }
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
    background: disabled ? "var(--fill-medium)" : pressed ? p.press : p.bg,
    color: disabled ? "var(--text-disabled)" : p.fg,
    font: s.font,
    fontSize: s.fs,
    letterSpacing: "var(--tracking-normal)",
    cursor: disabled ? "not-allowed" : "pointer",
    transform: pressed && !disabled ? "scale(var(--press-scale))" : "scale(1)",
    transition: "transform var(--dur-fast) var(--ease-standard), background var(--dur-fast) var(--ease-standard)",
    WebkitTapHighlightColor: "transparent",
    userSelect: "none",
    ...style
  };
  return /*#__PURE__*/React.createElement("button", _extends({
    type: "button",
    disabled: disabled || loading,
    onClick: onClick,
    onPointerDown: () => setPressed(true),
    onPointerUp: () => setPressed(false),
    onPointerLeave: () => setPressed(false),
    style: base
  }, rest), loading ? /*#__PURE__*/React.createElement(Spinner, {
    color: p.fg
  }) : /*#__PURE__*/React.createElement(React.Fragment, null, leftIcon, children, rightIcon));
}
function Spinner({
  color
}) {
  return /*#__PURE__*/React.createElement("span", {
    "aria-label": "\uB85C\uB529 \uC911",
    style: {
      width: 18,
      height: 18,
      border: `2.5px solid ${color}`,
      borderTopColor: "transparent",
      borderRadius: "50%",
      display: "inline-block",
      animation: "sai-spin 0.7s linear infinite"
    }
  });
}
Object.assign(__ds_scope, { Button });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Button.jsx", error: String((e && e.message) || e) }); }

// components/app/ProposalCard.jsx
try { (() => {
/**
 * ProposalCard — a candidate meeting time surfaced by 사이 after tallying
 * vetoes. Shows the time, how many people found it hard (with reason
 * breakdown), and a confirm action. `recommended` gets the blue emphasis.
 */
function ProposalCard({
  date,
  time,
  vetoCount = 0,
  reasons = [],
  // [{label:"외근", count:2}, ...]
  recommended = false,
  onConfirm,
  confirmLabel = "이 시간으로 정하기",
  style
}) {
  const clear = vetoCount === 0;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      borderRadius: "var(--radius-xl)",
      background: "var(--surface-card)",
      border: recommended ? "1.5px solid var(--primary)" : "1px solid var(--border-subtle)",
      boxShadow: recommended ? "var(--shadow-md)" : "var(--shadow-xs)",
      padding: 20,
      display: "flex",
      flexDirection: "column",
      gap: 14,
      ...style
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "flex-start",
      justifyContent: "space-between",
      gap: 12
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 4
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      font: "var(--font-caption-1)",
      color: "var(--text-sub)",
      letterSpacing: "var(--tracking-normal)"
    }
  }, date), /*#__PURE__*/React.createElement("span", {
    style: {
      font: "var(--font-title-1)",
      color: "var(--text-strong)",
      letterSpacing: "var(--tracking-tight)"
    }
  }, time)), recommended && /*#__PURE__*/React.createElement("span", {
    style: {
      display: "inline-flex",
      alignItems: "center",
      height: 26,
      padding: "0 10px",
      borderRadius: "var(--radius-full)",
      background: "var(--primary-weak-bg)",
      color: "var(--primary-weak-fg)",
      font: "var(--font-caption-2)",
      letterSpacing: "var(--tracking-normal)"
    }
  }, "\uC0AC\uC774 \uCD94\uCC9C")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 10
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 8,
      padding: "10px 12px",
      borderRadius: "var(--radius-md)",
      background: clear ? "var(--available-bg)" : "var(--veto-bg)"
    }
  }, /*#__PURE__*/React.createElement("span", {
    "aria-hidden": true,
    style: {
      fontSize: 16
    }
  }, clear ? "🙆" : "🙅"), /*#__PURE__*/React.createElement("span", {
    style: {
      font: "var(--font-body-2)",
      letterSpacing: "var(--tracking-normal)",
      color: clear ? "var(--primary-weak-fg)" : "var(--red-600)"
    }
  }, clear ? "아무도 부담스러워하지 않아요" : `${vetoCount}명이 부담스러워해요`)), !clear && reasons.length > 0 && /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexWrap: "wrap",
      gap: 6
    }
  }, reasons.map(r => /*#__PURE__*/React.createElement("span", {
    key: r.label,
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: 4,
      height: 28,
      padding: "0 11px",
      borderRadius: "var(--radius-full)",
      background: "var(--negative-bg)",
      color: "var(--red-600)",
      font: "var(--font-caption-2)",
      letterSpacing: "var(--tracking-normal)"
    }
  }, r.label, /*#__PURE__*/React.createElement("b", {
    style: {
      fontWeight: 700
    }
  }, r.count))))), /*#__PURE__*/React.createElement(__ds_scope.Button, {
    variant: recommended ? "primary" : "weak",
    size: "md",
    fullWidth: true,
    onClick: onConfirm
  }, confirmLabel));
}
Object.assign(__ds_scope, { ProposalCard });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/app/ProposalCard.jsx", error: String((e && e.message) || e) }); }

// components/core/ListHeader.jsx
try { (() => {
/**
 * ListHeader — section header above a group of ListRows.
 * Bold title, optional description line, optional right-aligned action.
 */
function ListHeader({
  title,
  description,
  action,
  style
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "20px var(--screen-pad-x) 8px",
      ...style
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "baseline",
      justifyContent: "space-between",
      gap: 12
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      font: "var(--font-title-3)",
      color: "var(--text-strong)",
      letterSpacing: "var(--tracking-normal)"
    }
  }, title), action && /*#__PURE__*/React.createElement("div", {
    style: {
      flexShrink: 0
    }
  }, action)), description && /*#__PURE__*/React.createElement("p", {
    style: {
      margin: "4px 0 0",
      font: "var(--font-caption-1)",
      color: "var(--text-sub)",
      letterSpacing: "var(--tracking-normal)"
    }
  }, description));
}
Object.assign(__ds_scope, { ListHeader });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/ListHeader.jsx", error: String((e && e.message) || e) }); }

// components/core/ListRow.jsx
try { (() => {
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
  style
}) {
  const [pressed, setPressed] = React.useState(false);
  const pressable = !!onClick;
  return /*#__PURE__*/React.createElement("div", {
    role: pressable ? "button" : undefined,
    onClick: onClick,
    onPointerDown: () => pressable && setPressed(true),
    onPointerUp: () => setPressed(false),
    onPointerLeave: () => setPressed(false),
    style: {
      display: "flex",
      alignItems: "center",
      gap: 14,
      padding: "12px var(--screen-pad-x)",
      minHeight: 60,
      background: pressed ? "var(--fill-weak)" : "transparent",
      cursor: pressable ? "pointer" : "default",
      transition: "background var(--dur-fast) var(--ease-standard)",
      WebkitTapHighlightColor: "transparent",
      ...style
    }
  }, left && /*#__PURE__*/React.createElement("div", {
    style: {
      flexShrink: 0,
      display: "flex"
    }
  }, left), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minWidth: 0,
      display: "flex",
      flexDirection: "column",
      gap: 2
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      font: "var(--font-head)",
      color: "var(--text-strong)",
      letterSpacing: "var(--tracking-normal)",
      overflow: "hidden",
      textOverflow: "ellipsis",
      whiteSpace: "nowrap"
    }
  }, title), description && /*#__PURE__*/React.createElement("span", {
    style: {
      font: "var(--font-caption-1)",
      color: "var(--text-sub)",
      letterSpacing: "var(--tracking-normal)"
    }
  }, description)), right && /*#__PURE__*/React.createElement("div", {
    style: {
      flexShrink: 0,
      display: "flex",
      alignItems: "center",
      gap: 6
    }
  }, right), chevron && /*#__PURE__*/React.createElement("span", {
    "aria-hidden": true,
    style: {
      flexShrink: 0,
      color: "var(--grey-400)",
      fontSize: 20,
      lineHeight: 1,
      fontFamily: "var(--font-sans)"
    }
  }, "\u203A"));
}
Object.assign(__ds_scope, { ListRow });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/ListRow.jsx", error: String((e && e.message) || e) }); }

// components/core/Paragraph.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
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
    "caption-2": "var(--font-caption-2)"
  }[typography] || "var(--font-body-1)";
  const colorVar = {
    strong: "var(--text-strong)",
    body: "var(--text-body)",
    sub: "var(--text-sub)",
    weak: "var(--text-weak)",
    accent: "var(--text-accent)",
    negative: "var(--negative)",
    positive: "var(--positive)"
  }[color] || "var(--text-body)";
  const Tag = as || (typography.startsWith("display") || typography.startsWith("title") ? "h2" : "p");
  const tight = typography.startsWith("display") || typography === "title-1";
  return /*#__PURE__*/React.createElement(Tag, _extends({
    style: {
      margin: 0,
      font: fontVar,
      color: colorVar,
      textAlign: align,
      letterSpacing: tight ? "var(--tracking-tight)" : "var(--tracking-normal)",
      textWrap: "pretty",
      ...style
    }
  }, rest), children);
}
Object.assign(__ds_scope, { Paragraph });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Paragraph.jsx", error: String((e && e.message) || e) }); }

// components/forms/Avatar.jsx
try { (() => {
/**
 * Avatar — participant marker. Since 사이 keeps identities anonymous,
 * the default is an initialed chip in a soft two-tone (pastel bg + clear hued fg);
 * set `anonymous` for a masked placeholder. `stack` tightens group margins.
 */
const AV_TONES = [{
  bg: "#E4EEFC",
  fg: "#3B6FC9"
},
// blue
{
  bg: "#DFF2F0",
  fg: "#1F7F78"
},
// teal
{
  bg: "#E3F3E4",
  fg: "#3F8548"
},
// green
{
  bg: "#FBEEDF",
  fg: "#A9702C"
},
// apricot
{
  bg: "#FBE9EC",
  fg: "#BA5468"
},
// rose
{
  bg: "#ECEAFA",
  fg: "#6B5FC0"
} // lavender
];
function Avatar({
  name = "",
  size = 40,
  anonymous = false,
  index = 0,
  style
}) {
  const initial = name ? name.trim().slice(0, 1) : "?";
  const tone = AV_TONES[index % AV_TONES.length];
  const bg = anonymous ? "var(--grey-200)" : tone.bg;
  const fg = anonymous ? "var(--grey-500)" : tone.fg;
  return /*#__PURE__*/React.createElement("span", {
    title: anonymous ? "익명" : name,
    style: {
      width: size,
      height: size,
      borderRadius: "50%",
      background: bg,
      color: fg,
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      font: "var(--font-label)",
      fontSize: Math.round(size * 0.4),
      fontWeight: 600,
      border: "2px solid var(--surface-card)",
      boxSizing: "border-box",
      flexShrink: 0,
      userSelect: "none",
      ...style
    }
  }, anonymous ? /*#__PURE__*/React.createElement("svg", {
    width: size * 0.5,
    height: size * 0.5,
    viewBox: "0 0 24 24",
    fill: "none",
    "aria-hidden": true
  }, /*#__PURE__*/React.createElement("circle", {
    cx: "12",
    cy: "8",
    r: "4",
    fill: "currentColor",
    opacity: "0.85"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M4 20c0-4 3.6-6 8-6s8 2 8 6",
    fill: "currentColor",
    opacity: "0.85"
  })) : initial);
}

/** AvatarStack — overlapping row of avatars with a +N overflow chip. */
function AvatarStack({
  people = [],
  max = 4,
  size = 36,
  anonymous = false
}) {
  const shown = people.slice(0, max);
  const extra = people.length - shown.length;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center"
    }
  }, shown.map((p, i) => /*#__PURE__*/React.createElement("span", {
    key: i,
    style: {
      marginLeft: i === 0 ? 0 : -10,
      zIndex: shown.length - i
    }
  }, /*#__PURE__*/React.createElement(Avatar, {
    name: p,
    index: i,
    anonymous: anonymous,
    size: size
  }))), extra > 0 && /*#__PURE__*/React.createElement("span", {
    style: {
      marginLeft: -10,
      width: size,
      height: size,
      borderRadius: "50%",
      background: "var(--grey-100)",
      color: "var(--text-sub)",
      border: "2px solid var(--surface-card)",
      boxSizing: "border-box",
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      font: "var(--font-caption-2)",
      fontSize: Math.round(size * 0.36)
    }
  }, "+", extra));
}
Object.assign(__ds_scope, { Avatar, AvatarStack });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Avatar.jsx", error: String((e && e.message) || e) }); }

// components/forms/Checkbox.jsx
try { (() => {
/**
 * Checkbox — TDS check. Circle (default, for list selection) or square
 * (for terms/agreements). Blue filled when checked.
 */
function Checkbox({
  checked = false,
  onChange,
  shape = "circle",
  disabled = false,
  label,
  style
}) {
  const box = /*#__PURE__*/React.createElement("span", {
    style: {
      width: 24,
      height: 24,
      flexShrink: 0,
      borderRadius: shape === "circle" ? "50%" : "var(--radius-xs)",
      background: checked ? "var(--primary)" : "var(--grey-200)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      transition: "background var(--dur-fast) var(--ease-standard)"
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: "14",
    height: "14",
    viewBox: "0 0 14 14",
    fill: "none",
    "aria-hidden": true
  }, /*#__PURE__*/React.createElement("path", {
    d: "M2.5 7.5L5.5 10.5L11.5 4",
    stroke: checked ? "#fff" : "var(--grey-400)",
    strokeWidth: "2.2",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  })));
  return /*#__PURE__*/React.createElement("button", {
    type: "button",
    role: "checkbox",
    "aria-checked": checked,
    disabled: disabled,
    onClick: () => !disabled && onChange?.(!checked),
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: 10,
      border: "none",
      background: "transparent",
      padding: 0,
      cursor: disabled ? "not-allowed" : "pointer",
      opacity: disabled ? 0.5 : 1,
      WebkitTapHighlightColor: "transparent",
      ...style
    }
  }, box, label && /*#__PURE__*/React.createElement("span", {
    style: {
      font: "var(--font-body-1)",
      color: "var(--text-body)",
      letterSpacing: "var(--tracking-normal)"
    }
  }, label));
}
Object.assign(__ds_scope, { Checkbox });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Checkbox.jsx", error: String((e && e.message) || e) }); }

// components/forms/Chip.jsx
try { (() => {
/**
 * Chip — selectable pill. Used for reason tags (외근 / 점심 직후 / 개인 일정)
 * and quick filters. Toggles between neutral and selected (tone-colored).
 */
function Chip({
  children,
  selected = false,
  onClick,
  tone = "primary",
  leftIcon,
  removable = false,
  onRemove,
  style
}) {
  const tones = {
    primary: {
      bg: "var(--primary-weak-bg)",
      fg: "var(--primary-weak-fg)",
      border: "var(--primary)"
    },
    negative: {
      bg: "var(--negative-bg)",
      fg: "var(--red-600)",
      border: "var(--negative)"
    },
    neutral: {
      bg: "var(--grey-100)",
      fg: "var(--text-body)",
      border: "var(--grey-400)"
    }
  };
  const t = tones[tone] || tones.primary;
  return /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: onClick,
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: 6,
      height: 38,
      padding: "0 14px",
      borderRadius: "var(--radius-full)",
      border: selected ? `1.5px solid ${t.border}` : "1.5px solid transparent",
      background: selected ? t.bg : "var(--fill-weak)",
      color: selected ? t.fg : "var(--text-sub)",
      font: "var(--font-label)",
      fontSize: 14,
      letterSpacing: "var(--tracking-normal)",
      cursor: "pointer",
      transition: "all var(--dur-fast) var(--ease-standard)",
      WebkitTapHighlightColor: "transparent",
      whiteSpace: "nowrap",
      ...style
    }
  }, leftIcon, children, removable && /*#__PURE__*/React.createElement("span", {
    onClick: e => {
      e.stopPropagation();
      onRemove?.();
    },
    "aria-label": "\uC0AD\uC81C",
    style: {
      marginLeft: 2,
      fontSize: 16,
      lineHeight: 1,
      opacity: 0.6
    }
  }, "\u2715"));
}
Object.assign(__ds_scope, { Chip });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Chip.jsx", error: String((e && e.message) || e) }); }

// components/forms/Switch.jsx
try { (() => {
/**
 * Switch — TDS toggle. Blue when on. Used for required/optional flags,
 * settings, and inline row toggles.
 */
function Switch({
  checked = false,
  onChange,
  disabled = false,
  style
}) {
  return /*#__PURE__*/React.createElement("button", {
    type: "button",
    role: "switch",
    "aria-checked": checked,
    disabled: disabled,
    onClick: () => !disabled && onChange?.(!checked),
    style: {
      width: 52,
      height: 32,
      borderRadius: "var(--radius-full)",
      border: "none",
      padding: 3,
      cursor: disabled ? "not-allowed" : "pointer",
      background: checked ? "var(--primary)" : "var(--grey-300)",
      opacity: disabled ? 0.5 : 1,
      transition: "background var(--dur-base) var(--ease-standard)",
      display: "flex",
      alignItems: "center",
      WebkitTapHighlightColor: "transparent"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 26,
      height: 26,
      borderRadius: "50%",
      background: "var(--grey-0)",
      boxShadow: "var(--shadow-sm)",
      transform: checked ? "translateX(20px)" : "translateX(0)",
      transition: "transform var(--dur-base) var(--ease-out)"
    }
  }));
}
Object.assign(__ds_scope, { Switch });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Switch.jsx", error: String((e && e.message) || e) }); }

// components/forms/TextField.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
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
  const floated = focused || value && String(value).length > 0;
  const line = error ? "var(--negative)" : focused ? "var(--primary)" : "var(--border-default)";
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      ...style
    }
  }, label && /*#__PURE__*/React.createElement("span", {
    style: {
      font: "var(--font-caption-2)",
      color: error ? "var(--negative)" : focused ? "var(--primary)" : "var(--text-weak)",
      letterSpacing: "var(--tracking-normal)",
      height: floated ? 16 : 0,
      opacity: floated ? 1 : 0,
      transition: "all var(--dur-base) var(--ease-standard)",
      marginBottom: floated ? 4 : 0
    }
  }, label), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 8,
      borderBottom: `2px solid ${line}`,
      paddingBottom: 8,
      transition: "border-color var(--dur-base) var(--ease-standard)"
    }
  }, /*#__PURE__*/React.createElement("input", _extends({
    type: type,
    value: value,
    maxLength: maxLength,
    placeholder: label && !floated ? label : placeholder,
    onChange: e => onChange?.(e.target.value),
    onFocus: () => setFocused(true),
    onBlur: () => setFocused(false),
    style: {
      flex: 1,
      minWidth: 0,
      border: "none",
      outline: "none",
      background: "transparent",
      font: "var(--font-title-3)",
      color: "var(--text-strong)",
      letterSpacing: "var(--tracking-normal)",
      padding: 0
    }
  }, rest)), suffix && /*#__PURE__*/React.createElement("span", {
    style: {
      font: "var(--font-body-2)",
      color: "var(--text-sub)"
    }
  }, suffix)), helper && /*#__PURE__*/React.createElement("span", {
    style: {
      marginTop: 6,
      font: "var(--font-caption-1)",
      color: error ? "var(--negative)" : "var(--text-weak)",
      letterSpacing: "var(--tracking-normal)"
    }
  }, helper));
}
Object.assign(__ds_scope, { TextField });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/TextField.jsx", error: String((e && e.message) || e) }); }

// components/icons/Icon.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Icon — 사이's Toss-style line icon set. 24×24 grid, ~1.9px rounded strokes,
 * currentColor. Original set (not Toss's proprietary assets), tuned to the
 * clean rounded Korean-fintech look. 24 glyphs — see ICON_NAMES.
 */
const GLYPHS = {
  calendar: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("path", {
    d: "M8 2.5v3"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M16 2.5v3"
  }), /*#__PURE__*/React.createElement("rect", {
    x: "3.5",
    y: "4.5",
    width: "17",
    height: "16",
    rx: "3"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M3.5 9.5h17"
  })),
  clock: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("circle", {
    cx: "12",
    cy: "12",
    r: "8.5"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M12 7v5.2l3.6 2.1"
  })),
  users: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("circle", {
    cx: "8.7",
    cy: "8",
    r: "3.3"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M2.8 19.2c0-3 2.6-4.9 5.9-4.9s5.9 1.9 5.9 4.9"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M16.2 5.7a3 3 0 0 1 0 5.9"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M17.8 13.7c2.4.4 3.7 2 3.7 4.5"
  })),
  user: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("circle", {
    cx: "12",
    cy: "8",
    r: "3.7"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M5 20c0-3.7 3.1-5.7 7-5.7s7 2 7 5.7"
  })),
  bell: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("path", {
    d: "M6 9.5a6 6 0 0 1 12 0c0 4.8 2 6 2 6H4s2-1.2 2-6Z"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M9.8 20a2.2 2.2 0 0 0 4.4 0"
  })),
  link: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("path", {
    d: "M9.6 14.4l4.8-4.8"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M8 11.6 6.2 13.4a3.4 3.4 0 0 0 4.8 4.8l1.8-1.8"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M16 12.4l1.8-1.8a3.4 3.4 0 0 0-4.8-4.8l-1.8 1.8"
  })),
  share: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("circle", {
    cx: "6",
    cy: "12",
    r: "2.7"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "17.2",
    cy: "6",
    r: "2.7"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "17.2",
    cy: "18",
    r: "2.7"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M8.4 10.8 14.8 7.2"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M8.4 13.2l6.4 3.6"
  })),
  lock: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("rect", {
    x: "4.5",
    y: "10.3",
    width: "15",
    height: "9.7",
    rx: "2.6"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M8 10.3V8a4 4 0 0 1 8 0v2.3"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M12 14.3v2.4"
  })),
  eye: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("path", {
    d: "M2.6 12S6.1 5.6 12 5.6 21.4 12 21.4 12 17.9 18.4 12 18.4 2.6 12 2.6 12Z"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "12",
    cy: "12",
    r: "3"
  })),
  "eye-off": /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("path", {
    d: "M9.6 6.1A9.7 9.7 0 0 1 12 5.6c5.9 0 9.4 6.4 9.4 6.4a15.8 15.8 0 0 1-3 3.6"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M6 7.6A15.9 15.9 0 0 0 2.6 12s3.5 6.4 9.4 6.4a9.4 9.4 0 0 0 3.6-.7"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M10 10a2.8 2.8 0 0 0 4 4"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M4 4l16 16"
  })),
  heart: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("path", {
    d: "M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"
  })),
  star: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("path", {
    d: "M12 3.5l2.6 5.3 5.9.9-4.3 4.1 1 5.9L12 17l-5.2 2.7 1-5.9-4.3-4.1 5.9-.9Z"
  })),
  sparkle: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("path", {
    d: "M12 3c.5 3.9 1.6 5 5.5 5.5C13.6 9 12.5 10.1 12 14c-.5-3.9-1.6-5-5.5-5.5C10.4 8 11.5 6.9 12 3Z"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M18.5 13.5c.3 2 .8 2.5 2.8 2.8-2 .3-2.5.8-2.8 2.8-.3-2-.8-2.5-2.8-2.8 2-.3 2.5-.8 2.8-2.8Z"
  })),
  check: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("path", {
    d: "M5 12.5l4.5 4.5L19 7"
  })),
  "check-circle": /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("circle", {
    cx: "12",
    cy: "12",
    r: "8.6"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M8.2 12.3l2.6 2.6 5-5.3"
  })),
  close: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("path", {
    d: "M6.5 6.5l11 11"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M17.5 6.5l-11 11"
  })),
  plus: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("path", {
    d: "M12 5v14"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M5 12h14"
  })),
  minus: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("path", {
    d: "M5 12h14"
  })),
  "chevron-right": /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("path", {
    d: "M9.5 5.5l7 6.5-7 6.5"
  })),
  edit: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("path", {
    d: "M14.5 5.5l4 4L9 19l-4.5 1 1-4.5 9-9Z"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M12.8 7.2l4 4"
  })),
  trash: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("path", {
    d: "M4.5 7h15"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M9 7V5.3c0-.7.6-1.3 1.3-1.3h3.4c.7 0 1.3.6 1.3 1.3V7"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M6.6 7l1 12.2c.06.9.8 1.6 1.7 1.6h5.5c.9 0 1.64-.7 1.7-1.6L18 7"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M10 11v6"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M14 11v6"
  })),
  pin: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("path", {
    d: "M12 21s7-6 7-11a7 7 0 0 0-14 0c0 5 7 11 7 11Z"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "12",
    cy: "10",
    r: "2.5"
  })),
  coffee: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("path", {
    d: "M5 8h11v5a5 5 0 0 1-5 5h-1a5 5 0 0 1-5-5V8Z"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M16 9.2h2.3a2.4 2.4 0 0 1 0 4.8H16"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M8 3.4c-.5.8-.5 1.7 0 2.5"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M11.5 3.4c-.5.8-.5 1.7 0 2.5"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M5 21h11"
  })),
  briefcase: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("rect", {
    x: "3.5",
    y: "8",
    width: "17",
    height: "11",
    rx: "2.4"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M9 8V6.4c0-.8.6-1.4 1.4-1.4h3.2c.8 0 1.4.6 1.4 1.4V8"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M3.5 13h17"
  })),
  flag: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("path", {
    d: "M6 21V4"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M6 5h11l-2.3 3.5L17 12H6"
  })),
  home: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("path", {
    d: "M4 11.3l8-6.5 8 6.5"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M6 10.3V20h12v-9.7"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M10 20v-5h4v5"
  })),
  video: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("rect", {
    x: "3",
    y: "6.5",
    width: "12.5",
    height: "11",
    rx: "2.6"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M15.5 10.2l5-2.7v9l-5-2.7"
  })),
  send: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("path", {
    d: "M20.5 3.5 10 14"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M20.5 3.5 14 20.5l-4-6.5-6.5-4Z"
  })),
  search: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("circle", {
    cx: "11",
    cy: "11",
    r: "6.5"
  }), /*#__PURE__*/React.createElement("path", {
    d: "m20 20-4.2-4.2"
  })),
  settings: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("circle", {
    cx: "12",
    cy: "12",
    r: "6.8"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "12",
    cy: "12",
    r: "2.6"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M12 2.8v2.4M12 18.8v2.4M2.8 12h2.4M18.8 12h2.4M5.5 5.5l1.7 1.7M16.8 16.8l1.7 1.7M5.5 18.5l1.7-1.7M16.8 7.2l1.7-1.7"
  })),
  message: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("path", {
    d: "M20 13.4a2.6 2.6 0 0 1-2.6 2.6H10l-4.6 3.5V16H6.6A2.6 2.6 0 0 1 4 13.4V7.6A2.6 2.6 0 0 1 6.6 5h10.8A2.6 2.6 0 0 1 20 7.6Z"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M8.5 9.4h7"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M8.5 12.2h4.6"
  }))
};
const ICON_NAMES = Object.keys(GLYPHS);
function Icon({
  name = "calendar",
  size = 24,
  color = "currentColor",
  strokeWidth = 1.9,
  style,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("svg", _extends({
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: color,
    strokeWidth: strokeWidth,
    strokeLinecap: "round",
    strokeLinejoin: "round",
    "aria-hidden": "true",
    style: {
      display: "block",
      flexShrink: 0,
      ...style
    }
  }, rest), GLYPHS[name] || GLYPHS.calendar);
}
Object.assign(__ds_scope, { ICON_NAMES, Icon });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/icons/Icon.jsx", error: String((e && e.message) || e) }); }

// components/navigation/NavigationBar.jsx
try { (() => {
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
  style
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: "sticky",
      top: 0,
      height: "var(--navbar-h)",
      display: "grid",
      gridTemplateColumns: "44px 1fr 44px",
      alignItems: "center",
      background: transparent ? "transparent" : "var(--surface-card)",
      zIndex: 30,
      ...style
    }
  }, /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: onBack,
    "aria-label": "\uB4A4\uB85C",
    style: {
      height: 44,
      width: 44,
      border: "none",
      background: "transparent",
      color: "var(--text-strong)",
      fontSize: 28,
      lineHeight: 1,
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      WebkitTapHighlightColor: "transparent"
    }
  }, backIcon), /*#__PURE__*/React.createElement("span", {
    style: {
      textAlign: "center",
      font: "var(--font-title-3)",
      color: "var(--text-strong)",
      letterSpacing: "var(--tracking-normal)",
      opacity: titleVisible ? 1 : 0,
      transition: "opacity var(--dur-base) var(--ease-standard)",
      overflow: "hidden",
      textOverflow: "ellipsis",
      whiteSpace: "nowrap"
    }
  }, title), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      justifyContent: "flex-end",
      paddingRight: 8
    }
  }, right));
}
Object.assign(__ds_scope, { NavigationBar });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/NavigationBar.jsx", error: String((e && e.message) || e) }); }

// components/navigation/Tab.jsx
try { (() => {
/**
 * Tab — segmented top tabs. TDS "underline" style (label + moving indicator)
 * or "capsule" (pill segmented control). Controlled via `value`/`onChange`.
 */
function Tab({
  items = [],
  value,
  onChange,
  variant = "underline",
  style
}) {
  const activeIndex = Math.max(0, items.findIndex(it => (it.value ?? it) === value));
  if (variant === "capsule") {
    return /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        gap: 4,
        padding: 4,
        background: "var(--fill-weak)",
        borderRadius: "var(--radius-full)",
        ...style
      }
    }, items.map((it, i) => {
      const v = it.value ?? it;
      const label = it.label ?? it;
      const active = i === activeIndex;
      return /*#__PURE__*/React.createElement("button", {
        key: v,
        type: "button",
        onClick: () => onChange?.(v),
        style: {
          flex: 1,
          height: 40,
          border: "none",
          borderRadius: "var(--radius-full)",
          background: active ? "var(--surface-card)" : "transparent",
          color: active ? "var(--text-strong)" : "var(--text-weak)",
          font: "var(--font-label)",
          letterSpacing: "var(--tracking-normal)",
          boxShadow: active ? "var(--shadow-xs)" : "none",
          cursor: "pointer",
          transition: "all var(--dur-base) var(--ease-standard)",
          WebkitTapHighlightColor: "transparent"
        }
      }, label);
    }));
  }
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      display: "flex",
      borderBottom: "1px solid var(--border-subtle)",
      ...style
    }
  }, items.map((it, i) => {
    const v = it.value ?? it;
    const label = it.label ?? it;
    const active = i === activeIndex;
    return /*#__PURE__*/React.createElement("button", {
      key: v,
      type: "button",
      onClick: () => onChange?.(v),
      style: {
        flex: 1,
        height: 48,
        border: "none",
        background: "transparent",
        color: active ? "var(--text-strong)" : "var(--text-weak)",
        font: active ? "var(--font-label)" : "var(--font-body-2)",
        letterSpacing: "var(--tracking-normal)",
        cursor: "pointer",
        transition: "color var(--dur-base) var(--ease-standard)",
        WebkitTapHighlightColor: "transparent"
      }
    }, label);
  }), /*#__PURE__*/React.createElement("span", {
    "aria-hidden": true,
    style: {
      position: "absolute",
      bottom: -1,
      height: 2,
      width: `${100 / Math.max(1, items.length)}%`,
      left: `${100 / Math.max(1, items.length) * activeIndex}%`,
      background: "var(--text-strong)",
      transition: "left var(--dur-base) var(--ease-out)",
      borderRadius: 2
    }
  }));
}
Object.assign(__ds_scope, { Tab });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/Tab.jsx", error: String((e && e.message) || e) }); }

// components/navigation/TopBar.jsx
try { (() => {
/**
 * TopBar — the large bold screen title block (TDS "Top").
 * Sits just under the NavigationBar; big title + optional description.
 * This is the first thing the user reads on a screen.
 */
function TopBar({
  title,
  description,
  align = "left",
  style
}) {
  return /*#__PURE__*/React.createElement("header", {
    style: {
      padding: "18px var(--screen-pad-x) 18px",
      textAlign: align,
      ...style
    }
  }, /*#__PURE__*/React.createElement("h1", {
    style: {
      margin: 0,
      font: "var(--font-title-1)",
      color: "var(--text-strong)",
      letterSpacing: "var(--tracking-tight)",
      textWrap: "balance"
    }
  }, title), description && /*#__PURE__*/React.createElement("p", {
    style: {
      margin: "8px 0 0",
      font: "var(--font-body-2)",
      color: "var(--text-sub)",
      letterSpacing: "var(--tracking-normal)",
      textWrap: "pretty"
    }
  }, description));
}
Object.assign(__ds_scope, { TopBar });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/TopBar.jsx", error: String((e && e.message) || e) }); }

// ui_kits/sai/frame.jsx
try { (() => {
/* ─────────────────────────────────────────────────────────────
   사이 UI kit — shared frame, status bar, bottom sheet, seed data.
   Exposes helpers on window for the screen scripts.
   ───────────────────────────────────────────────────────────── */

// ── Seed data ───────────────────────────────────────────────
const SAI_DAYS = [{
  key: "4/2",
  dow: "화",
  label: "4월 2일 화요일"
}, {
  key: "4/3",
  dow: "수",
  label: "4월 3일 수요일"
}, {
  key: "4/4",
  dow: "목",
  label: "4월 4일 목요일"
}];
// Full selectable hour range (09:00–21:00). key = 24h hour string.
function saiTimeLabel(h) {
  const hh = Number(h);
  if (hh < 12) return `오전 ${hh}시`;
  if (hh === 12) return "낮 12시";
  if (hh < 18) return `오후 ${hh - 12}시`;
  return `저녁 ${hh - 12}시`;
}
const SAI_ALL_TIMES = [];
for (let h = 9; h <= 21; h++) SAI_ALL_TIMES.push({
  key: String(h),
  label: saiTimeLabel(h)
});
// default-selected work slots — 오전 9시 ~ 오후 5시 (점심 포함 연속 범위)
const SAI_TIMES = SAI_ALL_TIMES.filter(t => ["9", "10", "11", "12", "13", "14", "15", "16", "17"].includes(t.key));
// vetoes from 5 "other" anonymous respondents, keyed "day-time" → [reasons]
const SAI_SEED_VETOES = {
  "4/2-9": ["아침 일정"],
  "4/2-11": ["이동 시간"],
  "4/2-12": ["점심시간"],
  "4/2-13": ["점심 직후", "점심 직후"],
  "4/2-14": ["외근"],
  "4/2-15": ["개인 일정"],
  "4/2-16": ["외근"],
  "4/2-17": ["늦은 시간", "개인 일정"],
  "4/3-9": ["아침 일정", "아침 일정"],
  "4/3-10": ["이동 시간"],
  "4/3-11": ["개인 일정"],
  "4/3-13": ["점심 직후"],
  "4/3-14": ["외근", "외근", "개인 일정"],
  "4/3-15": ["외근"],
  "4/3-16": ["개인 일정", "이동 시간"],
  "4/3-17": ["늦은 시간"],
  "4/4-9": ["아침 일정"],
  "4/4-10": ["외근"],
  "4/4-11": ["개인 일정"],
  "4/4-12": ["점심시간", "외근"],
  "4/4-13": ["점심 직후"],
  "4/4-14": ["이동 시간"],
  "4/4-15": ["개인 일정"],
  "4/4-16": ["개인 일정", "외근"],
  "4/4-17": ["늦은 시간", "늦은 시간"]
};
const SAI_REASONS = ["외근", "점심 직후", "개인 일정", "이동 시간", "아침 일정", "늦은 시간"];
const SAI_PARTICIPANTS = [{
  name: "김지원",
  required: true
}, {
  name: "이서준",
  required: true
}, {
  name: "박민서",
  required: true
}, {
  name: "정하윤",
  required: false
}, {
  name: "최도현",
  required: false
}, {
  name: "한서영",
  required: false
}];
const SAI_TOTAL = 6; // 5 others + you

// ── Date helpers (April 2026; 4/1 is Monday, so 4/2 = 화) ──
const SAI_DOW = ["일", "월", "화", "수", "목", "금", "토"];
function saiDay(d) {
  return {
    key: `4/${d}`,
    d,
    dow: SAI_DOW[d % 7],
    label: `4월 ${d}일 ${SAI_DOW[d % 7]}요일`
  };
}
function saiDaysInRange(from, to) {
  const a = Math.min(from, to),
    b = Math.max(from, to);
  const out = [];
  for (let d = a; d <= b && out.length < 8; d++) out.push(saiDay(d));
  return out;
}
const SAI_MONTH = {
  year: 2026,
  month: 4,
  days: 30,
  firstDow: 1
}; // 4/1 = Monday

// ── Anonymous chat personas ─────────────────────────────────
// Everyone in a 사이 chat is anonymous. Each participant is given a stable
// {animal + tone} handle so a thread is followable, but no real name leaks.
const SAI_ANON = [{
  id: "a",
  name: "다람쥐",
  emoji: "🐿️",
  tone: "#F59E0B",
  bg: "#FEF3E2"
}, {
  id: "b",
  name: "여우",
  emoji: "🦊",
  tone: "#F04452",
  bg: "#FDECEE"
}, {
  id: "c",
  name: "고양이",
  emoji: "🐱",
  tone: "#8B5CF6",
  bg: "#F1ECFD"
}, {
  id: "d",
  name: "수달",
  emoji: "🦦",
  tone: "#12B886",
  bg: "#E4F8F1"
}, {
  id: "e",
  name: "참새",
  emoji: "🐤",
  tone: "#3182F6",
  bg: "#E8F1FE"
}];
const SAI_ANON_MAP = Object.fromEntries(SAI_ANON.map(a => [a.id, a]));

// Seed thread for the live meeting. Chat is a light, human side-channel —
// NOT where scheduling happens (that's "싫은 시간 지우기"). Keep it casual;
// 사이 posts the occasional nudge that points back to the erase flow.
const SAI_THREAD = [{
  kind: "system",
  text: "사이가 익명 채팅을 열었어요. 이름은 아무에게도 보이지 않아요."
}, {
  from: "a",
  text: "안녕하세요! 이번 리뷰 기대되네요 😊",
  t: "오후 2:03"
}, {
  from: "b",
  text: "저도요~ 지난번 피드백 반영한 것들 보여드릴게요",
  t: "오후 2:05"
}, {
  from: "c",
  text: "혹시 리뷰 때 프로토타입도 같이 보나요?",
  t: "오후 2:09"
}, {
  from: "me",
  text: "네 링크 미리 공유해둘게요 🙌",
  t: "오후 2:11"
}, {
  kind: "system",
  text: "아직 2명이 싫은 시간을 안 지웠어요. 시간은 ‘지우기’에서 정해요."
}, {
  from: "d",
  text: "방금 지웠어요! 확정되면 알려주세요",
  t: "오후 2:15"
}, {
  from: "a",
  text: "굿굿 👍",
  t: "오후 2:16"
}];

// Chat list — one anonymous room per meeting (ids match SAI_MEETINGS).
const SAI_CHATS = [{
  id: "live",
  name: "주간 디자인 리뷰",
  last: "굿굿 👍",
  t: "오후 2:16",
  unread: 2,
  people: 6,
  icon: "calendar",
  tone: "primary",
  live: true
}, {
  id: "q",
  name: "분기 플래닝",
  last: "사이가 회의 시간을 정했어요 🎉",
  t: "어제",
  unread: 0,
  people: 8,
  icon: "flag",
  tone: "positive"
}, {
  id: "retro",
  name: "스프린트 회고",
  last: "다들 확인 감사해요!",
  t: "3월 28일",
  unread: 0,
  people: 6,
  icon: "star",
  tone: "warning"
}];
const SAI_CHAT_BY_ID = Object.fromEntries(SAI_CHATS.map(c => [c.id, c]));

// Next confirmed meeting (for the home dashboard).
const SAI_UPCOMING = {
  name: "디자인 싱크",
  date: "4월 8일 화요일",
  time: "오전 11시",
  location: "브릿지 회의실",
  people: ["김", "이", "박", "정"]
};

// ── Single source of truth for all meetings ─────────────────
// Every surface (home, 회의 list, chat, detail) reads from here so numbers sync.
const SAI_MEETINGS = {
  live: {
    id: "live",
    name: "주간 디자인 리뷰",
    icon: "calendar",
    iconTone: "primary",
    status: "collecting",
    meta: "4월 2일 ~ 4일 · 후보 27개",
    total: 6,
    responded: 4,
    people: ["김", "이", "박", "정", "최", "한"]
  },
  q: {
    id: "q",
    name: "분기 플래닝",
    icon: "flag",
    iconTone: "positive",
    status: "confirmed",
    meta: "4월 8일 화 · 오전 11시",
    date: "4월 8일 화요일",
    time: "오전 11시",
    location: "브릿지 회의실",
    total: 8,
    people: ["김", "이", "박", "정", "한", "윤", "강", "임"]
  },
  retro: {
    id: "retro",
    name: "스프린트 회고",
    icon: "star",
    iconTone: "warning",
    status: "past",
    meta: "확정 · 3월 28일 오후 3시",
    total: 6,
    people: ["김", "이", "박", "정", "최", "한"]
  },
  onboard: {
    id: "onboard",
    name: "팀 온보딩",
    icon: "users",
    iconTone: "primary",
    status: "past",
    meta: "확정 · 3월 14일 오후 2시",
    total: 5,
    people: ["김", "이", "박", "정", "최"]
  }
};
const SAI_MEETING_LIST = [SAI_MEETINGS.live, SAI_MEETINGS.q, SAI_MEETINGS.retro, SAI_MEETINGS.onboard];
Object.assign(window, {
  SAI_MEETINGS,
  SAI_MEETING_LIST
});
Object.assign(window, {
  SAI_ANON,
  SAI_ANON_MAP,
  SAI_THREAD,
  SAI_CHATS,
  SAI_CHAT_BY_ID,
  SAI_UPCOMING
});
Object.assign(window, {
  SAI_DAYS,
  SAI_TIMES,
  SAI_ALL_TIMES,
  saiTimeLabel,
  SAI_SEED_VETOES,
  SAI_REASONS,
  SAI_PARTICIPANTS,
  SAI_TOTAL,
  SAI_DOW,
  SAI_MONTH,
  saiDay,
  saiDaysInRange
});

// ── Phone frame ─────────────────────────────────────────────
function StatusBar({
  dark = false
}) {
  const fg = dark ? "#fff" : "var(--grey-900)";
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      height: 54,
      flexShrink: 0,
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "0 32px",
      paddingTop: 8,
      background: "transparent",
      zIndex: 40
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      font: "var(--font-label)",
      fontSize: 16,
      fontWeight: 600,
      color: fg,
      letterSpacing: "0.01em",
      fontVariantNumeric: "tabular-nums"
    }
  }, "9:41"), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      top: 10,
      left: "50%",
      transform: "translateX(-50%)",
      width: 118,
      height: 34,
      borderRadius: 20,
      background: "#000"
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 7,
      alignItems: "center"
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: "18",
    height: "12",
    viewBox: "0 0 18 12",
    fill: "none",
    "aria-hidden": true
  }, /*#__PURE__*/React.createElement("rect", {
    x: "0",
    y: "8",
    width: "3",
    height: "4",
    rx: "1",
    fill: fg
  }), /*#__PURE__*/React.createElement("rect", {
    x: "5",
    y: "5.5",
    width: "3",
    height: "6.5",
    rx: "1",
    fill: fg
  }), /*#__PURE__*/React.createElement("rect", {
    x: "10",
    y: "3",
    width: "3",
    height: "9",
    rx: "1",
    fill: fg
  }), /*#__PURE__*/React.createElement("rect", {
    x: "15",
    y: "0.5",
    width: "3",
    height: "11.5",
    rx: "1",
    fill: fg
  })), /*#__PURE__*/React.createElement("svg", {
    width: "17",
    height: "12",
    viewBox: "0 0 17 12",
    fill: "none",
    "aria-hidden": true
  }, /*#__PURE__*/React.createElement("path", {
    d: "M8.5 2.2c2.7 0 5.2 1 7 2.8l-1.5 1.6A7.7 7.7 0 0 0 8.5 4.4 7.7 7.7 0 0 0 3 6.6L1.5 5A9.9 9.9 0 0 1 8.5 2.2Z",
    fill: fg
  }), /*#__PURE__*/React.createElement("path", {
    d: "M8.5 6c1.5 0 2.9.6 3.9 1.6l-1.6 1.6A2.9 2.9 0 0 0 8.5 8.3c-.9 0-1.7.3-2.3.9L4.6 7.6A5.5 5.5 0 0 1 8.5 6Z",
    fill: fg
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "8.5",
    cy: "10.6",
    r: "1.4",
    fill: fg
  })), /*#__PURE__*/React.createElement("svg", {
    width: "27",
    height: "13",
    viewBox: "0 0 27 13",
    fill: "none",
    "aria-hidden": true
  }, /*#__PURE__*/React.createElement("rect", {
    x: "0.5",
    y: "0.5",
    width: "22",
    height: "12",
    rx: "3.5",
    stroke: fg,
    strokeOpacity: "0.4",
    fill: "none"
  }), /*#__PURE__*/React.createElement("rect", {
    x: "2",
    y: "2",
    width: "18",
    height: "9",
    rx: "2",
    fill: fg
  }), /*#__PURE__*/React.createElement("path", {
    d: "M24.5 4.2v4.6c1-.4 1-4.2 0-4.6Z",
    fill: fg,
    fillOpacity: "0.5"
  }))));
}
function PhoneFrame({
  children,
  bg = "var(--surface-card)"
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      width: 390,
      height: 844,
      borderRadius: 44,
      background: bg,
      boxShadow: "0 24px 70px rgba(23,31,40,0.24)",
      overflow: "hidden",
      display: "flex",
      flexDirection: "column",
      position: "relative",
      border: "1px solid var(--border-subtle)"
    }
  }, /*#__PURE__*/React.createElement(StatusBar, null), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minHeight: 0,
      display: "flex",
      flexDirection: "column",
      position: "relative"
    }
  }, children), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      bottom: 8,
      left: "50%",
      transform: "translateX(-50%)",
      width: 134,
      height: 5,
      borderRadius: 3,
      background: "var(--grey-900)",
      opacity: 0.9,
      zIndex: 60
    }
  }));
}

// ── Bottom sheet ────────────────────────────────────────────
function BottomSheet({
  open,
  onClose,
  title,
  children
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      inset: 0,
      zIndex: 50,
      overflow: "hidden",
      pointerEvents: open ? "auto" : "none"
    }
  }, /*#__PURE__*/React.createElement("div", {
    onClick: onClose,
    style: {
      position: "absolute",
      inset: 0,
      background: "var(--surface-scrim)",
      opacity: open ? 1 : 0,
      transition: "opacity var(--dur-base) var(--ease-standard)"
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      left: 0,
      right: 0,
      bottom: 0,
      background: "var(--surface-card)",
      borderRadius: "var(--radius-xl) var(--radius-xl) 0 0",
      boxShadow: "var(--shadow-sheet)",
      padding: "8px 20px calc(20px + env(safe-area-inset-bottom,8px))",
      transform: open ? "translateY(0)" : "translateY(100%)",
      transition: "transform var(--dur-slow) var(--ease-out)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 40,
      height: 4,
      borderRadius: 2,
      background: "var(--grey-200)",
      margin: "0 auto 16px"
    }
  }), title && /*#__PURE__*/React.createElement("h3", {
    style: {
      margin: "0 0 16px",
      font: "var(--font-title-2)",
      color: "var(--text-strong)",
      letterSpacing: "var(--tracking-normal)"
    }
  }, title), children));
}

// ── Toast (transient confirmation) ──────────────────────────
function Toast({
  show,
  children
}) {
  return /*#__PURE__*/React.createElement("div", {
    "aria-live": "polite",
    style: {
      position: "absolute",
      left: 20,
      right: 20,
      bottom: 112,
      zIndex: 70,
      display: "flex",
      justifyContent: "center",
      pointerEvents: "none",
      opacity: show ? 1 : 0,
      transform: show ? "translateY(0)" : "translateY(10px)",
      transition: "opacity var(--dur-base) var(--ease-standard), transform var(--dur-base) var(--ease-standard)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 8,
      padding: "12px 18px",
      borderRadius: "var(--radius-full)",
      background: "rgba(23,31,40,0.9)",
      color: "#fff",
      font: "var(--font-body-2)",
      letterSpacing: "var(--tracking-normal)",
      boxShadow: "0 8px 24px rgba(23,31,40,0.28)"
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: "15",
    height: "15",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "#6EE7A0",
    strokeWidth: "2.6",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    "aria-hidden": "true"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M4.5 12.5 9.5 17.5 19.5 7"
  })), children));
}
Object.assign(window, {
  PhoneFrame,
  StatusBar,
  BottomSheet,
  Toast
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/sai/frame.jsx", error: String((e && e.message) || e) }); }

// ui_kits/sai/screens-a.jsx
try { (() => {
/* 사이 screens — Home · Create · Invite */
const {
  Button,
  BottomCTA,
  Badge,
  Border,
  ListRow,
  ListHeader,
  Asset,
  Paragraph,
  NavigationBar,
  TopBar,
  TextField,
  Switch,
  Chip,
  Avatar,
  AvatarStack,
  Icon,
  ICON_NAMES
} = window.TDSDesignSystem_58842e;
const TONE_FG = {
  primary: "var(--primary)",
  positive: "var(--green-600)",
  negative: "var(--red-600)",
  warning: "#B77900",
  neutral: "var(--grey-700)"
};

// tappable icon with an edit affordance → opens the icon picker
function EditableIcon({
  icon,
  tone = "primary",
  size = 44,
  onEdit
}) {
  return /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: e => {
      e.stopPropagation();
      onEdit();
    },
    style: {
      position: "relative",
      border: "none",
      background: "transparent",
      padding: 0,
      cursor: "pointer",
      WebkitTapHighlightColor: "transparent"
    }
  }, /*#__PURE__*/React.createElement(Asset, {
    tone: tone,
    size: size,
    shape: "squircle"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: icon,
    color: TONE_FG[tone],
    size: Math.round(size * 0.5)
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      position: "absolute",
      right: -3,
      bottom: -3,
      width: 19,
      height: 19,
      borderRadius: "50%",
      background: "var(--grey-800)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      border: "2px solid var(--surface-card)"
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "edit",
    size: 10,
    color: "#fff",
    strokeWidth: 2.4
  })));
}

// ── April 2026 range calendar (from ~ to) ──────────────────
function RangeCalendar({
  range,
  onPick
}) {
  const M = window.SAI_MONTH;
  const cells = [];
  for (let i = 0; i < M.firstDow; i++) cells.push(null);
  for (let d = 1; d <= M.days; d++) cells.push(d);
  const from = range.from,
    to = range.to;
  const lo = to != null ? Math.min(from, to) : from;
  const hi = to != null ? Math.max(from, to) : from;
  const band = d => from != null && d >= lo && d <= hi;
  const isEnd = d => d === from || d === to || to == null && d === from;
  const r = "var(--radius-full)";
  return /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "4px 20px 0"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "repeat(7, 1fr)",
      marginBottom: 4
    }
  }, window.SAI_DOW.map((w, i) => /*#__PURE__*/React.createElement("span", {
    key: w,
    style: {
      textAlign: "center",
      padding: "4px 0",
      font: "var(--font-caption-2)",
      color: i === 0 ? "var(--negative)" : "var(--text-weak)"
    }
  }, w))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "repeat(7, 1fr)",
      rowGap: 2
    }
  }, cells.map((d, idx) => {
    if (d == null) return /*#__PURE__*/React.createElement("span", {
      key: "b" + idx
    });
    const on = band(d),
      end = isEnd(d);
    return /*#__PURE__*/React.createElement("div", {
      key: d,
      style: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: 40,
        background: on ? "var(--available-bg)" : "transparent",
        borderTopLeftRadius: d === lo ? r : 0,
        borderBottomLeftRadius: d === lo ? r : 0,
        borderTopRightRadius: d === hi ? r : 0,
        borderBottomRightRadius: d === hi ? r : 0
      }
    }, /*#__PURE__*/React.createElement("button", {
      type: "button",
      onClick: () => onPick(d),
      style: {
        width: 38,
        height: 38,
        borderRadius: "50%",
        border: "none",
        cursor: "pointer",
        background: end ? "var(--primary)" : "transparent",
        color: end ? "#fff" : on ? "var(--primary-weak-fg)" : "var(--text-body)",
        font: end ? "var(--font-label)" : "var(--font-body-2)",
        WebkitTapHighlightColor: "transparent"
      }
    }, d));
  })));
}

// ── HOME ────────────────────────────────────────────────────
function MeetingsScreen({
  go,
  openThread,
  empty,
  live,
  notifSeen,
  onNotifSeen
}) {
  const [notifOpen, setNotifOpen] = React.useState(false);
  const openNotif = () => {
    setNotifOpen(true);
    onNotifSeen && onNotifSeen();
  };
  const M = window.SAI_MEETINGS;
  const liveM = live || M.live;
  const chat = window.SAI_CHAT_BY_ID;
  const MeetingCard = window.MeetingCard;
  const open = id => {
    if (chat[id]) openThread(chat[id]);
  };
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      height: "100%",
      background: "var(--surface-page)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "14px 20px 4px"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      font: "var(--font-title-1)",
      color: "var(--text-strong)",
      letterSpacing: "var(--tracking-tight)"
    }
  }, "\uD68C\uC758"), /*#__PURE__*/React.createElement(window.BellButton, {
    onClick: openNotif,
    dot: !empty && !notifSeen
  })), empty ? /*#__PURE__*/React.createElement(window.EmptyState, {
    emoji: "\uD83D\uDDD3\uFE0F",
    title: "\uC9C4\uD589 \uC911\uC778 \uD68C\uC758\uAC00 \uC5C6\uC5B4\uC694",
    desc: /*#__PURE__*/React.createElement(React.Fragment, null, "\uCC38\uC11D\uC790\uB294 \uC2EB\uC740 \uC2DC\uAC04\uB9CC \uC9C0\uC6B0\uBA74 \uB3FC\uC694.", /*#__PURE__*/React.createElement("br", null), "\uCCAB \uD68C\uC758\uB97C \uB9CC\uB4E4\uC5B4\uBCF4\uC138\uC694."),
    action: /*#__PURE__*/React.createElement(Button, {
      variant: "primary",
      size: "lg",
      fullWidth: true,
      onClick: () => go("create")
    }, "\uD68C\uC758 \uB9CC\uB4E4\uAE30")
  }) : /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      overflowY: "auto",
      padding: "12px 20px 96px"
    }
  }, liveM.status === "collecting" ? /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(ListHeader, {
    title: "\uC9C4\uD589 \uC911\uC778 \uD68C\uC758",
    style: {
      padding: "16px 0 8px"
    }
  }), /*#__PURE__*/React.createElement(MeetingCard, {
    m: liveM,
    onOpen: () => go("detail")
  }), /*#__PURE__*/React.createElement(ListHeader, {
    title: "\uC608\uC815\uB41C \uD68C\uC758",
    style: {
      padding: "26px 0 8px"
    }
  }), /*#__PURE__*/React.createElement(MeetingCard, {
    m: M.q,
    onOpen: () => open("q")
  })) : /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(ListHeader, {
    title: "\uC608\uC815\uB41C \uD68C\uC758",
    style: {
      padding: "16px 0 8px"
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 10
    }
  }, /*#__PURE__*/React.createElement(MeetingCard, {
    m: liveM,
    onOpen: () => go("detail")
  }), /*#__PURE__*/React.createElement(MeetingCard, {
    m: M.q,
    onOpen: () => open("q")
  }))), /*#__PURE__*/React.createElement(ListHeader, {
    title: "\uC9C0\uB09C \uD68C\uC758",
    style: {
      padding: "26px 0 8px"
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 10
    }
  }, /*#__PURE__*/React.createElement(MeetingCard, {
    m: M.retro,
    onOpen: () => open("retro")
  }), /*#__PURE__*/React.createElement(MeetingCard, {
    m: M.onboard,
    onOpen: () => openThread({
      id: "onboard",
      name: M.onboard.name,
      people: M.onboard.total
    })
  }))), !empty && /*#__PURE__*/React.createElement(window.Fab, {
    onClick: () => go("create")
  }), /*#__PURE__*/React.createElement(window.NotifSheet, {
    open: notifOpen,
    onClose: () => setNotifOpen(false),
    go: go,
    openThread: openThread,
    empty: empty
  }));
}

// ── Location map picker ─────────────────────────────────────
const SAI_POIS = [{
  x: 28,
  y: 32,
  name: "브릿지 회의실"
}, {
  x: 71,
  y: 26,
  name: "센터필드 라운지"
}, {
  x: 45,
  y: 66,
  name: "카페 사이 미팅룸"
}, {
  x: 80,
  y: 73,
  name: "역삼 스테이션"
}];
function LocationMap({
  pin,
  onPick
}) {
  const handle = e => {
    const r = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width * 100;
    const y = (e.clientY - r.top) / r.height * 100;
    let best = null,
      bd = 1e9;
    SAI_POIS.forEach(p => {
      const d = Math.hypot(p.x - x, p.y - y);
      if (d < bd) {
        bd = d;
        best = p;
      }
    });
    if (best && bd < 13) onPick({
      x: best.x,
      y: best.y
    }, best.name);else onPick({
      x,
      y
    }, "지도에서 선택한 위치");
  };
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      height: 220,
      borderRadius: "var(--radius-lg)",
      overflow: "hidden",
      border: "1px solid var(--border-subtle)",
      boxShadow: "var(--shadow-sm)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    onClick: handle,
    style: {
      position: "absolute",
      inset: 0,
      cursor: "crosshair",
      background: "repeating-linear-gradient(0deg, transparent 0 30px, rgba(255,255,255,.85) 30px 35px), repeating-linear-gradient(90deg, transparent 0 38px, rgba(255,255,255,.85) 38px 43px), #E6ECE3"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      left: "5%",
      top: "55%",
      width: "32%",
      height: "36%",
      background: "#D6E8C9",
      borderRadius: 12
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      right: "-10%",
      top: "-12%",
      width: "48%",
      height: "44%",
      background: "#CFE3F5",
      borderRadius: "0 0 0 70px",
      transform: "rotate(-8deg)"
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      left: "-10%",
      top: "40%",
      width: "130%",
      height: 13,
      background: "#fff",
      transform: "rotate(-14deg)"
    }
  })), SAI_POIS.map(p => /*#__PURE__*/React.createElement("button", {
    key: p.name,
    type: "button",
    onClick: () => onPick({
      x: p.x,
      y: p.y
    }, p.name),
    style: {
      position: "absolute",
      left: `${p.x}%`,
      top: `${p.y}%`,
      transform: "translate(-50%,-50%)",
      display: "flex",
      alignItems: "center",
      gap: 5,
      padding: "3px 9px 3px 6px",
      background: "rgba(255,255,255,.94)",
      border: "1px solid var(--border-subtle)",
      borderRadius: "var(--radius-full)",
      boxShadow: "var(--shadow-sm)",
      cursor: "pointer",
      WebkitTapHighlightColor: "transparent"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 8,
      height: 8,
      borderRadius: "50%",
      background: "var(--primary)",
      flexShrink: 0
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      font: "var(--font-caption-2)",
      color: "var(--text-strong)",
      whiteSpace: "nowrap"
    }
  }, p.name))), pin && /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      left: `${pin.x}%`,
      top: `${pin.y}%`,
      transform: "translate(-50%,-100%)",
      pointerEvents: "none",
      filter: "drop-shadow(0 3px 4px rgba(23,31,40,.28))"
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "pin",
    size: 34,
    color: "var(--primary)"
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      left: 12,
      bottom: 12,
      padding: "5px 11px",
      borderRadius: "var(--radius-full)",
      background: "rgba(23,31,40,.72)",
      color: "#fff",
      font: "var(--font-caption-2)",
      pointerEvents: "none"
    }
  }, "\uC9C0\uB3C4\uB97C \uB20C\uB7EC \uC704\uCE58\uB97C \uC9C0\uC815\uD558\uC138\uC694"));
}

// ── Swipe-to-delete row (reveal on left swipe; hidden otherwise) ──
function SwipeRow({
  children,
  onDelete,
  onTap
}) {
  const REVEAL = 92;
  const [x, setX] = React.useState(0);
  const r = React.useRef({
    startX: 0,
    base: 0,
    drag: false,
    moved: false,
    x: 0
  });
  const set = v => {
    r.current.x = v;
    setX(v);
  };
  const down = e => {
    r.current.startX = e.clientX;
    r.current.base = r.current.x;
    r.current.drag = true;
    r.current.moved = false;
    e.currentTarget.setPointerCapture?.(e.pointerId);
  };
  const move = e => {
    if (!r.current.drag) return;
    const d = e.clientX - r.current.startX;
    if (Math.abs(d) > 4) r.current.moved = true;
    set(Math.max(-REVEAL, Math.min(0, r.current.base + d)));
  };
  const up = () => {
    if (!r.current.drag) return;
    r.current.drag = false;
    set(r.current.x < -REVEAL / 2 ? -REVEAL : 0);
  };
  const tap = () => {
    if (r.current.moved) return;
    if (r.current.x < 0) {
      set(0);
      return;
    }
    onTap && onTap();
  };
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      overflow: "hidden",
      background: "var(--negative)"
    }
  }, /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: () => {
      set(0);
      onDelete();
    },
    style: {
      position: "absolute",
      right: 0,
      top: 0,
      bottom: 0,
      width: REVEAL,
      border: "none",
      background: "var(--negative)",
      color: "#fff",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      gap: 3,
      cursor: "pointer",
      WebkitTapHighlightColor: "transparent"
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "trash",
    size: 20,
    color: "#fff"
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      font: "var(--font-caption-2)",
      color: "#fff"
    }
  }, "\uC0AD\uC81C")), /*#__PURE__*/React.createElement("div", {
    onPointerDown: down,
    onPointerMove: move,
    onPointerUp: up,
    onPointerCancel: up,
    onClick: tap,
    style: {
      position: "relative",
      transform: `translateX(${x}px)`,
      transition: r.current.drag ? "none" : "transform var(--dur-base) var(--ease-standard)",
      background: "var(--surface-card)",
      touchAction: "pan-y",
      cursor: onTap ? "pointer" : "default"
    }
  }, children));
}

// ── CREATE ──────────────────────────────────────────────────
const SAI_CONTACTS = [{
  name: "박민서",
  sub: "디자인팀"
}, {
  name: "최수아",
  sub: "프로덕트"
}, {
  name: "정하준",
  sub: "엔지니어링"
}, {
  name: "윤도윤",
  sub: "마케팅"
}, {
  name: "강서연",
  sub: "디자인팀"
}, {
  name: "임채원",
  sub: "리서치"
}];
function CreateScreen({
  go,
  back,
  state,
  setState
}) {
  const {
    name,
    range,
    days,
    times,
    location,
    participants
  } = state;
  const [mapOpen, setMapOpen] = React.useState(false);
  const [pin, setPin] = React.useState(null);
  const [inviteOpen, setInviteOpen] = React.useState(false);
  const [linkCopied, setLinkCopied] = React.useState(false);
  const [statusIdx, setStatusIdx] = React.useState(null);
  const toggleTime = k => setState(s => ({
    ...s,
    times: s.times.includes(k) ? s.times.filter(t => t !== k) : [...s.times, k]
  }));
  const toggleReq = i => setState(s => ({
    ...s,
    participants: s.participants.map((p, idx) => idx === i ? {
      ...p,
      required: !p.required
    } : p)
  }));
  const invite = c => setState(s => s.participants.some(p => p.name === c.name) ? s : {
    ...s,
    participants: [...s.participants, {
      name: c.name,
      required: false,
      status: "pending"
    }]
  });
  const markResponded = i => {
    setState(s => ({
      ...s,
      participants: s.participants.map((p, idx) => idx === i ? {
        ...p,
        status: "responded"
      } : p)
    }));
    setStatusIdx(null);
  };
  const removeParticipant = i => setState(s => ({
    ...s,
    participants: s.participants.filter((_, idx) => idx !== i)
  }));
  const pickLocation = (p, label) => {
    setPin(p);
    setState(s => ({
      ...s,
      location: label
    }));
  };
  const pickDate = d => setState(s => {
    let {
      from,
      to
    } = s.range;
    if (from == null || to != null) {
      from = d;
      to = null;
    } else {
      to = d;
    }
    if (to != null) {
      const lo = Math.min(from, to),
        hi = Math.max(from, to);
      return {
        ...s,
        range: {
          from: lo,
          to: hi
        },
        days: window.saiDaysInRange(lo, hi)
      };
    }
    return {
      ...s,
      range: {
        from,
        to: null
      },
      days: [window.saiDay(from)]
    };
  });
  const rangeText = range.from == null ? "날짜를 골라요" : range.to != null ? `4월 ${range.from}일 ~ 4월 ${range.to}일 · ${days.length}일간` : `4월 ${range.from}일 · 종료일을 골라요`;
  const canNext = name.trim() && days.length && times.length && range.to != null;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      height: "100%",
      background: "var(--surface-card)"
    }
  }, /*#__PURE__*/React.createElement(NavigationBar, {
    backIcon: "\u2715",
    onBack: back,
    title: "\uD68C\uC758 \uB9CC\uB4E4\uAE30",
    titleVisible: false
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      overflowY: "auto"
    }
  }, /*#__PURE__*/React.createElement(TopBar, {
    title: "\uC5B4\uB5A4 \uD68C\uC758\uC778\uAC00\uC694?",
    description: "\uAE30\uAC04\uACFC \uC2DC\uAC04\uB300\uB9CC \uC5F4\uC5B4\uB450\uBA74, \uB098\uBA38\uC9C0\uB294 \uC0AC\uC774\uAC00 \uC815\uB9AC\uD574\uC694."
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "8px 20px 0"
    }
  }, /*#__PURE__*/React.createElement(TextField, {
    label: "\uD68C\uC758 \uC774\uB984",
    value: name,
    onChange: v => setState(s => ({
      ...s,
      name: v
    })),
    maxLength: 20
  })), /*#__PURE__*/React.createElement(ListHeader, {
    title: "\uAE30\uAC04",
    description: "\uC5B8\uC81C\uBD80\uD130 \uC5B8\uC81C\uAE4C\uC9C0 \uC7A1\uC744\uAE4C\uC694?"
  }), /*#__PURE__*/React.createElement(RangeCalendar, {
    range: range,
    onPick: pickDate
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "10px 20px 0"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 8,
      padding: "12px 14px",
      background: "var(--surface-sunken)",
      borderRadius: "var(--radius-md)"
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "calendar",
    size: 18,
    color: "var(--primary)"
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      font: "var(--font-body-2)",
      color: range.from == null ? "var(--text-weak)" : "var(--text-strong)",
      letterSpacing: "var(--tracking-normal)"
    }
  }, rangeText))), /*#__PURE__*/React.createElement(ListHeader, {
    title: "\uC2DC\uAC04\uB300",
    description: "\uD68C\uC758\uB97C \uC5F4 \uC218 \uC788\uB294 \uC2DC\uAC04\uB9CC \uB0A8\uACA8\uC694"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "repeat(4, 1fr)",
      gap: 8,
      padding: "0 20px"
    }
  }, window.SAI_ALL_TIMES.map(t => /*#__PURE__*/React.createElement(Chip, {
    key: t.key,
    tone: "primary",
    selected: times.includes(t.key),
    onClick: () => toggleTime(t.key),
    style: {
      width: "100%",
      padding: "0 4px",
      justifyContent: "center"
    }
  }, t.label))), /*#__PURE__*/React.createElement(ListHeader, {
    title: "\uC704\uCE58",
    description: "\uC628\uB77C\uC778 \uD68C\uC758\uBA74 \uBE44\uC6CC\uB46C\uB3C4 \uB3FC\uC694",
    action: /*#__PURE__*/React.createElement(Button, {
      variant: "ghost",
      size: "sm",
      onClick: () => setMapOpen(o => !o)
    }, mapOpen ? "지도 닫기" : "지도에서 찾기")
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "0 20px",
      display: "flex",
      alignItems: "flex-end",
      gap: 10
    }
  }, /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: () => setMapOpen(o => !o),
    "aria-label": "\uC9C0\uB3C4 \uC5F4\uAE30",
    style: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      width: 44,
      height: 44,
      borderRadius: "var(--radius-md)",
      flexShrink: 0,
      cursor: "pointer",
      border: mapOpen ? "1.5px solid var(--primary)" : "1.5px solid transparent",
      background: mapOpen ? "var(--primary-weak-bg)" : "var(--fill-weak)",
      color: mapOpen ? "var(--primary)" : "var(--grey-600)",
      WebkitTapHighlightColor: "transparent"
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "pin",
    size: 22
  })), /*#__PURE__*/React.createElement(TextField, {
    label: "\uD68C\uC758 \uC7A5\uC18C",
    placeholder: "\uD68C\uC758\uC2E4 \uC774\uB984\uC774\uB098 \uC8FC\uC18C",
    value: location,
    onChange: v => setState(s => ({
      ...s,
      location: v
    })),
    style: {
      flex: 1
    }
  })), mapOpen && /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "12px 20px 0",
      animation: "sai-pop var(--dur-base) var(--ease-out)"
    }
  }, /*#__PURE__*/React.createElement(LocationMap, {
    pin: pin,
    onPick: pickLocation
  })), /*#__PURE__*/React.createElement(ListHeader, {
    title: "\uCC38\uC11D\uC790",
    description: `응답 ${participants.filter(p => p.status === "responded").length}/${participants.length}명 · 필수 ${participants.filter(p => p.required).length}명`,
    action: /*#__PURE__*/React.createElement(Button, {
      variant: "ghost",
      size: "sm",
      onClick: () => setInviteOpen(true)
    }, "\uCD08\uB300")
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      background: "var(--surface-card)"
    }
  }, participants.map((p, i) => {
    const pending = p.status === "pending";
    return /*#__PURE__*/React.createElement("div", {
      key: p.name
    }, /*#__PURE__*/React.createElement(SwipeRow, {
      onDelete: () => removeParticipant(i),
      onTap: pending ? () => setStatusIdx(i) : undefined
    }, /*#__PURE__*/React.createElement(ListRow, {
      left: /*#__PURE__*/React.createElement("span", {
        style: {
          display: "flex",
          opacity: pending ? 0.5 : 1
        }
      }, /*#__PURE__*/React.createElement(Avatar, {
        name: p.name,
        index: i,
        size: 40
      })),
      title: p.name,
      description: /*#__PURE__*/React.createElement("span", {
        style: {
          display: "inline-flex",
          alignItems: "center",
          gap: 5,
          color: pending ? "#B77900" : "var(--green-600)"
        }
      }, /*#__PURE__*/React.createElement("span", {
        style: {
          width: 6,
          height: 6,
          borderRadius: "50%",
          background: "currentColor"
        }
      }), pending ? "초대함 · 응답 대기 중" : "응답 완료"),
      right: /*#__PURE__*/React.createElement("div", {
        style: {
          display: "flex",
          alignItems: "center",
          gap: 6
        }
      }, /*#__PURE__*/React.createElement("span", {
        style: {
          font: "var(--font-caption-2)",
          color: p.required ? "var(--primary)" : "var(--text-weak)"
        }
      }, "\uD544\uC218"), /*#__PURE__*/React.createElement(Switch, {
        checked: p.required,
        onChange: () => toggleReq(i)
      }))
    })), i < participants.length - 1 && /*#__PURE__*/React.createElement(Border, {
      inset: 20
    }));
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "8px 20px 0",
      font: "var(--font-caption-1)",
      color: "var(--text-weak)"
    }
  }, "\u2190 \uC0AD\uC81C\uD558\uB824\uBA74 \uC67C\uCABD\uC73C\uB85C \uBC00\uC5B4\uC694"), /*#__PURE__*/React.createElement("div", {
    style: {
      height: 16
    }
  })), /*#__PURE__*/React.createElement(BottomCTA, null, /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    size: "lg",
    fullWidth: true,
    disabled: !canNext,
    onClick: () => go("invite")
  }, "\uB2E4\uC74C")), /*#__PURE__*/React.createElement(window.BottomSheet, {
    open: inviteOpen,
    onClose: () => setInviteOpen(false),
    title: "\uCC38\uC11D\uC790 \uCD08\uB300"
  }, /*#__PURE__*/React.createElement(Paragraph, {
    typography: "body-2",
    color: "sub",
    style: {
      margin: "-8px 0 8px"
    }
  }, "\uCD08\uB300\uD558\uBA74 \uAC01\uC790 \uB9C1\uD06C\uB85C \uB4E4\uC5B4\uC640 \uC2EB\uC740 \uC2DC\uAC04\uC744 \uC9C0\uC6CC\uC694. \uC751\uB2F5\uC740 \uC5EC\uAE30\uB85C \uBAA8\uC5EC\uC694."), /*#__PURE__*/React.createElement("div", {
    style: {
      maxHeight: 296,
      overflowY: "auto",
      margin: "0 -20px"
    }
  }, SAI_CONTACTS.map((c, i) => {
    const added = participants.some(p => p.name === c.name);
    return /*#__PURE__*/React.createElement(ListRow, {
      key: c.name,
      left: /*#__PURE__*/React.createElement(Avatar, {
        name: c.name,
        index: i + 3,
        size: 40
      }),
      title: c.name,
      description: c.sub,
      onClick: added ? undefined : () => invite(c),
      right: added ? /*#__PURE__*/React.createElement("span", {
        style: {
          display: "inline-flex",
          alignItems: "center",
          gap: 4,
          font: "var(--font-caption-1)",
          color: "var(--primary)"
        }
      }, /*#__PURE__*/React.createElement(Icon, {
        name: "check",
        size: 16,
        color: "var(--primary)"
      }), "\uCD08\uB300\uD568") : /*#__PURE__*/React.createElement(Button, {
        variant: "weak",
        size: "sm",
        onClick: () => invite(c)
      }, "\uCD08\uB300")
    });
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      paddingTop: 12
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "ghost",
    size: "md",
    fullWidth: true,
    onClick: () => {
      setLinkCopied(true);
      setTimeout(() => setLinkCopied(false), 1600);
    }
  }, linkCopied ? "복사했어요 ✓" : "초대 링크 복사하기"))), /*#__PURE__*/React.createElement(window.BottomSheet, {
    open: statusIdx != null,
    onClose: () => setStatusIdx(null),
    title: statusIdx != null && participants[statusIdx] ? `${participants[statusIdx].name}님은 아직 응답 전이에요` : ""
  }, /*#__PURE__*/React.createElement(Paragraph, {
    typography: "body-2",
    color: "sub",
    style: {
      margin: "-8px 0 16px"
    }
  }, "\uCD08\uB300\uB294 \uBCF4\uB0C8\uC5B4\uC694. \uC774 \uC0AC\uB78C\uC774 \uC2EB\uC740 \uC2DC\uAC04\uC744 \uC9C0\uC6B0\uBA74 \uACB0\uACFC\uC5D0 \uBC14\uB85C \uBC18\uC601\uB3FC\uC694."), /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    size: "md",
    fullWidth: true,
    onClick: () => {
      setStatusIdx(null);
      go("veto");
    }
  }, "\uC774 \uC0AC\uB78C\uC740 \uC5B4\uB5BB\uAC8C \uC815\uD558\uB294\uC9C0 \uBCF4\uAE30"), /*#__PURE__*/React.createElement("div", {
    style: {
      height: 8
    }
  }), /*#__PURE__*/React.createElement(Button, {
    variant: "weak",
    size: "md",
    fullWidth: true,
    onClick: () => statusIdx != null && markResponded(statusIdx)
  }, "\uC751\uB2F5 \uC644\uB8CC\uB85C \uD45C\uC2DC")));
}

// ── INVITE ──────────────────────────────────────────────────
function InviteScreen({
  go,
  back,
  state
}) {
  const [copied, setCopied] = React.useState(false);
  const [toast, setToast] = React.useState(null);
  const toastRef = React.useRef(null);
  const share = msg => {
    setToast(msg);
    clearTimeout(toastRef.current);
    toastRef.current = setTimeout(() => setToast(null), 1800);
  };
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      height: "100%",
      background: "var(--surface-card)"
    }
  }, /*#__PURE__*/React.createElement(NavigationBar, {
    onBack: back,
    title: "",
    titleVisible: false
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      overflowY: "auto",
      padding: "0 20px",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      textAlign: "center"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 24,
      animation: "sai-pop var(--dur-slow) var(--ease-out)"
    }
  }, /*#__PURE__*/React.createElement(Asset, {
    emoji: "\uD83D\uDD17",
    tone: "primary",
    size: 88,
    shape: "squircle"
  })), /*#__PURE__*/React.createElement(Paragraph, {
    typography: "title-1",
    color: "strong",
    align: "center",
    style: {
      marginTop: 24
    }
  }, "\uB9C1\uD06C\uAC00 \uC900\uBE44\uB410\uC5B4\uC694"), /*#__PURE__*/React.createElement(Paragraph, {
    typography: "body-2",
    color: "sub",
    align: "center",
    style: {
      marginTop: 8
    }
  }, "\uCC38\uC11D\uC790\uC5D0\uAC8C \uB9C1\uD06C\uB97C \uBCF4\uB0B4\uBA74", "\n", "\uAC01\uC790 \uC2EB\uC740 \uC2DC\uAC04\uB9CC \uC9C0\uC6B0\uBA74 \uB3FC\uC694."), /*#__PURE__*/React.createElement("div", {
    style: {
      width: "100%",
      boxSizing: "border-box",
      marginTop: 28,
      display: "flex",
      alignItems: "center",
      gap: 10,
      padding: "14px 16px",
      background: "var(--surface-sunken)",
      borderRadius: "var(--radius-md)"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 1,
      minWidth: 0,
      textAlign: "left",
      font: "var(--font-body-2)",
      color: "var(--text-sub)",
      overflow: "hidden",
      textOverflow: "ellipsis",
      whiteSpace: "nowrap"
    }
  }, "sai.im/j/", (state.name || "회의").length ? "x7f2k9" : ""), /*#__PURE__*/React.createElement(Button, {
    variant: "weak",
    size: "sm",
    onClick: () => setCopied(true)
  }, copied ? "복사됨" : "복사")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 12,
      marginTop: 20
    }
  }, [{
    l: "카톡",
    e: "💬",
    msg: "카톡으로 링크를 보냈어요"
  }, {
    l: "문자",
    e: "✉️",
    msg: "문자로 링크를 보냈어요"
  }, {
    l: "더보기",
    e: "⋯",
    msg: "링크를 공유했어요"
  }].map(s => /*#__PURE__*/React.createElement("button", {
    key: s.l,
    type: "button",
    onClick: () => share(s.msg),
    style: {
      border: "none",
      background: "transparent",
      padding: 0,
      cursor: "pointer",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: 6,
      WebkitTapHighlightColor: "transparent"
    }
  }, /*#__PURE__*/React.createElement(Asset, {
    emoji: s.e,
    tone: "neutral",
    size: 52
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      font: "var(--font-caption-1)",
      color: "var(--text-sub)"
    }
  }, s.l))))), /*#__PURE__*/React.createElement(BottomCTA, null, /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    size: "lg",
    fullWidth: true,
    onClick: () => go("veto")
  }, "\uB0B4\uAC00 \uBA3C\uC800 \uC9C0\uC6B8\uAC8C\uC694")), /*#__PURE__*/React.createElement(window.Toast, {
    show: !!toast
  }, toast));
}
Object.assign(window, {
  MeetingsScreen,
  CreateScreen,
  InviteScreen
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/sai/screens-a.jsx", error: String((e && e.message) || e) }); }

// ui_kits/sai/screens-b.jsx
try { (() => {
/* 사이 screens — Veto · Result · Confirm (the core loop) */
const {
  Button: SB,
  BottomCTA: SBottomCTA,
  Badge: SBadge,
  Border: SBorder,
  ListRow: SListRow,
  ListHeader: SListHeader,
  Asset: SAsset,
  Paragraph: SP,
  NavigationBar: SNav,
  TopBar: STop,
  Chip: SChip,
  VetoCell: SVetoCell,
  ProposalCard: SProposalCard,
  AvatarStack: SAvatarStack,
  Icon: SIcon
} = window.TDSDesignSystem_58842e;
const slotKey = (d, t) => `${d}-${t}`;

// ── VETO (participant erases disliked times) ────────────────
function VetoScreen({
  go,
  back,
  state,
  setState,
  openThread
}) {
  const {
    days,
    times,
    myVetoes
  } = state;
  const [sheet, setSheet] = React.useState(null); // slot key awaiting a reason
  const count = Object.keys(myVetoes).length;
  const total = state.participants.length;
  const responded = state.participants.filter(p => p.status === "responded").length;
  const rangeText = state.range.to != null ? `4월 ${state.range.from}일 ~ ${state.range.to}일` : `4월 ${state.range.from}일`;
  // 다 지웠어요 → 내 응답이 전역으로 반영되고 집계로 이동
  const done = () => {
    setState(s => ({
      ...s,
      participants: s.participants.map(p => p.me ? {
        ...p,
        status: "responded"
      } : p)
    }));
    go("result");
  };
  const toggle = key => {
    setState(s => {
      const next = {
        ...s.myVetoes
      };
      if (next[key]) {
        delete next[key];
        return {
          ...s,
          myVetoes: next
        };
      }
      next[key] = true;
      return {
        ...s,
        myVetoes: next
      };
    });
    if (!myVetoes[key]) setSheet(key);
  };
  const setReason = reason => {
    setState(s => ({
      ...s,
      myVetoes: {
        ...s.myVetoes,
        [sheet]: reason || true
      }
    }));
    setSheet(null);
  };
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      height: "100%",
      background: "var(--surface-card)"
    }
  }, /*#__PURE__*/React.createElement(SNav, {
    onBack: back,
    title: state.name,
    titleVisible: false,
    right: openThread ? /*#__PURE__*/React.createElement("button", {
      type: "button",
      onClick: () => openThread(window.SAI_CHAT_BY_ID.live),
      "aria-label": "\uC775\uBA85 \uCC44\uD305",
      style: {
        width: 36,
        height: 36,
        border: "none",
        background: "transparent",
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        WebkitTapHighlightColor: "transparent"
      }
    }, /*#__PURE__*/React.createElement(window.MsgIcon, {
      size: 22,
      color: "var(--grey-600)"
    })) : null
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      overflowY: "auto"
    }
  }, /*#__PURE__*/React.createElement(STop, {
    title: "\uC2EB\uC740 \uC2DC\uAC04\uC744 \uC9C0\uC6CC\uC694",
    description: `${state.name} · ${rangeText} · ${total}명`
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 8,
      margin: "0 20px 8px",
      padding: "10px 14px",
      background: "var(--surface-sunken)",
      borderRadius: "var(--radius-md)"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 15
    }
  }, "\uD83D\uDD76\uFE0F"), /*#__PURE__*/React.createElement("span", {
    style: {
      font: "var(--font-caption-1)",
      color: "var(--text-sub)",
      letterSpacing: "var(--tracking-normal)",
      flex: 1
    }
  }, "\uC775\uBA85\uC73C\uB85C \uC9D1\uACC4\uB3FC\uC694. \uC9C0\uAE08\uAE4C\uC9C0 ", responded, "\uBA85\uC774 \uC9C0\uC6E0\uC5B4\uC694.")), days.map(d => {
    const mineInDay = window.SAI_ALL_TIMES.filter(t => times.includes(t.key)).filter(t => myVetoes[slotKey(d.key, t.key)]).length;
    return /*#__PURE__*/React.createElement("div", {
      key: d.key
    }, /*#__PURE__*/React.createElement(SListHeader, {
      title: d.label,
      description: mineInDay > 0 ? `${mineInDay}개 지웠어요` : null,
      style: {
        padding: "16px 20px 8px"
      }
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "grid",
        gridTemplateColumns: "repeat(3, 1fr)",
        gap: 8,
        padding: "0 20px"
      }
    }, window.SAI_ALL_TIMES.filter(t => times.includes(t.key)).map(t => {
      const key = slotKey(d.key, t.key);
      return /*#__PURE__*/React.createElement(SVetoCell, {
        key: key,
        label: t.label.replace(/(오전|오후|낮|저녁) /, ""),
        sublabel: t.label.split(" ")[0],
        vetoed: !!myVetoes[key],
        onToggle: () => toggle(key)
      });
    })));
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      height: 24
    }
  })), /*#__PURE__*/React.createElement(SBottomCTA, null, /*#__PURE__*/React.createElement(SB, {
    variant: "primary",
    size: "lg",
    fullWidth: true,
    onClick: done
  }, count > 0 ? `다 지웠어요 · ${count}개` : "모든 시간 괜찮아요")), /*#__PURE__*/React.createElement(window.BottomSheet, {
    open: !!sheet,
    onClose: () => setSheet(null),
    title: "\uC65C \uBD80\uB2F4\uC2A4\uB7EC\uC6B4\uAC00\uC694?"
  }, /*#__PURE__*/React.createElement(SP, {
    typography: "body-2",
    color: "sub",
    style: {
      margin: "-8px 0 16px"
    }
  }, "\uC0AC\uC720\uB294 \uC22B\uC790\uB85C\uB9CC \uBAA8\uC5EC\uC694. \uC774\uB984\uC740 \uBD99\uC9C0 \uC54A\uC544\uC694. (\uC120\uD0DD)"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexWrap: "wrap",
      gap: 8,
      marginBottom: 20
    }
  }, window.SAI_REASONS.map(r => /*#__PURE__*/React.createElement(SChip, {
    key: r,
    tone: "negative",
    selected: sheet && state.myVetoes[sheet] === r,
    onClick: () => setReason(r)
  }, r))), /*#__PURE__*/React.createElement(SB, {
    variant: "weak",
    size: "md",
    fullWidth: true,
    onClick: () => setReason(null)
  }, "\uC0AC\uC720 \uC5C6\uC774 \uC9C0\uC6B0\uAE30")));
}

// ── RESULT (host reviews the tally) ─────────────────────────
function computeSlots(state) {
  const out = [];
  state.days.forEach(d => {
    window.SAI_ALL_TIMES.filter(t => state.times.includes(t.key)).forEach(t => {
      const key = slotKey(d.key, t.key);
      const seed = window.SAI_SEED_VETOES[key] || [];
      const mine = state.myVetoes[key];
      const reasons = [...seed];
      if (mine && typeof mine === "string") reasons.push(mine);
      const vetoCount = seed.length + (mine ? 1 : 0);
      const tally = {};
      reasons.forEach(r => {
        tally[r] = (tally[r] || 0) + 1;
      });
      out.push({
        key,
        day: d,
        time: t,
        vetoCount,
        reasons: Object.entries(tally).map(([label, count]) => ({
          label,
          count
        }))
      });
    });
  });
  return out.sort((a, b) => a.vetoCount - b.vetoCount);
}
function ResultScreen({
  go,
  back,
  state,
  choose
}) {
  const [view, setView] = React.useState("picks"); // picks | grid
  const slots = React.useMemo(() => computeSlots(state), [state]);
  const picks = slots.slice(0, 3);
  const best = picks[0];
  const total = state.participants.length;
  const responded = state.participants.filter(p => p.status === "responded").length;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      height: "100%",
      background: "var(--surface-page)"
    }
  }, /*#__PURE__*/React.createElement(SNav, {
    onBack: () => {
      if (view === "grid") setView("picks");else back();
    },
    title: "\uC88B\uC740 \uC2DC\uAC04\uC744 \uCC3E\uC558\uC5B4\uC694",
    titleVisible: view === "grid"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      overflowY: "auto"
    }
  }, view === "picks" ? /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(STop, {
    title: "\uC88B\uC740 \uC2DC\uAC04\uC744 \uCC3E\uC558\uC5B4\uC694",
    description: best.vetoCount === 0 ? "아무도 부담스러워하지 않는 시간이 있어요." : "가장 적게 걸리는 시간부터 보여드려요."
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 8,
      padding: "0 20px 12px"
    }
  }, /*#__PURE__*/React.createElement(SAvatarStack, {
    people: window.SAI_MEETINGS.live.people,
    max: 6,
    anonymous: true,
    size: 26
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      font: "var(--font-caption-1)",
      color: "var(--text-weak)"
    }
  }, responded === total ? `${total}명 모두 응답했어요` : `${total}명 중 ${responded}명 응답 · 중간 집계예요`)), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 12,
      padding: "0 20px"
    }
  }, picks.map((s, i) => /*#__PURE__*/React.createElement(SProposalCard, {
    key: s.key,
    recommended: i === 0,
    date: `${s.day.label}`,
    time: s.time.label,
    vetoCount: s.vetoCount,
    reasons: s.reasons,
    confirmLabel: i === 0 ? "이 시간으로 정하기" : "이 시간으로 정하기",
    onConfirm: () => {
      choose(s);
      go("confirm");
    }
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "18px 20px 8px"
    }
  }, /*#__PURE__*/React.createElement(SB, {
    variant: "ghost",
    size: "md",
    fullWidth: true,
    onClick: () => setView("grid")
  }, "\uC804\uCCB4 \uC2DC\uAC04 \uAC70\uBD80 \uD604\uD669 \uBCF4\uAE30")), /*#__PURE__*/React.createElement("div", {
    style: {
      height: 12
    }
  })) : /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "8px 20px 24px"
    }
  }, /*#__PURE__*/React.createElement(SP, {
    typography: "body-2",
    color: "sub",
    style: {
      margin: "0 0 16px"
    }
  }, "\uAC01 \uC2DC\uAC04\uC744 \uBA87 \uBA85\uC774 \uC9C0\uC6E0\uB294\uC9C0, \uC0AC\uC720\uAE4C\uC9C0 \uC775\uBA85\uC73C\uB85C \uBAA8\uC544\uC11C \uBCF4\uC5EC\uB4DC\uB824\uC694."), state.days.map(d => /*#__PURE__*/React.createElement("div", {
    key: d.key,
    style: {
      marginBottom: 20
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      font: "var(--font-title-3)",
      color: "var(--text-strong)",
      marginBottom: 8,
      letterSpacing: "var(--tracking-normal)"
    }
  }, d.label), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 8
    }
  }, window.SAI_ALL_TIMES.filter(t => state.times.includes(t.key)).map(t => {
    const s = slots.find(x => x.key === slotKey(d.key, t.key));
    return /*#__PURE__*/React.createElement(SVetoCell, {
      key: t.key,
      mode: "aggregate",
      label: t.label.replace(/(오전|오후|낮|저녁) /, ""),
      sublabel: t.label.split(" ")[0],
      vetoCount: s.vetoCount,
      totalPeople: window.SAI_TOTAL,
      reasons: s.reasons
    });
  })))), /*#__PURE__*/React.createElement(SB, {
    variant: "weak",
    size: "lg",
    fullWidth: true,
    onClick: () => setView("picks")
  }, "\uCD94\uCC9C \uC2DC\uAC04\uC73C\uB85C \uB3CC\uC544\uAC00\uAE30"))));
}

// ── CONFIRM (done) ──────────────────────────────────────────
function ConfirmScreen({
  go,
  chosen,
  state
}) {
  const [calAdded, setCalAdded] = React.useState(false);
  const addCal = () => {
    if (calAdded) return;
    setCalAdded(true);
    setTimeout(() => go("home"), 1100);
  };
  const meetingName = state && state.name || "주간 디자인 리뷰";
  const location = state && state.location;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      height: "100%",
      background: "var(--surface-card)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      overflowY: "auto",
      padding: "0 20px",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      textAlign: "center"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 48,
      animation: "sai-pop var(--dur-slow) var(--ease-out)"
    }
  }, /*#__PURE__*/React.createElement(SAsset, {
    emoji: "\uD83C\uDF89",
    tone: "primary",
    size: 92,
    shape: "squircle"
  })), /*#__PURE__*/React.createElement(SP, {
    typography: "title-1",
    color: "strong",
    align: "center",
    style: {
      marginTop: 24
    }
  }, "\uD68C\uC758 \uC2DC\uAC04\uC744 \uC815\uD588\uC5B4\uC694"), /*#__PURE__*/React.createElement(SP, {
    typography: "body-2",
    color: "sub",
    align: "center",
    style: {
      marginTop: 8
    }
  }, "\uCC38\uC11D\uC790 \uBAA8\uB450\uC5D0\uAC8C \uC54C\uB9BC\uC744 \uBCF4\uB0C8\uC5B4\uC694."), /*#__PURE__*/React.createElement("div", {
    style: {
      width: "100%",
      marginTop: 20,
      padding: "12px 14px",
      borderRadius: "var(--radius-lg)",
      background: "var(--surface-sunken)",
      display: "flex",
      alignItems: "center",
      gap: 10,
      textAlign: "left"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 18
    }
  }, "\uD83D\uDD76\uFE0F"), /*#__PURE__*/React.createElement("span", {
    style: {
      font: "var(--font-caption-1)",
      color: "var(--text-sub)",
      letterSpacing: "var(--tracking-normal)"
    }
  }, "\uB204\uAC00 \uC5B4\uB5A4 \uC2DC\uAC04\uC744 \uC9C0\uC6E0\uB294\uC9C0\uB294 \uB05D\uAE4C\uC9C0 \uBE44\uBC00\uC774\uC5D0\uC694. \uC815\uD574\uC9C4 \uC2DC\uAC04\uB9CC \uBAA8\uB450\uC5D0\uAC8C \uACF5\uC720\uB3FC\uC694.")), /*#__PURE__*/React.createElement("div", {
    style: {
      width: "100%",
      marginTop: 28,
      padding: 20,
      borderRadius: "var(--radius-xl)",
      background: "var(--surface-sunken)",
      textAlign: "left"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      font: "var(--font-caption-1)",
      color: "var(--text-sub)"
    }
  }, chosen ? chosen.day.label : "4월 2일 화요일"), /*#__PURE__*/React.createElement("div", {
    style: {
      font: "var(--font-display-2)",
      color: "var(--text-strong)",
      letterSpacing: "var(--tracking-tight)",
      margin: "4px 0 14px"
    }
  }, chosen ? chosen.time.label : "오전 10시"), /*#__PURE__*/React.createElement(SBorder, null), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      marginTop: 14
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      font: "var(--font-body-2)",
      color: "var(--text-sub)"
    }
  }, meetingName), /*#__PURE__*/React.createElement(SAvatarStack, {
    people: ["김", "이", "박", "정", "최", "한"],
    max: 5,
    size: 28
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 6,
      marginTop: 10,
      font: "var(--font-body-2)",
      color: "var(--text-sub)"
    }
  }, /*#__PURE__*/React.createElement(SIcon, {
    name: "pin",
    size: 16,
    color: "var(--grey-500)"
  }), /*#__PURE__*/React.createElement("span", null, location ? location : "장소 미정 · 온라인")), chosen && chosen.vetoCount === 0 && /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 14,
      padding: "10px 12px",
      borderRadius: "var(--radius-md)",
      background: "var(--available-bg)",
      font: "var(--font-caption-1)",
      color: "var(--primary-weak-fg)"
    }
  }, "\uD83D\uDE46 \uC544\uBB34\uB3C4 \uBD80\uB2F4\uC2A4\uB7EC\uC6CC\uD558\uC9C0 \uC54A\uC740 \uC2DC\uAC04\uC774\uC5D0\uC694"))), /*#__PURE__*/React.createElement(SBottomCTA, {
    gradient: false
  }, /*#__PURE__*/React.createElement(SB, {
    variant: "weak",
    size: "lg",
    onClick: () => go("meetings"),
    style: {
      flex: 1
    }
  }, "\uD68C\uC758 \uBAA9\uB85D"), /*#__PURE__*/React.createElement(SB, {
    variant: "primary",
    size: "lg",
    onClick: addCal,
    style: {
      flex: 2
    }
  }, calAdded ? "추가했어요 ✓" : "캘린더에 추가")), /*#__PURE__*/React.createElement(window.Toast, {
    show: calAdded
  }, "\uCE98\uB9B0\uB354\uC5D0 \uCD94\uAC00\uD588\uC5B4\uC694"));
}
Object.assign(window, {
  VetoScreen,
  ResultScreen,
  ConfirmScreen,
  computeSlots
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/sai/screens-b.jsx", error: String((e && e.message) || e) }); }

// ui_kits/sai/screens-c.jsx
try { (() => {
/* 사이 screens — App shell (bottom tabs + FAB), Chat (list + anonymous thread),
   Meeting detail (진행 중인 회의), My. */
const {
  Button: CB,
  BottomCTA: CBottomCTA,
  Badge: CBadge,
  Border: CBorder,
  ListRow: CListRow,
  ListHeader: CListHeader,
  Asset: CAsset,
  Paragraph: CP,
  NavigationBar: CNav,
  TopBar: CTop,
  Chip: CChip,
  Switch: CSwitch,
  Avatar: CAvatar,
  AvatarStack: CAvatarStack,
  ProposalCard: CProposalCard,
  Icon: CIcon
} = window.TDSDesignSystem_58842e;

// local message-bubble glyph (kept independent of bundle compile timing)
function MsgIcon({
  size = 24,
  color = "currentColor",
  strokeWidth = 1.9
}) {
  return /*#__PURE__*/React.createElement("svg", {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: color,
    strokeWidth: strokeWidth,
    strokeLinecap: "round",
    strokeLinejoin: "round",
    style: {
      display: "block",
      flexShrink: 0
    },
    "aria-hidden": "true"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M20 13.4a2.6 2.6 0 0 1-2.6 2.6H10l-4.6 3.5V16H6.6A2.6 2.6 0 0 1 4 13.4V7.6A2.6 2.6 0 0 1 6.6 5h10.8A2.6 2.6 0 0 1 20 7.6Z"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M8.5 9.4h7"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M8.5 12.2h4.6"
  }));
}

// ── Bottom tab bar ──────────────────────────────────────────
function BottomTabBar({
  active,
  onTab,
  unread = 0
}) {
  const tabs = [{
    key: "home",
    label: "홈",
    icon: "home"
  }, {
    key: "meetings",
    label: "회의",
    icon: "calendar"
  }, {
    key: "chat",
    label: "채팅",
    icon: "message",
    badge: unread
  }, {
    key: "my",
    label: "마이",
    icon: "user"
  }];
  return /*#__PURE__*/React.createElement("div", {
    style: {
      flexShrink: 0,
      display: "grid",
      gridTemplateColumns: "repeat(4, 1fr)",
      background: "var(--surface-card)",
      borderTop: "1px solid var(--border-subtle)",
      paddingBottom: 18
    }
  }, tabs.map(t => {
    const on = active === t.key;
    const col = on ? "var(--primary)" : "var(--grey-400)";
    return /*#__PURE__*/React.createElement("button", {
      key: t.key,
      type: "button",
      onClick: () => onTab(t.key),
      style: {
        border: "none",
        background: "transparent",
        cursor: "pointer",
        padding: "9px 0 3px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 3,
        WebkitTapHighlightColor: "transparent"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        position: "relative"
      }
    }, t.icon === "message" ? /*#__PURE__*/React.createElement(MsgIcon, {
      size: 25,
      color: col,
      strokeWidth: on ? 2.2 : 1.9
    }) : /*#__PURE__*/React.createElement(CIcon, {
      name: t.icon,
      size: 25,
      color: col,
      strokeWidth: on ? 2.2 : 1.9
    }), t.badge ? /*#__PURE__*/React.createElement("span", {
      style: {
        position: "absolute",
        top: -3,
        right: -5,
        minWidth: 16,
        height: 16,
        padding: "0 4px",
        borderRadius: 8,
        background: "var(--negative)",
        color: "#fff",
        font: "var(--font-caption-2)",
        fontSize: 10,
        fontWeight: 700,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        border: "1.5px solid var(--surface-card)"
      }
    }, t.badge) : null), /*#__PURE__*/React.createElement("span", {
      style: {
        font: "var(--font-caption-2)",
        color: col,
        fontWeight: on ? 700 : 500,
        letterSpacing: "var(--tracking-normal)"
      }
    }, t.label));
  }));
}
function AppShell({
  active,
  onTab,
  unread,
  children
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      height: "100%",
      background: "var(--surface-page)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minHeight: 0,
      display: "flex",
      flexDirection: "column",
      position: "relative"
    }
  }, children), /*#__PURE__*/React.createElement(BottomTabBar, {
    active: active,
    onTab: onTab,
    unread: unread
  }));
}

// ── Notifications (bell) ────────────────────────────────────────
function BellButton({
  onClick,
  dot
}) {
  return /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: onClick,
    "aria-label": "\uC54C\uB9BC",
    style: {
      position: "relative",
      width: 36,
      height: 36,
      border: "none",
      background: "transparent",
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      WebkitTapHighlightColor: "transparent"
    }
  }, /*#__PURE__*/React.createElement(CIcon, {
    name: "bell",
    color: "var(--grey-700)",
    size: 22
  }), dot && /*#__PURE__*/React.createElement("span", {
    style: {
      position: "absolute",
      top: 5,
      right: 7,
      width: 7,
      height: 7,
      borderRadius: "50%",
      background: "var(--negative)",
      border: "1.5px solid var(--surface-page)"
    }
  }));
}
function NotifSheet({
  open,
  onClose,
  go,
  openThread,
  empty
}) {
  const items = [{
    emoji: "🕶️",
    title: "익명 참석자가 싫은 시간을 지웠어요",
    desc: "주간 디자인 리뷰 · 방금",
    act: () => go && go("detail")
  }, {
    emoji: "💬",
    title: "새 익명 메시지 2개",
    desc: "주간 디자인 리뷰 · 오후 2:16",
    act: () => openThread && openThread(window.SAI_CHAT_BY_ID.live)
  }, {
    emoji: "🎉",
    title: "회의 시간이 정해졌어요",
    desc: "분기 플래닝 · 어제",
    act: () => openThread && openThread(window.SAI_CHAT_BY_ID.q)
  }];
  return /*#__PURE__*/React.createElement(window.BottomSheet, {
    open: open,
    onClose: onClose,
    title: "\uC54C\uB9BC"
  }, empty ? /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "8px 0 24px",
      textAlign: "center"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 34
    }
  }, "\uD83D\uDD15"), /*#__PURE__*/React.createElement("div", {
    style: {
      font: "var(--font-body-2)",
      color: "var(--text-weak)",
      marginTop: 8
    }
  }, "\uC0C8 \uC54C\uB9BC\uC774 \uC5C6\uC5B4\uC694")) : /*#__PURE__*/React.createElement("div", {
    style: {
      margin: "0 -20px"
    }
  }, items.map((n, i) => /*#__PURE__*/React.createElement("div", {
    key: i
  }, /*#__PURE__*/React.createElement(CListRow, {
    left: /*#__PURE__*/React.createElement(CAsset, {
      emoji: n.emoji,
      tone: "neutral",
      size: 40
    }),
    title: n.title,
    description: n.desc,
    chevron: true,
    onClick: () => {
      onClose();
      n.act();
    }
  }), i < items.length - 1 && /*#__PURE__*/React.createElement(CBorder, {
    inset: 20
  })))));
}

// ── Floating action button ──────────────────────────────────
function Fab({
  onClick
}) {
  const [p, setP] = React.useState(false);
  return /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: onClick,
    onPointerDown: () => setP(true),
    onPointerUp: () => setP(false),
    onPointerLeave: () => setP(false),
    style: {
      position: "absolute",
      right: 20,
      bottom: 20,
      height: 56,
      borderRadius: "var(--radius-full)",
      display: "flex",
      alignItems: "center",
      gap: 7,
      padding: "0 22px 0 18px",
      border: "none",
      cursor: "pointer",
      background: "var(--primary)",
      color: "#fff",
      boxShadow: "var(--shadow-fab)",
      zIndex: 20,
      transform: p ? "scale(0.97)" : "scale(1)",
      transition: "transform var(--dur-fast) var(--ease-standard)",
      WebkitTapHighlightColor: "transparent"
    }
  }, /*#__PURE__*/React.createElement(CIcon, {
    name: "plus",
    size: 22,
    color: "#fff",
    strokeWidth: 2.4
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      font: "var(--font-label)",
      color: "#fff",
      letterSpacing: "var(--tracking-normal)"
    }
  }, "\uD68C\uC758 \uB9CC\uB4E4\uAE30"));
}

// ── Shared meeting card (one consistent card idiom everywhere) ──
function MeetingCard({
  m,
  onOpen,
  footer
}) {
  const tones = {
    primary: "var(--primary)",
    positive: "var(--green-600)",
    warning: "#B77900",
    neutral: "var(--grey-600)"
  };
  const iconColor = tones[m.iconTone] || tones.primary;
  const badge = m.status === "collecting" ? {
    tone: "primary",
    label: "응답 대기"
  } : m.status === "confirmed" ? {
    tone: "positive",
    label: "확정"
  } : null;
  const pct = m.total ? Math.round((m.responded || 0) / m.total * 100) : 0;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      background: "var(--surface-card)",
      borderRadius: "var(--radius-lg)",
      boxShadow: "var(--shadow-xs)",
      padding: "16px 18px"
    }
  }, /*#__PURE__*/React.createElement("div", {
    onClick: onOpen,
    style: {
      cursor: onOpen ? "pointer" : "default"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "flex-start",
      gap: 12
    }
  }, /*#__PURE__*/React.createElement(CAsset, {
    tone: m.iconTone,
    size: 44,
    shape: "squircle"
  }, /*#__PURE__*/React.createElement(CIcon, {
    name: m.icon,
    size: 22,
    color: iconColor
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      gap: 8
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      font: "var(--font-head)",
      color: "var(--text-strong)",
      letterSpacing: "var(--tracking-normal)",
      overflow: "hidden",
      textOverflow: "ellipsis",
      whiteSpace: "nowrap"
    }
  }, m.name), badge ? /*#__PURE__*/React.createElement(CBadge, {
    tone: badge.tone
  }, badge.label) : null), /*#__PURE__*/React.createElement("div", {
    style: {
      font: "var(--font-caption-1)",
      color: "var(--text-sub)",
      marginTop: 4
    }
  }, m.meta)), m.status === "past" && /*#__PURE__*/React.createElement(CIcon, {
    name: "chevron-right",
    size: 20,
    color: "var(--grey-300)"
  })), m.status === "collecting" && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    style: {
      height: 6,
      borderRadius: 3,
      background: "var(--grey-100)",
      marginTop: 14,
      overflow: "hidden"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: `${pct}%`,
      height: "100%",
      background: "var(--primary)",
      borderRadius: 3
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      marginTop: 12
    }
  }, /*#__PURE__*/React.createElement(CAvatarStack, {
    people: m.people,
    max: 6,
    anonymous: true,
    size: 26
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      font: "var(--font-caption-1)",
      color: "var(--text-weak)"
    }
  }, m.total, "\uBA85 \uC911 ", m.responded, "\uBA85 \uC751\uB2F5"))), m.status === "confirmed" && /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      marginTop: 14
    }
  }, /*#__PURE__*/React.createElement(CAvatarStack, {
    people: m.people,
    max: 5,
    size: 26
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: 4,
      font: "var(--font-caption-1)",
      color: "var(--text-weak)"
    }
  }, /*#__PURE__*/React.createElement(CIcon, {
    name: "pin",
    size: 14,
    color: "var(--grey-400)"
  }), m.location))), footer && /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 14
    }
  }, footer));
}

// ── HOME (dashboard tab) ────────────────────────────────────
// ── Shared empty state ───────────────────────────────────
function EmptyState({
  emoji,
  title,
  desc,
  action
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      padding: "0 36px 60px",
      textAlign: "center"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 84,
      height: 84,
      borderRadius: 28,
      background: "var(--surface-sunken)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: 40
    }
  }, emoji), /*#__PURE__*/React.createElement("div", {
    style: {
      font: "var(--font-title-3)",
      color: "var(--text-strong)",
      marginTop: 18,
      letterSpacing: "var(--tracking-normal)"
    }
  }, title), /*#__PURE__*/React.createElement("div", {
    style: {
      font: "var(--font-body-2)",
      color: "var(--text-sub)",
      marginTop: 6,
      lineHeight: 1.5
    }
  }, desc), action && /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 20,
      width: "100%",
      maxWidth: 240
    }
  }, action));
}
function HomeScreen({
  go,
  openThread,
  empty,
  live,
  meResponded,
  notifSeen,
  onNotifSeen
}) {
  const [notifOpen, setNotifOpen] = React.useState(false);
  const openNotif = () => {
    setNotifOpen(true);
    onNotifSeen && onNotifSeen();
  };
  const liveM = live || window.SAI_MEETINGS.live;
  const next = window.SAI_MEETINGS.q;
  const nextChat = window.SAI_CHAT_BY_ID[next.id];
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      height: "100%",
      background: "var(--surface-page)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "14px 20px 4px"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 8
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: "../../assets/logo-sai.png",
    alt: "\uC0AC\uC774",
    style: {
      width: 30,
      height: 30,
      objectFit: "contain"
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      font: "var(--font-title-2)",
      color: "var(--text-strong)",
      letterSpacing: "var(--tracking-tight)"
    }
  }, "\uC0AC\uC774")), /*#__PURE__*/React.createElement(BellButton, {
    onClick: openNotif,
    dot: !empty && !notifSeen
  })), empty ? /*#__PURE__*/React.createElement(EmptyState, {
    emoji: "\uD83D\uDDD3\uFE0F",
    title: "\uC544\uC9C1 \uD68C\uC758\uAC00 \uC5C6\uC5B4\uC694",
    desc: /*#__PURE__*/React.createElement(React.Fragment, null, "\uC88B\uC740 \uC2DC\uAC04\uC744 \uCC3E\uC9C0 \uB9D0\uACE0, \uC2EB\uC740 \uC2DC\uAC04\uC744 \uC9C0\uC6CC\uBCF4\uC138\uC694.", /*#__PURE__*/React.createElement("br", null), "\uCCAB \uD68C\uC758\uB97C \uB9CC\uB4E4\uBA74 \uC5EC\uAE30\uC5D0 \uBAA8\uC5EC\uC694."),
    action: /*#__PURE__*/React.createElement(CB, {
      variant: "primary",
      size: "lg",
      fullWidth: true,
      onClick: () => go("create")
    }, "\uCCAB \uD68C\uC758 \uB9CC\uB4E4\uAE30")
  }) : /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      overflowY: "auto",
      padding: "12px 20px 28px"
    }
  }, /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: () => go("create"),
    style: {
      width: "100%",
      border: "none",
      cursor: "pointer",
      textAlign: "left",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      gap: 12,
      padding: "20px",
      borderRadius: "var(--radius-xl)",
      background: "var(--primary)",
      boxShadow: "var(--shadow-fab)",
      WebkitTapHighlightColor: "transparent"
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      font: "var(--font-title-3)",
      color: "#fff",
      letterSpacing: "var(--tracking-normal)"
    }
  }, "\uC0C8 \uD68C\uC758\uB97C \uC7A1\uC544\uC694"), /*#__PURE__*/React.createElement("div", {
    style: {
      font: "var(--font-caption-1)",
      color: "rgba(255,255,255,0.86)",
      marginTop: 4
    }
  }, "\uC88B\uC740 \uC2DC\uAC04\uC744 \uCC3E\uC9C0 \uB9D0\uACE0, \uC2EB\uC740 \uC2DC\uAC04\uC744 \uC9C0\uC6CC\uC694")), /*#__PURE__*/React.createElement("div", {
    style: {
      width: 52,
      height: 52,
      borderRadius: "50%",
      flexShrink: 0,
      background: "rgba(255,255,255,0.18)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: 26
    }
  }, "\uD83D\uDDD3\uFE0F")), liveM.status === "confirmed" ? /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(CListHeader, {
    title: "\uB2E4\uAC00\uC624\uB294 \uD68C\uC758",
    style: {
      padding: "26px 0 8px"
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 10
    }
  }, /*#__PURE__*/React.createElement(MeetingCard, {
    m: liveM,
    onOpen: () => go("detail")
  }), /*#__PURE__*/React.createElement(MeetingCard, {
    m: next,
    onOpen: () => nextChat && openThread(nextChat)
  }))) : /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(CListHeader, {
    title: "\uC9C0\uAE08 \uD655\uC778\uD574\uC694",
    style: {
      padding: "26px 0 8px"
    }
  }), /*#__PURE__*/React.createElement(MeetingCard, {
    m: liveM,
    onOpen: () => go("detail"),
    footer: /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        gap: 8
      }
    }, /*#__PURE__*/React.createElement(CB, {
      variant: "weak",
      size: "md",
      onClick: () => go("detail"),
      style: {
        flex: 1
      }
    }, "\uC790\uC138\uD788"), meResponded ? /*#__PURE__*/React.createElement(CB, {
      variant: "primary",
      size: "md",
      onClick: () => go("result"),
      style: {
        flex: 1
      }
    }, "\uACB0\uACFC \uBCF4\uAE30") : /*#__PURE__*/React.createElement(CB, {
      variant: "primary",
      size: "md",
      onClick: () => go("veto"),
      style: {
        flex: 1
      }
    }, "\uC2EB\uC740 \uC2DC\uAC04 \uC9C0\uC6B0\uAE30"))
  }), /*#__PURE__*/React.createElement(CListHeader, {
    title: "\uB2E4\uAC00\uC624\uB294 \uD68C\uC758",
    style: {
      padding: "26px 0 8px"
    }
  }), /*#__PURE__*/React.createElement(MeetingCard, {
    m: next,
    onOpen: () => nextChat && openThread(nextChat)
  }))), /*#__PURE__*/React.createElement(NotifSheet, {
    open: notifOpen,
    onClose: () => setNotifOpen(false),
    go: go,
    openThread: openThread,
    empty: empty
  }));
}

// ── Anonymous avatar + helpers ──────────────────────────────
function AnonAvatar({
  id,
  size = 38
}) {
  const a = window.SAI_ANON_MAP[id];
  if (!a) return null;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      width: size,
      height: size,
      borderRadius: "50%",
      background: a.bg,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      flexShrink: 0,
      fontSize: Math.round(size * 0.52)
    }
  }, a.emoji);
}

// ── CHAT LIST (tab) ─────────────────────────────────────────
function ChatListScreen({
  openThread,
  readChats = {},
  empty
}) {
  const [searching, setSearching] = React.useState(false);
  const [q, setQ] = React.useState("");
  const query = q.trim();
  const list = window.SAI_CHATS.filter(c => !query || c.name.includes(query));
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      height: "100%",
      background: "var(--surface-page)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "14px 20px 8px"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      font: "var(--font-title-1)",
      color: "var(--text-strong)",
      letterSpacing: "var(--tracking-tight)"
    }
  }, "\uCC44\uD305"), /*#__PURE__*/React.createElement("button", {
    type: "button",
    "aria-label": "\uCC44\uD305 \uAC80\uC0C9",
    onClick: () => setSearching(s => {
      if (s) setQ("");
      return !s;
    }),
    style: {
      width: 36,
      height: 36,
      border: "none",
      background: searching ? "var(--fill-weak)" : "transparent",
      borderRadius: "var(--radius-full)",
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      WebkitTapHighlightColor: "transparent"
    }
  }, /*#__PURE__*/React.createElement(CIcon, {
    name: "search",
    color: "var(--grey-700)",
    size: 22
  }))), searching && /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 10,
      margin: "2px 20px 8px"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      display: "flex",
      alignItems: "center",
      gap: 8,
      height: 42,
      padding: "0 14px",
      borderRadius: "var(--radius-full)",
      background: "var(--surface-sunken)"
    }
  }, /*#__PURE__*/React.createElement(CIcon, {
    name: "search",
    size: 17,
    color: "var(--grey-500)"
  }), /*#__PURE__*/React.createElement("input", {
    autoFocus: true,
    value: q,
    onChange: e => setQ(e.target.value),
    placeholder: "\uD68C\uC758 \uC774\uB984\uC73C\uB85C \uAC80\uC0C9",
    style: {
      flex: 1,
      minWidth: 0,
      border: "none",
      outline: "none",
      background: "transparent",
      font: "var(--font-body-2)",
      color: "var(--text-strong)",
      letterSpacing: "var(--tracking-normal)"
    }
  }), q && /*#__PURE__*/React.createElement("button", {
    type: "button",
    "aria-label": "\uC9C0\uC6B0\uAE30",
    onClick: () => setQ(""),
    style: {
      border: "none",
      background: "var(--grey-200)",
      color: "var(--grey-600)",
      width: 18,
      height: 18,
      borderRadius: "50%",
      fontSize: 11,
      lineHeight: "18px",
      padding: 0,
      cursor: "pointer",
      flexShrink: 0
    }
  }, "\u2715")), /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: () => {
      setSearching(false);
      setQ("");
    },
    style: {
      border: "none",
      background: "transparent",
      cursor: "pointer",
      font: "var(--font-body-2)",
      fontWeight: 600,
      color: "var(--primary)",
      padding: 2,
      WebkitTapHighlightColor: "transparent"
    }
  }, "\uCDE8\uC18C")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 8,
      margin: "4px 20px 8px",
      padding: "10px 14px",
      background: "var(--surface-sunken)",
      borderRadius: "var(--radius-md)"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 15
    }
  }, "\uD83D\uDD76\uFE0F"), /*#__PURE__*/React.createElement("span", {
    style: {
      font: "var(--font-caption-1)",
      color: "var(--text-sub)",
      letterSpacing: "var(--tracking-normal)"
    }
  }, "\uBAA8\uB4E0 \uCC44\uD305\uC740 \uC775\uBA85\uC774\uC5D0\uC694. \uC774\uB984\uC740 \uBCF4\uC774\uC9C0 \uC54A\uC544\uC694.")), empty ? /*#__PURE__*/React.createElement(EmptyState, {
    emoji: "\uD83D\uDCAC",
    title: "\uC544\uC9C1 \uCC44\uD305\uBC29\uC774 \uC5C6\uC5B4\uC694",
    desc: /*#__PURE__*/React.createElement(React.Fragment, null, "\uD68C\uC758\uB97C \uB9CC\uB4E4\uBA74 \uD68C\uC758\uB9C8\uB2E4", /*#__PURE__*/React.createElement("br", null), "\uC775\uBA85 \uCC44\uD305\uBC29\uC774 \uC790\uB3D9\uC73C\uB85C \uC5F4\uB824\uC694.")
  }) : /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      overflowY: "auto",
      padding: "4px 0 12px"
    }
  }, list.length === 0 && /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "48px 20px",
      textAlign: "center"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 30
    }
  }, "\uD83D\uDD0D"), /*#__PURE__*/React.createElement("div", {
    style: {
      font: "var(--font-body-2)",
      color: "var(--text-weak)",
      marginTop: 8
    }
  }, "\u2018", query, "\u2019\uC640 \uB9DE\uB294 \uCC44\uD305\uC774 \uC5C6\uC5B4\uC694")), list.map((c, i) => /*#__PURE__*/React.createElement("div", {
    key: c.id
  }, /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: () => openThread(c),
    style: {
      width: "100%",
      border: "none",
      background: "transparent",
      cursor: "pointer",
      padding: "12px 20px",
      display: "flex",
      alignItems: "center",
      gap: 13,
      textAlign: "left",
      WebkitTapHighlightColor: "transparent"
    }
  }, /*#__PURE__*/React.createElement(CAsset, {
    tone: c.tone,
    size: 48,
    shape: "squircle"
  }, /*#__PURE__*/React.createElement(CIcon, {
    name: c.icon,
    size: 24,
    color: "var(--primary)"
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 6
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      font: "var(--font-head)",
      color: "var(--text-strong)",
      letterSpacing: "var(--tracking-normal)",
      overflow: "hidden",
      textOverflow: "ellipsis",
      whiteSpace: "nowrap"
    }
  }, c.name), /*#__PURE__*/React.createElement("span", {
    style: {
      flexShrink: 0,
      display: "inline-flex",
      alignItems: "center",
      gap: 3,
      height: 18,
      padding: "0 6px",
      borderRadius: "var(--radius-full)",
      background: "var(--fill-weak)",
      color: "var(--text-weak)",
      font: "var(--font-caption-2)",
      fontSize: 10
    }
  }, /*#__PURE__*/React.createElement(CIcon, {
    name: "lock",
    size: 10,
    color: "var(--grey-500)",
    strokeWidth: 2
  }), "\uC775\uBA85")), /*#__PURE__*/React.createElement("div", {
    style: {
      font: "var(--font-body-2)",
      color: "var(--text-weak)",
      marginTop: 3,
      overflow: "hidden",
      textOverflow: "ellipsis",
      whiteSpace: "nowrap"
    }
  }, c.last)), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      alignItems: "flex-end",
      gap: 6,
      flexShrink: 0
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      font: "var(--font-caption-2)",
      color: "var(--text-weak)"
    }
  }, c.t), c.unread > 0 && !readChats[c.id] ? /*#__PURE__*/React.createElement("span", {
    style: {
      minWidth: 18,
      height: 18,
      padding: "0 5px",
      borderRadius: 9,
      background: "var(--negative)",
      color: "#fff",
      font: "var(--font-caption-2)",
      fontSize: 11,
      fontWeight: 700,
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    }
  }, c.unread) : /*#__PURE__*/React.createElement("span", {
    style: {
      height: 18
    }
  }))), i < list.length - 1 && /*#__PURE__*/React.createElement(CBorder, {
    inset: 20
  })))));
}

// ── CHAT THREAD (anonymous) ─────────────────────────────────
function ChatThreadScreen({
  back,
  go,
  chat,
  chosen
}) {
  const finalNotice = chosen && chat && chat.live ? [{
    kind: "system",
    text: `사이가 회의 시간을 정했어요 🎉 ${chosen.day.label} ${chosen.time.label}`
  }] : [];
  const base = chat && chat.id === "live" ? [...window.SAI_THREAD, ...finalNotice] : [{
    kind: "system",
    text: "사이가 회의 시간을 정했어요 🎉"
  }, {
    from: "a",
    text: "다들 확인 감사해요!",
    t: "오후 5:20"
  }, {
    from: "me",
    text: "네 그때 봬요 🙌",
    t: "오후 5:22"
  }];
  const [msgs, setMsgs] = React.useState(base);
  const [text, setText] = React.useState("");
  const [anonInfo, setAnonInfo] = React.useState(false);
  const scrollRef = React.useRef(null);
  React.useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [msgs]);
  const send = () => {
    const v = text.trim();
    if (!v) return;
    setMsgs(m => [...m, {
      from: "me",
      text: v,
      t: "지금"
    }]);
    setText("");
  };
  let prev = null;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      height: "100%",
      background: "var(--surface-page)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      background: "var(--surface-card)",
      borderBottom: "1px solid var(--border-subtle)",
      flexShrink: 0
    }
  }, /*#__PURE__*/React.createElement(CNav, {
    onBack: back,
    title: chat ? chat.name : "익명 채팅",
    right: /*#__PURE__*/React.createElement("button", {
      type: "button",
      onClick: () => setAnonInfo(true),
      "aria-label": "\uC775\uBA85 \uC548\uB0B4",
      style: {
        width: 36,
        height: 36,
        border: "none",
        background: "transparent",
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        WebkitTapHighlightColor: "transparent"
      }
    }, /*#__PURE__*/React.createElement(CIcon, {
      name: "lock",
      size: 20,
      color: "var(--grey-500)"
    })),
    style: {
      borderBottom: "none"
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 6,
      padding: "0 20px 10px",
      marginTop: -4
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 13
    }
  }, "\uD83D\uDD76\uFE0F"), /*#__PURE__*/React.createElement("span", {
    style: {
      font: "var(--font-caption-1)",
      color: "var(--text-sub)",
      flex: 1,
      minWidth: 0,
      overflow: "hidden",
      textOverflow: "ellipsis",
      whiteSpace: "nowrap"
    }
  }, "\uC775\uBA85 \uCC44\uD305 \xB7 ", chat && chat.people || 6, "\uBA85 \xB7 \uC774\uB984\uC740 \uBCF4\uC774\uC9C0 \uC54A\uC544\uC694"), chat && chat.live && go && /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: () => go("detail"),
    style: {
      border: "none",
      background: "var(--fill-weak)",
      cursor: "pointer",
      height: 28,
      padding: "0 12px",
      borderRadius: "var(--radius-full)",
      font: "var(--font-caption-1)",
      fontWeight: 600,
      color: "var(--primary)",
      whiteSpace: "nowrap",
      flexShrink: 0,
      WebkitTapHighlightColor: "transparent"
    }
  }, "\uD68C\uC758 \uBCF4\uAE30"))), /*#__PURE__*/React.createElement("div", {
    ref: scrollRef,
    style: {
      flex: 1,
      minHeight: 0,
      overflowY: "auto",
      padding: "16px 16px 8px",
      display: "flex",
      flexDirection: "column",
      gap: 3
    }
  }, msgs.map((m, i) => {
    if (m.kind === "system") {
      prev = null;
      return /*#__PURE__*/React.createElement("div", {
        key: i,
        style: {
          alignSelf: "center",
          margin: "10px 0",
          padding: "7px 14px",
          borderRadius: "var(--radius-full)",
          background: "var(--fill-weak)",
          maxWidth: "84%",
          textAlign: "center"
        }
      }, /*#__PURE__*/React.createElement("span", {
        style: {
          font: "var(--font-caption-1)",
          color: "var(--text-weak)",
          letterSpacing: "var(--tracking-normal)"
        }
      }, m.text));
    }
    const mine = m.from === "me";
    const showHead = !mine && prev !== m.from;
    const a = window.SAI_ANON_MAP[m.from];
    prev = m.from;
    if (mine) {
      return /*#__PURE__*/React.createElement("div", {
        key: i,
        style: {
          alignSelf: "flex-end",
          display: "flex",
          alignItems: "flex-end",
          gap: 6,
          maxWidth: "78%",
          marginTop: 3
        }
      }, /*#__PURE__*/React.createElement("span", {
        style: {
          font: "var(--font-caption-2)",
          color: "var(--text-weak)",
          flexShrink: 0
        }
      }, m.t), /*#__PURE__*/React.createElement("div", {
        style: {
          padding: "10px 13px",
          borderRadius: "16px 16px 4px 16px",
          background: "var(--primary)",
          color: "#fff",
          font: "var(--font-body-2)",
          letterSpacing: "var(--tracking-normal)",
          lineHeight: 1.45,
          wordBreak: "break-word"
        }
      }, m.text));
    }
    return /*#__PURE__*/React.createElement("div", {
      key: i,
      style: {
        display: "flex",
        gap: 8,
        maxWidth: "86%",
        marginTop: showHead ? 12 : 3
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        width: 38,
        flexShrink: 0
      }
    }, showHead && /*#__PURE__*/React.createElement(AnonAvatar, {
      id: m.from
    })), /*#__PURE__*/React.createElement("div", {
      style: {
        minWidth: 0
      }
    }, showHead && /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        alignItems: "center",
        gap: 4,
        margin: "0 0 4px 2px"
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        font: "var(--font-caption-1)",
        color: a.tone,
        fontWeight: 600
      }
    }, "\uC775\uBA85 ", a.name)), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        alignItems: "flex-end",
        gap: 6
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        padding: "10px 13px",
        borderRadius: "16px 16px 16px 4px",
        background: "var(--surface-card)",
        border: "1px solid var(--border-subtle)",
        color: "var(--text-strong)",
        font: "var(--font-body-2)",
        letterSpacing: "var(--tracking-normal)",
        lineHeight: 1.45,
        wordBreak: "break-word"
      }
    }, /*#__PURE__*/React.createElement("div", null, m.text)), /*#__PURE__*/React.createElement("span", {
      style: {
        font: "var(--font-caption-2)",
        color: "var(--text-weak)",
        flexShrink: 0
      }
    }, m.t))));
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      flexShrink: 0,
      display: "flex",
      alignItems: "flex-end",
      gap: 8,
      padding: "10px 14px 20px",
      background: "var(--surface-card)",
      borderTop: "1px solid var(--border-subtle)"
    }
  }, /*#__PURE__*/React.createElement("input", {
    value: text,
    onChange: e => setText(e.target.value),
    onKeyDown: e => {
      if (e.key === "Enter") send();
    },
    placeholder: "\uC775\uBA85\uC73C\uB85C \uBA54\uC2DC\uC9C0\uB97C \uBCF4\uB0B4\uC694",
    style: {
      flex: 1,
      height: 44,
      border: "none",
      outline: "none",
      borderRadius: "var(--radius-full)",
      background: "var(--surface-sunken)",
      padding: "0 16px",
      font: "var(--font-body-2)",
      color: "var(--text-strong)",
      letterSpacing: "var(--tracking-normal)"
    }
  }), /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: send,
    disabled: !text.trim(),
    style: {
      width: 44,
      height: 44,
      borderRadius: "50%",
      border: "none",
      flexShrink: 0,
      cursor: text.trim() ? "pointer" : "default",
      background: text.trim() ? "var(--primary)" : "var(--grey-200)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      transition: "background var(--dur-fast) var(--ease-standard)",
      WebkitTapHighlightColor: "transparent"
    }
  }, /*#__PURE__*/React.createElement(CIcon, {
    name: "send",
    size: 20,
    color: "#fff"
  }))), /*#__PURE__*/React.createElement(window.BottomSheet, {
    open: anonInfo,
    onClose: () => setAnonInfo(false),
    title: "\uC774 \uCC44\uD305\uC740 \uC775\uBA85\uC774\uC5D0\uC694"
  }, [["🕶️", "이름 대신 동물로 보여요", "참여자마다 동물 이름이 무작위로 정해져요."], ["🔒", "끝나도 공개되지 않아요", "회의가 확정된 뒤에도 누가 누군지 알 수 없어요."], ["🧽", "지우기 응답도 익명이에요", "누가 어떤 시간을 지웠는지는 아무도 몰라요."]].map(([e, t, d]) => /*#__PURE__*/React.createElement("div", {
    key: t,
    style: {
      display: "flex",
      gap: 12,
      padding: "9px 0"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 19
    }
  }, e), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      font: "var(--font-label)",
      color: "var(--text-strong)",
      letterSpacing: "var(--tracking-normal)"
    }
  }, t), /*#__PURE__*/React.createElement("div", {
    style: {
      font: "var(--font-caption-1)",
      color: "var(--text-sub)",
      marginTop: 2,
      lineHeight: 1.5
    }
  }, d)))), /*#__PURE__*/React.createElement("div", {
    style: {
      height: 12
    }
  }), /*#__PURE__*/React.createElement(CB, {
    variant: "weak",
    size: "md",
    fullWidth: true,
    onClick: () => setAnonInfo(false)
  }, "\uB2EB\uAE30")));
}

// ── MEETING DETAIL (진행 중인 회의) ─────────────────────────
function DetailScreen({
  back,
  go,
  state,
  choose,
  openThread,
  anonymous = true,
  chosen
}) {
  const [settingsOpen, setSettingsOpen] = React.useState(false);
  const [remind, setRemind] = React.useState(true);
  const [calAdded, setCalAdded] = React.useState(false);
  const addCal = () => {
    if (calAdded) return;
    setCalAdded(true);
    setTimeout(() => go("home"), 1100);
  };
  const responded = state.participants.filter(p => p.status === "responded").length;
  const total = state.participants.length;
  const meResponded = state.participants.some(p => p.me && p.status === "responded");
  const pct = Math.round(responded / total * 100);
  const slots = React.useMemo(() => window.computeSlots(state), [state]);
  const best = slots[0];
  const rangeText = state.range.to != null ? `4월 ${state.range.from}일 ~ 4월 ${state.range.to}일 · ${state.days.length}일간` : `4월 ${state.range.from}일`;
  const timeText = (() => {
    const sel = window.SAI_ALL_TIMES.filter(t => state.times.includes(t.key));
    if (!sel.length) return "시간대 없음";
    return `${sel[0].label} ~ ${sel[sel.length - 1].label} 중 ${sel.length}개`;
  })();
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      height: "100%",
      background: "var(--surface-page)"
    }
  }, /*#__PURE__*/React.createElement(CNav, {
    onBack: back,
    title: state.name,
    titleVisible: false,
    right: /*#__PURE__*/React.createElement("button", {
      type: "button",
      onClick: () => setSettingsOpen(true),
      "aria-label": "\uD68C\uC758 \uC124\uC815",
      style: {
        width: 36,
        height: 36,
        border: "none",
        background: "transparent",
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        WebkitTapHighlightColor: "transparent"
      }
    }, /*#__PURE__*/React.createElement(CIcon, {
      name: "settings",
      size: 22,
      color: "var(--grey-600)"
    }))
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      overflowY: "auto"
    }
  }, /*#__PURE__*/React.createElement(CTop, {
    title: state.name,
    description: `${rangeText} · ${total}명`
  }), chosen ? /*#__PURE__*/React.createElement("div", {
    style: {
      margin: "4px 20px 0",
      padding: 18,
      background: "var(--surface-card)",
      borderRadius: "var(--radius-lg)",
      boxShadow: "var(--shadow-xs)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      font: "var(--font-head)",
      color: "var(--text-strong)",
      letterSpacing: "var(--tracking-normal)"
    }
  }, "\uD655\uC815\uB41C \uC2DC\uAC04"), /*#__PURE__*/React.createElement(CBadge, {
    tone: "positive"
  }, "\uD655\uC815")), /*#__PURE__*/React.createElement("div", {
    style: {
      font: "var(--font-caption-1)",
      color: "var(--text-sub)",
      marginTop: 12
    }
  }, chosen.day.label), /*#__PURE__*/React.createElement("div", {
    style: {
      font: "var(--font-display-2)",
      color: "var(--text-strong)",
      letterSpacing: "var(--tracking-tight)",
      marginTop: 2
    }
  }, chosen.time.label), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      marginTop: 14
    }
  }, /*#__PURE__*/React.createElement(CAvatarStack, {
    people: ["김", "이", "박", "정", "최", "한"],
    max: 6,
    anonymous: anonymous,
    size: 28
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      font: "var(--font-caption-1)",
      color: "var(--text-weak)"
    }
  }, "\uBAA8\uB450\uC5D0\uAC8C \uACF5\uC720\uB410\uC5B4\uC694"))) : /*#__PURE__*/React.createElement("div", {
    style: {
      margin: "4px 20px 0",
      padding: 18,
      background: "var(--surface-card)",
      borderRadius: "var(--radius-lg)",
      boxShadow: "var(--shadow-xs)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      font: "var(--font-head)",
      color: "var(--text-strong)",
      letterSpacing: "var(--tracking-normal)"
    }
  }, "\uC751\uB2F5 \uD604\uD669"), /*#__PURE__*/React.createElement(CBadge, {
    tone: "primary"
  }, "\uC751\uB2F5 \uB300\uAE30")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "baseline",
      gap: 6,
      marginTop: 12
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      font: "var(--font-display-2)",
      color: "var(--primary)",
      letterSpacing: "var(--tracking-tight)"
    }
  }, responded), /*#__PURE__*/React.createElement("span", {
    style: {
      font: "var(--font-title-3)",
      color: "var(--text-weak)"
    }
  }, "/ ", total, "\uBA85 \uC751\uB2F5")), /*#__PURE__*/React.createElement("div", {
    style: {
      height: 8,
      borderRadius: 4,
      background: "var(--grey-100)",
      marginTop: 12,
      overflow: "hidden"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: `${pct}%`,
      height: "100%",
      background: "var(--primary)",
      borderRadius: 4,
      transition: "width var(--dur-slow) var(--ease-out)"
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      marginTop: 14
    }
  }, /*#__PURE__*/React.createElement(CAvatarStack, {
    people: ["김", "이", "박", "정", "최", "한"],
    max: 6,
    anonymous: true,
    size: 28
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      font: "var(--font-caption-1)",
      color: "var(--text-weak)"
    }
  }, total - responded, "\uBA85\uC774 \uC544\uC9C1 \uC548 \uC9C0\uC6E0\uC5B4\uC694"))), !chosen && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(CListHeader, {
    title: "\uC9C0\uAE08\uAE4C\uC9C0 \uC88B\uC740 \uC2DC\uAC04",
    description: "\uC751\uB2F5\uC774 \uBAA8\uC77C\uC218\uB85D \uB354 \uC815\uD655\uD574\uC838\uC694",
    action: /*#__PURE__*/React.createElement(CB, {
      variant: "ghost",
      size: "sm",
      onClick: () => go("result")
    }, "\uC804\uCCB4 \uBCF4\uAE30")
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "0 20px"
    }
  }, best && /*#__PURE__*/React.createElement(CProposalCard, {
    recommended: true,
    date: best.day.label,
    time: best.time.label,
    vetoCount: best.vetoCount,
    reasons: best.reasons,
    confirmLabel: "\uC774 \uC2DC\uAC04\uC73C\uB85C \uC815\uD558\uAE30",
    onConfirm: () => {
      choose(best);
      go("confirm");
    }
  }))), /*#__PURE__*/React.createElement(CListHeader, {
    title: "\uCC38\uC11D\uC790",
    description: anonymous ? "익명 회의라 이름은 가려져요" : `응답 ${responded}/${total}명`
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      margin: "0 20px",
      background: "var(--surface-card)",
      borderRadius: "var(--radius-lg)",
      boxShadow: "var(--shadow-xs)",
      overflow: "hidden"
    }
  }, state.participants.map((p, i) => {
    const pending = p.status === "pending";
    const persona = window.SAI_ANON[i % window.SAI_ANON.length];
    return /*#__PURE__*/React.createElement("div", {
      key: p.name
    }, /*#__PURE__*/React.createElement(CListRow, {
      left: anonymous ? /*#__PURE__*/React.createElement("div", {
        style: {
          width: 40,
          height: 40,
          borderRadius: "50%",
          background: persona.bg,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 21,
          opacity: pending ? 0.5 : 1
        }
      }, persona.emoji) : /*#__PURE__*/React.createElement("span", {
        style: {
          display: "flex",
          opacity: pending ? 0.5 : 1
        }
      }, /*#__PURE__*/React.createElement(CAvatar, {
        name: p.name,
        index: i,
        size: 40
      })),
      title: (anonymous ? `익명 ${persona.name}` : p.name) + (p.me ? " · 나" : ""),
      description: /*#__PURE__*/React.createElement("span", {
        style: {
          display: "inline-flex",
          alignItems: "center",
          gap: 5,
          color: pending ? "#B77900" : "var(--green-600)"
        }
      }, /*#__PURE__*/React.createElement("span", {
        style: {
          width: 6,
          height: 6,
          borderRadius: "50%",
          background: "currentColor"
        }
      }), pending ? "응답 대기 중" : "응답 완료"),
      right: p.required ? /*#__PURE__*/React.createElement("span", {
        style: {
          font: "var(--font-caption-2)",
          color: "var(--primary)"
        }
      }, "\uD544\uC218") : null
    }), i < state.participants.length - 1 && /*#__PURE__*/React.createElement(CBorder, {
      inset: 52
    }));
  })), /*#__PURE__*/React.createElement(CListHeader, {
    title: "\uD68C\uC758 \uC815\uBCF4"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      margin: "0 20px",
      background: "var(--surface-card)",
      borderRadius: "var(--radius-lg)",
      boxShadow: "var(--shadow-xs)",
      overflow: "hidden"
    }
  }, /*#__PURE__*/React.createElement(InfoRow, {
    icon: "calendar",
    label: "\uAE30\uAC04",
    value: rangeText
  }), /*#__PURE__*/React.createElement(CBorder, {
    inset: 52
  }), /*#__PURE__*/React.createElement(InfoRow, {
    icon: "clock",
    label: "\uC2DC\uAC04\uB300",
    value: timeText
  }), /*#__PURE__*/React.createElement(CBorder, {
    inset: 52
  }), /*#__PURE__*/React.createElement(InfoRow, {
    icon: "pin",
    label: "\uC704\uCE58",
    value: state.location ? state.location : "온라인 · 장소 미정"
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      height: 16
    }
  })), /*#__PURE__*/React.createElement(CBottomCTA, {
    gradient: false
  }, /*#__PURE__*/React.createElement(CB, {
    variant: "weak",
    size: "lg",
    onClick: () => openThread(window.SAI_CHAT_BY_ID.live),
    style: {
      flex: 1
    }
  }, "\uC775\uBA85 \uCC44\uD305"), chosen ? /*#__PURE__*/React.createElement(CB, {
    variant: "primary",
    size: "lg",
    onClick: addCal,
    style: {
      flex: 2
    }
  }, calAdded ? "추가했어요 ✓" : "캘린더에 추가") : meResponded ? /*#__PURE__*/React.createElement(CB, {
    variant: "primary",
    size: "lg",
    onClick: () => go("result"),
    style: {
      flex: 2
    }
  }, "\uACB0\uACFC \uBCF4\uAE30") : /*#__PURE__*/React.createElement(CB, {
    variant: "primary",
    size: "lg",
    onClick: () => go("veto"),
    style: {
      flex: 2
    }
  }, "\uC2EB\uC740 \uC2DC\uAC04 \uC9C0\uC6B0\uAE30")), /*#__PURE__*/React.createElement(window.Toast, {
    show: calAdded
  }, "\uCE98\uB9B0\uB354\uC5D0 \uCD94\uAC00\uD588\uC5B4\uC694"), /*#__PURE__*/React.createElement(window.BottomSheet, {
    open: settingsOpen,
    onClose: () => setSettingsOpen(false),
    title: "\uD68C\uC758 \uC124\uC815"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      margin: "0 -20px"
    }
  }, /*#__PURE__*/React.createElement(CListRow, {
    left: /*#__PURE__*/React.createElement(CAsset, {
      tone: "neutral",
      size: 40
    }, /*#__PURE__*/React.createElement(CIcon, {
      name: "edit",
      size: 19,
      color: "var(--grey-600)"
    })),
    title: "\uD68C\uC758 \uC815\uBCF4 \uC218\uC815",
    description: "\uC774\uB984 \xB7 \uAE30\uAC04 \xB7 \uC2DC\uAC04\uB300 \xB7 \uCC38\uC11D\uC790",
    chevron: true,
    onClick: () => {
      setSettingsOpen(false);
      go("create");
    }
  }), /*#__PURE__*/React.createElement(CBorder, {
    inset: 20
  }), /*#__PURE__*/React.createElement(CListRow, {
    left: /*#__PURE__*/React.createElement(CAsset, {
      emoji: "\uD83D\uDD17",
      tone: "neutral",
      size: 40
    }),
    title: "\uCD08\uB300 \uB9C1\uD06C \uBCF4\uB0B4\uAE30",
    description: "\uC544\uC9C1 \uC548 \uC9C0\uC6B4 \uC0AC\uB78C\uC5D0\uAC8C \uB2E4\uC2DC \uACF5\uC720\uD574\uC694",
    chevron: true,
    onClick: () => {
      setSettingsOpen(false);
      go("invite");
    }
  }), /*#__PURE__*/React.createElement(CBorder, {
    inset: 20
  }), /*#__PURE__*/React.createElement(ToggleRow, {
    icon: "bell",
    title: "\uC774 \uD68C\uC758 \uC54C\uB9BC",
    desc: "\uC751\uB2F5\uACFC \uD655\uC815 \uC18C\uC2DD\uC744 \uC54C\uB824\uB4DC\uB824\uC694",
    checked: remind,
    onChange: () => setRemind(v => !v)
  }))));
}
function InfoRow({
  icon,
  label,
  value
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 12,
      padding: "15px 18px"
    }
  }, /*#__PURE__*/React.createElement(CAsset, {
    tone: "neutral",
    size: 28
  }, /*#__PURE__*/React.createElement(CIcon, {
    name: icon,
    size: 18,
    color: "var(--grey-600)"
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      font: "var(--font-body-2)",
      color: "var(--text-weak)",
      width: 52,
      flexShrink: 0
    }
  }, label), /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 1,
      textAlign: "right",
      font: "var(--font-body-2)",
      color: "var(--text-strong)",
      letterSpacing: "var(--tracking-normal)"
    }
  }, value));
}

// ── MY (tab) ────────────────────────────────────────────────
function MyScreen({
  anonymous = true,
  setAnonymous
}) {
  const [reveal, setReveal] = React.useState(false);
  const [about, setAbout] = React.useState(false);
  const [help, setHelp] = React.useState(false);
  const [nRes, setNRes] = React.useState(true);
  const [nChat, setNChat] = React.useState(true);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      height: "100%",
      background: "var(--surface-page)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "14px 20px 8px"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      font: "var(--font-title-1)",
      color: "var(--text-strong)",
      letterSpacing: "var(--tracking-tight)"
    }
  }, "\uB9C8\uC774")), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      overflowY: "auto",
      padding: "0 0 12px"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 14,
      padding: "12px 20px 8px"
    }
  }, /*#__PURE__*/React.createElement(CAvatar, {
    name: "\uC9C0\uC6D0",
    index: 0,
    size: 56
  }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      font: "var(--font-title-3)",
      color: "var(--text-strong)",
      letterSpacing: "var(--tracking-normal)"
    }
  }, "\uC9C0\uC6D0\uB2D8"), /*#__PURE__*/React.createElement("div", {
    style: {
      font: "var(--font-caption-1)",
      color: "var(--text-sub)",
      marginTop: 2
    }
  }, "sai.im \uACC4\uC815\uC73C\uB85C \uB85C\uADF8\uC778\uD588\uC5B4\uC694"))), /*#__PURE__*/React.createElement(CListHeader, {
    title: "\uC775\uBA85",
    description: "\uC0AC\uC774\uC758 \uAE30\uBCF8\uAC12\uC774\uC5D0\uC694"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      margin: "0 20px",
      background: "var(--surface-card)",
      borderRadius: "var(--radius-lg)",
      boxShadow: "var(--shadow-xs)",
      overflow: "hidden"
    }
  }, /*#__PURE__*/React.createElement(ToggleRow, {
    icon: "lock",
    title: "\uC775\uBA85\uC73C\uB85C \uCC38\uC5EC",
    desc: "\uD68C\uC758\uC5D0\uC11C \uB0B4 \uC774\uB984\uC744 \uC228\uACA8\uC694",
    checked: anonymous,
    onChange: () => setAnonymous && setAnonymous(v => !v)
  }), /*#__PURE__*/React.createElement(CBorder, {
    inset: 52
  }), /*#__PURE__*/React.createElement(ToggleRow, {
    icon: "eye",
    title: "\uC2E4\uBA85 \uACF5\uAC1C \uC694\uCCAD \uBC1B\uAE30",
    desc: "\uAF2D \uD544\uC694\uD560 \uB54C\uB9CC \uC0C1\uB300\uAC00 \uC694\uCCAD\uD560 \uC218 \uC788\uC5B4\uC694",
    checked: reveal,
    onChange: () => setReveal(v => !v)
  })), /*#__PURE__*/React.createElement(CListHeader, {
    title: "\uC54C\uB9BC"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      margin: "0 20px",
      background: "var(--surface-card)",
      borderRadius: "var(--radius-lg)",
      boxShadow: "var(--shadow-xs)",
      overflow: "hidden"
    }
  }, /*#__PURE__*/React.createElement(ToggleRow, {
    icon: "bell",
    title: "\uC751\uB2F5 \uC54C\uB9BC",
    desc: "\uCC38\uC11D\uC790\uAC00 \uC2DC\uAC04\uC744 \uC9C0\uC6B0\uBA74 \uC54C\uB824\uB4DC\uB824\uC694",
    checked: nRes,
    onChange: () => setNRes(v => !v)
  }), /*#__PURE__*/React.createElement(CBorder, {
    inset: 52
  }), /*#__PURE__*/React.createElement(ToggleRow, {
    icon: "message",
    title: "\uCC44\uD305 \uC54C\uB9BC",
    desc: "\uC0C8 \uC775\uBA85 \uBA54\uC2DC\uC9C0\uB97C \uC54C\uB824\uB4DC\uB824\uC694",
    checked: nChat,
    onChange: () => setNChat(v => !v)
  })), /*#__PURE__*/React.createElement(CListHeader, {
    title: "\uC0AC\uC774"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      margin: "0 20px",
      background: "var(--surface-card)",
      borderRadius: "var(--radius-lg)",
      boxShadow: "var(--shadow-xs)",
      overflow: "hidden"
    }
  }, /*#__PURE__*/React.createElement(CListRow, {
    left: /*#__PURE__*/React.createElement(CAsset, {
      tone: "neutral",
      size: 28
    }, /*#__PURE__*/React.createElement(CIcon, {
      name: "heart",
      size: 18,
      color: "var(--grey-600)"
    })),
    title: "\uC0AC\uC774 \uC18C\uAC1C",
    chevron: true,
    onClick: () => setAbout(true)
  }), /*#__PURE__*/React.createElement(CBorder, {
    inset: 52
  }), /*#__PURE__*/React.createElement(CListRow, {
    left: /*#__PURE__*/React.createElement(CAsset, {
      tone: "neutral",
      size: 28
    }, /*#__PURE__*/React.createElement(CIcon, {
      name: "sparkle",
      size: 18,
      color: "var(--grey-600)"
    })),
    title: "\uB3C4\uC6C0\uB9D0",
    chevron: true,
    onClick: () => setHelp(true)
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      height: 12
    }
  })), /*#__PURE__*/React.createElement(window.BottomSheet, {
    open: about,
    onClose: () => setAbout(false),
    title: "\uC0AC\uC774 \uC18C\uAC1C"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 12,
      marginBottom: 14
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: "../../assets/logo-sai.png",
    alt: "\uC0AC\uC774",
    style: {
      width: 44,
      height: 44,
      objectFit: "contain"
    }
  }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      font: "var(--font-title-3)",
      color: "var(--text-strong)",
      letterSpacing: "var(--tracking-normal)"
    }
  }, "\uC0AC\uC774"), /*#__PURE__*/React.createElement("div", {
    style: {
      font: "var(--font-caption-1)",
      color: "var(--text-weak)",
      marginTop: 2
    }
  }, "\uBC84\uC804 1.0.0 \xB7 \uCD5C\uC2E0 \uBC84\uC804\uC774\uC5D0\uC694"))), /*#__PURE__*/React.createElement(CP, {
    typography: "body-2",
    color: "sub"
  }, "\uC88B\uC740 \uC2DC\uAC04\uC744 \uCC3E\uC73C\uB824\uBA74 \uBAA8\uB450\uAC00 \uC77C\uC815\uC744 \uACF5\uAC1C\uD574\uC57C \uD574\uC694. \uC0AC\uC774\uB294 \uBC18\uB300\uB85C, \uC2EB\uC740 \uC2DC\uAC04\uB9CC \uC775\uBA85\uC73C\uB85C \uC9C0\uC6B0\uBA74 \uB0A8\uC740 \uC2DC\uAC04 \uC911\uC5D0\uC11C \uD68C\uC758\uB97C \uC815\uD574\uC918\uC694."), /*#__PURE__*/React.createElement("div", {
    style: {
      height: 16
    }
  }), /*#__PURE__*/React.createElement(CB, {
    variant: "weak",
    size: "md",
    fullWidth: true,
    onClick: () => setAbout(false)
  }, "\uB2EB\uAE30")), /*#__PURE__*/React.createElement(window.BottomSheet, {
    open: help,
    onClose: () => setHelp(false),
    title: "\uB3C4\uC6C0\uB9D0"
  }, [["🧽", "왜 ‘지우기’인가요?", "가능한 시간을 고르는 대신, 안 되는 시간만 지워요. 남은 시간 중 하나로 확정돼요."], ["🕶️", "정말 익명인가요?", "누가 어떤 시간을 지웠는지는 아무도 볼 수 없어요. 사유도 숫자로만 모여요."], ["🎯", "확정은 누가 하나요?", "만든 사람이 추천 시간 중에서 확정해요. 확정되면 모두에게 알림이 가요."]].map(([e, t, d]) => /*#__PURE__*/React.createElement("div", {
    key: t,
    style: {
      display: "flex",
      gap: 12,
      padding: "9px 0"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 19
    }
  }, e), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      font: "var(--font-label)",
      color: "var(--text-strong)",
      letterSpacing: "var(--tracking-normal)"
    }
  }, t), /*#__PURE__*/React.createElement("div", {
    style: {
      font: "var(--font-caption-1)",
      color: "var(--text-sub)",
      marginTop: 2,
      lineHeight: 1.5
    }
  }, d)))), /*#__PURE__*/React.createElement("div", {
    style: {
      height: 12
    }
  }), /*#__PURE__*/React.createElement(CB, {
    variant: "weak",
    size: "md",
    fullWidth: true,
    onClick: () => setHelp(false)
  }, "\uB2EB\uAE30")));
}
function ToggleRow({
  icon,
  title,
  desc,
  checked,
  onChange
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 12,
      padding: "13px 18px"
    }
  }, /*#__PURE__*/React.createElement(CAsset, {
    tone: "neutral",
    size: 28
  }, icon === "message" ? /*#__PURE__*/React.createElement(MsgIcon, {
    size: 18,
    color: "var(--grey-600)"
  }) : /*#__PURE__*/React.createElement(CIcon, {
    name: icon,
    size: 18,
    color: "var(--grey-600)"
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      font: "var(--font-body-1)",
      color: "var(--text-strong)",
      letterSpacing: "var(--tracking-normal)"
    }
  }, title), /*#__PURE__*/React.createElement("div", {
    style: {
      font: "var(--font-caption-1)",
      color: "var(--text-weak)",
      marginTop: 1
    }
  }, desc)), /*#__PURE__*/React.createElement(CSwitch, {
    checked: checked,
    onChange: onChange
  }));
}
Object.assign(window, {
  AppShell,
  Fab,
  MeetingCard,
  EmptyState,
  MsgIcon,
  BellButton,
  NotifSheet,
  HomeScreen,
  ChatListScreen,
  ChatThreadScreen,
  DetailScreen,
  MyScreen
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/sai/screens-c.jsx", error: String((e && e.message) || e) }); }

__ds_ns.ProposalCard = __ds_scope.ProposalCard;

__ds_ns.VetoCell = __ds_scope.VetoCell;

__ds_ns.Asset = __ds_scope.Asset;

__ds_ns.Badge = __ds_scope.Badge;

__ds_ns.Border = __ds_scope.Border;

__ds_ns.BottomCTA = __ds_scope.BottomCTA;

__ds_ns.Button = __ds_scope.Button;

__ds_ns.ListHeader = __ds_scope.ListHeader;

__ds_ns.ListRow = __ds_scope.ListRow;

__ds_ns.Paragraph = __ds_scope.Paragraph;

__ds_ns.Avatar = __ds_scope.Avatar;

__ds_ns.AvatarStack = __ds_scope.AvatarStack;

__ds_ns.Checkbox = __ds_scope.Checkbox;

__ds_ns.Chip = __ds_scope.Chip;

__ds_ns.Switch = __ds_scope.Switch;

__ds_ns.TextField = __ds_scope.TextField;

__ds_ns.ICON_NAMES = __ds_scope.ICON_NAMES;

__ds_ns.Icon = __ds_scope.Icon;

__ds_ns.NavigationBar = __ds_scope.NavigationBar;

__ds_ns.Tab = __ds_scope.Tab;

__ds_ns.TopBar = __ds_scope.TopBar;

})();
