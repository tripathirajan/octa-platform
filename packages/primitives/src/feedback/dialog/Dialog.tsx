import * as React from "react";
import { DialogRoot } from "./DialogRoot";
import { DialogTrigger } from "./DialogTrigger";
import { DialogContent } from "./DialogContent";
import { DialogTitle } from "./DialogTitle";
import { DialogDescription } from "./DialogDescription";

type DialogProps = {
    trigger: React.ReactNode;
    title?: React.ReactNode;
    description?: React.ReactNode;
    children?: React.ReactNode;

    open?: boolean;
    defaultOpen?: boolean;
    onOpenChange?: (open: boolean) => void;
};

export const Dialog: React.FC<DialogProps> = ({
    trigger,
    title,
    description,
    children,
    open,
    defaultOpen,
    onOpenChange,
}) => {
    return (
        <DialogRoot
            open={open}
            defaultOpen={defaultOpen}
            onOpenChange={onOpenChange}
        >
            <DialogTrigger asChild>
                {trigger}
            </DialogTrigger>

            <DialogContent>
                {title && <DialogTitle>{title}</DialogTitle>}
                {description && (
                    <DialogDescription>
                        {description}
                    </DialogDescription>
                )}
                {children}
            </DialogContent>
        </DialogRoot>
    );
};

Dialog.displayName = "Dialog";