import { Box, Button, TextField } from "@mui/material";
import { Stack } from "@mui/system";
import React, { ChangeEvent, FormEvent, useState } from "react";
import { CalculationForProjectT } from "../../commonTypes/CalculationT";
import { useAppDispatch } from "../../hooks";
import { calculationActions } from "../../reduxSlices/calculation";

interface Props {
  calculation: CalculationForProjectT;
  onClose?: () => void;
}

export default function UpdateCalculationForm({ calculation, onClose }: Props) {
  const dispatch = useAppDispatch();
  const [formValues, setValues] = useState(calculation);

  const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setValues({ ...formValues, [name]: value });
  };

  const handleSubmit = (event: FormEvent<HTMLDivElement>) => {
    event.preventDefault();
    dispatch(calculationActions.updateAndGetCalculation(formValues));
    onClose && onClose();
  };

  return (
    <Box component="form" onSubmit={handleSubmit}>
      <Stack spacing={2}>
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
