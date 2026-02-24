import * as React from "react";
import { PopoverRoot } from "./PopoverRoot";
import { PopoverInner } from "./PopoverInner";


type BaseProps = {
    trigger: React.ReactNode;
    open?: boolean;
    defaultOpen?: boolean;
    onOpenChange?: (open: boolean) => void;
    trapFocus?: boolean;
};
type PopoverRenderProps = {
    open: boolean;
    close: () => void;
};

type ContentVariant = {
    children:
    | React.ReactNode
    | ((props: PopoverRenderProps) => React.ReactNode);
}

export type PopoverProps = BaseProps & ContentVariant;

export const Popover: React.FC<PopoverProps> = ({
    trigger,
    children,
    open,
    defaultOpen,
    onOpenChange,
    trapFocus = false,
}) => {
    return (
        <PopoverRoot
            open={open}
            defaultOpen={defaultOpen}
            onOpenChange={onOpenChange}
        >
            <PopoverInner trigger={trigger} trapFocus={trapFocus}>
                {children}
            </PopoverInner>
        </PopoverRoot>
    );
};

Popover.displayName = "Popover";