import * as React from "react";

let globalId = 0;
const PREFIX = "octa";

/**
 * useId
 * @description Generates a unique ID that can be used for accessibility attributes. It
 * first tries to use React's built-in useId hook (available in React 18+), and if that's
 * not available, it falls back to a custom implementation that generates a unique ID using
 * a global counter.
 * @param {string} providedId
 * @returns {string} A unique ID string that can be used for accessibility attributes.
 * @example
 * ```tsx
 * const id = useId();
 * // id will be a unique string that can be used for accessibility attributes
 * <label htmlFor={id}>Label</label>
 * <input id={id} />
 * ```
 * @see https://reactjs.org/docs/hooks-reference.html#useid
 */
export function useId(providedId?: string): string {
  const reactId = React.useId?.();
  const [fallbackId] = React.useState(() => {
    globalId += 1;
    return `${PREFIX}-${globalId}`;
  });

  return providedId || reactId || fallbackId;
}
