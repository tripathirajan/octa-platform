import * as React from "react";
import { Element } from "../../base/Element";
import { useControllableState, useFocusGroup, createContext } from "../../internal";

/**
 * Props for the Tabs component.
 */
export interface TabsProps {
    /**
     * The children of the tabs component.
     */
    children?: React.ReactNode;
    /**
     * The controlled value of the active tab.
     */
    value?: string;
    /**
     * The default active tab value when uncontrolled.
     */
    defaultValue?: string;
    /**
     * Callback fired when the active tab changes.
     */
    onValueChange?: (value: string) => void;
    /**
     * The orientation of the tabs.
     * @default "horizontal"
     */
    orientation?: "horizontal" | "vertical";
}

/**
 * Context for the Tabs component.
 */
export const [TabsProvider, useTabsContext] = createContext<{
    value: string;
    setValue: (value: string) => void;
    orientation: "horizontal" | "vertical";
    focusGroup: ReturnType<typeof useFocusGroup>;
    id: string;
}>("Tabs components must be used within Tabs");

/**
 * Tabs primitive for accessible tabbed interfaces.
 * 
 * @description This component manages the state for a set of tabs, providing context
 * to its children. It handles both controlled and uncontrolled states.
 * 
 * @param {TabsProps} props - The properties for the Tabs component.
 * @returns {React.JSX.Element} The rendered tabs provider.
 * 
 * @example
 * ```tsx
 * <Tabs defaultValue="tab1">
 *   <TabsList>
 *     <TabsTrigger value="tab1">Tab 1</TabsTrigger>
 *     <TabsTrigger value="tab2">Tab 2</TabsTrigger>
 *   </TabsList>
 *   <TabsContent value="tab1">Content 1</TabsContent>
 *   <TabsContent value="tab2">Content 2</TabsContent>
 * </Tabs>
 * ```
 */
export const Tabs = ({
    children,
    value: valueProp,
    defaultValue,
    onValueChange,
    orientation = "horizontal",
}: TabsProps) => {
    const [value, setValue] = useControllableState({
        value: valueProp,
        defaultValue,
        onChange: onValueChange,
    });

    const id = React.useId();
    const focusGroup = useFocusGroup({ orientation });

    return (
        <TabsProvider value={{ value: value || "", setValue, orientation, focusGroup, id }}>
            <div data-orientation={orientation}>{children}</div>
        </TabsProvider>
    );
};

/**
 * Props for the TabsList component.
 */
export interface TabsListProps extends React.HTMLAttributes<HTMLElement> {
    /**
     * If true, the component will render its child and pass all props to it.
     */
    asChild?: boolean;
}

/**
 * TabsList primitive.
 * 
 * @description It contains the tab triggers and handles keyboard navigation using
 * a composite pattern. It is WAI-ARIA compliant.
 * 
 * @param {TabsListProps} props - The properties for the TabsList component.
 * @param {React.Ref<HTMLElement>} ref - The ref to the list element.
 * @returns {React.JSX.Element} The rendered tab list.
 * 
 * @example
 * ```tsx
 * <TabsList className="flex gap-2">
 *   <TabsTrigger value="tab1">Tab 1</TabsTrigger>
 * </TabsList>
 * ```
 */
export const TabsList = React.forwardRef<HTMLElement, TabsListProps>(
    ({ asChild, ...props }, ref) => {
        const context = useTabsContext();

        return (
            <Element
                asChild={asChild}
                role="tablist"
                aria-orientation={context.orientation}
                onKeyDown={context.focusGroup.onKeyDown}
                {...props}
                ref={ref}
            />
        );
    }
);

/**
 * Props for the TabsTrigger component.
 */
export interface TabsTriggerProps extends React.HTMLAttributes<HTMLElement> {
    /**
     * If true, the component will render its child and pass all props to it.
     */
    asChild?: boolean;
    /**
     * The value of the tab trigger.
     */
    value: string;
}

/**
 * TabsTrigger primitive.
 * 
 * @description It activates a tab panel when clicked or focused. It manages focus
 * and selection states automatically.
 * 
 * @param {TabsTriggerProps} props - The properties for the TabsTrigger component.
 * @param {React.Ref<HTMLElement>} ref - The ref to the trigger element.
 * @returns {React.JSX.Element} The rendered tab trigger.
 * 
 * @example
 * ```tsx
 * <TabsTrigger value="tab1">Overview</TabsTrigger>
 * ```
 */
