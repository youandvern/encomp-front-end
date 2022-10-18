import { Box, Button, Container, TextField, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import React, { ChangeEvent, FormEvent, useState } from "react";
import { CalculationDto } from "../../commonTypes/CalculationT";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { calculationActions } from "../../reduxSlices/calculation";
import { errorsActions } from "../../reduxSlices/errors";
import { getCurrentProject } from "../../reduxSlices/projects";

const defaultValues = {
  name: "",
  description: "",
};

export default function CreateCalculationForm() {
  const currentProject = useAppSelector(getCurrentProject);
  const dispatch = useAppDispatch();
  const [formValues, setValues] = useState(defaultValues);
  const projectSelected = currentProject !== null;

  const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setValues({ ...formValues, [name]: value });
  };

  const handleSubmit = (event: FormEvent<HTMLDivElement>) => {
    event.preventDefault();
    if (projectSelected) {
      const calcDto = { ...formValues, projectId: currentProject?.id } as CalculationDto;
      dispatch(calculationActions.createAndGetCalculation(calcDto));
      setValues(defaultValues);
    } else {
      dispatch(errorsActions.throwError("Could not find project."));
    }
  };

  return projectSelected ? (
    <Container maxWidth="sm">
      <Box component="form" onSubmit={handleSubmit}>
        <Stack spacing={2}>
          <Typography variant="h3">New Calculation:</Typography>
          <Typography variant="h6">Project: {currentProject?.name}</Typography>
          <TextField
            required
            id="calculation-name"
            name="name"
            label="Calculation Name"
            value={formValues.name}
            onChange={handleChange}
          />
          <TextField
            multiline
            id="calculation-description"
            name="description"
            label="Calculation Description"
            value={formValues.description}
            onChange={handleChange}
            inputProps={{ maxLength: 500 }}
          />
          <Button fullWidth type="submit" variant="contained">
            Submit
          </Button>
        </Stack>
      </Box>
    </Container>
  ) : (
    <Typography variant="h5">Please select a project.</Typography>
  );
}
