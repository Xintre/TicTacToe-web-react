import {
  Button,
  Container,
  IconButton,
  InputAdornment,
  TextField,
} from "@mui/material";
import { Clear } from "@mui/icons-material";
import { useContext, useEffect, useMemo, useState } from "react";

import { AppContext } from "./context/AppContext";
import { AppScreen } from "./types/AppScreen";

export type MenuScreenProps = {};

export default function MenuScreen({}: MenuScreenProps) {
  const { mapSize, setMapSize } = useContext(AppContext);

  const [mapSizeInputBuffer, setMapSizeInputBuffer] = useState(() =>
    Number.isNaN(mapSize) ? "" : mapSize.toString()
  );

  const { setScreen } = useContext(AppContext);

  // const mapSize = useMemo(
  //   () =>
  //     mapSizeInputBuffer.includes(".") || mapSizeInputBuffer.includes(",")
  //       ? NaN
  //       : Number(mapSizeInputBuffer),
  //   [mapSizeInputBuffer]
  // );

  // this effect has a one and only responsibility: to update mapSize in AppContext whenever the input buffer changes its text value
  useEffect(() => {
    setMapSize(
      mapSizeInputBuffer.includes(".") || mapSizeInputBuffer.includes(",")
        ? NaN
        : Number(mapSizeInputBuffer)
    );
  }, [mapSizeInputBuffer]);

  const isMapSizeInvalid = useMemo(
    () =>
      Number.isNaN(mapSize) || // only valid numbers
      mapSize < 2 || // only map sizes >=2x2 make sense
      /[,.]/.test(mapSizeInputBuffer), // decimals are valid numbers, but make no sense here - we want integers
    // mapSizeInputBuffer.includes(".") ||
    // mapSizeInputBuffer.includes(","),
    [mapSizeInputBuffer, mapSize]
  );

  return (
    <Container
      maxWidth="sm"
      style={{
        padding: "2rem 0",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        gap: "2rem",
        height: "100%",
        flexDirection: "column",
      }}
    >
      <TextField
        error={isMapSizeInvalid}
        label="Map Size"
        variant="outlined"
        helperText={
          isMapSizeInvalid
            ? Number.isNaN(mapSize)
              ? "Map size must be a valid integer"
              : "Map size must be >= 2"
            : null
        }
        type="number"
        onChange={(event) => {
          let newValue = event.target.value;

          setMapSizeInputBuffer(newValue);
        }}
        value={mapSizeInputBuffer}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                onClick={() => {
                  setMapSizeInputBuffer("");
                }}
                disabled={mapSizeInputBuffer.length === 0}
              >
                <Clear />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />

      <Button
        size="large"
        variant="contained"
        disabled={isMapSizeInvalid}
        onClick={() => {
          setScreen(AppScreen.game);
        }}
        style={{
          height: "min-content",
        }}
      >
        Play! 🎲
      </Button>
    </Container>
  );
}
