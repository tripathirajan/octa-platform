import * as React from "react";
import { Popover } from "../../feedback/popover/";
import { DropdownContent } from "./DropdownContent";


export type DropdownProps = {
    trigger: React.ReactNode;
    children: React.ReactNode;
    open?: boolean;
    defaultOpen?: boolean;
    onOpenChange?: (open: boolean) => void;
};

export const Dropdown: React.FC<DropdownProps> = ({
    trigger,
    children,
    open,
    defaultOpen,
    onOpenChange,
}) => {
    return (
        <Popover
            open={open}
            defaultOpen={defaultOpen}
            onOpenChange={onOpenChange}
            trigger={trigger}
            trapFocus
        >
            {({ open, close }) => (
                <DropdownContent
                    open={open}
                    close={close}
                >
                    {children}
                </DropdownContent>
            )}
        </Popover>
    );
};