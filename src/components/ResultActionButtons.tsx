import NoteAddIcon from "@mui/icons-material/NoteAdd";
import PreviewIcon from "@mui/icons-material/Preview";
import RefreshIcon from "@mui/icons-material/Refresh";
import { CircularProgress, IconButton, Stack, Tooltip } from "@mui/material";
import { useState } from "react";
import { CalculationRunDto } from "../commonTypes/CalculationT";
import { useAppDispatch } from "../hooks";
import { calculationActions } from "../reduxSlices/calculation";
import { routes } from "../routes";
import CalcReportPreviewDialog from "./CalcReportPreviewDialog";
import { FormValuesT } from "./CalculationInputTable";

interface Props {
  id: number;
  runLoading: boolean;
  updatedInputState: [FormValuesT, React.Dispatch<React.SetStateAction<FormValuesT>>];
  inputsChangedState: [boolean, React.Dispatch<React.SetStateAction<boolean>>];
}

export default function ResultActionButtons({
  id,
  inputsChangedState,
  runLoading,
  updatedInputState,
}: Props) {
  const dispatch = useAppDispatch();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [inputs, _setInputs] = updatedInputState;
  const [inputChanged, setInputChanged] = inputsChangedState;

  const handleClickUpdate = () => {
    dispatch(calculationActions.runCalculation({ id: id, inputs: inputs } as CalculationRunDto));
    setInputChanged(false);
  };

  const handleClickPreview = () => {
    setDialogOpen(true);
  };

  const handleClickOpen = () => {
    window.open(
      window.location.protocol + "//" + window.location.host + routes.calculationReport.path(id),
      "_blank"
    );
  };

  return (
    <>
      <Stack direction="row">
        {runLoading ? (
          <Tooltip title="Loading updated results..." placement="top">
            <CircularProgress size="1.5em" sx={{ padding: "0.5em" }} />
          </Tooltip>
        ) : (
          <Tooltip title="Save inputs and refresh results." placement="top">
            <IconButton onClick={handleClickUpdate} color="primary">
              <RefreshIcon />
            </IconButton>
          </Tooltip>
        )}
        <Tooltip title="Preview calculation report." placement="top">
          <IconButton onClick={handleClickPreview} disabled={inputChanged} color="primary">
            <PreviewIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Open or print calculation report in new window." placement="top">
          <IconButton onClick={handleClickOpen} disabled={inputChanged} color="primary">
            <NoteAddIcon />
          </IconButton>
        </Tooltip>
      </Stack>
      <CalcReportPreviewDialog calcId={id} openState={[dialogOpen, setDialogOpen]} />
    </>
  );
}
