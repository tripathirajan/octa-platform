import { createContext } from "../../internal";
import type { CollectionItem } from "../../internal/useCollection";

export type DropdownItemMeta = {
    onSelect?: () => void;
};

type DropdownContextValue = {
    activeIndex: number;
    items: CollectionItem<DropdownItemMeta>[];
    registerItem: (item: CollectionItem<DropdownItemMeta>) => void;
    getIndex: (id: string) => number;
    close: () => void;
    moveTo: (index: number) => void;
};

const [DropdownProviderInternal, useDropdownContext] = createContext<DropdownContextValue>("Dropdown")

export { useDropdownContext };
export { DropdownProviderInternal };