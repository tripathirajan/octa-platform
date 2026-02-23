import type { ElementProps } from "../../base";

/**
 * ButtonOwnProps
 * This type defines the specific properties that are unique to the Button component. It
 * includes a "disabled" property, which is a boolean that indicates whether the button is
 * disabled or not. This property can be used to control the interactivity of the button,
 * preventing user actions when it is set to true. The ButtonOwnProps type is used in
 * conjunction with ElementProps to create the complete set of properties for the Button
 * component.
 * @typedef {Object} ButtonOwnProps - The specific properties for the Button component.
 * @property {boolean} [disabled] - A boolean indicating whether the button is disabled. If
 * set to true, the button will be non-interactive and typically styled to indicate its
 * disabled state.
 * @example
 * ```tsx
 * <Button disabled={true}>
 *   Disabled Button
 * </Button>
 * ```
 * In this example, the Button component is rendered with the "disabled" prop set to true,
 * making it non-interactive and visually indicating that it is disabled.
 * @see ButtonProps for the complete set of properties that can be passed to the Button
 * component, which includes both ButtonOwnProps and ElementProps.
 */
export type ButtonOwnProps = {
  disabled?: boolean;
};

/**
 * ButtonProps
 * This type represents the complete set of properties that can be passed to the Button
 * component. It is a combination of the ButtonOwnProps, which includes the specific
 * properties for the Button component, and the ElementProps, which includes the common
 * properties for any React element. The ButtonProps type is defined as a generic type that
 * takes an element type E, allowing it to be flexible and adaptable to different types of
 * elements that the Button component can render as. By using Partial, all properties in
 * ButtonOwnProps and ElementProps are made optional, giving developers the freedom to only
 * specify the props they need when using the Button component.
 * @typedef {Object} ButtonProps - The complete set of properties for the Button component,
 * combining both ButtonOwnProps and ElementProps.
 * @template E - A generic type representing the element type that the Button component can
 * render as (e.g., "button", "a", etc.).
 * @example
 * ```tsx
 * <Button as="a" href="https://www.example.com" disabled={false}>
 *   Link Button
 * </Button>
 * ```
 * In this example, the Button component is rendered as an anchor element ("a") with an
 * href attribute pointing to "https://www.example.com". The "disabled" prop is set to false,
 * allowing the button to be interactive and function as a link.
 * @see ButtonOwnProps for the specific properties unique to the Button component.
 * @see ElementProps for the common properties that can be applied to any React element.
 */
export type ButtonProps<E extends React.ElementType> = ButtonOwnProps &
  ElementProps<E>;
