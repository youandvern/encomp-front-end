import { useCallback, useEffect } from "react";
import { useAppSelector, useAppDispatch } from "../hooks";
import { getErrorMessage, getErrorStatus, errorsActions } from "../reduxSlices/errors";
import { authActions, isUserLoggedIn } from "../reduxSlices/auth";
import _ from "lodash";
import { useLocation, useNavigate } from "react-router-dom";
import { routes } from "../routes";

// clears errors after time so that new errors will alert users
export default function ErrorManager() {
  const dispatch = useAppDispatch();
  const errorMessage = useAppSelector(getErrorMessage);
  const errorStatus = useAppSelector(getErrorStatus);
  const userLoggedIn = useAppSelector(isUserLoggedIn);
  const navigate = useNavigate();
  const location = useLocation();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const clearError = useCallback(
    _.debounce(() => {
      dispatch(errorsActions.clearError());
    }, 7000),
    []
  );

  // when app loads, check if user logged in
  useEffect(() => {
    dispatch(authActions.fetchUser());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // navigate to login page when logged out
  useEffect(() => {
    if (userLoggedIn === false) {
      // Avoid navigating to login page when new user visits home page or register page
      if (
        location.pathname !== routes.home.path() &&
        location.pathname !== routes.register.path()
      ) {
        navigate(routes.login.path());
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userLoggedIn]);

  useEffect(() => {
    if (errorStatus || errorMessage) {
      clearError();
    }
  }, [errorMessage, errorStatus, clearError]);

  return <></>;
}
