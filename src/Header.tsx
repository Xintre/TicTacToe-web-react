import MenuIcon from "@mui/icons-material/Menu";
import React, { useContext, useState } from "react";
import {
  AppBar,
  Box,
  Button,
  Container,
  IconButton,
  Link,
  Menu,
  MenuItem,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import { Refresh, Settings } from "@mui/icons-material";

import icLauncher from "./img/ic_launcher.png";
import { AppContext } from "./context/AppContext";
import { AppScreen } from "./types/AppScreen";

const pages: {
  text: string;
  href: string;
}[] = [
  { text: "Github", href: "https://github.com/xintre" },
  { text: "My website", href: "https://nataliarozga.me" },
];

export type HeaderProps = {
  screenTitle: string;
  hideControlButtons: boolean;
};

export default function Header({
  screenTitle,
  hideControlButtons,
}: HeaderProps) {
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);

  const { setScreen, onRestartGameListener } = useContext(AppContext);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar
          disableGutters
          style={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          {/* mobile nav */}
          <Box sx={{ display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>

            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {pages.map((page, index) => (
                <MenuItem key={index} onClick={handleCloseNavMenu}>
                  <Link textAlign="center" href={page.href} target="_blank">
                    {page.text}
                  </Link>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          {/* nav center block: website branding */}
          <img
            src={icLauncher}
            alt="TTT Logo"
            style={{
              height: "70px",
              paddingTop: "5px",
              paddingBottom: "5px",
            }}
          />
          <Typography variant="h6">
            <b>Natalia's TicTacToe (React ⚛️)</b>&nbsp;&nbsp;|&nbsp;&nbsp;
            <em>{screenTitle}</em>
          </Typography>

          {/* game control buttons */}
          {!hideControlButtons && (
            <div>
              <Tooltip arrow title="Settings menu">
                <IconButton
                  size="large"
                  onClick={() => {
                    setScreen(AppScreen.menu);
                  }}
                  color="inherit"
                >
                  <Settings />
                </IconButton>
              </Tooltip>

              <Tooltip arrow title="Restart game">
                <IconButton
                  size="large"
                  onClick={() => onRestartGameListener?.()}
                  color="inherit"
                >
                  <Refresh />
                </IconButton>
              </Tooltip>
            </div>
          )}

          {/* desktop nav */}
          <Box sx={{ display: { xs: "none", md: "flex" } }}>
            {pages.map((page) => (
              <Button
                key={page.href}
                sx={{ my: 2, color: "white", display: "block" }}
                href={page.href}
                target="_blank"
              >
                {page.text}
              </Button>
            ))}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
