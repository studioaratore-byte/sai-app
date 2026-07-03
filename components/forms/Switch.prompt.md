**Switch** — binary toggle, blue when on. Pair inside a `ListRow` right slot for settings and the 필수/선택 참석자 flag.

```jsx
<ListRow title="필수 참석자" right={<Switch checked={req} onChange={setReq} />} />
```
