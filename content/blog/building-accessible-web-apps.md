# Building Accessible Web Apps

Web accessibility ensures that people with disabilities can use your applications effectively.

## Key Principles

### 1. Semantic HTML

Use proper HTML elements:

```html
<!-- Bad -->
<div onclick="submit()">Submit</div>

<!-- Good -->
<button type="submit">Submit</button>
```

### 2. ARIA Labels

Provide accessible names for interactive elements:

```html
<button aria-label="Close menu">
  <XIcon />
</button>
```

### 3. Focus Management

Ensure keyboard navigation works properly:

```css
:focus-visible {
  outline: 2px solid blue;
  outline-offset: 2px;
}
```

## Testing

Use tools like:
- axe DevTools
- WAVE
- Lighthouse

## Conclusion

Accessibility is not an afterthought - it's essential for inclusive web development.
