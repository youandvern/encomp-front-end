import React from "react";
import { Container, Grid, Typography, ThemeProvider, Stack, Box } from "@mui/material/";
import HomeIcon from "@mui/icons-material/Home";
import { Link } from "react-router-dom";
import NavBar from "./NavBar";
import { GLOBAL_THEME } from "../App";
import { routes } from "../routes";

// Home bar with logo nad menu options
export default function HomeBar() {
  return (
    <Box marginBottom="2rem">
      <NavBar />
    </Box>
  );
}
