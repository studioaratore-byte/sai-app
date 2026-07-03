**Button** — TDS primary action control; use for any tappable action. Blue `primary` is the default; `weak` for secondary actions, `dark` for high-contrast, `ghost` for tertiary/inline.

```jsx
<Button variant="primary" size="lg" fullWidth onClick={submit}>다음</Button>
<Button variant="weak" size="md">건너뛰기</Button>
<Button variant="ghost" size="sm">닫기</Button>
```

- Sizes `lg` (56px, forms/CTA) · `md` (48px) · `sm` (40px).
- `loading` swaps the label for a spinner and blocks clicks; `disabled` greys it out.
- For a screen-bottom fixed action, wrap in `BottomCTA` and pass `fullWidth`.
