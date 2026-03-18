# Optimizing Web Performance

Performance is critical for user experience and SEO. Here are practical optimization techniques.

## Core Web Vitals

- **LCP** - Largest Contentful Paint
- **FID** - First Input Delay  
- **CLS** - Cumulative Layout Shift

## Image Optimization

```tsx
import Image from 'next/image';

export function Hero() {
  return (
    <Image
      src="/hero.jpg"
      alt="Hero"
      width={1200}
      height={600}
      priority
      placeholder="blur"
    />
  );
}
```

## Code Splitting

Lazy load components:

```tsx
import dynamic from 'next/dynamic';

const HeavyChart = dynamic(() => import('./Chart'), {
  loading: () => <ChartSkeleton />,
});
```

## Bundle Analysis

Use `@next/bundle-analyzer` to find large dependencies:

```bash
npm run build -- --analyze
```

## Conclusion

Performance optimization is an ongoing process. Monitor your metrics and continuously improve.
