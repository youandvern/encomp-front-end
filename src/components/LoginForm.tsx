import { Button, Container, Stack } from "@mui/material";
import React from "react";
import { FieldValues, FormContainer, PasswordElement, TextFieldElement } from "react-hook-form-mui";
import { UserLoginDto } from "../commonTypes/User";
import { useAppDispatch } from "../hooks";
import { authActions } from "../reduxSlices/auth";

const defaultValues = {
  email: "",
  password: "",
};

// TODO: hash password
export default function LogInForm() {
  const dispatch = useAppDispatch();

  const handleSubmit = (data: FieldValues) => {
    const userLoginDto = data as UserLoginDto;
    dispatch(authActions.loginUser(userLoginDto));
  };

  return (
    <>
      <Container maxWidth="sm">
        <FormContainer defaultValues={defaultValues} onSuccess={handleSubmit}>
          <Stack spacing={2}>
            <h1>Log In:</h1>
            <TextFieldElement required type="email" name="email" label="Email Address" />
            <PasswordElement required name="password" label="Password" />
            <Button fullWidth type="submit" variant="contained">
              Log In
            </Button>
          </Stack>
        </FormContainer>
      </Container>
    </>
  );
}
