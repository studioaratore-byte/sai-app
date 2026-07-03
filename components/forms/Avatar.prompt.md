**Avatar / AvatarStack** — participant markers. Use `anonymous` to render a masked placeholder (사이's default, since who-vetoed stays hidden). `AvatarStack` overlaps a group and adds a `+N` overflow.

```jsx
<Avatar name="김지원" index={0} />
<Avatar anonymous />
<AvatarStack people={["김","이","박","정","최"]} max={4} anonymous />
```
