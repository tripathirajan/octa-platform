import * as React from "react";
import { createPortal } from "react-dom";

type PortalProps = {
    container?: Element | null;
    children: React.ReactNode;
};

export const Portal = ({ container, children }: PortalProps) => {
    const target =
        container ?? (typeof document !== "undefined" ? document.body : null);

    if (!target) return null;

    return createPortal(children, target);
};