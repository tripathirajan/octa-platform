import * as React from "react";

export type Options = {
  itemCount: number;
  isItemDisabled?: (index: number) => boolean;
  loop?: boolean;
  orientation?: "vertical" | "horizontal";
  onSelect?: (index: number) => void;
  onEscape?: () => void;
};

export function useCompositeNavigation({
  itemCount,
  isItemDisabled,
  loop = true,
  orientation = "vertical",
  onSelect,
  onEscape,
}: Options) {
  const [activeIndex, setActiveIndex] = React.useState(0);

  const getNextEnabled = React.useCallback(
    (start: number, delta: number) => {
      let index = start;

      for (let i = 0; i < itemCount; i++) {
        index = index + delta;

        if (loop) {
          index = (index + itemCount) % itemCount;
        } else {
          if (index < 0 || index >= itemCount) return start;
        }

        if (!isItemDisabled?.(index)) return index;
      }

      return start;
    },
    [itemCount, isItemDisabled, loop],
  );

  const move = React.useCallback(
    (delta: number) => {
      setActiveIndex((prev) => getNextEnabled(prev, delta));
    },
    [getNextEnabled],
  );

  const onKeyDown = React.useCallback(
    (e: React.KeyboardEvent) => {
      const vertical = orientation === "vertical";

      switch (e.key) {
        case "ArrowDown":
          if (vertical) {
            e.preventDefault();
            move(1);
          }
          break;

        case "ArrowUp":
          if (vertical) {
            e.preventDefault();
            move(-1);
          }
          break;

        case "Enter":
        case " ":
          e.preventDefault();
          if (!isItemDisabled?.(activeIndex)) {
            onSelect?.(activeIndex);
          }
          break;

        case "Escape":
          onEscape?.();
          break;
      }
    },
    [orientation, move, activeIndex, isItemDisabled, onSelect, onEscape],
  );

  const getItemProps = (index: number) => ({
    tabIndex: index === activeIndex ? 0 : -1,
    onFocus: () => setActiveIndex(index),
  });

  return {
    activeIndex,
    setActiveIndex,
    onKeyDown,
    getItemProps,
  };
}
