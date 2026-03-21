
import * as React from 'react'
import { Box } from "../../layout/Box";
import { useDropdownContext } from "./DropdownContext";

export type DropdownItemProps = {
    children: React.ReactNode;
    onSelect?: () => void;
    disabled?: boolean;
}

export const DropdownItem = React.forwardRef<
    HTMLElement,
    DropdownItemProps
>(({ children, onSelect, disabled = false }, forwardedRef) => {
    const { registerItem,
        getIndex,
        activeIndex,
        moveTo,
        close, } =
        useDropdownContext();

    const ref = React.useRef<HTMLElement>(null);
    const id = React.useId();

    // Merge refs if needed
    React.useImperativeHandle(forwardedRef, () => ref.current as HTMLElement);
    console.log('dropdown item rendered', children, { id, disabled });
    React.useEffect(() => {
        return registerItem({
            id,
            ref,
            disabled,
            meta: { onSelect },
        });
    }, [id, registerItem, disabled, onSelect]);

    const index = getIndex(id);
    const isActive = index === activeIndex;

    return (
        <Box
            role="menuitem"
            ref={ref}
            tabIndex={isActive ? 0 : -1}
            aria-disabled={disabled}
            onFocus={() => moveTo(index)}
            onClick={() => {
                if (!disabled) {
                    onSelect?.();
                    close();
                }
            }}
            style={{
                padding: "8px 12px",
                cursor: disabled ? "not-allowed" : "pointer",
                opacity: disabled ? 0.5 : 1,
                background: isActive
                    ? "rgba(0,0,0,0.08)"
                    : "transparent",
            }}
        >
            {children}
        </Box>
    );
});
