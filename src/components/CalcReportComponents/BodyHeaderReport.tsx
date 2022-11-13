import { BodyHeader } from "../../commonTypes/CalculationRunTypes";
import { CalcTypography } from "./reportUtilities";

interface Props {
  item: BodyHeader;
  fontSize: string;
  headerNumber: string;
}
//{`${headerNumber} ${item.value}`}
export default function BodyHeaderReport({ item, fontSize, headerNumber }: Props) {
  return (
    <CalcTypography variant="h4" marginTop="1.5rem" marginBottom="0.5rem" fontSize={fontSize}>
      {headerNumber} &nbsp;{item.value}
    </CalcTypography>
  );
}
