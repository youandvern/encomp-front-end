import React from "react";
import "./style.css";
import { Container, Grid, Typography, Link, ThemeProvider } from "@mui/material/";
import HomeIcon from "@mui/icons-material/Home";
import NavBar from "./NavBar";
import { GLOBAL_THEME } from "../App";

// Home bar with logo nad menu options
export default function HomeBar() {
  return (
    <ThemeProvider theme={GLOBAL_THEME}>
      <Container maxWidth="md" className="page-top-padding">
        <Grid container spacing={1}>
          <Grid item xs={2}></Grid>

          <Grid item xs={8}>
            <Typography align="center">
              <a href="https://encompapp.com/">
                <img src="./ENCOMP.png" alt="Encomp Logo" className="main-logo"></img>
              </a>
            </Typography>
          </Grid>

          <Grid item container direction="column-reverse" xs={2}>
            <Grid item xs={3}></Grid>

            <Grid item container direction="column-reverse" xs={8}>
              <Typography align="center">
                <Link href="https://encompapp.com/">
                  <HomeIcon fontSize="large" color="primary" titleAccess="Home Button" />
                </Link>
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <NavBar />
      </Container>
    </ThemeProvider>
  );
}
