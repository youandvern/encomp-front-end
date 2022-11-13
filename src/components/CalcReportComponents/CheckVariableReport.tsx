import { Box } from "@mui/material";
import { CheckVariable } from "../../commonTypes/CalculationRunTypes";
import {
  addCodeRef,
  ALIGN,
  CALC_MARGIN,
  CalcTypography,
  LINE_BREAK,
  wrapAlignment,
  wrapMathEquationString,
} from "./reportUtilities";

interface Props {
  item: CheckVariable;
}

export default function CheckVariableReport({ item }: Props) {
  return (
    <Box marginLeft={CALC_MARGIN}>
      {addCodeRef(
        <CalcTypography>
          {wrapMathEquationString(
            wrapAlignment(
              `Check ${item.symbolic} ${LINE_BREAK} ${item.substituted}
          ${LINE_BREAK} ${ALIGN} \\therefore ${item.resultMessage}`
            )
          )}
        </CalcTypography>,
        item.codeRef
      )}
    </Box>
  );
}
