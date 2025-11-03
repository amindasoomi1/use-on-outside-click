# useOnOutsideClick Hook

A lightweight and flexible React hook to detect clicks outside one or multiple elements.

## 🚀 Features

- Supports **multiple elements** (Refs, DOM nodes, or CSS selectors)
- **Skip option** to temporarily disable the listener
- Automatically cleans up listeners on unmount
- Works with **React 18+**
- TypeScript support

## 📦 Installation

```bash
npm install use-on-outside-click
# or
yarn add use-on-outside-click
```

## 🧠 Usage

```tsx
import { useRef } from "react";
import useOnOutsideClick from "use-on-outside-click";

export default function Example() {
  const ref1 = useRef<HTMLDivElement>(null);
  const ref2 = useRef<HTMLDivElement>(null);

  useOnOutsideClick([ref1, ref2, "#modal"], () => {
    console.log("Clicked outside all elements!");
  });

  return (
    <>
      <div ref={ref1}>Box 1</div>
      <div ref={ref2}>Box 2</div>
      <div id="modal">Modal</div>
    </>
  );
}
```

## ⚙️ Options

| Option | Type      | Default | Description                      |
| ------ | --------- | ------- | -------------------------------- |
| `skip` | `boolean` | `false` | Disable the listener temporarily |

## 🧩 Type Definitions

```ts
type ElementInput = RefObject<HTMLElement | null> | HTMLElement | string | null;
type ElementList = ElementInput | ElementInput[];

type Options = {
  skip?: boolean;
};
```

## 🪶 Example with conditional skip

```tsx
useOnOutsideClick(ref, closeMenu, { skip: !isMenuOpen });
```

## 🧹 Cleanup

The hook automatically removes the event listener when the component unmounts.

---

Made with ❤️ for React developers.
