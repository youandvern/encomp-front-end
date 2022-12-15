import { Box, Button, Container, TextField, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import React, { ChangeEvent, FormEvent, useState } from "react";
import { CreateFormProps } from "../../commonTypes/FormProps";
import { useAppDispatch } from "../../hooks";
import { templatesActions } from "../../reduxSlices/template";

// TODO: calc report preview not refreshing on save
// TODO: capture ctrl + s to click save button
const TEMPLATE_STARTER_CODE = `from templates.encomp_utils import *


def calculation():
    # Begin your calculation template here. For example, C=A+B would be:
    A = Input("A", 1)
    B = Input("B", 1)
    Calculation("C", A+B, result_check=True)
    `;

const defaultValues = {
  name: "",
  description: "",
  fileContent: TEMPLATE_STARTER_CODE,
};

export default function CreateTemplateForm({ onSubmit }: CreateFormProps) {
  const dispatch = useAppDispatch();
  const [formValues, setValues] = useState(defaultValues);

  const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setValues({ ...formValues, [name]: value });
  };

  const handleSubmit = (event: FormEvent<HTMLDivElement>) => {
    event.preventDefault();
    dispatch(templatesActions.createAndGetTemplate(formValues));
    setValues(defaultValues);
    if (onSubmit) onSubmit();
  };

  return (
    <Container maxWidth="sm">
      <Box component="form" onSubmit={handleSubmit}>
        <Stack spacing={2}>
          <Typography variant="h3">New Calculation Template:</Typography>
          <TextField
            required
            id="template-name"
            name="name"
            label="Template Name"
            value={formValues.name}
            onChange={handleChange}
          />
          <TextField
            multiline
            id="template-description"
            name="description"
            label="Template Description"
            value={formValues.description}
            onChange={handleChange}
            inputProps={{ maxLength: 500 }}
          />
          {/* <TextField
            hidden
            multiline
            id="template-file-content"
            name="fileContent"
            label="Template Content (paste text from file)"
            value={formValues.fileContent}
            onChange={handleChange}
            inputProps={{ maxLength: 50000 }}
          /> */}
          <Button fullWidth type="submit" variant="contained">
            Submit
          </Button>
        </Stack>
      </Box>
    </Container>
  );
}
