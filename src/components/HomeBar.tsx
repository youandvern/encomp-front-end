import React from "react";
import { Box } from "@mui/material/";
import NavBar from "./NavBar";

// Home bar with logo nad menu options
export default function HomeBar() {
  return (
    <Box marginBottom="2rem" marginTop="1rem">
      <NavBar />
    </Box>
  );
}
