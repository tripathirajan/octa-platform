import * as React from "react";
import { Slot } from "./Slot";

/**
 * AsChildProps
 * @property {boolean} [asChild] - (optional) A boolean prop that determines whether the
 * component should render as a child element or as a default element (e.g., "div"). If
 * `asChild` is true, the component will render as a child element using the `Slot`
 * component. If `asChild` is false or not provided, the component will render as a default
 * element (e.g., "div").
 * @description
 * The `AsChildProps` type is a utility type that defines an optional `asChild` prop. This
 * prop is used to determine whether a component should render as a child element using the
 * `Slot` component or as a default element (e.g., "div"). If `asChild` is true, the
 * component will render as a child element using the `Slot` component. If `asChild` is false
 * or not provided, the component will render as a default element (e.g., "div").
 */
export type AsChildProps = {
    asChild?: boolean;
};

/**
 * ElementType
 * @description
 * The `ElementType` type is a utility type that represents any valid React element type. It
 * is defined as `React.ElementType`, which is a built-in type in React that can represent
 * any valid React element type, including HTML elements (e.g., "div", "span") and custom
 * components. This type is used to allow the `Element` component to accept any valid React
 * element type as a prop, enabling it to render different types of elements based on the
 * provided props.
 */
export type ElementType = React.ElementType;

/**
 * ElementForwardRef
 * @description
 * The `ElementForwardRef` type is a utility type that represents a React component that can
 * forward refs. It is defined as a `React.ForwardRefExoticComponent`, which is a built-in
 * type in React that represents a component that can forward refs to its child components.
 * The `ElementForwardRef` type takes the props of the `Element` component (which includes the
 * optional `asChild` prop and the props of the specified element type) and combines them
 * with the ref attributes. This allows the `Element` component to forward refs to the
 * underlying DOM element or component when it is rendered.
 */
export type ElementForwardRef = React.ForwardRefExoticComponent<
    React.PropsWithoutRef<ElementProps<any>> &
    React.RefAttributes<any>
>;

/**
 * PropsOf
 * @description
 * The `PropsOf` type is a utility type that extracts the props of a given React element type.
 * It takes a generic parameter `E`, which extends `ElementType`, allowing it to accept any
 * valid React element type (e.g., "div", "span", custom components). The type uses
 * `React.ComponentPropsWithoutRef<E>` to extract the props of the specified element type,
 * excluding any ref attributes. This type is used to ensure that the props passed to the
 * `Element` component are correctly typed based on the element type being rendered.
 * @template E - A generic parameter that extends `ElementType`, allowing the type to accept
 * any valid React element type (e.g., "div", "span", custom components).
 */
export type PropsOf<E extends ElementType> =
    React.ComponentPropsWithoutRef<E>;

/**
 * PolymorphicRef
 * @description
 * The `PolymorphicRef` type is a utility type that represents the ref type for a given
 * React element type. It takes a generic parameter `E`, which extends `ElementType`,
 * allowing it to accept any valid React element type (e.g., "div", "span", custom
 * components). The type uses `React.ComponentPropsWithRef<E>["ref"]` to extract the ref
 * type of the specified element type. This type is used to ensure that the ref passed to
 * the `Element` component is correctly typed based on the element type being rendered.
 * @template E - A generic parameter that extends `ElementType`, allowing the type to accept
 * any valid React element type (e.g., "div", "span", custom components).
 */
export type PolymorphicRef<E extends ElementType> =
    React.ComponentPropsWithRef<E>["ref"];

/**
 * ElementProps
 * @property {boolean} [asChild] - (optional) A boolean prop that determines whether the
 * component should render as a child element or as a default element (e.g., "div"). If
 * `asChild` is true, the component will render as a child element using the `Slot`
 * component. If `asChild` is false or not provided, the component will render as a default
 * element (e.g., "div").
 * @property {ElementType} [as] - (optional) A prop that specifies the type of element to render. It can be any valid React element type (e.g., "div", "span", custom components). If
 * `as` is provided, the component will render as the specified element type. If `as` is not
 * provided, the component will render as a default element (e.g., "div").
 * @property {Omit<PropsOf<E>, keyof AsChildProps | "as">} [props] - (optional) The props of the specified element type `E`, excluding the `asChild` and `as` props. This allows you to pass any valid props for the specified element type when rendering the component.
 * @property {PolymorphicRef<E>} [ref] - (optional) The ref for the component, which is correctly typed based on the specified element type `E`. This allows you to forward refs to the underlying DOM element or component when rendering the `Element` component.
 * @template E - A generic parameter that extends `ElementType`, allowing the type to accept any valid React element type (e.g., "div", "span", custom components).
 * @description
 * The `ElementProps` type is a utility type that combines the props of a React component
 * with the `AsChildProps` type. It allows you to specify an optional `asChild` prop, which
 * determines whether the component should render as a child element or as a default element
 * (e.g., "div"). The type also ensures that the ref is correctly typed based on the
 * component being rendered.
 */
export type ElementProps<E extends ElementType> =
    AsChildProps & {
        as?: E;
    } & Omit<
        PropsOf<E>,
        keyof AsChildProps | "as"
    > & {
        ref?: PolymorphicRef<E>;
    };
