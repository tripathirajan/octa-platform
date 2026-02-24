import * as React from "react";
import { createContext } from "../internal/createContext";

type OverlayContextValue = {
    register: (id: string) => void;
    unregister: (id: string) => void;
    isTopMost: (id: string) => boolean;
};

const [OverlayProviderInternal, useOverlayContext] =
    createContext<OverlayContextValue>("OverlayContext");

export { useOverlayContext };

export const OverlayProvider: React.FC<{
    children: React.ReactNode;
}> = ({ children }) => {
    const [stack, setStack] = React.useState<string[]>([]);

    const register = React.useCallback((id: string) => {
        setStack(prev => [...prev, id]);
    }, []);

    const unregister = React.useCallback((id: string) => {
        setStack(prev => prev.filter(x => x !== id));
    }, []);

    const isTopMost = React.useCallback(
        (id: string) => stack[stack.length - 1] === id,
        [stack]
    );

    const value = React.useMemo(
        () => ({ register, unregister, isTopMost }),
        [register, unregister, isTopMost]
    );

    return (
        <OverlayProviderInternal value={value}>
            {children}
        </OverlayProviderInternal>
    );
};