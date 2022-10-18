import { Box, Button, Container, TextField } from "@mui/material";
import { Stack } from "@mui/system";
import React, { ChangeEvent, FormEvent, useState } from "react";
import TemplateT from "../../commonTypes/TemplateT";
import { useAppDispatch } from "../../hooks";
import { templatesActions } from "../../reduxSlices/template";

interface Props {
  template: TemplateT;
  onClose?: () => void;
}

export default function UpdateTemplateForm({ template, onClose }: Props) {
  const dispatch = useAppDispatch();
  const [formValues, setValues] = useState(template);

  const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setValues({ ...formValues, [name]: value });
  };

  const handleSubmit = (event: FormEvent<HTMLDivElement>) => {
    event.preventDefault();
    dispatch(templatesActions.updateAndGetTemplate(formValues));
    onClose && onClose();
  };

  return (
    <Box component="form" onSubmit={handleSubmit}>
      <Stack spacing={2}>
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
