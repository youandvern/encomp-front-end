import { Box } from "@mui/material";
import { CalcVariable } from "../../commonTypes/CalculationRunTypes";
import {
  addCodeRef,
  ALIGN,
  CalcTypography,
  CALC_MARGIN,
  LINE_BREAK,
  wrapAlignment,
  wrapMathEquationString,
  wrapMathString,
} from "./reportUtilities";

const composeCalcVariable = (content: JSX.Element, description?: string, codeRef?: string) => (
  <Box marginLeft={CALC_MARGIN} marginTop="0.25rem">
    {description && <CalcTypography marginTop="0.5rem">{description}:</CalcTypography>}
    {addCodeRef(content, codeRef)}
  </Box>
);

const calcVariableToNode = (calc: CalcVariable) => {
  let tex: string;
  switch (calc.calcLength) {
    case "number":
      tex = `${calc.name} ${calc.resultWithUnit}`;
      break;
    case "short":
      tex = wrapAlignment(
        `${calc.name} ${ALIGN} ${calc.symbolic}  ${calc.substituted} ${LINE_BREAK} ${ALIGN} \\therefore ${calc.name} ${calc.resultWithUnit}`
      );
      break;
    default:
      tex = wrapAlignment(
        `${calc.name} ${ALIGN} ${calc.symbolic} ${LINE_BREAK} ${ALIGN} ${calc.substituted} ${LINE_BREAK} ${ALIGN} \\therefore ${calc.name} ${calc.resultWithUnit}`
      );
  }
  const node = (
    <CalcTypography>
      {calc.calcLength === "number" ? wrapMathString(tex) : wrapMathEquationString(tex)}
    </CalcTypography>
  );
  return composeCalcVariable(node, calc.description, calc.codeRef);
};

interface Props {
  item: CalcVariable;
}

export default function CalcVariableReport({ item }: Props) {
  return item.name ? calcVariableToNode(item) : <></>;
}
