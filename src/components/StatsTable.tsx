import {
  AppBar,
  Box,
  Button,
  Container,
  IconButton,
  Link,
  Menu,
  MenuItem,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";

export function createData(map: string, number_of_occurences: number) {
  return { map, number_of_occurences };
}

const rows = [
  // some function for row in loaded data createData
  createData("XX;O-", 5),
  createData("XXX;OXO;OO-", 1),
];

export default function StatsTable() {
  return (
    <TableContainer component={Paper}>
      <Table size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell>Map</TableCell>
            <TableCell align="right">Number of occurences</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.map}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.map}
              </TableCell>
              <TableCell align="right">{row.number_of_occurences}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
