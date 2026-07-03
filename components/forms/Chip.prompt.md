**Chip** — selectable pill for reason tags (외근 · 점심 직후 · 개인 일정) and quick filters. Neutral when unselected, tone-colored with a border when selected. `negative` tone reads as a "veto reason".

```jsx
<Chip selected={r==="외근"} tone="negative" onClick={()=>pick("외근")}>외근</Chip>
<Chip selected removable onRemove={clear}>점심 직후</Chip>
```
