import { DescriptionHead } from "../../commonTypes/CalculationRunTypes";
import { CalcTypography } from "./reportUtilities";

interface Props {
  item: DescriptionHead;
}

export default function DescriptionHeadReport({ item }: Props) {
  return <CalcTypography variant="subtitle1">{item.value}</CalcTypography>;
}
