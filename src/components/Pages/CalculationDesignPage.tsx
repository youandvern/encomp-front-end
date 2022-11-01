import {
  Box,
  Button,
  Tabs,
  Tab,
  TextField,
  Typography,
  Stack,
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";
import React, { ChangeEvent, useEffect, useState } from "react";
import { apiFetchTemplateContent, apiUpdateTemplateContent } from "../../api";
import {
  CalcTypeToParse,
  CalculationTitle,
  CalcVariable,
  CheckVariable,
  DeclareVariable,
} from "../../commonTypes/CalculationRunTypes";
import { TemplateContentDto } from "../../commonTypes/TemplateT";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { getCalculationRunResults, getCurrentCalculation } from "../../reduxSlices/calculation";
import { errorsActions } from "../../reduxSlices/errors";
import { getCurrentTemplate } from "../../reduxSlices/template";
import CalculationInputTable from "../CalculationInputTable";
import CalculationResultsView from "../CalculationResultsView";

// TODO: add page to nav bar and routes (only when calc selected)
// TODO: break out inputs and results components
// TODO: navigate to page and fetch inputs when choose current calc
const LOADING_TEXT = "Loading...";

export default function CalculationDesignPage() {
  const currentCalculationInfo = useAppSelector(getCurrentCalculation);
  const currentRun = useAppSelector(getCalculationRunResults);
  const dispatch = useAppDispatch();

  const [inputItems, setInputItems] = useState<DeclareVariable[]>([]);
  const [resultItems, setResultItems] = useState<CalcTypeToParse[]>([]);

  useEffect(() => {
    const inputItemList: DeclareVariable[] = [];
    const resultItemList: CalcTypeToParse[] = [];

    currentRun?.items.forEach((item) => {
      switch (item.type) {
        case "DeclareVariable":
          inputItemList.push(item as DeclareVariable);
          break;
        case "CalcVariable":
        case "CheckVariable":
        case "CheckVariablesText":
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
        <Typography variant="h2">{currentCalculationInfo?.name}</Typography>
        <Stack direction="row" spacing={4}>
          <CalculationInputTable
            id={currentRun?.id || currentCalculationInfo?.id || 0}
            inputItems={inputItems}
          />
          <CalculationResultsView resultItems={resultItems} />
        </Stack>
      </Stack>
    </>
  );
}
