import { Typography, Stack } from "@mui/material";
import { useEffect, useState } from "react";
import { CalcTypeToParse, InputVariable } from "../../commonTypes/CalculationRunTypes";
import { useAppDispatch, useAppSelector } from "../../hooks";
import {
  calculationActions,
  getCalculationRunResults,
  getCurrentCalculation,
} from "../../reduxSlices/calculation";
import CalculationInputTable, { FormValuesT } from "../CalculationInputTable";
import CalculationResultsView from "../CalculationResultsView";
import { useParams } from "react-router-dom";
import FormPendingSkeleton from "../FormPendingSkeleton";
import { updateMathJax } from "../..";

// TODO: Improve loading skeleton
export default function CalculationDesignPage() {
  const dispatch = useAppDispatch();
  const currentCalculationInfo = useAppSelector(getCurrentCalculation);
  const currentRun = useAppSelector(getCalculationRunResults);
  const calcId = useParams().id;

  const [inputItems, setInputItems] = useState<InputVariable[]>([]);
  const [resultItems, setResultItems] = useState<CalcTypeToParse[]>([]);
  const updatedInputState = useState<FormValuesT>({});
  const inputsChangedState = useState(false);

  // update mathjax whenever math containing items change
  useEffect(() => {
    updateMathJax();
  }, [inputItems, resultItems]);

  useEffect(() => {
    if (!!calcId) {
      if (Number(calcId) !== currentCalculationInfo?.id)
        dispatch(calculationActions.fetchCalculation(Number(calcId)));

      dispatch(calculationActions.getCalculationItems(Number(calcId)));
    }
  }, [calcId]);

  useEffect(() => {
    const inputItemList: InputVariable[] = [];
    const resultItemList: CalcTypeToParse[] = [];

    currentRun?.items.forEach((item) => {
      switch (item.type) {
        case "Input":
          inputItemList.push(item as InputVariable);
          break;
        case "Calculation":
        case "Comparison":
        case "ComparisonForced":
          if (!!item.finalResult) resultItemList.push(item);
          break;
        default:
          break;
      }
    });
    setInputItems(inputItemList);
    setResultItems(resultItemList);
  }, [currentRun]);

  return (
    <>
      <Stack>
        <Typography variant="h2" align="center" gutterBottom>
          {currentCalculationInfo?.name}
        </Typography>
        {calcId !== currentRun?.id ? (
          <FormPendingSkeleton />
        ) : (
          <Stack direction="row" spacing={4} justifyContent="center">
            <CalculationInputTable
              id={currentRun?.id || currentCalculationInfo?.id || 0}
              inputItems={inputItems}
              inputsChangedState={inputsChangedState}
              updatedInputState={updatedInputState}
            />
            <CalculationResultsView
              id={currentRun?.id || currentCalculationInfo?.id || 0}
              resultItems={resultItems}
              inputsChangedState={inputsChangedState}
              updatedInputState={updatedInputState}
            />
          </Stack>
        )}
      </Stack>
    </>
  );
}
