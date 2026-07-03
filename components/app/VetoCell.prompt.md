**VetoCell** — the core 사이 gesture. In `input` mode the user taps a time to *veto* it (red cross-out); untouched cells stay silent (no "available" painting). In `aggregate` mode it's read-only and the red intensity scales with the veto count, while a fully-clear slot shows a blue ✓.

```jsx
{/* participant erasing bad times */}
<VetoCell label="오후 2시" sublabel="화 · 4/2" vetoed={v} onToggle={setV} />

{/* host reviewing results */}
<VetoCell label="오전 10시" mode="aggregate" vetoCount={0} totalPeople={6} />
<VetoCell label="오후 1시" mode="aggregate" vetoCount={4} totalPeople={6} />

{/* expanded aggregate cell with per-reason chips */}
<VetoCell label="오후 2시" sublabel="화" mode="aggregate" vetoCount={3} totalPeople={6}
  reasons={[{label:"외근",count:2},{label:"점심 직후",count:1}]} />
```

Lay these out in a CSS grid (time × day). Never render an "available/green" state — the whole point is that silence isn't consent, so only vetoes carry weight.
