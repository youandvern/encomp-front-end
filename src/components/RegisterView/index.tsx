import { Container } from "@mui/material";
import React from "react";

export default function RegisterView() {
  return (
    <Container maxWidth="md" className="page-top-padding">
      <h1>Register:</h1>
      <p>Username: enter</p>
      <p>Email Address: enter</p>
      <p>Password: enter</p>
      <p>Repeat Password: enter</p>
      <button>Register</button>
    </Container>
  );
}
