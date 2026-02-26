import * as React from "react";
import { OverlayRoot, useOverlayBehavior } from "../../overlay";
import { useDialogContext } from "./DialogContext";
import { DialogContentInner } from "./DialogContentInner";
import type { DialogContentProps } from "./DialogContentInner";

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

    const { shouldRender, overlayProps } = useOverlayBehavior({
        open,
        setOpen,
        trapFocus: true,
    })

    if (!shouldRender) return null;

    return (
        <OverlayRoot {...overlayProps}>
            <DialogContentInner {...props} contentId={contentId} titleId={titleId} descriptionId={descriptionId} />
        </OverlayRoot>
    );
});

DialogContent.displayName = "DialogContent";