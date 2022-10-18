import { Box, Button, Container, TextField, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import React, { ChangeEvent, FormEvent, useState } from "react";
import { useAppDispatch } from "../../hooks";
import { templatesActions } from "../../reduxSlices/template";

const defaultValues = {
  name: "",
  description: "",
  fileContent: "",
};

export default function CreateTemplateForm() {
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
          <TextField
            multiline
            id="template-file-content"
            name="fileContent"
            label="Template Content (paste text from file)"
            value={formValues.fileContent}
            onChange={handleChange}
            inputProps={{ maxLength: 50000 }}
          />
          <Button fullWidth type="submit" variant="contained">
            Submit
          </Button>
        </Stack>
      </Box>
    </Container>
  );
}
