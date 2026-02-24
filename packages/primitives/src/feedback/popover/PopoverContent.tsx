import * as React from "react";
import { OverlayRoot, useOverlayBehavior } from "../../overlay";
import { Box } from "../../layout/Box";
import { usePopoverContext } from "./PopoverContext";
import { usePopoverPosition } from "./usePopoverPosition";

type PopoverContentProps = React.ComponentProps<typeof Box> & {
    trapFocus?: boolean;
};

export const PopoverContent = React.forwardRef<
    HTMLElement,
    PopoverContentProps
>(({ trapFocus = false, ...props }, ref) => {
    const { open, setOpen, triggerRef } = usePopoverContext();

    const style = usePopoverPosition(triggerRef, open);

    const { shouldRender, overlayProps } = useOverlayBehavior({
        open,
        setOpen,
        trapFocus,
    });

    if (!shouldRender) return null;

    return (
        <OverlayRoot {...overlayProps} >
            <Box
                {...props}
                ref={ref}
                role="dialog"
                style={{
                    ...style,
                    ...props.style,
                }}
            />
        </OverlayRoot>
    );
});

PopoverContent.displayName = "PopoverContent";