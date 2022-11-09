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
import { useNavigate } from "react-router-dom";
import { routes } from "../routes";

interface Props {
  template: TemplateT;
}

export default function Template({ template }: Props) {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleClick = () => {
    dispatch(templatesActions.setCurrentTemplate(template.id));
    navigate(routes.templateContent.path(template.id));
  };

  // TODO: calculation reports
  // TODO: Mathjax
  return (
    <Card
      sx={{
        display: "flex",
        maxWidth: "30rem",
        minWidth: "20rem",
      }}
    >
      <CardActionArea onClick={handleClick}>
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
            additionalMessage="Deleting this template will also delete all calculations that use this template."
          />
        </Stack>
      </CardActions>
    </Card>
  );
}
