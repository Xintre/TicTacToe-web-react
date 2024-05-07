import React, { useState } from "react";
import { Stack } from "@mui/material";

import GameScreen from "./GameScreen";
import Header from "./Header";
import MenuScreen from "./MenuScreen";
import {
  AppContext,
  AppContextType,
  defaultAppContextValue,
} from "./context/AppContext";
import { AppScreen } from "./types/AppScreen";

function App() {
  const [appContextValue, setAppContextValue] = useState<AppContextType>(
    defaultAppContextValue
  );

  const onRestart = () => {};

  return (
    <AppContext.Provider
      value={{
        ...appContextValue,
        setMapSize: (newValue) => {
          setAppContextValue({
            ...appContextValue,
            mapSize: newValue,
          });
        },
        setScreen: (newScreen) => {
          setAppContextValue({
            ...appContextValue,
            screen: newScreen,
          });
        },
      }}
    >
      <Stack>
        <Header
          onRestart={onRestart}
          screenTitle={appContextValue.screen}
          hideControlButtons={appContextValue.screen === AppScreen.menu}
        />

        {appContextValue.screen === AppScreen.menu ? (
          <MenuScreen />
        ) : (
          <GameScreen />
        )}
      </Stack>
    </AppContext.Provider>
  );
}

export default App;
