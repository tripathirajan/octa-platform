import React from 'react'
import { Portal } from "../base";
import { OverlayContent } from './OverlayContent';
import { OverlayProvider } from './OverlayContext';

export type OverlayRootProps = {
    children: React.ReactNode;
    container?: HTMLElement;
    onDismiss?: () => void;
    trapFocus?: boolean;
    autoFocus?: boolean;
    id?: string;
};

export const OverlayRoot: React.FC<OverlayRootProps> = ({ container, children, ...props }) => {
    return (
        <Portal container={container}>
            <OverlayProvider>
                <OverlayContent {...props}>
                    {children}
                </OverlayContent>
            </OverlayProvider>

        </Portal>
    )
}
OverlayRoot.displayName = "OverlayRoot";