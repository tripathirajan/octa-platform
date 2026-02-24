import * as React from "react";
import { OverlayRoot, useOverlayBehavior, useOverlayContext } from "../../overlay";
import { Box } from "../../layout/Box";
import { useDialogContext } from "./DialogContext";
import { useOverlayItem } from "../../overlay";

type DialogContentProps = React.ComponentProps<typeof Box>;

export const DialogContent = React.forwardRef<
    HTMLElement,
    DialogContentProps
>((props, ref) => {
    const {
        open,
        setOpen,
        contentId,
        titleId,
        descriptionId,
    } = useDialogContext();
    const { overlayId } = useOverlayItem();
    const { isTopMost } = useOverlayContext();

    React.useEffect(() => {
        if (!open || !isTopMost(overlayId)) return;

        const originalOverflow = document.body.style.overflow;
        document.body.style.overflow = "hidden";

        return () => {
            document.body.style.overflow = originalOverflow;
        };
    }, [open, overlayId, isTopMost]);

    const { shouldRender, overlayProps } = useOverlayBehavior({
        open,
        setOpen,
        trapFocus: true,
    })

    if (!shouldRender) return null;

    return (
        <OverlayRoot {...overlayProps}>
            <Box
                {...props}
                ref={ref}
                id={contentId}
                role="dialog"
                aria-modal="true"
                aria-labelledby={titleId}
                aria-describedby={descriptionId}
            />
        </OverlayRoot>
    );
});

DialogContent.displayName = "DialogContent";