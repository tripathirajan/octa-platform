import * as React from "react";
import { mergeRefs } from "../internal";

/**
 * The `Slot` component is a utility that allows you to pass props to a single child element.
 * It uses `React.cloneElement` to merge the props and refs from the `Slot` component with
 * the child element.
 * @property {React.ReactElement} [children] - (optional) The single child element to which the props
 * will be passed.
 * @example
 * ```tsx
 * <Slot className="my-class">
 *   <button>Click me</button>
 * </Slot>
 */
interface SlotProps extends React.HTMLAttributes<HTMLElement> {
    /**
     * The single child element to which the props will be passed. This should be a valid
     * React element, and only one child is allowed. If more than one child is provided, an
     * error will be thrown.
     */
    children?: React.ReactElement;
}

/**
 * Slot
 * @description
 * The `Slot` component is a utility that allows you to pass props to a single child element.
 * It uses `React.cloneElement` to merge the props and refs from the `Slot` component with
 * the child element.
 * @example
 * ```tsx
 * <Slot className="my-class">
 *   <button>Click me</button>
 * </Slot>
 * ```
 */
export const Slot = React.forwardRef<HTMLElement, SlotProps>(
    ({ children, ...props }, forwardedRef) => {
        const child = React.Children.only(children) as React.ReactElement<any>;

        return React.cloneElement(child, {
            ...(props as any),
            ref: mergeRefs(forwardedRef, (child as any).ref),
        } as any);
    }
);