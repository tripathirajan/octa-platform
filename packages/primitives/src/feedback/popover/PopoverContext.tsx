import * as React from "react";
import { createContext } from "../../internal/createContext";

type PopoverContextValue = {
    open: boolean;
    setOpen: (v: boolean) => void;
    triggerRef: React.RefObject<HTMLElement | null>;
};

const [PopoverProviderInternal, usePopoverContext] =
    createContext<PopoverContextValue>("PopoverContext");

export { usePopoverContext };
export { PopoverProviderInternal };