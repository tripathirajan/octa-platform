import * as React from "react";
import { useCompositeNavigation } from "../../internal/useCompositeNavigation";
import { Box } from "../../layout/Box";
import { DropdownProviderInternal } from "./DropdownContext";
import type { DropdownItemMeta } from "./DropdownContext";
import { CollectionItem, useCollection } from "../../internal/useCollection";

type DropdownContentProps = {
    children: React.ReactNode;
    open: boolean;
    close: () => void;
};

export const DropdownContent: React.FC<DropdownContentProps> = ({ open, close, children }) => {
    const { items, register, getIndex } = useCollection<DropdownItemMeta>();

    const {
        activeIndex,
        setActiveIndex,
        onKeyDown,
    } = useCompositeNavigation({
        itemCount: items.length,
        isItemDisabled: (i) => items[i]?.disabled as boolean,
        onSelect: (index) => {
            items[index]?.meta?.onSelect?.();
            close();
        },
        onEscape: close,
    });

    const contextValue = React.useMemo(() => ({
        registerItem: register,
        getIndex,
        activeIndex,
        setActiveIndex,
        close,
        items
    }), [register, getIndex, activeIndex, setActiveIndex, close, items]);

    // Focus sync
    React.useEffect(() => {
        if (!open) return;
        const node = items[activeIndex]?.ref.current;
        if (node && node !== document.activeElement) {
            node.focus();
        }
    }, [open, activeIndex]);

    if (!open) return null;

    return (
        <DropdownProviderInternal value={contextValue}>
            <Box role="menu" onKeyDown={onKeyDown}>
                {children}
            </Box>
        </DropdownProviderInternal>
    );
};