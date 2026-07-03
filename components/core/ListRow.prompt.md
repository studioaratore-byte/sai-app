**ListRow** — the workhorse row for lists and settings. Left graphic, title + optional description, right value or control. Add `onClick` to make the whole row pressable (with a press fill).

```jsx
<ListRow left={<Asset emoji="🧑‍💼" />} title="김지원" description="필수 참석자" right={<Switch checked />} />
<ListRow title="회의 이름" description="주간 디자인 리뷰" chevron onClick={edit} />
```

Separate rows with `<Border inset={20} />` to align the hairline with the text.
