import { Box } from "@mui/material";
import { BodyText } from "../../commonTypes/CalculationRunTypes";
import { addCodeRef, CALC_MARGIN, CalcTypography } from "./reportUtilities";

interface Props {
  item: BodyText;
}

export default function BodyTextReport({ item }: Props) {
  return item.value ? (
    <Box marginLeft={CALC_MARGIN}>
      {addCodeRef(<CalcTypography>{item.value}</CalcTypography>, item.codeRef)}
    </Box>
  ) : (
    <></>
  );
}
