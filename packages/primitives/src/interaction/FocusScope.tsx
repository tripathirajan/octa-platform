import * as React from "react";
import { Element, ElementProps } from "../base/Element";

type FocusScopeOwnProps = {
    trap?: boolean;
    autoFocus?: boolean;
};

type FocusScopeProps<E extends React.ElementType> =
    Omit<ElementProps<E>, "asChild"> &
    FocusScopeOwnProps;

type FocusScopeComponent = <
    E extends React.ElementType = "div"
>(
    props: FocusScopeProps<E> & {
        ref?: React.ComponentPropsWithRef<E>["ref"];
    }
) => React.ReactElement | null;

const FocusScopeImpl = (
    {
        as,
        trap = false,
        autoFocus = true,
        ...props
    }: FocusScopeProps<any>,
    ref: React.ForwardedRef<any>
) => {
    const containerRef = React.useRef<HTMLElement | null>(null);

    React.useImperativeHandle(ref, () => containerRef.current);

    React.useEffect(() => {
        const node = containerRef.current;
        if (!node) return;

        if (autoFocus) {
            const firstFocusable = node.querySelector<HTMLElement>(
                'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
            );
            firstFocusable?.focus();
        }

        if (!trap) return;

        function handleKeyDown(e: KeyboardEvent) {
            if (e.key !== "Tab") return;
            if (!node) return;

            const focusable = Array.from(
                node.querySelectorAll<HTMLElement>(
                    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
                )
            ).filter(el => !el.hasAttribute("disabled"));

            if (focusable.length === 0) return;

            const first = focusable[0];
            const last = focusable[focusable.length - 1];

            if (e.shiftKey) {
                if (document.activeElement === first) {
                    e.preventDefault();
                    last?.focus();
                }
            } else {
                if (document.activeElement === last) {
                    e.preventDefault();
                    first?.focus();
                }
            }
        }

        node.addEventListener("keydown", handleKeyDown);
        return () => node.removeEventListener("keydown", handleKeyDown);
    }, [trap, autoFocus]);

    return (
        <Element
            {...props}
            as={as || "div"}
            ref={containerRef}
        />
    );
};

export const FocusScope = React.forwardRef(
    FocusScopeImpl
) as FocusScopeComponent &
    React.ForwardRefExoticComponent<any>;

FocusScope.displayName = "FocusScope";