import * as React from "react";

/**
 * PossibleRef
 * @description A type for React refs that can be either a function ref or an object ref, or undefined.
 * @template T - The type of the element the ref is for.
 */
export type PossibleRef<T> = React.Ref<T> | undefined;

/**
 * mergeRefs
 * @description Merges multiple React refs into a single ref callback. This is useful when
 * you want to allow users to pass their own ref to a component while still maintaining an
 * internal ref for the component's own use.
 * The returned ref callback will call all provided refs with the same node, ensuring that
 * both function refs and object refs are supported.
 * @template T - The type of the element the refs are for.
 * @param {PossibleRef} refs
 * @returns {React.RefCallback<T>} A ref callback that merges all provided refs.
 * @example
 * const MyComponent = React.forwardRef((props, ref) => {
 *   const internalRef = React.useRef(null);
 *   const mergedRef = mergeRefs(ref, internalRef);
 *
 *   return <div ref={mergedRef}>Hello</div>;
 * });
 *
 * In this example, `MyComponent` can accept a ref from its parent component, and it will
 * also maintain its own internal ref. The `mergeRefs` function ensures that both refs are
 * updated with the same DOM node when the component mounts.
 */
export function mergeRefs<T>(...refs: PossibleRef<T>[]): React.RefCallback<T> {
  return (node) => {
    refs.forEach((ref) => {
      if (!ref) return;

      if (typeof ref === "function") {
        ref(node);
      } else {
        (ref as React.RefObject<T | null>).current = node;
      }
    });
  };
}
