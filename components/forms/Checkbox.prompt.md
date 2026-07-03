**Checkbox** — `circle` for multi-select lists, `square` for terms/agreement rows. Blue fill + white check when on.

```jsx
<Checkbox checked={sel} onChange={setSel} label="점심 직후" />
<Checkbox shape="square" checked={agree} onChange={setAgree} label="약관에 동의해요" />
```
