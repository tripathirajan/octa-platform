import * as React from "react";

export type FocusTrapOpts = {
  ref: React.RefObject<HTMLElement>;
  active: boolean;
};
/**
 * Hook for trapping focus within a specific element.
 *
 * @description This hook is useful for modal dialogs and other overlays where
 * focus should be contained within the component for accessibility.
 *
 * @param {FocusTrapOpts} props - The ref to the element that should trap focus and whether the focus trap is active.
 */
export function useFocusTrap({ ref, active }: FocusTrapOpts) {
  React.useEffect(() => {
    if (!active || !ref.current) return;

    const element = ref.current;
    const focusableElements = element.querySelectorAll<HTMLElement>(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
    );

    if (focusableElements.length === 0) return;

    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key !== "Tab") return;

      if (e.shiftKey) {
        if (document.activeElement === firstElement) {
          e.preventDefault();
          lastElement?.focus();
        }
      } else {
        if (document.activeElement === lastElement) {
          e.preventDefault();
          firstElement?.focus();
        }
      }
    };

    // Focus the first element when the trap becomes active
    firstElement?.focus();

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [active, ref]);
}
