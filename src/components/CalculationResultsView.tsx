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
  Tooltip,
  useTheme,
} from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import React, { ChangeEvent, useEffect, useState } from "react";
import { styled } from "@mui/system";

import { apiFetchTemplateContent, apiUpdateTemplateContent } from "../api";
import {
  CalcTypeToParse,
  CalculationTitle,
  CalcVariable,
  CheckVariable,
  CheckVariablesText,
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

// TODO: check tooltip should show var descriptions and substituted (separate lines)
interface Props {
  resultItems: CalcTypeToParse[];
}

export default function CalculationResultsView({ resultItems }: Props) {
  const theme = useTheme();
  return (
    <Box component={Paper} padding="1rem" height="fit-content">
      <Typography variant="h4">Results</Typography>
      {resultItems.map((item, index) => {
        switch (item.type) {
          case "CalcVariable":
            const parsedCalc = item as CalcVariable;
            return (
              <Box
                padding="0.5rem"
                margin="0.5rem"
                sx={{
                  borderStyle: "solid",
                  borderRadius: "1rem",
                }}
              >
                <Typography key={`calc-description-${index}`}>{parsedCalc.description}</Typography>
                <Typography key={`calc-result-${index}`}>
                  {parsedCalc.name}
                  {parsedCalc.resultWithUnit}
                </Typography>
              </Box>
            );
          case "CheckVariable":
            const check = item as CheckVariable;
            return (
              <Box
                padding="0.5rem"
                margin="0.5rem"
                sx={{
                  backgroundColor: check.value
                    ? theme.palette.success.light
                    : theme.palette.error.light,
                  borderStyle: "solid",
                  borderRadius: "1rem",
                }}
              >
                <Tooltip title={check.substituted || "Check Results"}>
                  <Typography key={`check-${index}`} display="flex">
                    {check.symbolic}
                    <ArrowForwardIcon />
                    {check.resultMessage}
                  </Typography>
                </Tooltip>
              </Box>
            );
          case "CheckVariablesText":
            const textcheck = item as CheckVariablesText;
            return (
              <Box
                padding="0.5rem"
                margin="0.5rem"
                sx={{
                  backgroundColor: theme.palette.success.light,
                  borderStyle: "solid",
                  borderRadius: "1rem",
                }}
              >
                <Tooltip title={textcheck.description || "Check Results"}>
                  <Typography key={`textcheck-${index}`} display="flex">
                    {textcheck.symbolic}
                  </Typography>
                </Tooltip>
              </Box>
            );
          default:
            return null;
        }
      })}
    </Box>
  );
}
