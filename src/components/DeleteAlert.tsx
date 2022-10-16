import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  Typography,
} from "@mui/material";

interface Props {
  open: boolean;
  objectType: string;
  objectName: string;
  onConfirmDelete: React.MouseEventHandler<HTMLButtonElement>;
  handleClose?: React.MouseEventHandler<HTMLButtonElement>;
}

export default function DeleteAlert({
  open,
  onConfirmDelete,
  objectName,
  objectType,
  handleClose,
}: Props) {
  return (
    <>
      <Dialog
        open={open}
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
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button variant="outlined" color="warning" onClick={onConfirmDelete} autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
