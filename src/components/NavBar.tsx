import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import { routes, RouteT } from "../routes";
import { Link, NavLink, useLocation } from "react-router-dom";
import styled from "@emotion/styled";
import { useAppSelector } from "../hooks";
import { isUserLoggedIn } from "../reduxSlices/auth";
import NavBarUser from "./NavBarUser";
import { getCurrentTemplateId } from "../reduxSlices/template";
import { getCalculationRunResults } from "../reduxSlices/calculation";
import { GLOBAL_THEME } from "../App";

interface StyledNavProps {
  fullWidth: boolean;
}

const NavBarLink = styled(NavLink)<StyledNavProps>(({ theme, fullWidth }) => ({
  textDecoration: "none",
  width: fullWidth ? "100%" : "auto",
}));

const NavBarHref = styled("a")<StyledNavProps>(({ theme, fullWidth }) => ({
  textDecoration: "none",
  width: fullWidth ? "100%" : "auto",
}));

const MakeNaveLink = (
  route: RouteT,
  currentPath: string,
  handleCloseIconMenu: () => void,
  dropMenu: boolean,
  calcId?: number,
  templateId?: number | null
) =>
  route.external ? (
    <NavBarHref href={route.path()} target="_blank" rel="noopener noreferrer" fullWidth={dropMenu}>
      {NavButton(route, currentPath, false, handleCloseIconMenu, dropMenu)}
    </NavBarHref>
  ) : (
    <NavBarLink
      key={"menu-link-" + route.path()}
      to={getPath(route, calcId, templateId)}
      fullWidth={dropMenu}
    >
      {({ isActive }) => NavButton(route, currentPath, isActive, handleCloseIconMenu, dropMenu)}
    </NavBarLink>
  );

const NavButton = (
  route: RouteT,
  currentPath: string,
  isActive: boolean,
  handleCloseIconMenu: () => void,
  dropMenu?: boolean
) => (
  <Button
    onClick={handleCloseIconMenu}
    fullWidth={dropMenu}
    sx={{
      my: 2,
      color:
        isActive && (route.path() !== "/" || currentPath === "/")
          ? GLOBAL_THEME.palette.secondary.main
          : dropMenu
          ? GLOBAL_THEME.palette.primary.main
          : "white",
      display: "block",
      fontWeight: "bold",
      margin: dropMenu ? "0" : "0.5rem",
      textAlign: dropMenu ? "left" : "center",
    }}
  >
    {route.display}
  </Button>
);

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
  const currentPath = useLocation().pathname;

  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);

  const handleOpenIconMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseIconMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <AppBar position="static">
      <Toolbar disableGutters>
        <Box
          sx={{
            display: { xs: "none", lg: "flex" },
            backgroundColor: "white",
            marginInlineEnd: "1rem",
            height: "3.5rem",
          }}
        >
          <Link to={routes.home.path()}>
            <img src="/efficalc.png" alt="Efficalc Logo" className="main-logo"></img>
          </Link>
        </Box>

        <Box sx={{ flexGrow: 1, display: { xs: "flex", lg: "none" } }}>
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
              display: { xs: "block", lg: "none" },
            }}
          >
            {Object.values(routes)
              .filter((route) =>
                shouldDisplay(route, isLoggedIn, isTemplateSelected, isCalcRunReceived)
              )
              .map((route) => (
                <MenuItem
                  key={"menu-item-" + route.path()}
                  onClick={handleCloseIconMenu}
                  sx={{ padding: "0px" }}
                >
                  {MakeNaveLink(
                    route,
                    currentPath,
                    handleCloseIconMenu,
                    true,
                    currentCalcRun?.id,
                    currentTemplateId
                  )}
                </MenuItem>
              ))}
          </Menu>
        </Box>

        <Box
          sx={{
            display: { xs: "flex", lg: "none" },
            height: "3rem",
            backgroundColor: "transparent",
          }}
        >
          <Link to={routes.home.path()}>
            <img src="/efficalc.png" alt="Efficalc Logo" className="main-logo"></img>
          </Link>
        </Box>
        <Box
          sx={{
            flexGrow: 1,
            display: { xs: "flex", lg: "none" },
          }}
        ></Box>

        <Box sx={{ flexGrow: 1, display: { xs: "none", lg: "flex" } }}>
          {Object.values(routes)
            .filter((route) =>
              shouldDisplay(route, isLoggedIn, isTemplateSelected, isCalcRunReceived)
            )
            .map((route) =>
              MakeNaveLink(
                route,
                currentPath,
                handleCloseIconMenu,
                false,
                currentCalcRun?.id,
                currentTemplateId
              )
            )}
        </Box>
        <Box sx={{ flexGrow: 0, textAlign: "right" }}>
          <NavBarUser />
        </Box>
      </Toolbar>
    </AppBar>
  );
}
