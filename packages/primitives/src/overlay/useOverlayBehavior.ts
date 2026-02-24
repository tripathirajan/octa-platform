import * as React from "react";

type OverlayBehaviorOptions = {
  open: boolean;
  setOpen: (v: boolean) => void;
  trapFocus?: boolean;
  autoFocus?: boolean;
};

export function useOverlayBehavior({
  open,
  setOpen,
  trapFocus = false,
  autoFocus,
}: OverlayBehaviorOptions) {
  const shouldRender = open;

  const overlayProps = React.useMemo(
    () => ({
      trapFocus,
      autoFocus: autoFocus ?? trapFocus,
      onDismiss: () => setOpen(false),
    }),
    [trapFocus, autoFocus, setOpen],
  );

  return { shouldRender, overlayProps };
}
