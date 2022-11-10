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
import { routes, RouteT } from "../routes";
import { Link } from "react-router-dom";
import styled from "@emotion/styled";
import { useAppSelector } from "../hooks";
import { isUserLoggedIn } from "../reduxSlices/auth";
import NavBarUser from "./NavBarUser";
import { getCurrentTemplateId } from "../reduxSlices/template";
import { getCalculationRunResults } from "../reduxSlices/calculation";

// TODO: show current Nav Link
const NavBarLink = styled(Link)({
  textDecoration: "none",
});

const shouldDisplay = (
  route: RouteT,
  isLoggedIn: boolean,
  isTemplateSelected: boolean,
  isCalcRunReceived: boolean
): boolean => {
  if (route.requireLogin && !isLoggedIn) return false;
  if (route.onlyLoggedOut && isLoggedIn) return false;
  if (route.requireSelectedTemplate && !isTemplateSelected) return false;
  if (route.requireCalcRunResults && !isCalcRunReceived) return false;
  return true;
};

const getPath = (route: RouteT, calcId?: number, templateId?: number | null) => {
  switch (route.appendIdType) {
    case "calculation":
      return route.path(calcId);
    case "template":
      return route.path(templateId !== null ? templateId : undefined);
    default:
      return route.path();
  }
};

// adapted from https://mui.com/material-ui/react-app-bar/
export default function NavBar() {
  const isLoggedIn = useAppSelector(isUserLoggedIn);
  const currentTemplateId = useAppSelector(getCurrentTemplateId);
  const currentCalcRun = useAppSelector(getCalculationRunResults);
  const isTemplateSelected = currentTemplateId != null;
  const isCalcRunReceived = currentCalcRun != null;

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
              {Object.values(routes)
                .filter((route) =>
                  shouldDisplay(route, isLoggedIn, isTemplateSelected, isCalcRunReceived)
                )
                .map((route) => (
                  <MenuItem key={"menu-item-" + route.path()} onClick={handleCloseIconMenu}>
                    <Typography textAlign="center">
                      <NavBarLink to={getPath(route, currentCalcRun?.id, currentTemplateId)}>
                        {route.display}
                      </NavBarLink>
                    </Typography>
                  </MenuItem>
                ))}
            </Menu>
          </Box>

          <Box sx={{ flexGrow: 1, display: { xs: "none", sm: "flex" } }}>
            {Object.values(routes)
              .filter((route) =>
                shouldDisplay(route, isLoggedIn, isTemplateSelected, isCalcRunReceived)
              )
              .map((route) => (
                <NavBarLink
                  key={"menu-link-" + route.path()}
                  to={getPath(route, currentCalcRun?.id, currentTemplateId)}
                >
                  <Button
                    onClick={handleCloseIconMenu}
                    sx={{ my: 2, color: "white", display: "block", fontWeight: "bold" }}
                  >
                    {route.display}
                  </Button>
                </NavBarLink>
              ))}
          </Box>
          <Box sx={{ flexGrow: 0 }}>
            <NavBarUser />
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
