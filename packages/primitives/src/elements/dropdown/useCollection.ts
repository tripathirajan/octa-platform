import * as React from "react";

export type CollectionItem<TMeta = unknown> = {
  id: string;
  ref: React.RefObject<HTMLElement>;
  disabled?: boolean;
  meta?: TMeta;
};

export function useCollection<TMeta = unknown>() {
  const [items, setItems] = React.useState<CollectionItem<TMeta>[]>([]);

  const itemMapRef = React.useRef<Map<string, number>>(new Map());

  const register = React.useCallback((item: CollectionItem<TMeta>) => {
    setItems((prev) => {
      const next = [...prev, item];
      itemMapRef.current.set(item.id, next.length - 1);
      return next;
    });

    return () => {
      setItems((prev) => {
        const next = prev.filter((i) => i.id !== item.id);
        itemMapRef.current.delete(item.id);

        // rebuild map indices
        next.forEach((i, index) => itemMapRef.current.set(i.id, index));

        return next;
      });
    };
  }, []);

  const getIndex = React.useCallback((id: string) => {
    return itemMapRef.current.get(id) ?? -1;
  }, []);

  return {
    items,
    register,
    getIndex,
  };
}
