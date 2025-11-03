import { RefObject, useEffect, useRef } from "react";

type TargetElement = HTMLElement | null;
type ElementInput = RefObject<TargetElement> | TargetElement | string | null;
type ElementList = ElementInput | ElementInput[];

type Options = {
  skip?: boolean;
};

export default function useOnOutsideClick(
  elements: ElementList,
  callback: (event: MouseEvent) => void,
  { skip = false }: Options = {}
) {
  const callbackRef = useRef(callback);
  const elementsRef = useRef<ElementList>(elements);

  callbackRef.current = callback;
  elementsRef.current = elements;

  const resolveElement = (el: ElementInput): TargetElement => {
    if (!el) return null;
    if (typeof el === "string") return document.querySelector<HTMLElement>(el);
    if ("current" in el) return el.current;
    return el;
  };

  useEffect(() => {
    if (skip) return;

    const handler = (e: MouseEvent) => {
      const target = e.target as Node | null;
      if (!target) return;

      const els = Array.isArray(elementsRef.current)
        ? elementsRef.current.map(resolveElement)
        : [resolveElement(elementsRef.current)];

      const validEls = els.filter(Boolean) as HTMLElement[];

      const isInside = validEls.some((el) => el.contains(target));

      if (validEls.length && !isInside) {
        callbackRef.current(e);
      }
    };

    document.addEventListener("pointerdown", handler);
    return () => document.removeEventListener("pointerdown", handler);
  }, [skip]);
}
