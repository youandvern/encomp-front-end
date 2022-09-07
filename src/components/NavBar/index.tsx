import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import { routes } from "../../routes";
import { Link } from "react-router-dom";
import styled from "@emotion/styled";

const NavBarLink = styled(Link)({
  textDecoration: "none",
});

// adapted from https://mui.com/material-ui/react-app-bar/
export default function NavBar() {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);

  const handleOpenIconMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseIconMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box sx={{ flexGrow: 1, display: { xs: "flex", sm: "none" } }}>
            <IconButton
              size="large"
              aria-label="site menu options"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenIconMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "center",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseIconMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {Object.values(routes).map((route) => (
                <MenuItem key={route.path} onClick={handleCloseIconMenu}>
                  <Typography textAlign="center">
                    <NavBarLink to={route.path}>{route.display}</NavBarLink>
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          <Box sx={{ flexGrow: 1, display: { xs: "none", sm: "flex" } }}>
            {Object.values(routes).map((route) => (
              <NavBarLink to={route.path}>
                <Button
                  key={route.path}
                  onClick={handleCloseIconMenu}
                  sx={{ my: 2, color: "white", display: "block", fontWeight: "bold" }}
                >
                  {route.display}
                </Button>
              </NavBarLink>
            ))}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
