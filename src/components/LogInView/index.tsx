import { Container } from "@mui/material";
import React from "react";

export default function LogInView() {
  return (
    <Container maxWidth="md" className="page-top-padding">
      <h1>Log In:</h1>
      <p>Username: enter</p>
      <p>Password: enter</p>
      <button>Submit</button>
    </Container>
  );
}
