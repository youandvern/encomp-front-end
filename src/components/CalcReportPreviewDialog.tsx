import { Dialog, DialogContent, DialogActions, Button } from "@mui/material";
import CalcReport from "./CalcReport";
import { routes } from "../routes";

interface Props {
  calcId: number;
  openState: [boolean, React.Dispatch<React.SetStateAction<boolean>>];
}

// TODO: preview calc report takes forever to render
// --> Consider more back end work i.e. BFF for calc report and design page. (one object type rather than FE switch statements)
export default function CalcReportPreviewDialog({ calcId, openState }: Props) {
  const [open, setOpen] = openState;

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="md"
      scroll="paper"
      aria-label="calculation-report-preview"
    >
      <DialogContent dividers={true}>
        <CalcReport />
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() => {
            window.open(
              window.location.protocol +
                "//" +
                window.location.host +
                routes.calculationReport.path(calcId),
              "_blank"
            );
          }}
        >
          Print in new tab
        </Button>
        <Button onClick={handleClose}>Cancel</Button>
      </DialogActions>
    </Dialog>
  );
}
