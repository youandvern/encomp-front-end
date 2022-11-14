import NoteAddIcon from "@mui/icons-material/NoteAdd";
import PreviewIcon from "@mui/icons-material/Preview";
import RefreshIcon from "@mui/icons-material/Refresh";
import { CircularProgress, IconButton, Stack } from "@mui/material";
import { CalculationRunDto } from "../commonTypes/CalculationT";
import { useAppDispatch } from "../hooks";
import { calculationActions } from "../reduxSlices/calculation";
import { FormValuesT } from "./CalculationInputTable";

interface Props {
  id: number;
  runLoading: boolean;
  updatedInputState: [FormValuesT, React.Dispatch<React.SetStateAction<FormValuesT>>];
  inputsChangedState: [boolean, React.Dispatch<React.SetStateAction<boolean>>];
}
// TODO: add actions to show cal report and open in new tab for printing
// TODO: add tooltips for buttons
// TODO: don't hide, just disable report buttons, update tooltip instruct to refresh results
// TODO: remove other update results button
// TODO: add a save button?
export default function ResultActionButtons({
  id,
  inputsChangedState,
  runLoading,
  updatedInputState,
}: Props) {
  const dispatch = useAppDispatch();
  const [inputs, _setInputs] = updatedInputState;
  const [inputChanged, setInputChanged] = inputsChangedState;

  const handleClickUpdate = () => {
    dispatch(calculationActions.runCalculation({ id: id, inputs: inputs } as CalculationRunDto));
    setInputChanged(false);
  };

  return (
    <Stack direction="row">
      {runLoading ? (
        <CircularProgress size="1.5em" sx={{ padding: "0.5em" }} />
      ) : (
        <IconButton onClick={handleClickUpdate} color="primary">
          <RefreshIcon />
        </IconButton>
      )}
      <IconButton disabled={inputChanged} color="primary">
        <PreviewIcon />
      </IconButton>
      <IconButton disabled={inputChanged} color="primary">
        <NoteAddIcon />
      </IconButton>
    </Stack>
  );
}
