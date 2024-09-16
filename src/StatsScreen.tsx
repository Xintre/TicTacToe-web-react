import { Container, Divider, Typography } from "@mui/material";

import Colors from "./styles/colors";
import StatsTable from "./components/StatsTable";

export default function StatsScreen() {
  return (
    <Container
      maxWidth="sm"
      style={{
        padding: "1rem 0 0 0.5rem",
        display: "flex",
        justifyContent: "flex-start",
        alignItems: "center",
        gap: "0.2rem",
        height: "100%",
        flexDirection: "column",
      }}
    >
      <Container>
        <Divider variant="middle">
          <Typography variant="h6" fontSize={14} fontWeight={100}>
            Table of statistics
          </Typography>
        </Divider>
      </Container>
      <Container>
        <StatsTable />
      </Container>
      <Container
        style={{
          paddingLeft: 20,
          position: "fixed",
          bottom: 80,
        }}
      >
        <Divider variant="middle">
          <Typography variant="h6" fontSize={14} fontWeight={100}>
            Stats
          </Typography>
        </Divider>
        <Typography variant="h6" fontWeight={300}>
          Number of&nbsp;
          <span style={{ fontWeight: "bold", color: Colors.GRAY }}>wins</span>:
        </Typography>
        <Typography variant="h6" fontWeight={300}>
          Number of&nbsp;
          <span style={{ fontWeight: "bold", color: Colors.GRAY }}>draws</span>:
        </Typography>
      </Container>
    </Container>
  );
}
