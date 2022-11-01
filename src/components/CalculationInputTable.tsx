import {
  Box,
  Button,
  Tabs,
  Tab,
  TextField,
  Typography,
  Stack,
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Input,
  InputAdornment,
  OutlinedInput,
  Select,
  SelectChangeEvent,
  MenuItem,
} from "@mui/material";
import React, { ChangeEvent, useEffect, useState } from "react";
import { styled } from "@mui/system";

import { apiFetchTemplateContent, apiUpdateTemplateContent } from "../api";
import {
  CalcTypeToParse,
  CalculationTitle,
  CalcVariable,
  CheckVariable,
  DeclareVariable,
} from "../commonTypes/CalculationRunTypes";
import { TemplateContentDto } from "../commonTypes/TemplateT";
import { useAppDispatch, useAppSelector } from "../hooks";
import {
  calculationActions,
  getCalculationRunResults,
  getCurrentCalculation,
} from "../reduxSlices/calculation";
import { errorsActions } from "../reduxSlices/errors";
import { getCurrentTemplate } from "../reduxSlices/template";
import { GLOBAL_THEME } from "../App";
import { CalculationRunDto } from "../commonTypes/CalculationT";

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  "&:nth-of-type(even)": {
    backgroundColor: "white",
  },
  "&:hover": {
    backgroundColor: theme.palette.primary.light,
  },
}));

const itemToInput = (
  item: DeclareVariable,
  itemValue: number | string | undefined,
  handleChange: (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void,
  handleChangeSelect: (event: SelectChangeEvent<string | number>) => void
) =>
  item.inputType === "select" ? (
    <Select
      name={item.name}
      value={itemValue}
      onChange={handleChangeSelect}
      size="small"
      sx={{ minWidth: "10rem", backgroundColor: "white" }}
    >
      {item.inputOptions?.map((option) => (
        <MenuItem value={option}>{option}</MenuItem>
      ))}
    </Select>
  ) : (
    <OutlinedInput
      required
      name={item.name}
      value={itemValue}
      type={item.inputType}
      inputProps={{
        min: item.minValue,
        max: item.maxValue,
        step: item.numStep,
      }}
      endAdornment={<InputAdornment position="end">{item.unit}</InputAdornment>}
      onChange={handleChange}
      margin="none"
      size="small"
      sx={{ backgroundColor: "white" }}
    />
  );

interface FormValuesT {
  [key: string]: string | number;
}

interface Props {
  id: number;
  inputItems: DeclareVariable[];
}

export default function CalculationInputTable({ id, inputItems }: Props) {
  const dispatch = useAppDispatch();
  const [formValues, setValues] = useState<FormValuesT>({});

  const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setValues({ ...formValues, [name]: value });
  };

  const handleChangeSelect = (event: SelectChangeEvent<string | number>) => {
    const { name, value } = event.target;
    setValues({ ...formValues, [name]: value });
  };

  const handleClickUpdate = () => {
    dispatch(
      calculationActions.runCalculation({ id: id, inputs: formValues } as CalculationRunDto)
    );
  };

  useEffect(() => {
    const inputObj = inputItems.reduce((obj, item) => {
      obj[item.name || ""] = item.value || "";
      return obj;
    }, {} as FormValuesT);
    setValues(inputObj);
  }, [inputItems]);

  return (
    <Box>
      <TableContainer component={Paper}>
        <Table size="small" aria-label="inputs table">
          <TableHead>
            <TableRow>
              <TableCell>
                <Typography variant="h6">Description</Typography>
              </TableCell>
              <TableCell>
                <Typography variant="h6">Name</Typography>
              </TableCell>
              <TableCell>
                <Typography variant="h6">Value (units)</Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {inputItems.map((item) => (
              <StyledTableRow key={"input-row-" + item.name}>
                <TableCell>{item.description}</TableCell>
                <TableCell>{item.name}</TableCell>
                <TableCell>
                  {itemToInput(item, formValues[item.name || ""], handleChange, handleChangeSelect)}
                </TableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <br />
      <Button onClick={handleClickUpdate}>Update Results</Button>
    </Box>
  );
}
