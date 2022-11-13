import { Box } from "@mui/material";
import { CheckVariablesText } from "../../commonTypes/CalculationRunTypes";
import { addCodeRef, CalcTypography, CALC_MARGIN, wrapMathEquationString } from "./reportUtilities";

interface Props {
  item: CheckVariablesText;
}

export default function CheckVariablesTextReport({ item }: Props) {
  return (
    <Box marginLeft={CALC_MARGIN}>
      {addCodeRef(
        <CalcTypography>{wrapMathEquationString(`\\rightarrow ${item.symbolic}`)}</CalcTypography>,
        item.codeRef
      )}
    </Box>
  );
}
