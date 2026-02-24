import * as React from "react";
import { createContext } from "../../internal/createContext";

export type DialogContextValue = {
    open: boolean;
    setOpen: (value: boolean) => void;
    contentId: string;
    titleId: string;
    descriptionId: string;

    triggerRef: React.RefObject<HTMLElement | null>;
};

const [DialogProviderInternal, useDialogContext] =
    createContext<DialogContextValue>("DialogContext");

export { useDialogContext };
export { DialogProviderInternal };