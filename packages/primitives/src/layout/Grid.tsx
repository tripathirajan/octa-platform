import React from "react";
import { Element } from "../base/Element";
import { StackComponent } from "./Stack";

type GridProps<E extends React.ElementType> =
    React.ComponentPropsWithoutRef<typeof Element<E>> & {
        columns?: string;
        gap?: number | string;
    };

const GridImpl = (
    { columns = "1fr", gap = 0, style, ...props }: GridProps<any>,
    ref: React.ForwardedRef<any>
) => {
    return (
        <Element
            {...props}
            ref={ref}
            style={{
                gridTemplateColumns: columns,
                gap,
                ...style,
                display: "grid",
            }}
        />
    );
};

export const Grid = React.forwardRef(
    GridImpl
) as StackComponent & React.ForwardRefExoticComponent<any>;

Grid.displayName = "Grid";