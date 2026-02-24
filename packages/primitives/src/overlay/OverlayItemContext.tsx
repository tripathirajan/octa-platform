import * as React from "react";
import { createContext } from "../internal/createContext";

type OverlayItemContextValue = {
    overlayId: string;
};

const [OverlayItemProvider, useOverlayItem] =
    createContext<OverlayItemContextValue>("OverlayItemContext");

export { OverlayItemProvider, useOverlayItem };