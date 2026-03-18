# Mastering CSS Grid Layout

CSS Grid is a powerful layout system that allows you to create complex, responsive designs with ease.

## Basic Grid Setup

```css
.container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}
```

## Grid Template Areas

Define named grid areas for semantic layouts:

```css
.layout {
  display: grid;
  grid-template-areas:
    "header header header"
    "sidebar main main"
    "footer footer footer";
}
```

## Responsive Grids

Create responsive layouts without media queries:

```css
.gallery {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1rem;
}
```

## Conclusion

CSS Grid combined with Flexbox gives you complete control over your layouts. Master these tools and you'll never struggle with complex designs again!
