import { useCallback, useEffect } from "react";
import { useAppSelector, useAppDispatch } from "../../hooks";
import { getErrorMessage, getErrorStatus, errorsActions } from "../../reduxSlices/errors";
import _ from "lodash";

// clears errors after time so that new errors will alert users
export default function ErrorManager() {
  const dispatch = useAppDispatch();
  const errorMessage = useAppSelector(getErrorMessage);
  const errorStatus = useAppSelector(getErrorStatus);

  const clearError = useCallback(
    _.debounce(() => {
      dispatch(errorsActions.clearError());
    }, 7000),
    []
  );

  useEffect(() => {
    if (errorStatus || errorMessage) {
      clearError();
    }
  }, [errorMessage, errorStatus, clearError]);

  useEffect(() => {
    console.log("changed");
  }, [clearError]);

  return <></>;
}
