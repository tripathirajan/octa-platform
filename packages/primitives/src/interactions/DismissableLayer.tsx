import * as React from "react";
import { Element, ElementProps } from "../base/Element";

export type DismissableLayerOwnProps = {
    onDismiss?: () => void;
};

export type DismissableLayerProps<E extends React.ElementType> =
    Omit<ElementProps<E>, "asChild"> &
    DismissableLayerOwnProps;

const DismissableLayerImpl = (
    { as, onDismiss, ...props }: DismissableLayerProps<any>,
    ref: React.ForwardedRef<any>
) => {
    const layerRef = React.useRef<HTMLElement | null>(null);

    React.useImperativeHandle(ref, () => layerRef.current as any);

    React.useEffect(() => {
        const node = layerRef.current;
        if (!node) return;

        function handleKeyDown(e: KeyboardEvent) {
            if (e.key === "Escape") {
                onDismiss?.();
            }
        }

        function handlePointerDown(e: MouseEvent) {
            if (!node) return;

            if (!node.contains(e.target as Node)) {
                onDismiss?.();
            }
        }

        document.addEventListener("keydown", handleKeyDown);
        document.addEventListener("mousedown", handlePointerDown);

        return () => {
            document.removeEventListener("keydown", handleKeyDown);
            document.removeEventListener("mousedown", handlePointerDown);
        };
    }, [onDismiss]);

    return (
        <Element
            {...props}
            as={as || "div"}
            ref={layerRef as any}
        />
    );

}

export type DismissableLayerComponent = <
    E extends React.ElementType = "div"
>(
    props: DismissableLayerProps<E> & {
        ref?: React.ComponentPropsWithRef<E>["ref"];
    }
) => React.ReactElement | null;

export const DismissableLayer = React.forwardRef(DismissableLayerImpl) as DismissableLayerComponent &
    React.ForwardRefExoticComponent<any>;

DismissableLayer.displayName = "DismissableLayer";