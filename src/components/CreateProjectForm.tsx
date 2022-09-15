import { Box, Button, TextField } from "@mui/material";
import { Stack } from "@mui/system";
import React, { ChangeEvent, FormEvent, useState } from "react";
import { useAppDispatch } from "../hooks";
import { projectsActions } from "../reduxSlices/projects";

const defaultValues = {
  name: "",
  description: "",
};

export default function CreateProjectForm() {
  const dispatch = useAppDispatch();
  const [formValues, setValues] = useState(defaultValues);

  const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setValues({ ...formValues, [name]: value });
  };

  const handleSubmit = (event: FormEvent<HTMLDivElement>) => {
    event.preventDefault();
    dispatch(projectsActions.createAndGetProject(formValues));
  };
  return (
    <>
      <h1>Create a Project:</h1>
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
          />
          <Button fullWidth type="submit" variant="contained">
            Submit
          </Button>
        </Stack>
      </Box>
    </>
  );
}
