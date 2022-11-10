import { Box, Typography, Paper, Tooltip, useTheme, CircularProgress } from "@mui/material";
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

// TODO: check tooltip should show var descriptions and substituted (separate lines)
// TODO: no mathjax on tooltip
interface Props {
  resultItems: CalcTypeToParse[];
}

export default function CalculationResultsView({ resultItems }: Props) {
  const theme = useTheme();
  const runStatus = useAppSelector(getCalculationRunStatus);
  return (
    <Box component={Paper} padding="1rem" height="fit-content">
      <Typography variant="h4">
        Results {runStatus === "loading" && <CircularProgress size="0.75em" />}
      </Typography>
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
                <Typography key={`calc-description-${index}`}>{parsedCalc.description}</Typography>
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
                  borderColor: check.value ? theme.palette.success.main : theme.palette.error.main,
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
                    <ArrowForwardIcon
                      sx={{ paddingInlineStart: "0.5em", paddingInlineEnd: "0.5em" }}
                    />
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
    </Box>
  );
}
