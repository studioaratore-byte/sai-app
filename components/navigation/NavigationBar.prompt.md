**NavigationBar** — the 56px top app bar. Back chevron by default; pass `backIcon="✕"` for a close bar on modals/flows. Keep the centered title hidden until the big `TopBar` title scrolls away (`titleVisible={scrolled}`).

```jsx
<NavigationBar onBack={goBack} title="회의 만들기" titleVisible={scrolled} right={<Button variant="ghost" size="sm">저장</Button>} />
```
