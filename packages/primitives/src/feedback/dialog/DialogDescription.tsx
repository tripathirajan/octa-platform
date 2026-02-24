import * as React from "react";
import { Box } from "../../layout/Box";
import { useDialogContext } from "./DialogContext";

export const DialogDescription = React.forwardRef<
    HTMLElement,
    React.ComponentProps<typeof Box>
>((props, ref) => {
    const { descriptionId } = useDialogContext();

    return (
        <Box
            {...props}
            ref={ref}
            id={descriptionId}
        />
    );
});

DialogDescription.displayName = "DialogDescription";