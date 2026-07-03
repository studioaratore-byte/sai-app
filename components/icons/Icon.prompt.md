**Icon** — 사이's Toss-style line icon set (30 glyphs, 24×24, rounded strokes, `currentColor`). Use inside an `Asset` for the tinted-container look, or inline in buttons/rows.

```jsx
<Icon name="calendar" />
<Icon name="coffee" size={28} color="var(--warning)" />
<Asset tone="primary"><Icon name="sparkle" color="var(--primary)" /></Asset>
```

Names: `calendar clock users user bell link share lock eye eye-off heart star sparkle check check-circle close plus minus chevron-right edit trash pin coffee briefcase flag home video send search settings`. Import `ICON_NAMES` for the full list (30 glyphs, e.g. to build an icon picker). Color follows text color unless `color` is set.
