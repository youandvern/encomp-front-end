import React from "react";
import ProjectT from "../commonTypes/ProjectT";
import { useAppDispatch, useAppSelector } from "../hooks";
import { getCurrentProjectId, projectsActions } from "../reduxSlices/projects";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { CardActionArea, CardActions, Stack } from "@mui/material";
import DeleteAlertButton from "./DeleteAlertButton";
import UpdateFormButton from "./UpdateFormButton";

interface Props {
  project: ProjectT;
}

export default function Project({ project }: Props) {
  const projectSelected = useAppSelector(getCurrentProjectId) === project.id;
  const dispatch = useAppDispatch();

  return (
    <Card
      sx={{
        display: "flex",
        maxWidth: "30rem",
        backgroundColor: projectSelected ? "secondary.light" : undefined,
        marginRight: projectSelected ? undefined : "1rem",
        marginTop: "1rem",
      }}
    >
      <CardActionArea onClick={() => dispatch(projectsActions.setCurrentProject(project.id))}>
        <CardContent>
          <Typography variant="h6">{project.name}</Typography>
          <Typography variant="body2" color="text.secondary">
            {project.description}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Stack direction="row">
          <UpdateFormButton formTitle="Edit project information" project={project} />
          <DeleteAlertButton
            objectType="project"
            objectName={project.name}
            onConfirmDelete={() => {
              dispatch(projectsActions.deleteAndGetProject(project.id));
            }}
            additionalMessage="Deleting a project will also delete any calculations associated with it."
          />
        </Stack>
      </CardActions>
    </Card>
  );
}
