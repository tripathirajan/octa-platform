import { createContext } from "../../internal";

export type DropdownItemMeta = {
    onSelect?: () => void;
};

export type RegisteredItem = {
    id: string;
    ref: React.RefObject<HTMLElement | null>;
    disabled?: boolean;
    meta?: DropdownItemMeta
};

type DropdownContextValue = {
    close: () => void;
    items: RegisteredItem[];
    registerItem: (item: RegisteredItem) => void;
    getIndex: (id: string) => number;
    activeIndex: number;
    setActiveIndex: React.Dispatch<
        React.SetStateAction<number>
    >;
};

const [DropdownProviderInternal, useDropdownContext] = createContext<DropdownContextValue>("Dropdown")

export { useDropdownContext };
export { DropdownProviderInternal };