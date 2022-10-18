import { Dialog, DialogTitle, DialogContent, DialogContentText, IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { useState } from "react";
import { CalculationForProjectT } from "../commonTypes/CalculationT";
import ProjectT from "../commonTypes/ProjectT";
import TemplateT from "../commonTypes/TemplateT";
import UpdateTemplateForm from "./Forms/UpdateTemplateForm";
import UpdateCalculationForm from "./Forms/UpdateCalculationForm";
import UpdateProjectForm from "./Forms/UpdateProjectForm";

// export type formTypes = "calculation" | "project" | "template";

interface Props {
  // formType: formTypes;
  formTitle: string;
  calculation?: CalculationForProjectT;
  project?: ProjectT;
  template?: TemplateT;
  // onConfirmDelete: () => void;
  additionalMessage?: string;
}

export default function UpdateFormButton({
  formTitle,
  additionalMessage,
  calculation,
  project,
  template,
}: Props) {
  const [openDeleteAlert, setOpenDeleteAlert] = useState(false);

  const handleClickOpen = () => {
    setOpenDeleteAlert(true);
  };

  const handleConfirmDelete = () => {
    // onConfirmDelete();
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
        <DialogTitle id="alert-dialog-title">{formTitle}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">{additionalMessage}</DialogContentText>
          <br />
          {calculation && <UpdateCalculationForm calculation={calculation} onClose={handleClose} />}
          {project && <UpdateProjectForm project={project} onClose={handleClose} />}
          {template && <UpdateTemplateForm template={template} onClose={handleClose} />}
        </DialogContent>
      </Dialog>
      <IconButton onClick={handleClickOpen}>
        <EditIcon />
      </IconButton>
    </>
  );
}
