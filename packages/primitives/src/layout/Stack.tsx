import * as React from "react";
import { Element } from "../base/Element";

export type StackProps<E extends React.ElementType> =
    React.ComponentPropsWithoutRef<typeof Element<E>> & {
        gap?: number | string;
    };

export type StackComponent = <
    E extends React.ElementType = "div"
>(
    props: StackProps<E> & {
        ref?: React.ComponentPropsWithRef<E>["ref"];
    }
) => React.ReactElement | null;

const StackImpl = (
    { gap = 0, style, ...props }: StackProps<any>,
    ref: React.ForwardedRef<any>
) => {
    return (
        <Element
            {...props}
            ref={ref}
            style={{
                flexDirection: "column",
                gap,
                ...style,
                display: "flex",
            }}
        />
    );
};

export const Stack = React.forwardRef(
    StackImpl
) as StackComponent & React.ForwardRefExoticComponent<any>;

Stack.displayName = "Stack";