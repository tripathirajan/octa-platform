import * as React from "react";

/**
 * CreateContextReturn
 * @description A tuple type for the return value of the createContext function. The first element is a React Provider component, and the second element is a hook to consume the context.
 * @template T - The type of the context value.
 * */
export type CreateContextReturn<T> = [React.Provider<T | undefined>, () => T];

/**
 * createContext
 * @description A utility function to create a React context with a custom hook for consuming the context. It ensures that the context is used within a provider and provides a clear error message if it is not.
 * @template T - The type of the context value.
 * @param {string} name - The name of the context, used for error messages when the context is consumed outside of a provider.
 * @returns {CreateContextReturn<T>} A tuple containing the Provider component and the custom hook to consume the context.
 * @example
 * ```tsx
 * function MyComponent() {
 *   const contextValue = useMyContext();
 *   return <div>{contextValue.someProperty}</div>;
 * }
 * ...
 * const [MyContextProvider, useMyContext] = createContext<MyContextType>('MyContext');
 * ...
 * <MyContextProvider value={someContextValue}>
 *   <MyComponent />
 * </MyContextProvider>
 * ```
 * In this example, `MyContextProvider` is a React Provider component that can be used to wrap parts of the component tree where the context should be available. The `useMyContext` hook can be called within any component that is a descendant of `MyContextProvider` to access the context value. If `useMyContext` is called outside of a `MyContextProvider`, it will throw an error.
 */
export function createContext<T>(name: string): CreateContextReturn<T> {
  const Context = React.createContext<T | undefined>(undefined);

  function useContext() {
    const context = React.useContext(Context);
    if (context === undefined) {
      throw new Error(`${name} context must be used within ${name}.Provider`);
    }
    return context;
  }

  return [Context.Provider, useContext];
}
