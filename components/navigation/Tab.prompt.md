**Tab** — switch between views in a screen. `underline` for primary content tabs; `capsule` for a compact 2–3 option toggle.

```jsx
<Tab items={[{value:"all",label:"전체"},{value:"mine",label:"내 회의"}]} value={tab} onChange={setTab} />
<Tab variant="capsule" items={["주","월"]} value={range} onChange={setRange} />
```
