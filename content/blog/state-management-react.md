Choosing the right state management solution is crucial for building scalable React applications.

## Local State

Use `useState` for component-level state:

```tsx
function Counter() {
  const [count, setCount] = useState(0);
  return <button onClick={() => setCount(c => c + 1)}>{count}</button>;
}
```

## Server State

Use React Query or SWR for server data:

```tsx
import { useQuery } from '@tanstack/react-query';

function UserProfile({ userId }) {
  const { data, isLoading } = useQuery({
    queryKey: ['user', userId],
    queryFn: () => fetchUser(userId)
  });
  
  if (isLoading) return <Skeleton />;
  return <Profile user={data} />;
}
```

## Global State

Use Zustand for simple global state:

```tsx
import { create } from 'zustand';

const useStore = create((set) => ({
  count: 0,
  increment: () => set((state) => ({ count: state.count + 1 })),
}));
```

## Conclusion

Start simple and scale up as needed. Don't reach for Redux until you truly need it.
