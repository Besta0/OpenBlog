A Complete Guide to `export` and `export default` (React / JS Modules for Beginners)

 When I first started learning React, I was puzzled by one question for a long time:

 👉 **Why do some components use**  ` **`import xxx``, while others use ``{ xxx }``?**

 It wasn’t until I truly understood **the difference between `export` and `export default`** that the entire module system became completely clear.

 This article explains it in the simplest way possible 👇

---

# 🧠 A Quick Overview

- `export`: “exporting” things
- `import`: “Bringing in” what others have exported

---

# 🔵 I. What is `export` for?

 In JavaScript, every file is a “module.”

 If you don’t use ` `export` `:

 👉 The contents of this file **cannot be used outside of it**

---

## 📊 For example

### a.js

```jsx
export const name = "caleb"
```

### b.js

```jsx
import { name } from './a'

console.log(name)
```

 👉 Output:

```
caleb
```

---

# 🟢 II. export default (default export)

## 📌 Key Features

- Only one per file
- No curly braces ( `{ }` ) required when importing
- You can name it anything

---

## 📊 Example

```jsx
export default function App() {
  return <div>Hello</div>
}
```

---

## Import method

```jsx
import App from './App'
```

 You can even write:

```jsx
import A from './App'
```

 👉 You choose the name yourself

---

# 🟡 3. Exporting Names

## 📌 Features

- Multiple entries are allowed
- Must be enclosed  `in { }` when imported
- Names must match

---

## 📊 Example

```jsx
export function Profile() {
  return <div>Profile</div>
}

export const age = 18
```

---

## Import

```jsx
import { Profile, age } from './file'
```

---

# 🔥 IV. Summary of Key Differences

|  Comparison |  export default |  export |
| --- | --- | --- |
|  Number |  Only 1 allowed |  Multiple allowed |
|  Import method |  No `{}` |  Must be `{}` |
|  Name |  Can be changed freely |  Must be consistent |
|  Use Case |  Main component |  Utility functions / Child components |

---

# 📂 5. A Real-Life Pitfall (I Just Encountered It)

 I wrote a file like this 👇

```jsx
// test1.js
export function AB() {
  return <div>?????</div>
}

export default function Gallery() {
  return <h1>Gallery</h1>
}
```

 Then I wrote this in another file:

```jsx
import Gallery from "./test1"
import AB from "./test1"   // ❌ 报错
```

---

## ❌ Why is this wrong?

 👉 Because:

- `AB` is a **named export**
- but I used **the default import method**

---

## ✅ Correct syntax

```jsx
import Gallery from "./test1"
import { AB } from "./test1"
```

---

## 🚀 A more elegant approach

```jsx
import Gallery, { AB } from "./test1"
```

---

# 🧩 6. Practical Significance in React

 In React projects:

- `export default` → Typically used for **pages or main components**
- `export` → Typically used for **child components / utility functions**

---

# 🎯 7. Standard Interview Answer (Ready to Use)

> `export` is used to expose variables, functions, or components from a module for use by other files;
> 
> 
>  `export default` is the default export; there can only be one per file, and curly braces are not required when importing;
> 
>  Regular `export` is a named export; there can be multiple of these, and curly braces are required when importing, with the names needing to match exactly.
> 

---

# 🚀 8. Summary (Remember this key point)

 👉 default: one, any name, no curly braces

 👉 export: multiple, exact names, requires curly braces

---

# ✨ Final Thoughts

 When you first start learning, this part can be really confusing.

 But once you understand:

 👉 **A React project is essentially “building blocks”**

 you’ll find the entire structure becomes crystal clear.

---

 If you’re just getting started with React, I hope this post helps you avoid some pitfalls 👍