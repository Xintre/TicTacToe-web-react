import _ from "lodash";
import { ButtonBase } from "@mui/material";
import { Container } from "@mui/system";
import { Map, Set } from "immutable";
import { useCallback, useContext, useEffect, useMemo, useState } from "react";
import { useMeasure } from "@uidotdev/usehooks";
import { useSnackbar } from "notistack";

import { AppContext } from "./context/AppContext";

enum UserTurn {
  A,
  B,
}

enum CellState {
  o = "⭕",
  x = "❌",
  empty = "",
}

type MapRow = Array<CellState>;

type MapState = Array<MapRow>;

type CellIndex = Map<"row" | "col", number>;

export default function GameScreen() {
  const { mapSize, setOnRestartGameListener } = useContext(AppContext);
  const { enqueueSnackbar } = useSnackbar();

  const [userTurn, setUserTurn] = useState(UserTurn.A);
  const [mapState, setMapState] = useState<MapState>([]);
  const [easterEggMode, setEasterEggMode] = useState<boolean>(false);
  const [allWinningIndices, setAllWinningIndices] = useState<Set<CellIndex>>(
    Set<CellIndex>()
  );
  const [wasMapInitialized, setWasMapInitialized] = useState(false);

  const [
    gameContainerRef,
    { width: gameContainerWidth, height: gameContainerHeight },
  ] = useMeasure();

  const cellWidth = useMemo(
    () =>
      Math.max(
        0,
        Math.min(gameContainerWidth ?? 0, gameContainerHeight ?? 0) / mapSize -
          20
      ),
    [gameContainerWidth, gameContainerHeight, mapSize]
  );

  const finishGameIfApplicable = useCallback(
    (mapState: MapState) => {
      let allWinningIndices = Set<CellIndex>(); // note: there may even be an edge case when two different conditions win at once!
      console.log("fga: ", mapState);
      // check if any row is complete
      let anyRowComplete = false;
      for (let rowIndex = 0; rowIndex < mapSize; rowIndex++) {
        let winningRowIndices = Set<CellIndex>();
        let areAllColumnsInThisRowEqual = true;

        // the first cell
        let referenceCell = mapState[rowIndex][0];
        // columnLoop@
        for (let colIndex = 0; colIndex < mapSize; colIndex++) {
          let cell = mapState[rowIndex][colIndex];
          if (cell !== referenceCell || cell === "") {
            areAllColumnsInThisRowEqual = false;
            winningRowIndices.clear();
            break;
          } else {
            winningRowIndices = winningRowIndices.add(
              Map({ row: rowIndex, col: colIndex })
            );
          }
        }

        if (areAllColumnsInThisRowEqual) {
          anyRowComplete = true;
          allWinningIndices = allWinningIndices.union(winningRowIndices);
          break;
        }
      }

      // check if any column is complete
      let anyColumnComplete = false;
      // columnLoop@
      for (let colIndex = 0; colIndex < mapSize; colIndex++) {
        let winningColIndices = Set<CellIndex>();
        let areAllRowsInThisColumnEqual = true;

        // the first cell
        let referenceCell = mapState[0][colIndex];

        // rowLoop@
        for (let rowIndex = 0; rowIndex < mapSize; rowIndex++) {
          let cell = mapState[rowIndex][colIndex];
          if (cell !== referenceCell || cell === "") {
            areAllRowsInThisColumnEqual = false;
            winningColIndices.clear();
            break;
          } else {
            winningColIndices = winningColIndices.add(
              Map({ row: rowIndex, col: colIndex })
            );
          }
        }

        if (areAllRowsInThisColumnEqual) {
          anyColumnComplete = true;
          allWinningIndices = allWinningIndices.union(winningColIndices);
        }
      }

      // check if any diagonal is complete
      let leftDiagonalComplete = true;
      let winningDiagLIndices = Set<CellIndex>();

      for (let i = 0; i < mapSize; i++) {
        let cell = mapState[i][i];
        if (cell !== mapState[0][0] || cell === "") {
          leftDiagonalComplete = false;
          winningDiagLIndices.clear();
          break;
        } else {
          winningDiagLIndices = winningDiagLIndices.add(
            Map({ row: i, col: i })
          );
        }
      }

      if (leftDiagonalComplete) {
        allWinningIndices = allWinningIndices.union(winningDiagLIndices);
      }

      let rightDiagonalComplete = true;
      let winningDiagRIndices = Set<CellIndex>();
      let rightDiagRowIndicesToLoop = _.range(0, mapSize);
      let rightDiagColIndicesToLoop = _.range(0, mapSize).reverse();

      for (let i of rightDiagRowIndicesToLoop) {
        let rowIndex = rightDiagRowIndicesToLoop[i];
        let colIndex = rightDiagColIndicesToLoop[i];
        // the first cell
        let referenceCell = mapState[0][mapSize - 1];

        let cell = mapState[rowIndex][colIndex];
        if (cell !== referenceCell || cell === "") {
          rightDiagonalComplete = false;
          winningDiagRIndices.clear();
          break;
        } else {
          winningDiagRIndices = winningDiagRIndices.add(
            Map({ row: rowIndex, col: colIndex })
          );
        }
      }
      if (rightDiagonalComplete) {
        allWinningIndices = allWinningIndices.union(winningDiagRIndices);
      }

      // check if we have a winner or the game is over with a draw
      if (
        anyRowComplete ||
        anyColumnComplete ||
        leftDiagonalComplete ||
        rightDiagonalComplete
      ) {
        let someWinningIndices = allWinningIndices.first()!;

        let row = someWinningIndices.get("row")!;
        let col = someWinningIndices.get("col")!;
        let gameWinner = mapState[row][col];

        navigator.vibrate(200);
        setTimeout(() => {
          navigator.vibrate(350);

          setTimeout(() => {
            navigator.vibrate(200);
          }, 200);
        }, 400);

        console.log(`Winning indices: ${allWinningIndices}`);
        enqueueSnackbar({
          message: `Game finished - ${gameWinner}'s won!`,
          autoHideDuration: 8000,
        });
      } else {
        let allCellsFilled = mapState.flat().every((cell) => cell !== "");

        if (allCellsFilled) {
          window.navigator.vibrate(700);

          setEasterEggMode(true);

          enqueueSnackbar({
            message: "Game finished - it's a draw!",
          });

          allWinningIndices = Set<CellIndex>();
        }
      }

      setAllWinningIndices(allWinningIndices);
    },
    [mapSize, enqueueSnackbar]
  );

  const prepareMap = useCallback(
    (bInitializeMapState: boolean) => {
      let newMapState = mapState;
      console.log(
        `${
          bInitializeMapState
            ? "Initializing an empty map"
            : "Resizing map to one"
        } of size ${mapSize}`
      );

      if (bInitializeMapState) {
        newMapState = [];
        setUserTurn(UserTurn.A);
        setEasterEggMode(false);
        setAllWinningIndices(Set<CellIndex>());

        for (let r = 0; r < mapSize; r++) {
          let rowArr = [];

          for (let c = 0; c < mapSize; c++) {
            rowArr.push(CellState.empty);
          }

          newMapState.push(rowArr);
        }
      }

      setMapState(newMapState);
    },
    [mapSize, mapState]
  );

  console.log("Rendering with map state", mapState);

  // map initialization effect - will initialize the map on first render, as soon as the game container's width is received for the first time
  useEffect(() => {
    if (
      gameContainerHeight !== null &&
      gameContainerWidth !== null &&
      !wasMapInitialized
    ) {
      console.log("Initializing map...");

      prepareMap(true);
      setWasMapInitialized(true);
    }
  }, [gameContainerWidth, gameContainerHeight, prepareMap, wasMapInitialized]);

  // AppContext setOnRestartGameListener setup & cleanup effect
  useEffect(() => {
    console.log("Setting up setOnRestartGameListener");

    // setup
    setOnRestartGameListener(() => {
      setWasMapInitialized(false);
    });

    return () => {
      // cleanup
      console.log("Cleaning up setOnRestartGameListener");

      setOnRestartGameListener(undefined);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Container
      ref={gameContainerRef}
      style={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        gap: 20,
        maxHeight: "90vh",
        justifyContent: "center",
      }}
    >
      {mapState.map((row, rowIndex) => (
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            gap: "1rem",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {row.map((cellState, colIndex) => {
            const cellDisabled =
              cellState !== CellState.empty || !allWinningIndices.isEmpty();

            return (
              <ButtonBase
                key={`${rowIndex};${colIndex}`}
                style={{
                  backgroundColor: allWinningIndices.has(
                    Map({ row: rowIndex, col: colIndex })
                  )
                    ? "yellow"
                    : "lightblue",
                  width: cellWidth,
                  height: "auto",
                  aspectRatio: 1,
                  borderRadius: 45,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  fontSize: (cellWidth * 2) / 3,
                  fontWeight: 600,
                }}
                disabled={cellDisabled}
                onClick={() => {
                  // if cell is not empty, then do not do anything
                  if (cellDisabled) return;

                  const newValue =
                    userTurn === UserTurn.A ? CellState.x : CellState.o;

                  const newMapState = mapState.map((predRow, predRowIndex) =>
                    predRow.map((oldCell, predColIndex) =>
                      predRowIndex === rowIndex && predColIndex === colIndex
                        ? newValue
                        : oldCell
                    )
                  );
                  setMapState(newMapState);

                  setUserTurn(
                    userTurn === UserTurn.A ? UserTurn.B : UserTurn.A
                  );

                  finishGameIfApplicable(newMapState);
                }}
              >
                {easterEggMode ? "XD" : cellState}
              </ButtonBase>
            );
          })}
        </div>
      ))}
    </Container>
  );
}
