import { createContext } from "react";

import { AppScreen } from "../types/AppScreen";

export type AppContextType = {
  setScreen: (screen: AppScreen) => void;
  mapSize: number;
  screen: AppScreen;
  setMapSize: (newValue: number) => void;
};

export const defaultAppContextValue: AppContextType = {
  mapSize: NaN,
  setMapSize: () => {},
  screen: AppScreen.menu,
  setScreen: () => {},
};

export const AppContext = createContext<AppContextType>(defaultAppContextValue);
