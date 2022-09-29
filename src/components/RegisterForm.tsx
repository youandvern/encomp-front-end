import { Button, Container, Stack } from "@mui/material";
import {
  FieldValues,
  FormContainer,
  TextFieldElement,
  PasswordElement,
  PasswordRepeatElement,
} from "react-hook-form-mui";
import { UserRegisterDto } from "../commonTypes/User";
import { useAppDispatch } from "../hooks";
import { authActions } from "../reduxSlices/auth";

const defaultValues = {
  email: "",
  password: "",
  passwordConfirm: "",
};

export default function RegisterForm() {
  const dispatch = useAppDispatch();

  const handleSubmit = (data: FieldValues) => {
    const registerUserDto = data as UserRegisterDto;
    dispatch(authActions.registerUser(registerUserDto));
  };

  // TODO: abstract out styled form component?
  // Container+Title+Box+Stack+submitButton
  return (
    <Container maxWidth="sm">
      <FormContainer defaultValues={defaultValues} onSuccess={handleSubmit}>
        <Stack spacing={2}>
          <h1>Register:</h1>
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
    </Container>
  );
}
