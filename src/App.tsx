import React, { useState } from "react";
import { Stack } from "@mui/material";

import GameScreen from "./GameScreen";
import Header from "./Header";
import MenuScreen from "./MenuScreen";

enum AppScreen {
  menu = "Menu",
  game = "Game",
}

function App() {
  const [screen, setScreen] = useState<AppScreen>(AppScreen.menu);

  const onRestart = () => {};

  const onBackToMenu = () => {};

  return (
    <Stack>
      <Header
        onRestart={onRestart}
        onBackToMenu={onBackToMenu}
        screenTitle={screen}
        hideControlButtons={screen === AppScreen.menu}
      />

      {screen === AppScreen.menu ? <MenuScreen /> : <GameScreen />}
    </Stack>
  );
}

export default App;
