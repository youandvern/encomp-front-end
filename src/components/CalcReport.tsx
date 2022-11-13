import { Box } from "@mui/material";
import { useAppSelector } from "../hooks";
import {
  Assumption,
  BodyHeader,
  BodyText,
  CalculationTitle,
  CalcVariable,
  CheckVariable,
  CheckVariablesText,
  DeclareVariable,
  DescriptionHead,
} from "../commonTypes/CalculationRunTypes";
import { getCalculationRunResults } from "../reduxSlices/calculation";
import BodyTextReport from "./CalcReportComponents/BodyTextReport";
import CalcTitleReport from "./CalcReportComponents/CalcTitleReport";
import DescriptionHeadReport from "./CalcReportComponents/DescriptionHeadReport";
import AssumptionReport from "./CalcReportComponents/AssumptionReport";
import DeclareVariableReport from "./CalcReportComponents/DeclareVariableReport";
import BodyHeaderReport from "./CalcReportComponents/BodyHeaderReport";
import CalcVariableReport from "./CalcReportComponents/CalcVariableReport";
import CheckVariableReport from "./CalcReportComponents/CheckVariableReport";
import CheckVariablesTextReport from "./CalcReportComponents/CheckVariablesTextReport";
import { getCalcKey } from "./CalcReportComponents/reportUtilities";

const headLevelToFontSize = {
  1: "2rem",
  2: "1.75rem",
  3: "1.55rem",
  4: "1.4rem",
  5: "1.25rem",
} as {
  [key: number]: string;
};

const getFontSizeForHeadLevel = (level: number) =>
  level > 0 && level < 6 ? headLevelToFontSize[level] : "1.25rem";

const incrementAndGetHeaderCount = (headerCounts: number[], level: number) => {
  const headerIndex = level - 1;
  const currentSize = headerCounts.length;

  if (level >= 1) {
    if (currentSize < level) {
      for (let i = currentSize; i < level; i++) {
        headerCounts[i] = 0;
      }
    }

    headerCounts[headerIndex] = (headerCounts[headerIndex] || 0) + 1;
    headerCounts = headerCounts.slice(0, level);
  }
  return headerCounts;
};

// TODO: add keys to all outer level components
// TODO: allow calc title in addition to template title in calc report
export default function CalcReport() {
  const runResults = useAppSelector(getCalculationRunResults)?.items;
  let headerCounts = [0];

  return (
    <Box maxWidth="980px">
      {runResults &&
        runResults.map((item, index) => {
          switch (item.type) {
            case "CalculationTitle":
              return (
                <CalcTitleReport
                  item={item as CalculationTitle}
                  index={index}
                  key={getCalcKey(index)}
                />
              );
            case "DescriptionHead":
              return (
                <DescriptionHeadReport item={item as DescriptionHead} key={getCalcKey(index)} />
              );
            case "Assumption":
              return <AssumptionReport item={item as Assumption} key={getCalcKey(index)} />;
            case "DeclareVariable":
              return (
                <DeclareVariableReport item={item as DeclareVariable} key={getCalcKey(index)} />
              );
            case "BodyHeader":
              const parsedBH = item as BodyHeader;
              const levelNum = parsedBH.level || 0;
              headerCounts = incrementAndGetHeaderCount(headerCounts, levelNum);
              const fontSize = getFontSizeForHeadLevel(levelNum);
              const headerNumber = headerCounts.join(".") + ".";
              return (
                <BodyHeaderReport
                  item={parsedBH}
                  fontSize={fontSize}
                  headerNumber={headerNumber}
                  key={getCalcKey(index)}
                />
              );
            case "BodyText":
              return <BodyTextReport item={item as BodyText} key={getCalcKey(index)} />;
            case "CalcVariable":
              return <CalcVariableReport item={item as CalcVariable} key={getCalcKey(index)} />;
            case "CheckVariable":
              return <CheckVariableReport item={item as CheckVariable} key={getCalcKey(index)} />;
            case "CheckVariablesText":
              return (
                <CheckVariablesTextReport
                  item={item as CheckVariablesText}
                  key={getCalcKey(index)}
                />
              );
            default:
              return null;
          }
        })}
    </Box>
  );
}
