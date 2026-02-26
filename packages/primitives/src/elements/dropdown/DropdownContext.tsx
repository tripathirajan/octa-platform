import { createContext } from "../../internal";
import type { CollectionItem } from "../../internal/useCollection";

export type DropdownItemMeta = {
    onSelect?: () => void;
};


type DropdownContextValue = {
    close: () => void;
    items: CollectionItem<DropdownItemMeta>[];
    registerItem: (item: CollectionItem<DropdownItemMeta>) => void;
    getIndex: (id: string) => number;
    activeIndex: number;
    setActiveIndex: React.Dispatch<
        React.SetStateAction<number>
    >;
};

const [DropdownProviderInternal, useDropdownContext] = createContext<DropdownContextValue>("Dropdown")

export { useDropdownContext };
export { DropdownProviderInternal };