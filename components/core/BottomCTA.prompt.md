**BottomCTA** — pins the primary action to the screen bottom with a protection gradient and safe-area padding. Use on any flow screen with a "next / confirm" action.

```jsx
<BottomCTA>
  <Button variant="primary" size="lg" fullWidth>다음</Button>
</BottomCTA>
```

- For two actions, pass two buttons (e.g. a `weak` + a `primary`); they share the row equally.
- Set `gradient={false}` when the dock sits on a solid card with no content scrolling behind it.
