import * as React from "react";

/**
 *
 */
export type Orientation = "horizontal" | "vertical" | "both";
/**
 *
 */
export type FocusGroupOpts = {
  orientation?: Orientation;
  loop?: boolean;
};
/**
 * Hook for managing focus within a group of elements (keyboard navigation).
 *
 * @description This hook provides logic for handling keyboard navigation (arrows, Home, End)
 * within a group of elements, such as tabs, menu items, or accordion headers.
 *
 * @param {Object} [options={}] - The options for the hook.
 * @param {Orientation} [options.orientation="both"] - The orientation of navigation.
 * @param {boolean} [options.loop=true] - Whether navigation should loop at the ends.
 * @returns {Object} An object containing state and handlers for focus group navigation.
 *
 * @example
 * ```tsx
 * const focusGroup = useFocusGroup({ orientation: "horizontal" });
 * ```
 */
export function useFocusGroup({
  orientation = "both",
  loop = true,
}: FocusGroupOpts = {}) {
  const [activeId, setActiveId] = React.useState<string | null>(null);
  const itemsRef = React.useRef<Map<string, HTMLElement>>(new Map());

  const registerItem = React.useCallback((id: string, element: HTMLElement) => {
    itemsRef.current.set(id, element);
    return () => {
      itemsRef.current.delete(id);
    };
  }, []);

  const getItems = React.useCallback(() => {
    return Array.from(itemsRef.current.entries()).sort((a, b) => {
      const position = a[1].compareDocumentPosition(b[1]);
      if (position & Node.DOCUMENT_POSITION_FOLLOWING) return -1;
      if (position & Node.DOCUMENT_POSITION_PRECEDING) return 1;
      return 0;
    });
  }, []);

  const moveFocus = React.useCallback(
    (direction: number) => {
      const items = getItems();
      const currentIndex = items.findIndex(([id]) => id === activeId);
      let nextIndex = currentIndex + direction;

      if (loop) {
        nextIndex = (nextIndex + items.length) % items.length;
      } else {
        nextIndex = Math.max(0, Math.min(nextIndex, items.length - 1));
      }

      const nextItem = items[nextIndex];
      if (nextItem) {
        const [nextId, nextElement] = nextItem;
        setActiveId(nextId);
        nextElement.focus();
        return nextId;
      }
      return null;
    },
    [activeId, getItems, loop],
  );

  const onKeyDown = React.useCallback(
    (e: React.KeyboardEvent) => {
      const isHorizontal =
        orientation === "horizontal" || orientation === "both";
      const isVertical = orientation === "vertical" || orientation === "both";

      switch (e.key) {
        case "ArrowRight":
          if (isHorizontal) {
            e.preventDefault();
            moveFocus(1);
          }
          break;
        case "ArrowLeft":
          if (isHorizontal) {
            e.preventDefault();
            moveFocus(-1);
          }
          break;
        case "ArrowDown":
          if (isVertical) {
            e.preventDefault();
            moveFocus(1);
          }
          break;
        case "ArrowUp":
          if (isVertical) {
            e.preventDefault();
            moveFocus(-1);
          }
          break;
        case "Home":
          e.preventDefault();
          const items = getItems();
          if (items.length > 0) {
            const item = items[0];
            if (!item) return;
            const [id, el] = item;
            setActiveId(id);
            el.focus();
          }
          break;
        case "End":
          e.preventDefault();
          const allItems = getItems();
          if (allItems.length > 0) {
            const item = allItems[allItems.length - 1];
            if (!item) return;
            const [id, el] = item;
            setActiveId(id);
            el.focus();
          }
          break;
      }
    },
    [orientation, moveFocus, getItems],
  );

  return {
    activeId,
    setActiveId,
    registerItem,
    onKeyDown,
    moveFocus,
    getItems,
  };
}
