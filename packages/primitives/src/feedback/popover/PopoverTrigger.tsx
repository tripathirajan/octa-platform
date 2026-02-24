import * as React from "react";
import { Box } from "../../layout/Box";
import { usePopoverContext } from "./PopoverContext";

export const PopoverTrigger = React.forwardRef<
    HTMLElement,
    React.ComponentProps<typeof Box>
>((props, ref) => {
    const { open, setOpen, triggerRef } = usePopoverContext();

    return (
        <Box
            {...props}
            ref={(node: HTMLElement) => {
                triggerRef.current = node;
                if (typeof ref === "function") ref(node);
                else if (ref) (ref as any).current = node;
            }}
            aria-haspopup="dialog"
            aria-expanded={open}
            onClick={(e: any) => {
                props.onClick?.(e);
                setOpen(!open);
            }}
        />
    );
});

PopoverTrigger.displayName = "PopoverTrigger";