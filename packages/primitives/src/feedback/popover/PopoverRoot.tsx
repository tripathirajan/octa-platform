import * as React from "react";
import { PopoverProviderInternal } from "./PopoverContext";
import { OverlayProvider } from "../../overlay";

type PopoverRootProps = {
    children: React.ReactNode;
    open?: boolean;
    defaultOpen?: boolean;
    onOpenChange?: (open: boolean) => void;
};

export const PopoverRoot: React.FC<PopoverRootProps> = ({
    children,
    open: controlledOpen,
    defaultOpen = false,
    onOpenChange,
}) => {
    const isControlled = controlledOpen !== undefined;
    const [uncontrolledOpen, setUncontrolledOpen] =
        React.useState(defaultOpen);

    const open = isControlled ? controlledOpen : uncontrolledOpen;

    const setOpen = React.useCallback(
        (v: boolean) => {
            if (!isControlled) setUncontrolledOpen(v);
            onOpenChange?.(v);
        },
        [isControlled, onOpenChange]
    );

    const triggerRef = React.useRef<HTMLElement | null>(null);

    return (
        <OverlayProvider>
            <PopoverProviderInternal value={{ open, setOpen, triggerRef }}>
                {children}
            </PopoverProviderInternal>
        </OverlayProvider>
    );
};

PopoverRoot.displayName = "PopoverRoot";