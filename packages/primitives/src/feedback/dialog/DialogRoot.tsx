import * as React from "react";
import { DialogProviderInternal } from "./DialogContext";

let dialogId = 0;
function generateId() {
    dialogId += 1;
    return `dialog-${dialogId}`;
}

type DialogRootProps = {
    children: React.ReactNode;
    open?: boolean;
    defaultOpen?: boolean;
    onOpenChange?: (open: boolean) => void;
};

export const DialogRoot: React.FC<DialogRootProps> = ({
    children,
    open: controlledOpen,
    defaultOpen = false,
    onOpenChange,
}) => {
    const isControlled = controlledOpen !== undefined;
    const [uncontrolledOpen, setUncontrolledOpen] =
        React.useState(defaultOpen);
    const triggerRef = React.useRef<HTMLElement>(null);

    const open = isControlled ? controlledOpen : uncontrolledOpen;

    const focusTrigger = () => triggerRef.current?.focus();

    const setOpen = React.useCallback(
        (value: boolean) => {
            if (!isControlled) {
                setUncontrolledOpen(value);
            }
            if (!value) {
                // Returning focus after close
                focusTrigger();
            }
            onOpenChange?.(value);
        },
        [isControlled, onOpenChange]
    );

    const baseId = React.useMemo(generateId, []);
    const contentId = `${baseId}-content`;
    const titleId = `${baseId}-title`;
    const descriptionId = `${baseId}-description`;

    return (
        <DialogProviderInternal
            value={{
                open,
                setOpen,
                contentId,
                titleId,
                descriptionId,
                triggerRef,
            }}
        >
            {children}
        </DialogProviderInternal>
    );
};

DialogRoot.displayName = "DialogRoot";