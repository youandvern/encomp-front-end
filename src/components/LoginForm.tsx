import { Button, Container, Stack, Typography } from "@mui/material";
import { FieldValues, FormContainer, PasswordElement, TextFieldElement } from "react-hook-form-mui";
import { UserLoginDto } from "../commonTypes/UserT";
import { useAppDispatch, useAppSelector } from "../hooks";
import { authActions, getAuthStatus } from "../reduxSlices/auth";
import FormPendingSkeleton from "./FormPendingSkeleton";

const defaultValues = {
  email: "",
  password: "",
};

export default function LogInForm() {
  const dispatch = useAppDispatch();
  const authStatus = useAppSelector(getAuthStatus);

  const handleSubmit = (data: FieldValues) => {
    const userLoginDto = data as UserLoginDto;
    dispatch(authActions.loginUser(userLoginDto));
  };

  return (
    <>
      <Container maxWidth="sm" sx={{ marginBlock: "2rem" }}>
        {authStatus === "loading" ? (
          <FormPendingSkeleton />
        ) : (
          <FormContainer defaultValues={defaultValues} onSuccess={handleSubmit}>
            <Stack spacing={2}>
              <Typography variant="h3">Log In:</Typography>
              <TextFieldElement required type="email" name="email" label="Email Address" />
              <PasswordElement required name="password" label="Password" />
              <Button fullWidth type="submit" variant="contained">
                Log In
              </Button>
            </Stack>
          </FormContainer>
        )}
      </Container>
    </>
  );
}
