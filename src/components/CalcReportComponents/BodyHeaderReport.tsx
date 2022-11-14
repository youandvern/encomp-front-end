import { BodyHeader } from "../../commonTypes/CalculationRunTypes";
import { addCodeRef, CalcTypography } from "./reportUtilities";

interface Props {
  item: BodyHeader;
  fontSize: string;
  headerNumber: string;
}
export default function BodyHeaderReport({ item, fontSize, headerNumber }: Props) {
  return addCodeRef(
    <CalcTypography variant="h4" marginTop="1.5rem" marginBottom="0.5rem" fontSize={fontSize}>
      {headerNumber} &nbsp;{item.value}
    </CalcTypography>,
    item.codeRef
  );
}
