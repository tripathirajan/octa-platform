import * as React from "react";
import { Element, ElementType, ElementProps } from "../base";

/**
 * PolymorphicRef
 * @description
 * The `PolymorphicRef` type is a utility type that extracts the `ref` type from the props
 * of a given React element type `E`. It uses the `ComponentPropsWithRef` utility type to
 * get the props of the specified element type and then accesses the `ref` property. This
 * allows you to correctly type the ref for a polymorphic component based on the element
 * type being rendered.
 * @template E - A generic parameter that extends `ElementType`, allowing the type to accept
 * any valid React element type (e.g., "div", "span", custom components).
 * @returns The `ref` type for the specified element type `E`, which can be used to
 * correctly type refs in polymorphic components.
 */
export type PolymorphicRef<E extends ElementType> =
  React.ComponentPropsWithRef<E>["ref"];
/**
 * PrimitiveComponent
 * @description
 * The `PrimitiveComponent` type is a generic type that represents a React functional
 * component
 * that can accept any valid React element type as a prop. It takes a default element type
 * `DefaultE` as a parameter, which is used as the default value for the generic parameter
 * `E`.
 * The component accepts props of the specified element type `E`, along with an optional
 * `ref`
 * prop that is correctly typed based on the element type being rendered. This type is used
 * to
 * define primitive components that can render different types of elements based on the
 * provided
 * props.
 * @template DefaultE - A generic parameter that extends `ElementType`, representing the
 * default
 * element type for the component. This allows you to specify a default element type that
 * will
 * be used if no specific element type is provided when rendering the component.
 * @returns A React functional component that can accept any valid React element type as a
 * prop and can also forward refs to the underlying DOM element or component based on the
 * specified element type `E`.
 */
export type PrimitiveComponent<DefaultE extends ElementType> = <
  E extends ElementType = DefaultE
>(
  props: ElementProps<E> & {
    ref?: PolymorphicRef<E>;
  }
) => React.ReactElement | null;

/***
 * createPrimitiveElement
 * @description
 * The `createPrimitiveElement` function is a utility function that creates a primitive React
 * component based on a specified default element type. It uses `React.forwardRef` to create
 * a component that can accept any valid React element type as a prop and can also forward
 * refs to the underlying DOM element or component based on the specified element type.
 * The function takes a `defaultElement` parameter, which is used as the default value for
 * the generic parameter `E` in the returned component. This allows you to specify a default
 * element type that will be used if no specific element type is provided when rendering the
 * component.
 * @param defaultElement - A default element type (e.g., "div", "span", custom components)
 * that will be used as the default value for the generic parameter `E` in the returned
 * component. This allows you to specify a default element type that will be used if no
 * specific element type is provided when rendering the component.
 * @returns A React functional component that can accept any valid React element type as a
 * prop and can also forward refs to the underlying DOM element or component based on the
 * specified element type `E`. The returned component will use the `defaultElement` as the
 * default value for the generic parameter `E`, allowing you to specify a default element
 * type for the component.
 * @example
 * // Create a primitive button component with "button" as the default element type
 * const Button = createPrimitiveElement("button");
 *
 * // Use the Button component with the default element type
 * <Button onClick={() => alert("Clicked!")}>Click Me</Button>
 *
 * // Use the Button component with a different element type (e.g., "a")
 * <Button as="a" href="https://www.example.com">Go to Example</Button>
 */
export function createPrimitiveElement<
  DefaultE extends ElementType
>(defaultElement: DefaultE) {
  const Primitive = React.forwardRef(
    (
      { as, ...props }: ElementProps<any>,
      ref: React.ForwardedRef<any>
    ) => {
      return (
        <Element
          {...props}
          as={as ?? defaultElement}
          ref={ref}
        />
      );
    }
  ) as PrimitiveComponent<DefaultE> &
    React.ForwardRefExoticComponent<any>;

  Primitive.displayName =
    typeof defaultElement === "string"
      ? `Primitive.${defaultElement}`
      : "Primitive";

  return Primitive;
}