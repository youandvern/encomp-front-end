import { Box, Button, Container, TextField } from "@mui/material";
import { Stack } from "@mui/system";
import React, { ChangeEvent, FormEvent, useState } from "react";
import ProjectT from "../../commonTypes/ProjectT";
import { useAppDispatch } from "../../hooks";
import { projectsActions } from "../../reduxSlices/projects";
import { templatesActions } from "../../reduxSlices/template";

interface Props {
  project: ProjectT;
  onClose?: () => void;
}

export default function UpdateProjectForm({ project, onClose }: Props) {
  const dispatch = useAppDispatch();
  const [formValues, setValues] = useState(project);

  const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setValues({ ...formValues, [name]: value });
  };

  const handleSubmit = (event: FormEvent<HTMLDivElement>) => {
    event.preventDefault();
    dispatch(projectsActions.updateAndGetProject(formValues));
    onClose && onClose();
  };

  return (
    <Box component="form" onSubmit={handleSubmit}>
      <Stack spacing={2}>
        <TextField
          required
          id="project-name"
          name="name"
          label="Project Name"
          value={formValues.name}
          onChange={handleChange}
        />
        <TextField
          multiline
          id="project-description"
          name="description"
          label="Project Description"
          value={formValues.description}
          onChange={handleChange}
          inputProps={{ maxLength: 500 }}
        />
      </Stack>
      <Stack spacing={2} direction="row" justifyContent="end" marginTop="1rem">
        <Button type="button" onClick={onClose}>
          Cancel
        </Button>
        <Button type="submit" variant="contained">
          Submit
        </Button>
      </Stack>
    </Box>
  );
}
