import { Dialog, DialogTitle, DialogContent, DialogContentText, IconButton } from "@mui/material";
import { useState } from "react";
import { CreateFormProps } from "../commonTypes/FormProps";

interface Props {
  ButtonComponent: JSX.Element;
  FormComponent: ({ onSubmit }: CreateFormProps) => JSX.Element;
}

export default function FormDialog({ ButtonComponent, FormComponent }: Props) {
  const [openAlert, setOpenAlert] = useState(false);

  const handleClickOpen = () => {
    setOpenAlert(true);
  };

  const handleClose = () => {
    setOpenAlert(false);
  };

  return (
    <>
      <Dialog
        open={openAlert}
        onClose={handleClose}
        aria-label="form-dialog"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent children={<FormComponent onSubmit={handleClose} />} />
      </Dialog>
      <IconButton onClick={handleClickOpen}>{ButtonComponent}</IconButton>
    </>
  );
}
