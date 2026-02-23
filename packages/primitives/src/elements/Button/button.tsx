import * as React from "react";
import { ButtonBase } from "./button-base";
import type { ButtonProps } from "./types";

/**
 * ElementType
 * Represents a React component or an HTML element that can be rendered. It can be a string
 * (e.g., "button", "a") for HTML elements or a React component (e.g., MyComponent).
 * This type is used to allow the Button component to be polymorphic, meaning it can render
 * different types of elements based on the "as" prop.
 */
type ElementType = React.ElementType;

/**
 * PolymorphicRef
 * Represents the type of the ref that can be forwarded to a polymorphic component. It uses
 * the React.ComponentPropsWithRef utility type to extract the ref type from the specified
 * ElementType. This allows the Button component to forward refs correctly to the underlying
 * DOM element or React component it renders as.
 * @param E - The ElementType for which the ref type is being extracted.
 * @returns The type of the ref that can be forwarded to the specified ElementType.
 */
type PolymorphicRef<E extends ElementType> =
    React.ComponentPropsWithRef<E>["ref"];
/**
 * ButtonComponent
 * Represents the type of the Button component. It is a generic type that takes an
 * ElementType
 * as a parameter, allowing the Button to be rendered as different types of elements. The
 * props
 * for the Button component include the ButtonProps for the specified ElementType, along
 * with an optional ref that can be forwarded to the underlying element or component. The
 * Button component returns a React element or null.
 * @template E - The ElementType that the Button component can render as. It defaults to
 * "button" if not specified.
 * @param {ButtonProps & { ref?: PolymorphicRef} } props - The props for the Button component, which include the
 * ButtonProps for the
 * specified ElementType and an optional ref.
 * @returns A React element or null representing the rendered Button component.
 */
type ButtonComponent = <
    E extends ElementType = "button"
>(
    props: ButtonProps<E> & {
        ref?: PolymorphicRef<E>;
    }
) => React.ReactElement | null;

/**
 * ButtonImpl
 * This is the implementation of the Button component. It is a functional component that
 * takes
 * in props and a ref, and returns a React element. The Button component is designed to be
 * polymorphic, allowing it to render as different types of elements based on the "as" prop.
 * The component uses the ButtonBase as the underlying element and applies the provided props
 * and ref to it. The variant, size, disabled, and className props are extracted from the
 * ButtonProps and passed down to the ButtonBase component.
 * @template E - The ElementType that the Button component can render as. It defaults to
 * "button" if not specified.
 * @param {ButtonProps} props - The props for the Button component, which include variant,
 * size, disabled, className, and any other props defined in ButtonProps. 
 * @param {React.ForwardedRef<any>} ref - The ref that can be forwarded to the underlying
 * element or component rendered by the Button.
 * @returns A React element representing the rendered Button component, which is based on
 * the ButtonBase component with the applied props and ref.
 */
const ButtonImpl = <
    E extends React.ElementType = "button"
>(
    {
        className,
        ...props
    }: ButtonProps<E>,
    ref: React.ForwardedRef<any>
) => {

    return (
        <ButtonBase
            {...props}
            ref={ref}
            className={className}
        />
    );
};

/**
 * Button
 * @description The Button component is a polymorphic React component that can render as
 * different types of elements based on the "as" prop. It uses the ButtonBase as the
 * underlying element and applies the provided props and ref to it. The component supports
 * variant, size, disabled, and className props, which are passed down to the ButtonBase
 * component. The Button component is designed to be flexible and reusable across different
 * contexts in a React application.
 * @example
 * ```tsx
 * <Button variant="primary" size="md" disabled={false}>
 *   Click Me
 * </Button>
 * ```
 * In this example, the Button component is rendered with the "primary" variant, "md" size,
 * and is not disabled. The text "Click Me" is displayed inside the button.
 * @see ButtonProps for the props that can be passed to the Button component.
 * @see ButtonBase for the underlying element used by the Button component.
 */
export const Button = React.forwardRef(
    ButtonImpl
) as ButtonComponent &
    React.ForwardRefExoticComponent<any>;

Button.displayName = "Button";