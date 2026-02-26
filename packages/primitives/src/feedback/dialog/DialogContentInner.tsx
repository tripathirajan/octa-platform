import * as React from "react";
import { useOverlayContext, useOverlayItem } from "../../overlay"
import { Box } from "../../layout/Box";

export type DialogContentProps = React.ComponentProps<typeof Box>;
type DialogContentInnerProps = DialogContentProps & {
    contentId: string;
    titleId: string;
    descriptionId: string;
};
export const DialogContentInner = React.forwardRef<
    HTMLElement,
    DialogContentInnerProps
>(({ contentId, titleId, descriptionId, ...props }, ref) => {
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
    return (
        <Box
            {...props}
            ref={ref}
            id={contentId}
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            aria-describedby={descriptionId}
        />
    )
});

export default DialogContentInner