export const TabsTrigger = React.forwardRef<HTMLElement, TabsTriggerProps>(
    ({ asChild, value, ...props }, ref) => {
        const {
            focusGroup,
            value: valueFromContext,
            id,
            setValue,
            orientation,
        } = useTabsContext();

        const innerRef = React.useRef<HTMLElement>(null);
        const isSelected = valueFromContext === value;
        const triggerId = `${id}-trigger-${value}`;
        const contentId = `${id}-content-${value}`;

        React.useEffect(() => {
            if (!innerRef?.current) return;
            const unregister = focusGroup?.registerItem(value, innerRef.current as HTMLElement);
            return () => unregister();
        }, [value, focusGroup]);

        return (
            <Element
                as="button"
                asChild={asChild}
                role="tab"
                id={triggerId}
                aria-selected={isSelected}
                aria-controls={contentId}
                data-state={isSelected ? "active" : "inactive"}
                tabIndex={isSelected ? 0 : -1}
                onClick={() => {
                    setValue(value);
                    focusGroup.setActiveId(value);
                }}
                onFocus={() => focusGroup.setActiveId(value)}
                onKeyDown={(e: React.KeyboardEvent) => {
                    focusGroup?.onKeyDown(e)
                    if (orientation === "horizontal" && e.key === "ArrowDown") {
                        e.preventDefault();
                        const content = document.getElementById(contentId);
                        content?.focus();
                    } else if (orientation === "vertical" && e.key === "ArrowRight") {
                        e.preventDefault();
                        const content = document.getElementById(contentId);
                        content?.focus();
                    }
                }}
                {...props}
                ref={(node: any) => {
                    (innerRef as any).current = node;
                    if (typeof ref === "function") ref(node);
                    else if (ref) (ref as any).current = node;
                }}
            />
        );
    }
);

/**
 * Props for the TabsContent component.
 */
export interface TabsContentProps extends React.HTMLAttributes<HTMLElement> {
    /**
     * If true, the component will render its child and pass all props to it.
     */
    asChild?: boolean;
    /**
     * The value of the tab content, matching a trigger value.
     */
    value: string;
}

/**
 * TabsContent primitive.
 * 
 * @description It displays the content associated with an active tab. It is only
 * visible when its value matches the active tab's value.
 * 
 * @param {TabsContentProps} props - The properties for the TabsContent component.
 * @param {React.Ref<HTMLElement>} ref - The ref to the content element.
 * @returns {React.JSX.Element | null} The rendered tab content or null if not active.
 * 
 * @example
 * ```tsx
 * <TabsContent value="tab1">
 *   <p>This is the content for tab 1.</p>
 * </TabsContent>
 * ```
 */
export const TabsContent = React.forwardRef<HTMLElement, TabsContentProps>(
    ({ asChild, value, ...props }, ref) => {
        const context = useTabsContext();
        const contentRef = React.useRef<HTMLElement>(null);
        const isSelected = context.value === value;
        const triggerId = `${context.id}-trigger-${value}`;
        const contentId = `${context.id}-content-${value}`;

        React.useEffect(() => {
            if (isSelected && contentRef.current) {
                // Find the first focusable element within the content panel
                const firstFocusable = contentRef.current.querySelector<HTMLElement>(
                    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
                );

                if (firstFocusable) {
                    firstFocusable.focus();
                }
            }
        }, [isSelected]);

        const handleKeyDown = (e: React.KeyboardEvent) => {
            // Switch tabs with Ctrl+PageUp/Down
            if (e.ctrlKey) {
                if (e.key === "PageUp") {
                    e.preventDefault();
                    const nextId = context.focusGroup.moveFocus(-1);
                    if (nextId) context.setValue(nextId);
                    return;
                }
                if (e.key === "PageDown") {
                    e.preventDefault();
                    const nextId = context.focusGroup.moveFocus(1);
                    if (nextId) context.setValue(nextId);
                    return;
                }
            }

            // Go back to trigger with ArrowUp (if horizontal) or ArrowLeft (if vertical)
            if (e.target === e.currentTarget) {
                if (
                    (context.orientation === "horizontal" && e.key === "ArrowUp") ||
                    (context.orientation === "vertical" && e.key === "ArrowLeft")
                ) {
                    e.preventDefault();
                    const trigger = document.getElementById(triggerId);
                    trigger?.focus();
                }
            }
        };

        if (!isSelected) return null;

        return (
            <Element
                asChild={asChild}
                role="tabpanel"
                id={contentId}
                aria-labelledby={triggerId}
                data-state={isSelected ? "active" : "inactive"}
                tabIndex={0}
                onKeyDown={handleKeyDown}
                {...props}
                ref={(node: any) => {
                    (contentRef as any).current = node;
                    if (typeof ref === "function") ref(node);
                    else if (ref) (ref as any).current = node;
                }}
            />
        );
    }
);