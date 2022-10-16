import React from "react";
import { useAppDispatch } from "../hooks";
import { projectsActions } from "../reduxSlices/projects";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Button, CardActionArea, CardActions } from "@mui/material";
import TemplateT from "../commonTypes/TemplateT";
import DeleteAlert from "./DeleteAlert";
import { templatesActions } from "../reduxSlices/template";

interface Props {
  template: TemplateT;
}

export default function Template({ template }: Props) {
  const dispatch = useAppDispatch();
  const [openDeleteAlert, setOpenDeleteAlert] = React.useState(false);

  const handleClickOpen = () => {
    setOpenDeleteAlert(true);
  };

  const handleConfirmDelete = () => {
    dispatch(templatesActions.deleteAndGetTemplate(template.id));
    handleClose();
  };

  const handleClose = () => {
    setOpenDeleteAlert(false);
  };

  // TODO: edit template info with button; Download/display
  return (
    <Card
      sx={{
        display: "flex",
        maxWidth: "30rem",
        minWidth: "20rem",
      }}
    >
      <CardActionArea onClick={() => {}}>
        <CardContent>
          <Typography variant="h6">{template.name}</Typography>
          <Typography variant="body2" color="text.secondary">
            {template.description}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <DeleteAlert
          open={openDeleteAlert}
          objectType="template"
          objectName={template.name}
          onConfirmDelete={handleConfirmDelete}
          handleClose={handleClose}
        />
        <Button color="primary" onClick={handleClickOpen} sx={{ height: "100%" }}>
          Delete
        </Button>
      </CardActions>
    </Card>
  );
}
