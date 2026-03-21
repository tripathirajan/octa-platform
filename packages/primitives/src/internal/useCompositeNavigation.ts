import * as React from "react";

export type Options = {
  itemCount: number;
  isItemDisabled?: (index: number) => boolean;
  loop?: boolean;
  orientation?: "vertical" | "horizontal";
  activationMode?: "manual" | "automatic";
  onSelect?: (index: number) => void;
  onEscape?: () => void;
};

export function useCompositeNavigation({
  itemCount,
  isItemDisabled,
  loop = true,
  orientation = "vertical",
  activationMode = "manual",
  onSelect,
  onEscape,
}: Options) {
  const [activeIndex, setActiveIndex] = React.useState(0);

  // Stable refs for callbacks
  const isItemDisabledRef = React.useRef(isItemDisabled);
  const onSelectRef = React.useRef(onSelect);
  const onEscapeRef = React.useRef(onEscape);

  React.useEffect(() => {
    isItemDisabledRef.current = isItemDisabled;
  }, [isItemDisabled]);
  React.useEffect(() => {
    onSelectRef.current = onSelect;
  }, [onSelect]);
  React.useEffect(() => {
    onEscapeRef.current = onEscape;
  }, [onEscape]);

  const getNextEnabled = React.useCallback(
    (start: number, delta: number) => {
      let index = start;
      console.info("get next enabled from:", start, " out of item:", itemCount);
      for (let i = 0; i < itemCount; i++) {
        index += delta;
        if (loop) index = (index + itemCount) % itemCount;
        else if (index < 0 || index >= itemCount) return start;
        if (!isItemDisabledRef.current?.(index)) return index;
      }

      return start;
    },
    [itemCount, loop],
  );

  const move = React.useCallback(
    (delta: number) =>
      setActiveIndex((prevIndex) => {
        const nextIndex = getNextEnabled(prevIndex, delta);
        if (isItemDisabledRef.current?.(nextIndex)) return prevIndex;
        if (activationMode === "automatic") {
          onSelectRef.current?.(nextIndex);
        }
        console.info(
          "Moving ",
          delta,
          "-step",
          " from",
          prevIndex,
          " to",
          " next index:",
          nextIndex,
          "with activeMode:",
          activationMode,
        );
        return nextIndex;
      }),
    [getNextEnabled, activationMode],
  );

  const moveTo = React.useCallback(
    (index: number) => {
      if (index < 0 || index >= itemCount) return;

      const next = isItemDisabledRef.current?.(index)
        ? getNextEnabled(index - 1, 1)
        : index;

      setActiveIndex(next);

      if (activationMode === "automatic") {
        onSelectRef.current?.(next);
      }
    },
    [itemCount, getNextEnabled, activationMode],
  );

  const onKeyDown = React.useCallback(
    (e: React.KeyboardEvent) => {
      const vertical = orientation === "vertical";
      switch (e.key) {
        case "ArrowRight":
          if (!vertical) {
            e.preventDefault();
            console.info("Moving right");
            move(1);
          }
          break;
        case "ArrowLeft":
          if (!vertical) {
            e.preventDefault();
            move(-1);
          }
          break;
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
          if (activationMode === "manual") {
            e.preventDefault();
            if (!isItemDisabledRef.current?.(activeIndex)) {
              onSelectRef.current?.(activeIndex);
            }
          }
          break;
        case "Escape":
          onEscapeRef.current?.();
          break;
        case "Home":
          e.preventDefault();
          moveTo(getNextEnabled(-1, 1));
          break;
        case "End":
          e.preventDefault();
          moveTo(getNextEnabled(itemCount, -1));
          break;
      }
    },
    [
      activeIndex,
      orientation,
      activationMode,
      move,
      moveTo,
      getNextEnabled,
      itemCount,
    ],
  );

  React.useEffect(() => {
    if (itemCount === 0) {
      setActiveIndex(0);
    } else if (activeIndex >= itemCount) {
      setActiveIndex(itemCount - 1);
    }
  }, [activeIndex, itemCount]);

  const getItemProps = React.useCallback(
    (index: number) => {
      const disabled = !!isItemDisabledRef.current?.(index);
      const tabIndex = index === activeIndex ? 0 : -1;

      return {
        tabIndex,
        onFocus: () => {
          setActiveIndex(index);
          if (activationMode === "automatic" && !disabled) {
            onSelectRef.current?.(index);
          }
        },
      };
    },
    [activeIndex, activationMode],
  );

  return {
    activeIndex,
    moveTo,
    onKeyDown,
    getItemProps,
  };
}
