import * as React from "react";

/**
 * UseControllableStateParams
 * @description A type for the parameters of the `useControllableState` hook. This hook is
 * designed to manage state that can be either controlled (managed by a parent component) or
 * uncontrolled (managed internally by the component itself).
 * @template T - The type of the state value.
 * @property {T} [value] - The controlled value. If this prop is provided, the component
 * will be controlled and will rely on this value for its state.
 * @property {T} [defaultValue] - The default value for the state when the component is
 * uncontrolled. This value will be used to initialize the internal state if `value` is not
 * provided.
 * @property {(value: T) => void} [onChange] - A callback function that is called whenever the state changes. This function will receive the new state value as an argument. It is typically used in controlled components to notify the parent component of state changes.
 */
export interface UseControllableStateParams<T> {
  /**
   * The controlled value. If this prop is provided, the component will be controlled and
   * will rely on this value for its state.
   */
  value?: T;
  /**
   * The default value for the state when the component is uncontrolled. This value will be
   * used to initialize the internal state if `value` is not provided.
   */
  defaultValue?: T;
  /**
   * A callback function that is called whenever the state changes. This function will
   * receive
   * the new state value as an argument. It is typically used in controlled components to
   * notify the parent component of state changes.
   */
  onChange?: (value: T) => void;
}

/**
 * useControllableState
 * @description A custom React hook that manages state which can be either controlled or
 * uncontrolled. It returns the current state value and a function to update the state. The
 * hook determines whether the component is controlled based on the presence of the `value`
 * prop. If `value` is provided, the component is considered controlled, and the state will
 * be derived from this prop. If `value` is not provided, the component is considered
 * uncontrolled, and the state will be managed internally using `useState`. The `onChange`
 * callback is called whenever the state changes, allowing parent components to respond to
 * changes in controlled components.
 * @template T - The type of the state value.
 * @param {UseControllableStateParams} param0
 * @returns A tuple containing the current state value and a function to update the state.
 * The first element of the tuple is the current state value, which can be either controlled
 * or uncontrolled depending on whether the `value` prop is provided. The second element is
 * a function that can be used to update the state. If the component is controlled, this
 * function will call the `onChange` callback with the new value. If the component is
 * uncontrolled, this function will update the internal state directly.
 * @example
 * ```tsx
 * function MyComponent() {
 *   const [value, setValue] = useControllableState({
 *     defaultValue: "Hello",
 *     onChange: (newValue) => console.log("Value changed:", newValue),
 *   });
 *
 *   return (
 *     <input
 *       value={value}
 *       onChange={(e) => setValue(e.target.value)}
 *     />
 *   );
 * }
 * ```
 * In this example, `MyComponent` uses the `useControllableState` hook to manage an input's
 * value. The component is uncontrolled because it does not receive a `value` prop, and it
 * initializes its state with the `defaultValue`. Whenever the input value changes, the
 * `setValue` function updates the internal state and calls the `onChange` callback, logging
 * the new value to the console.
 */
export function useControllableState<T>({
  value,
  defaultValue,
  onChange,
}: UseControllableStateParams<T>) {
  const [internalValue, setInternalValue] = React.useState<T | undefined>(
    defaultValue,
  );

  const isControlled = value !== undefined;
  const currentValue = isControlled ? value : internalValue;

  const setValue = React.useCallback(
    (next: T) => {
      if (!isControlled) {
        setInternalValue(next);
      }
      onChange?.(next);
    },
    [isControlled, onChange],
  );

  return [currentValue, setValue] as const;
}
