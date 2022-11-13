import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks";
import {
  calculationActions,
  getCalculationRunResults,
  getCurrentCalculation,
} from "../../reduxSlices/calculation";
import { useParams } from "react-router-dom";
import FormPendingSkeleton from "../FormPendingSkeleton";
import { updateMathJax } from "../..";
import CalcReport from "../CalcReport";

// TODO: Improve loading skeleton
export default function CalculationReportPage() {
  const dispatch = useAppDispatch();
  const currentCalculationInfo = useAppSelector(getCurrentCalculation);
  const currentRun = useAppSelector(getCalculationRunResults);
  const calcId = useParams().id;

  // TODO: move into component that actually has math
  // update mathjax whenever math containing items change
  useEffect(() => {
    updateMathJax();
  }, [currentRun?.items]);

  useEffect(() => {
    if (!!calcId) {
      if (Number(calcId) !== currentCalculationInfo?.id)
        dispatch(calculationActions.fetchCalculation(Number(calcId)));

      dispatch(calculationActions.getCalculationItems(Number(calcId)));
    }
  }, [calcId]);

  return calcId !== currentRun?.id ? <FormPendingSkeleton /> : <CalcReport />;
}
