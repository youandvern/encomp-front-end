import { Box, CircularProgress } from "@mui/material";

export default function FormPendingSkeleton() {
  return (
    <Box display={"flex"} justifyContent="center" alignItems="center" marginY={"5em"}>
      <CircularProgress />
    </Box>
  );
}
