import {
  Box,
  Button,
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import { Stack } from "@mui/system";
import React, { ChangeEvent, FormEvent, useState } from "react";
import { Link } from "react-router-dom";
import { CalculationDto } from "../../commonTypes/CalculationT";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { calculationActions } from "../../reduxSlices/calculation";
import { errorsActions } from "../../reduxSlices/errors";
import { getCurrentProject } from "../../reduxSlices/projects";
import { getTemplates } from "../../reduxSlices/template";
import { routes } from "../../routes";

const defaultValues = {
  name: "",
  description: "",
  templateId: -1,
};

export default function CreateCalculationForm() {
  const currentProject = useAppSelector(getCurrentProject);
  const templates = useAppSelector(getTemplates);
  const dispatch = useAppDispatch();
  const [formValues, setValues] = useState(defaultValues);
  const projectSelected = currentProject !== null;

  const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setValues({ ...formValues, [name]: value });
  };

  const handleChangeSelect = (event: SelectChangeEvent<number>) => {
    const value = Number(event.target.value);
    setValues({ ...formValues, templateId: value });
  };

  const handleSubmit = (event: FormEvent<HTMLDivElement>) => {
    event.preventDefault();
    const templateSelected = formValues.templateId >= 0;
    if (!templateSelected) {
      dispatch(errorsActions.throwError("Template is required."));
    } else if (!projectSelected) {
      dispatch(errorsActions.throwError("Could not find project."));
    } else {
      const calcDto = { ...formValues, projectId: currentProject?.id } as CalculationDto;
      dispatch(calculationActions.createAndGetCalculation(calcDto));
      setValues(defaultValues);
    }
  };

  return projectSelected && templates && templates.length > 0 ? (
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
          <FormControl required>
            <InputLabel id="template-select-label">Template</InputLabel>
            <Select
              id="calculation-template"
              name="templateId"
              labelId="template-select-label"
              label="Template *"
              value={formValues.templateId < 0 ? undefined : formValues.templateId}
              onChange={handleChangeSelect}
            >
              {templates.map((template) => (
                <MenuItem key={"menu-" + template.id} value={template.id}>
                  <Tooltip
                    placement="right"
                    title={template.description ? template.description : "Description empty"}
                  >
                    <span>{template.name}</span>
                  </Tooltip>
                </MenuItem>
              ))}
            </Select>
          </FormControl>
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
  ) : !projectSelected ? (
    <Typography variant="h5">Please select a project.</Typography>
  ) : (
    <Typography variant="h5">
      You must <Link to={routes.templates.path()}>create a template</Link> for your calculation
      before creating a calculation instance.
    </Typography>
  );
}
