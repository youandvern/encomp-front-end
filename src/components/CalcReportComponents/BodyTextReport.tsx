import { Box } from "@mui/material";
import { TextBlock } from "../../commonTypes/CalculationRunTypes";
import { addReference, CALC_MARGIN, CalcTypography } from "./reportUtilities";

interface Props {
  item: TextBlock;
}

export default function BodyTextReport({ item }: Props) {
  return item.value ? (
    <Box marginLeft={CALC_MARGIN}>
      {addReference(<CalcTypography>{item.value}</CalcTypography>, item.reference)}
    </Box>
  ) : (
    <></>
  );
}
