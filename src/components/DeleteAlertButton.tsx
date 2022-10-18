import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  IconButton,
  Typography,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useState } from "react";

interface Props {
  objectType: string;
  objectName: string;
  onConfirmDelete: () => void;
  additionalMessage?: string;
}

export default function DeleteAlertButton({
  onConfirmDelete,
  objectName,
  objectType,
  additionalMessage,
}: Props) {
  const [openDeleteAlert, setOpenDeleteAlert] = useState(false);

  const handleClickOpen = () => {
    setOpenDeleteAlert(true);
  };

  const handleConfirmDelete = () => {
    onConfirmDelete();
    handleClose();
  };

  const handleClose = () => {
    setOpenDeleteAlert(false);
  };

  return (
    <>
      <Dialog
        open={openDeleteAlert}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {`Delete ${objectType} `}
          <Typography component="span" variant="inherit" color="primary.main">
            {objectName}
          </Typography>
          {"?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Deleting this {objectType} cannot be undone.
            {additionalMessage && " " + additionalMessage}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button variant="outlined" color="warning" onClick={handleConfirmDelete} autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
      <IconButton onClick={handleClickOpen}>
        <DeleteIcon />
      </IconButton>
    </>
  );
}
