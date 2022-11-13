import { Assumption } from "../../commonTypes/CalculationRunTypes";
import { CalcTypography } from "./reportUtilities";

interface Props {
  item: Assumption;
}

export default function AssumptionReport({ item }: Props) {
  return (
    <CalcTypography>
      <CalcTypography variant="overline">{"[ASSUME] "}</CalcTypography>
      {item.value}
    </CalcTypography>
  );
}
