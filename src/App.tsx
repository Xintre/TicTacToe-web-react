import {
  AppContext,
  AppContextType,
  defaultAppContextValue,
} from "./context/AppContext";
import { Fab, Stack, ThemeProvider, createTheme } from "@mui/material";
import React, { useState } from "react";

import { AppScreen } from "./types/AppScreen";
import Colors from "./styles/colors";
import GameScreen from "./GameScreen";
import { GitHub } from "@mui/icons-material";
import Header from "./Header";
import MenuScreen from "./MenuScreen";
import { SnackbarProvider } from "notistack";
import { SnackbarStyledMaterialDesignContent } from "./styles/styles";
import StatsScreen from "./StatsScreen";

function App() {
  const [appContextValue, setAppContextValue] = useState<AppContextType>(
    defaultAppContextValue
  );

  const theme = createTheme({
    palette: {
      primary: {
        main: Colors.LIGHT_BLUE,
      },
      secondary: {
        main: Colors.ROSE_EBONY,
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <SnackbarProvider
        Components={{
          success: SnackbarStyledMaterialDesignContent,
          info: SnackbarStyledMaterialDesignContent,
        }}
        iconVariant={{
          success: "🎉",
          info: "😏",
        }}
      >
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
              hideRestartButton={appContextValue.screen === AppScreen.stats}
            />

            {appContextValue.screen === AppScreen.menu ? (
              <MenuScreen />
            ) : appContextValue.screen === AppScreen.game ? (
              <GameScreen />
            ) : (
              <StatsScreen />
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
            <Fab
              variant="extended"
              style={{
                position: "absolute",
                left: "1rem",
                bottom: "1rem",
              }}
              color="secondary"
              onClick={() =>
                setAppContextValue({
                  ...appContextValue,
                  screen: AppScreen.stats,
                })
              }
            >
              Stats📈
            </Fab>
          </Stack>
        </AppContext.Provider>
      </SnackbarProvider>
    </ThemeProvider>
  );
}

export default App;
