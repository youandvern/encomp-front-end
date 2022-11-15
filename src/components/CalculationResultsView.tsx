import { Box, Typography, Paper, Tooltip, useTheme, Stack, Backdrop } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import React from "react";

import {
  CalcTypeToParse,
  CalcVariable,
  CheckVariable,
  CheckVariablesText,
} from "../commonTypes/CalculationRunTypes";
import { useAppSelector } from "../hooks";
import { getCalculationRunStatus } from "../reduxSlices/calculation";
import ResultActionButtons from "./ResultActionButtons";
import { FormValuesT } from "./CalculationInputTable";

// TODO: check tooltip should show var descriptions and substituted (separate lines)
// TODO: no mathjax on tooltip
interface Props {
  id: number;
  resultItems: CalcTypeToParse[];
  updatedInputState: [FormValuesT, React.Dispatch<React.SetStateAction<FormValuesT>>];
  inputsChangedState: [boolean, React.Dispatch<React.SetStateAction<boolean>>];
}

export default function CalculationResultsView({
  id,
  resultItems,
  inputsChangedState,
  updatedInputState,
}: Props) {
  const theme = useTheme();
  const runStatus = useAppSelector(getCalculationRunStatus);
  const [inputChanged, setInputChanged] = inputsChangedState;
  return (
    <Box component={Paper} padding="1rem" height="fit-content">
      <Stack direction="row">
        <Typography variant="h4">Results </Typography>
        <ResultActionButtons
          id={id}
          updatedInputState={updatedInputState}
          inputsChangedState={inputsChangedState}
          runLoading={runStatus === "loading" || false}
        />
      </Stack>
      <Box sx={{ position: "relative" }}>
        {resultItems.map((item, index) => {
          switch (item.type) {
            case "CalcVariable":
              const parsedCalc = item as CalcVariable;
              return (
                <Box
                  key={"calc-description-box-" + index}
                  padding="0.5rem"
                  margin="0.5rem"
                  sx={{
                    borderStyle: "solid",
                    borderRadius: "1rem",
                    borderColor: theme.palette.grey["800"],
                  }}
                >
                  <Typography key={`calc-description-${index}`}>
                    {parsedCalc.description}
                  </Typography>
                  <Typography key={`calc-result-${index}`} align="center">
                    {`\\( ${parsedCalc.name} ${parsedCalc.resultWithUnit} \\)`}
                  </Typography>
                </Box>
              );
            case "CheckVariable":
              const check = item as CheckVariable;
              return (
                <Box
                  key={"calc-description-box-" + index}
                  padding="0.5rem"
                  margin="0.5rem"
                  sx={{
                    backgroundColor: check.value
                      ? theme.palette.success.light
                      : theme.palette.error.light,
                    borderColor: check.value
                      ? theme.palette.success.main
                      : theme.palette.error.main,
                    borderStyle: "solid",
                    borderRadius: "1rem",
                  }}
                >
                  <Tooltip title={`\\(${check.substituted}\\)` || "Check Results"}>
                    <Typography
                      key={`check-${index}`}
                      display="flex"
                      align="center"
                      justifyContent="center"
                    >
                      {`\\( \\begin{align} ${check.symbolic} \\end{align}\\)`}
                      <ArrowForwardIcon sx={{ paddingInline: "0.5em" }} />
                      {check.resultMessage}
                    </Typography>
                  </Tooltip>
                </Box>
              );
            case "CheckVariablesText":
              const textcheck = item as CheckVariablesText;
              return (
                <Box
                  key={"calc-description-box-" + index}
                  padding="0.5rem"
                  margin="0.5rem"
                  sx={{
                    backgroundColor: theme.palette.primary.light,
                    borderColor: theme.palette.primary.main,
                    borderStyle: "solid",
                    borderRadius: "1rem",
                  }}
                >
                  <Tooltip title={textcheck.description || "Check Results"}>
                    <Typography
                      key={`textcheck-${index}`}
                      display="flex"
                      align="center"
                      justifyContent="center"
                    >
                      {`\\(${textcheck.symbolic}\\)`}
                    </Typography>
                  </Tooltip>
                </Box>
              );
            default:
              return null;
          }
        })}
        <Backdrop open={inputChanged} sx={{ position: "absolute", borderRadius: "1rem" }}>
          <Typography
            fontWeight={700}
            margin="1rem"
            padding="1rem"
            sx={{
              backgroundColor: theme.palette.grey[700],
              color: "white",
              borderRadius: "1rem",
              opacity: "90%",
            }}
          >
            Input has changed. Refresh calculation to save inputs and see updated results.
          </Typography>
        </Backdrop>
      </Box>
    </Box>
  );
}
