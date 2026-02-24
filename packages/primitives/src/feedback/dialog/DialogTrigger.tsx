import * as React from "react";
import { Box } from "../../layout/Box";
import { useDialogContext } from "./DialogContext";

type DialogTriggerProps = React.ComponentProps<typeof Box>;

export const DialogTrigger = React.forwardRef<
    HTMLElement,
    DialogTriggerProps
>((props, ref) => {
    const { open, setOpen, triggerRef } = useDialogContext();

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
                setOpen(true);
            }}
        />
    );
});

DialogTrigger.displayName = "DialogTrigger";