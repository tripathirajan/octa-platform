import * as React from "react";

export function usePopoverPosition(
  triggerRef: React.RefObject<HTMLElement | null>,
  open: boolean,
) {
  const [style, setStyle] = React.useState<React.CSSProperties>({});

  React.useLayoutEffect(() => {
    if (!open || !triggerRef.current) return;

    const rect = triggerRef.current.getBoundingClientRect();

    setStyle({
      position: "absolute",
      top: rect.bottom + window.scrollY,
      left: rect.left + window.scrollX,
    });
  }, [open, triggerRef]);

  return style;
}
