import * as React from "react";
import { Portal } from "./Portal";
import { FocusScope, DismissableLayer } from "../interaction";
import { useOverlayContext } from "./OverlayContext";
import { Box } from "../layout/Box";
import { OverlayItemProvider } from "./OverlayItemContext";

let overlayCounter = 0;

function generateId() {
    overlayCounter += 1;
    return `overlay-${overlayCounter}`;
}

type OverlayRootProps = {
    children: React.ReactNode;
    onDismiss?: () => void;
    trapFocus?: boolean;
    autoFocus?: boolean;
    container?: Element | null;
    id?: string;
};

export const OverlayRoot: React.FC<OverlayRootProps> = ({
    children,
    onDismiss,
    trapFocus = true,
    autoFocus = true,
    container,
    id,
}) => {
    const { register, unregister, isTopMost } = useOverlayContext();

    const overlayId = React.useMemo(
        () => id ?? generateId(),
        [id]
    );

    React.useEffect(() => {
        register(overlayId);
        return () => unregister(overlayId);
    }, [overlayId, register, unregister]);

    const handleDismiss = React.useCallback(() => {
        if (!onDismiss) return;
        if (isTopMost(overlayId)) {
            onDismiss();
        }
    }, [onDismiss, overlayId, isTopMost]);

    return (
        <Portal container={container}>
            <OverlayItemProvider value={{ overlayId }}>
                <FocusScope trap={trapFocus} autoFocus={autoFocus}>
                    <DismissableLayer onDismiss={handleDismiss}>
                        <Box>
                            {children}
                        </Box>
                    </DismissableLayer>
                </FocusScope>
            </OverlayItemProvider>

        </Portal>
    );
};

OverlayRoot.displayName = "OverlayRoot";