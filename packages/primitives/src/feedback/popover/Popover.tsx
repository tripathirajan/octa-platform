import * as React from "react";
import { PopoverRoot } from "./PopoverRoot";
import { PopoverTrigger } from "./PopoverTrigger";
import { PopoverContent } from "./PopoverContent";

type BaseProps = {
    trigger: React.ReactNode;
    open?: boolean;
    defaultOpen?: boolean;
    onOpenChange?: (open: boolean) => void;
    trapFocus?: boolean;
};

type ContentVariant =
    | { content: React.ReactNode; children?: never }
    | { children: React.ReactNode; content?: never };

export type PopoverProps = BaseProps & ContentVariant;

export const Popover: React.FC<PopoverProps> = ({
    trigger,
    content,
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
            <PopoverTrigger asChild>
                {trigger}
            </PopoverTrigger>

            <PopoverContent trapFocus={trapFocus}>
                {content ?? children}
            </PopoverContent>
        </PopoverRoot>
    );
};

Popover.displayName = "Popover";