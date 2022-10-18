import React from "react";
import { useAppDispatch } from "../hooks";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { CardActionArea, CardActions, Stack } from "@mui/material";
import TemplateT from "../commonTypes/TemplateT";
import DeleteAlertButton from "./DeleteAlertButton";
import { templatesActions } from "../reduxSlices/template";
import UpdateFormButton from "./UpdateFormButton";

interface Props {
  template: TemplateT;
}

export default function Template({ template }: Props) {
  const dispatch = useAppDispatch();

  // TODO: Download/display template file data
  // TODO: choose template when creating project
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
        <Stack direction="row">
          <UpdateFormButton formTitle="Edit template information" template={template} />
          <DeleteAlertButton
            objectType="template"
            objectName={template.name}
            onConfirmDelete={() => {
              dispatch(templatesActions.deleteAndGetTemplate(template.id));
            }}
          />
        </Stack>
      </CardActions>
    </Card>
  );
}
