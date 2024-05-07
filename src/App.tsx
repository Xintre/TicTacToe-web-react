import React, { useState } from "react";
import { Fab, Stack, ThemeProvider, createTheme } from "@mui/material";
import { GitHub } from "@mui/icons-material";
import { SnackbarProvider } from "notistack";
import { deepOrange, indigo } from "@mui/material/colors";

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

  const theme = createTheme({
    palette: {
      primary: indigo,
      secondary: deepOrange,
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <SnackbarProvider>
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
            setOnRestartGameListener: (listener) => {
              setAppContextValue({
                ...appContextValue,
                onRestartGameListener: listener,
              });
            },
          }}
        >
          <Stack style={{ height: "100%" }}>
            <Header
              screenTitle={appContextValue.screen}
              hideControlButtons={appContextValue.screen === AppScreen.menu}
            />

            {appContextValue.screen === AppScreen.menu ? (
              <MenuScreen />
            ) : (
              <GameScreen />
            )}

            <Fab
              variant="extended"
              style={{
                position: "absolute",
                right: "1rem",
                bottom: "1rem",
              }}
              color="secondary"
              href="https://github.com/Xintre/tictactoe-web-react"
              target="_blank"
              rel="noopener"
            >
              <GitHub style={{ marginRight: "0.5rem" }} />
              Repository
            </Fab>
          </Stack>
        </AppContext.Provider>
      </SnackbarProvider>
    </ThemeProvider>
  );
}

export default App;
