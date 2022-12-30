import { Link } from "react-router-dom";
import styled from "@emotion/styled";
import { Button } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useAppDispatch, useAppSelector } from "../hooks";
import { isUserLoggedIn, getUser } from "../reduxSlices/auth";
import { routes } from "../routes";
import { authActions } from "../reduxSlices/auth";

const NavBarUserLink = styled(Link)({
  textDecoration: "none",
});

export default function NavBarUser() {
  const dispatch = useAppDispatch();
  const loggedIn = useAppSelector(isUserLoggedIn);
  const user = useAppSelector(getUser);
  const theme = useTheme();
  const smallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <>
      {loggedIn && user ? (
        <>
          {smallScreen ? user.email.split("@")[0] : user.email}
          {" |"}
          {
            <Button
              color="secondary"
              variant="text"
              onClick={() => {
                dispatch(authActions.logoutUser());
              }}
            >
              Logout
            </Button>
          }
        </>
      ) : (
        <NavBarUserLink to={routes.login.path()}>
          <Button color="secondary" variant="text">
            Login
          </Button>
        </NavBarUserLink>
      )}
    </>
  );
}
