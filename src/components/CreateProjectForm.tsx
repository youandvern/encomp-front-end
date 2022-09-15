import { Container } from "@mui/material";
import React from "react";

export default function CreateProjectForm() {
  return (
    <Container maxWidth="md" className="page-top-padding">
      <h1>Create a Project:</h1>
      <p>Project Name: enter</p>
      <p>Password: enter</p>
      <button>Submit</button>
    </Container>
  );
}
