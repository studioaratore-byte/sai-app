**Asset** — the tinted rounded graphic container Toss uses for 3D emoji / icon illustrations. Fill it with an `emoji`, an image `src`, or children.

```jsx
<Asset emoji="🗓️" tone="primary" size={56} />
<Asset emoji="🍽️" tone="warning" shape="squircle" />
<Asset src="assets/logo.png" tone="none" />
```

Prefer emoji for quick states; swap in a real 3D asset image for production.
