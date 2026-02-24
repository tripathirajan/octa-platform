import * as React from "react";
import { Box } from "../../layout/Box";
import { useDialogContext } from "./DialogContext";

export const DialogTitle = React.forwardRef<
    HTMLElement,
    React.ComponentProps<typeof Box>
>((props, ref) => {
    const { titleId } = useDialogContext();

    return (
        <Box
            {...props}
            ref={ref}
            id={titleId}
        />
    );
});

DialogTitle.displayName = "DialogTitle";