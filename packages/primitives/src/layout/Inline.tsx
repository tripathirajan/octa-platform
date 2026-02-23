import * as React from "react";
import type { StackProps, StackComponent } from "./Stack";
import { Element } from "../base/Element";

const InlineImpl = (
    { gap = 0, style, ...props }: StackProps<any>,
    ref: React.ForwardedRef<any>
) => {
    return (
        <Element
            {...props}
            ref={ref}
            style={{
                ...style,
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                gap,
            }}
        />
    );
};

export const Inline = React.forwardRef(
    InlineImpl
) as StackComponent & React.ForwardRefExoticComponent<any>;

Inline.displayName = "Inline";