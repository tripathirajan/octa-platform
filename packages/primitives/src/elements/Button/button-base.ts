import { createPrimitiveElement } from "../../internal";

/**
 * ButtonBase
 *
 * @description The `ButtonBase` component is a primitive element that serves as the foundational
 * building block for creating button components. It is designed to be flexible and
 * customizable, allowing developers to build various types of buttons (e.g., primary,
 * secondary, ghost) by applying different styles and properties.
 * The `ButtonBase` component is created using the `createPrimitiveElement` function, which
 * is a utility function that helps in creating primitive React elements with specific
 * configurations. In this case, the `ButtonBase` is created as a "button" element, which
 * means it will render as a standard HTML button element in the DOM.
 * By using the `ButtonBase` component, developers can ensure consistency in the structure
 * and behavior of their button components while still having the flexibility to customize
 * the appearance and functionality as needed. It serves as a reusable component that can be
 * extended and styled to fit the specific requirements of different button variants and
 * sizes.
 * @example
 * ```tsx
 * <ButtonBase disabled={true}>
 *   Disabled Button
 * </ButtonBase>
 * ```
 * In this example, the `ButtonBase` component is rendered with the "disabled" prop set to
 * true, making it non-interactive and visually indicating that it is disabled. Developers
 * can further customize the styles and behavior of the `ButtonBase` component to create
 * different types of buttons based on their design requirements.
 * @see ButtonProps for the complete set of properties that can be passed to the Button
 * component, which includes both ButtonOwnProps and ElementProps.
 */
export const ButtonBase = createPrimitiveElement("button");