/**
 * ElementComponent
 * @description
 * The `ElementComponent` type is a React functional component type that takes a generic
 * parameter `E`, which extends `React.ElementType`. This allows the component to accept
 * any valid React element type (e.g., "div", "span", custom components). The component
 * accepts props of type `ElementProps<E>`, which includes the optional `asChild` prop and
 * the props of the specified element type. The component returns a React element or null.
 * The `Element` component is implemented using `React.forwardRef`, which allows it to
 * forward refs to the underlying DOM element or component. The implementation checks the
 * `asChild` prop to determine whether to render the component as a child element using the
 * `Slot` component or as a default element (e.g., "div").
 * @template E - A generic parameter that extends `React.ElementType`, allowing the
 * component to accept any valid React element type (e.g., "div", "span", custom components).
 * @property {ElementProps} [props] - (optional) A boolean prop that determines whether the
 * component should render as a child element or as a default element (e.g., "div"). If
 * `asChild` is true, the component will render as a child element using the `Slot`
 * component. If `asChild` is false or not provided, the component will render as a default
 * element (e.g., "div").
 */
export type ElementComponent = <E extends React.ElementType = "div">(
    props: ElementProps<E>
) => React.ReactElement | null;

/**
 * ElementTypeComponent
 * @description
 * The `ElementTypeComponent` type is a combination of the `ElementComponent` and
 * `ElementForwardRef` types. It represents a React functional component that can accept any
 * valid React element type as a prop and can also forward refs to the underlying DOM
 * element or component. This type is used to define the `Element` component, which is
 * implemented using `React.forwardRef` and can render different types of elements based on
 * the provided props.
 */
export type ElementTypeComponent =
    ElementComponent & ElementForwardRef;

/**
 * ElementImpl
 * @description
 * The `ElementImpl` function is the implementation of the `Element` component. It takes a
 * generic parameter `E`, which extends `React.ElementType`, allowing it to accept any valid
 * React element type (e.g., "div", "span", custom components). The function accepts props of
 * type `ElementProps<E>`, which includes the optional `asChild` prop and the props of the
 * specified element type. The function checks the `asChild` prop to determine whether to
 * render the component as a child element using the `Slot` component or as a default
 * element (e.g., "div"). The function also forwards refs to the underlying DOM element or
 * component using `React.forwardRef`.
 * @template E - A generic parameter that extends `React.ElementType`, allowing the
 * component to accept any valid React element type (e.g., "div", "span", custom components).
 * @param {ElementProps} props - A boolean prop that determines whether the component should
 * render as a child element or as a default element (e.g., "div"). If `asChild` is true,
 * the component will render as a child element using the `Slot` component. If `asChild` is
 * false or not provided, the component will render as a default element (e.g., "div").
 * @param ref 
 * @returns 
 */
const ElementImpl = <E extends React.ElementType = "div">(
    { asChild, as, ...props }: ElementProps<E>,
    ref: React.ForwardedRef<any>
) => {
    const Comp = asChild
        ? Slot
        : as || "div";
    return <Comp ref={ref} {...props} />;
};

/**
 * Element
 * @description
 * The `Element` component is a React functional component that takes a generic parameter
 * `E`,
 * which extends `React.ElementType`. This allows the component to accept any valid React
 * element type (e.g., "div", "span", custom components). The component accepts props of type
 * `ElementProps<E>`, which includes the optional `asChild` prop and the props of the
 * specified element type. The component returns a React element or null. The `Element`
 * component is implemented using `React.forwardRef`, which allows it to forward refs to the
 * underlying DOM element or component. The implementation checks the `asChild` prop to
 * determine whether to render the component as a child element using the `Slot` component or
 * as a default element (e.g., "div").
 * @template E - A generic parameter that extends `React.ElementType`, allowing the
 * component to accept any valid React element type (e.g., "div", "span", custom components).
 * @property {ElementProps} [props] - (optional) A boolean prop that determines whether the
 * component should render as a child element or as a default element (e.g., "div"). If
 * `asChild` is true, the component will render as a child element using the `Slot`
 * component. If `asChild` is false or not provided, the component will render as a default
 * element (e.g., "div").
 * @example
 * ```tsx
 * import { Element } from "@octa/primitives";
 *
 * // Render as a default element (e.g., "div")
 * <Element className="my-element">Hello, World!</Element>
 * // Render as a child element using the `Slot` component
 * <Element asChild>
 *   <button className="my-button">Click Me</button>
 * </Element>
 * ```
 * Here are some examples of how to use the `Element` component:
 * 1. Rendering as a default element (e.g., "div"):
 * ```tsx
 * <Element className="my-element">Hello, World!</Element>
 * ```
 * In this example, the `Element` component will render as a `div` with the class name
 * "my-element" and the text content "Hello, World!".
 *
 * 2. Rendering as a child element using the `Slot` component:
 * ```tsx
 * <Element asChild>
 *   <button className="my-button">Click Me</button>
 * </Element>
 * ```
 * In this example, the `Element` component will render as a child element using the `Slot`
 * component. The `button` element with the class name "my-button" and the text content
 * "Click Me" will be rendered inside the `Slot`, allowing it to inherit styles and behavior
 * from the parent component.
 */
export const Element = React.forwardRef(ElementImpl) as ElementTypeComponent;

Element.displayName = "Element";