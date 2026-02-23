import React from "react";
import { Element } from "../base/Element";
import { StackComponent, StackProps } from "./Stack";

const ContainerImpl = (
    { style, ...props }: StackProps<any>,
    ref: React.ForwardedRef<any>
) => {
    return (
        <Element
            {...props}
            ref={ref}
            style={{
                ...style,
                width: "100%",
                marginLeft: "auto",
                marginRight: "auto",
            }}
        />
    );
};

export const Container = React.forwardRef(
    ContainerImpl
) as StackComponent & React.ForwardRefExoticComponent<any>;

Container.displayName = "Container";