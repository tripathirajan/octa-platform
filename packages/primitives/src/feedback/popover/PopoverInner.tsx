import * as React from "react";
import { PopoverTrigger } from "./PopoverTrigger";
import { PopoverContent } from "./PopoverContent";
import { usePopoverContext } from "./PopoverContext";

export const PopoverInner: React.FC<{
    trigger: React.ReactNode;
    trapFocus: boolean;
    children:
    | React.ReactNode
    | ((props: { open: boolean; close: () => void }) => React.ReactNode);
}> = ({ trigger, trapFocus, children }) => {
    const { open, setOpen } = usePopoverContext();

    const close = React.useCallback(() => {
        setOpen(false);
    }, [setOpen]);

    const content =
        typeof children === "function"
            ? children({ open, close })
            : children;

    return (
        <>
            <PopoverTrigger asChild>
                {trigger}
            </PopoverTrigger>

            <PopoverContent trapFocus={trapFocus}>
                {content}
            </PopoverContent>
        </>
    );
};