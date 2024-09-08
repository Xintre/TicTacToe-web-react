import {
  Button,
  Container,
  IconButton,
  InputAdornment,
  TextField,
} from "@mui/material";

export default function StatsScreen() {
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
      <Button
        size="large"
        variant="contained"
        color="primary"
        // disabled={isMapSizeInvalid}
        onClick={() => {}}
      >
        STAAAATS
      </Button>
    </Container>
  );
}
