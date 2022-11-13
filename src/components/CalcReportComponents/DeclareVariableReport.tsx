import { Stack } from "@mui/material";
import { DeclareVariable } from "../../commonTypes/CalculationRunTypes";
import { CalcTypography, CALC_MARGIN, wrapMathString } from "./reportUtilities";

interface Props {
  item: DeclareVariable;
}

export default function DeclareVariableReport({ item }: Props) {
  return item.tex ? (
    <Stack direction="row" justifyContent="flex-start" marginLeft={CALC_MARGIN}>
      <CalcTypography display="inline-block" lineHeight={1} marginBottom="1em" width="450px">
        {item.description};
      </CalcTypography>
      <CalcTypography>{wrapMathString(item.tex)}</CalcTypography>
    </Stack>
  ) : (
    <></>
  );
}
