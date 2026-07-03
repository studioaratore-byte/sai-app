**Paragraph** — all text should render through this so the type ramp and color aliases stay consistent. Pick a `typography` token and a semantic `color`.

```jsx
<Paragraph typography="title-1" color="strong">언제 만날까요?</Paragraph>
<Paragraph typography="body-2" color="sub">싫은 시간만 지우면 돼요</Paragraph>
<Paragraph typography="caption-1" color="weak">외근 2명</Paragraph>
```

Headings (`display-*`, `title-*`) render as `<h2>` by default; override with `as`.
