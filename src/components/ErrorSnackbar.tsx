import { SyntheticEvent } from "react";
import { Alert, Snackbar } from "@mui/material";
import { useAppSelector, useAppDispatch } from "../hooks";
import { getErrorMessage, getErrorStatus, errorsActions } from "../reduxSlices/errors";

// listens for new errors to display in an alert snackbar
export default function ErrorSnackbar() {
  const dispatch = useAppDispatch();
  const errorMessage = useAppSelector(getErrorMessage);
  const errorStatus = useAppSelector(getErrorStatus);

  const showMessage = errorStatus && errorMessage ? true : false;

  const handleClose = (event?: SyntheticEvent | Event, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }

    dispatch(errorsActions.clearError());
  };

  return (
    <>
      <Snackbar
        open={showMessage}
        onClose={handleClose}
        anchorOrigin={{ horizontal: "center", vertical: "bottom" }}
      >
        <Alert severity="error" onClose={handleClose} sx={{ width: "100%" }}>
          {errorMessage}
        </Alert>
      </Snackbar>
    </>
  );
}
