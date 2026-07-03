**ProposalCard** — the result of 사이's tally: a candidate time with an anonymous veto summary and a confirm button. The top pick gets `recommended` (blue border + "사이 추천" badge). Reasons stay counts-only — never names.

```jsx
<ProposalCard recommended date="4월 2일 화요일" time="오전 10시" vetoCount={0} onConfirm={confirm} />
<ProposalCard date="4월 3일 수요일" time="오후 2시" vetoCount={3}
  reasons={[{label:"외근",count:2},{label:"점심 직후",count:1}]} onConfirm={confirm} />
```

Copy follows TDS UX writing: positive framing when clear ("아무도 부담스러워하지 않아요"), neutral count otherwise.
