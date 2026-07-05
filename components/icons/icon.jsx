import React from "react";

/**
 * Icon — 사이's Toss-style line icon set. 24×24 grid, ~1.9px rounded strokes,
 * currentColor. Original set (not Toss's proprietary assets), tuned to the
 * clean rounded Korean-fintech look. 24 glyphs — see ICON_NAMES.
 */
const GLYPHS = {
  calendar: <><path d="M8 2.5v3"/><path d="M16 2.5v3"/><rect x="3.5" y="4.5" width="17" height="16" rx="3"/><path d="M3.5 9.5h17"/></>,
  clock: <><circle cx="12" cy="12" r="8.5"/><path d="M12 7v5.2l3.6 2.1"/></>,
  users: <><circle cx="8.7" cy="8" r="3.3"/><path d="M2.8 19.2c0-3 2.6-4.9 5.9-4.9s5.9 1.9 5.9 4.9"/><path d="M16.2 5.7a3 3 0 0 1 0 5.9"/><path d="M17.8 13.7c2.4.4 3.7 2 3.7 4.5"/></>,
  user: <><circle cx="12" cy="8" r="3.7"/><path d="M5 20c0-3.7 3.1-5.7 7-5.7s7 2 7 5.7"/></>,
  bell: <><path d="M6 9.5a6 6 0 0 1 12 0c0 4.8 2 6 2 6H4s2-1.2 2-6Z"/><path d="M9.8 20a2.2 2.2 0 0 0 4.4 0"/></>,
  link: <><path d="M9.6 14.4l4.8-4.8"/><path d="M8 11.6 6.2 13.4a3.4 3.4 0 0 0 4.8 4.8l1.8-1.8"/><path d="M16 12.4l1.8-1.8a3.4 3.4 0 0 0-4.8-4.8l-1.8 1.8"/></>,
  share: <><circle cx="6" cy="12" r="2.7"/><circle cx="17.2" cy="6" r="2.7"/><circle cx="17.2" cy="18" r="2.7"/><path d="M8.4 10.8 14.8 7.2"/><path d="M8.4 13.2l6.4 3.6"/></>,
  lock: <><rect x="4.5" y="10.3" width="15" height="9.7" rx="2.6"/><path d="M8 10.3V8a4 4 0 0 1 8 0v2.3"/><path d="M12 14.3v2.4"/></>,
  eye: <><path d="M2.6 12S6.1 5.6 12 5.6 21.4 12 21.4 12 17.9 18.4 12 18.4 2.6 12 2.6 12Z"/><circle cx="12" cy="12" r="3"/></>,
  "eye-off": <><path d="M9.6 6.1A9.7 9.7 0 0 1 12 5.6c5.9 0 9.4 6.4 9.4 6.4a15.8 15.8 0 0 1-3 3.6"/><path d="M6 7.6A15.9 15.9 0 0 0 2.6 12s3.5 6.4 9.4 6.4a9.4 9.4 0 0 0 3.6-.7"/><path d="M10 10a2.8 2.8 0 0 0 4 4"/><path d="M4 4l16 16"/></>,
  heart: <><path d="M12 20s-7-4.3-9.2-8.6C1.2 8.3 2.9 5 6 5c2 0 3.2 1.2 4 2.4C10.8 6.2 12 5 14 5c3.1 0 4.8 3.3 3.2 6.4C19 15.7 12 20 12 20Z"/></>,
  star: <><path d="M12 3.5l2.6 5.3 5.9.9-4.3 4.1 1 5.9L12 17l-5.2 2.7 1-5.9-4.3-4.1 5.9-.9Z"/></>,
  sparkle: <><path d="M12 3c.5 3.9 1.6 5 5.5 5.5C13.6 9 12.5 10.1 12 14c-.5-3.9-1.6-5-5.5-5.5C10.4 8 11.5 6.9 12 3Z"/><path d="M18.5 13.5c.3 2 .8 2.5 2.8 2.8-2 .3-2.5.8-2.8 2.8-.3-2-.8-2.5-2.8-2.8 2-.3 2.5-.8 2.8-2.8Z"/></>,
  check: <><path d="M5 12.5l4.5 4.5L19 7"/></>,
  "check-circle": <><circle cx="12" cy="12" r="8.6"/><path d="M8.2 12.3l2.6 2.6 5-5.3"/></>,
  close: <><path d="M6.5 6.5l11 11"/><path d="M17.5 6.5l-11 11"/></>,
  plus: <><path d="M12 5v14"/><path d="M5 12h14"/></>,
  minus: <><path d="M5 12h14"/></>,
  "chevron-right": <><path d="M9.5 5.5l7 6.5-7 6.5"/></>,
  edit: <><path d="M14.5 5.5l4 4L9 19l-4.5 1 1-4.5 9-9Z"/><path d="M12.8 7.2l4 4"/></>,
  trash: <><path d="M4.5 7h15"/><path d="M9 7V5.3c0-.7.6-1.3 1.3-1.3h3.4c.7 0 1.3.6 1.3 1.3V7"/><path d="M6.6 7l1 12.2c.06.9.8 1.6 1.7 1.6h5.5c.9 0 1.64-.7 1.7-1.6L18 7"/><path d="M10 11v6"/><path d="M14 11v6"/></>,
  pin: <><path d="M12 21s7-6 7-11a7 7 0 0 0-14 0c0 5 7 11 7 11Z"/><circle cx="12" cy="10" r="2.5"/></>,
  coffee: <><path d="M5 8h11v5a5 5 0 0 1-5 5h-1a5 5 0 0 1-5-5V8Z"/><path d="M16 9.2h2.3a2.4 2.4 0 0 1 0 4.8H16"/><path d="M8 3.4c-.5.8-.5 1.7 0 2.5"/><path d="M11.5 3.4c-.5.8-.5 1.7 0 2.5"/><path d="M5 21h11"/></>,
  briefcase: <><rect x="3.5" y="8" width="17" height="11" rx="2.4"/><path d="M9 8V6.4c0-.8.6-1.4 1.4-1.4h3.2c.8 0 1.4.6 1.4 1.4V8"/><path d="M3.5 13h17"/></>,
  flag: <><path d="M6 21V4"/><path d="M6 5h11l-2.3 3.5L17 12H6"/></>,
  home: <><path d="M4 11.3l8-6.5 8 6.5"/><path d="M6 10.3V20h12v-9.7"/><path d="M10 20v-5h4v5"/></>,
  video: <><rect x="3" y="6.5" width="12.5" height="11" rx="2.6"/><path d="M15.5 10.2l5-2.7v9l-5-2.7"/></>,
  send: <><path d="M20.5 3.5 10 14"/><path d="M20.5 3.5 14 20.5l-4-6.5-6.5-4Z"/></>,
  search: <><circle cx="11" cy="11" r="6.5"/><path d="m20 20-4.2-4.2"/></>,
  settings: <><circle cx="12" cy="12" r="6.8"/><circle cx="12" cy="12" r="2.6"/><path d="M12 2.8v2.4M12 18.8v2.4M2.8 12h2.4M18.8 12h2.4M5.5 5.5l1.7 1.7M16.8 16.8l1.7 1.7M5.5 18.5l1.7-1.7M16.8 7.2l1.7-1.7"/></>,
  message: <><path d="M20 13.4a2.6 2.6 0 0 1-2.6 2.6H10l-4.6 3.5V16H6.6A2.6 2.6 0 0 1 4 13.4V7.6A2.6 2.6 0 0 1 6.6 5h10.8A2.6 2.6 0 0 1 20 7.6Z"/><path d="M8.5 9.4h7"/><path d="M8.5 12.2h4.6"/></>,
};

const ICON_NAMES = Object.keys(GLYPHS);

function Icon({ name = "calendar", size = 24, color = "currentColor", strokeWidth = 1.9, style, ...rest }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      style={{ display: "block", flexShrink: 0, ...style }}
      {...rest}
    >
      {GLYPHS[name] || GLYPHS.calendar}
    </svg>
  );
}
