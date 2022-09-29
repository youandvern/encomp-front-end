import { useCallback, useEffect } from "react";
import { useAppSelector, useAppDispatch } from "../hooks";
import { getErrorMessage, getErrorStatus, errorsActions } from "../reduxSlices/errors";
import { isUserLoggedIn } from "../reduxSlices/auth";
import _ from "lodash";
import { useNavigate } from "react-router-dom";

// clears errors after time so that new errors will alert users
export default function ErrorManager() {
  const dispatch = useAppDispatch();
  const errorMessage = useAppSelector(getErrorMessage);
  const errorStatus = useAppSelector(getErrorStatus);
  const userLoggedIn = useAppSelector(isUserLoggedIn);
  const navigate = useNavigate();

  const clearError = useCallback(
    _.debounce(() => {
      dispatch(errorsActions.clearError());
    }, 7000),
    []
  );

  // navigate home if logged out
  useEffect(() => {
    if (userLoggedIn === false) {
      navigate("/");
    }
  }, [userLoggedIn]);

  useEffect(() => {
    if (errorStatus || errorMessage) {
      clearError();
    }
  }, [errorMessage, errorStatus, clearError]);

  return <></>;
}
