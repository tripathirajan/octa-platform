import * as React from "react";

export type CollectionItem<TMeta = unknown> = {
  id: string;
  ref: React.RefObject<HTMLElement | null>;
  disabled?: boolean;
  meta?: TMeta;
};

type Predicate<T> = (item: CollectionItem<T>) => boolean;

export type CollectionAPI<TMeta> = {
  items: CollectionItem<TMeta>[];
  getItems: () => CollectionItem<TMeta>[];
  register: (item: CollectionItem<TMeta>) => () => void;

  getItemById: (id: string) => CollectionItem<TMeta> | undefined;
  getIndexById: (id?: string) => number;
  getIdByIndex: (index: number) => string | undefined;
  getIndexBy: (predicate: Predicate<TMeta>) => number;

  getCount: () => number;

  subscribe: (listener: ListenerFn<TMeta>) => () => void;
};

export type ListenerFn<TMeta> = (list: CollectionItem<TMeta>[]) => void;

/**
 *
 * @returns {CollectionAPI<TMeta>}
 */
export function useCollection<TMeta = unknown>(): CollectionAPI<TMeta> {
  const itemRefs = React.useRef<CollectionItem<TMeta>[]>([]);

  const listenersRef = React.useRef(new Set<ListenerFn<TMeta>>());

  const notify = React.useCallback(() => {
    listenersRef.current.forEach((l: ListenerFn<TMeta>) => l(itemRefs.current));
  }, []);

  const pruneDisconnected = React.useCallback(() => {
    const prevLength = itemRefs.current.length;
    itemRefs.current = itemRefs.current.filter((item) => {
      const el = item.ref.current;
      return el && el.isConnected;
    });
    if (itemRefs.current.length !== prevLength) {
      notify();
    }
  }, [notify]);

  const insertByDomOrder = React.useCallback((item: CollectionItem<TMeta>) => {
    const element = item.ref.current;
    if (!element) {
      itemRefs.current.push(item);
      return;
    }
    const index = itemRefs.current.findIndex((existing) => {
      const existingEl = existing.ref.current;
      if (!existingEl) return false;
      return (
        (element.compareDocumentPosition(existingEl) &
          Node.DOCUMENT_POSITION_FOLLOWING) !==
        0
      );
    });
    if (index === -1) itemRefs.current.push(item);
    else itemRefs.current.splice(index, 0, item);
  }, []);

  const unregister = React.useCallback(
    (id: string) => {
      const prev = itemRefs.current.length;
      itemRefs.current = itemRefs.current.filter((i) => i.id !== id);
      if (itemRefs.current.length !== prev) notify();
    },
    [notify],
  );

  const register = React.useCallback(
    (item: CollectionItem<TMeta>) => {
      const exists = itemRefs.current.some((i) => i.id === item.id);
      // console.log("exists:", exists, " itemref:", itemRefs.current);
      if (!exists) {
        pruneDisconnected();
        insertByDomOrder(item);
        notify();
      }

      return () => unregister(item.id);
    },
    [unregister, pruneDisconnected, notify],
  );
  console.log("itemRefs.current:", itemRefs.current);
  const getItemById = React.useCallback((id: string) => {
    return itemRefs.current.find((i) => i.id === id);
  }, []);

  const getIndexById = React.useCallback((id?: string) => {
    if (!id) return -1;
    return itemRefs.current.findIndex((i) => i.id === id);
  }, []);

  const getIdByIndex = React.useCallback((index: number) => {
    if (!itemRefs.current || index < 0 || index >= itemRefs.current.length)
      return undefined;
    return itemRefs.current[index]?.id;
  }, []);

  const getCount = React.useCallback(() => {
    return itemRefs.current.length;
  }, []);
  const getItems = React.useCallback(() => {
    // console.info("getItems", [...itemRefs.current]);
    return [...itemRefs.current];
  }, [itemRefs.current]);

  const getIndexBy = React.useCallback((predicate: Predicate<TMeta>) => {
    return itemRefs.current.findIndex(predicate);
  }, []);

  const subscribe = React.useCallback((listener: ListenerFn<TMeta>) => {
    listenersRef.current.add(listener);
    return () => {
      listenersRef.current.delete(listener);
    };
  }, []);

  return {
    items: [...itemRefs.current],
    getItems,
    register,
    getItemById,
    getIndexById,
    getIdByIndex,
    getIndexBy,
    getCount,
    subscribe,
  };
}
