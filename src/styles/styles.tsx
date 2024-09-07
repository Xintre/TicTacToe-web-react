import Colors from "./colors";
import { MaterialDesignContent } from "notistack";
import { styled } from "@mui/material";

export const SnackbarStyledMaterialDesignContent = styled(
  MaterialDesignContent
)(() => ({
  "&.notistack-MuiContent-success": {
    backgroundColor: Colors.LIGHT_BLUE,
    fontFamily: "Helvetica",
  },
  "&.notistack-MuiContent-info": {
    backgroundColor: Colors.LIGHT_BLUE,
    fontFamily: "Helvetica",
  },
}));
