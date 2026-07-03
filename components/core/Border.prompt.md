**Border** — divider between rows and sections. `line` is a 1px hairline; `block` is an 8px grey band that separates major sections (TDS uses these instead of extra whitespace).

```jsx
<Border />                      {/* hairline between list rows */}
<Border inset={20} />           {/* inset to align with row text */}
<Border variant="block" />      {/* thick section separator */}
```
