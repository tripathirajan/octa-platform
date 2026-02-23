/**
 * EventHandler
 * @description A type for event handlers that take a React SyntheticEvent as an argument.
 * @template E - The type of the React SyntheticEvent.
 */
export type EventHandler<E extends React.SyntheticEvent> = (event: E) => void;

/**
 * EventHandlerOptions
 * @description Options for the composeEventHandlers function.
 * @property {boolean} checkForDefaultPrevented - Whether to check if the original handler called `event.preventDefault()`. Defaults to true.
 */
export type EventHandlerOptions = {
  checkForDefaultPrevented?: boolean;
};

/**
 * composeEventHandlers
 * @description Composes two event handlers into one. The original handler will be called first, and if it calls `event.preventDefault()`, the second handler will not be called.
 * This is useful for allowing users to provide their own event handlers while still ensuring that the component's internal logic is executed.
 * @param {EventHandler} originalHandler
 * @param {EventHandler} ourHandler
 * @param {EventHandlerOptions} options
 * @returns {EventHandler} A new event handler that composes the original and our handlers.
 * @example
 * const handleClick = () => {
 *   console.log('Button clicked');
 * };
 * const handleClickWithAlert = composeEventHandlers(handleClick, () => {
 *   alert('Button clicked');
 * }, { checkForDefaultPrevented: true });
 * <button onClick={handleClickWithAlert}>Click me</button>
 * In this example, when the button is clicked, it will log "Button clicked" to the console and then show an alert.
 * If the original handler had called `event.preventDefault()`, the alert would not be shown.
 *
 * const handleClickWithAlert = composeEventHandlers(handleClick, () => {
 *   alert('Button clicked');
 * }, { checkForDefaultPrevented: false });
 * <button onClick={handleClickWithAlert}>Click me</button>
 * In this example, the alert will always be shown regardless of whether the original handler calls `event.preventDefault()`.
 */
export function composeEventHandlers<E extends React.SyntheticEvent>(
  originalHandler?: EventHandler<E>,
  ourHandler?: EventHandler<E>,
  options: EventHandlerOptions = {},
) {
  const { checkForDefaultPrevented = true } = options;

  return (event: E) => {
    originalHandler?.(event);

    if (checkForDefaultPrevented && event.defaultPrevented) {
      return;
    }

    ourHandler?.(event);
  };
}
