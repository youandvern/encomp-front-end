import { Button, Container, Stack, Typography } from "@mui/material";
import {
  FieldValues,
  FormContainer,
  TextFieldElement,
  PasswordElement,
  PasswordRepeatElement,
} from "react-hook-form-mui";
import { UserRegisterDto } from "../commonTypes/UserT";
import { useAppDispatch, useAppSelector } from "../hooks";
import { authActions, getUserStatus } from "../reduxSlices/auth";
import FormPendingSkeleton from "./FormPendingSkeleton";

const defaultValues = {
  email: "",
  password: "",
  passwordConfirm: "",
};

export default function RegisterForm() {
  const dispatch = useAppDispatch();
  const userStatus = useAppSelector(getUserStatus);

  const handleSubmit = (data: FieldValues) => {
    const registerUserDto = data as UserRegisterDto;
    dispatch(authActions.registerUser(registerUserDto));
  };

  return (
    <Container maxWidth="sm">
      {userStatus === "loading" ? (
        <FormPendingSkeleton />
      ) : (
        <FormContainer defaultValues={defaultValues} onSuccess={handleSubmit}>
          <Stack spacing={2}>
            <Typography variant="h3">Register:</Typography>
            <TextFieldElement required type="email" name="email" label="Email Address" />
            <PasswordElement required name="password" label="Password" />
            <PasswordRepeatElement
              required
              passwordFieldName="password"
              name="passwordConfirm"
              label="Confirm Password"
            />
            <Button fullWidth type="submit" variant="contained">
              Register
            </Button>
          </Stack>
        </FormContainer>
      )}
    </Container>
  );
}
