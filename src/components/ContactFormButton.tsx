import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  IconButton,
  Tooltip,
  Grow,
} from "@mui/material";
import RateReviewIcon from "@mui/icons-material/RateReview";
import { useEffect, useState } from "react";
import { Button, Stack, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { FieldValues, FormContainer, TextFieldElement } from "react-hook-form-mui";
import FormPendingSkeleton from "./FormPendingSkeleton";
import { ContactDto } from "../commonTypes/ContactT";
import { apiContact } from "../api";
import React from "react";
import { TransitionProps } from "@mui/material/transitions";

const defaultValues = {
  email: "",
  name: "",
  subject: "",
  message: "",
};

const SuccessType = styled(Typography)(({ theme }) => ({
  backgroundColor: theme.palette.success.light,
  padding: "1em",
  textAlign: "center",
}));

type SubmitStatusT = "success" | "pending" | "failed" | "initial";

const shouldRenderPlaceholder = (status: SubmitStatusT) =>
  status === "success" || status === "pending";

const PlaceHolder = (status: SubmitStatusT) => {
  return status === "success" ? (
    <SuccessType>Successfully sent message!</SuccessType>
  ) : (
    <FormPendingSkeleton />
  );
};

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Grow ref={ref} {...props} />;
});

export default function ContactFormButton() {
  const [openAlert, setOpenAlert] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<SubmitStatusT>("initial");
  const [errorMessage, setErrorMessage] = useState("");

  const handleClickOpen = () => {
    setOpenAlert(true);
  };

  const handleSubmit = (data: FieldValues) => {
    setSubmitStatus("pending");
    const contact = data as ContactDto;
    apiContact(contact)
      .then(() => {
        setSubmitStatus("success");
        setTimeout(() => {
          handleClose();
          setTimeout(() => {
            setSubmitStatus("initial");
          }, 100);
        }, 700);
      })
      .catch((err) => {
        setSubmitStatus("failed");
        setErrorMessage(err);
      });
  };

  const handleClose = () => {
    setOpenAlert(false);
  };

  useEffect(() => {
    console.log(errorMessage);
  }, [errorMessage]);

  return (
    <>
      <Dialog
        open={openAlert}
        onClose={handleClose}
        TransitionComponent={Transition}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Contact Us!</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            We welcome any feedback including feature requests, problems you have using the app,
            things you love, etc. We'll get back to you as soon as we see your message.
          </DialogContentText>
          <br />
          <Typography color={(theme) => theme.palette.error.dark}>{errorMessage}</Typography>
          {shouldRenderPlaceholder(submitStatus) ? (
            PlaceHolder(submitStatus)
          ) : (
            <FormContainer defaultValues={defaultValues} onSuccess={handleSubmit}>
              <Stack spacing={2}>
                <TextFieldElement required type="email" name="email" label="Email Address" />
                <TextFieldElement required type="text" name="name" label="Name" />
                <TextFieldElement required type="text" name="subject" label="Subject" />
                <TextFieldElement required multiline type="text" name="message" label="Message" />
                <Stack direction="row" justifyContent="end" spacing={2}>
                  <Button type="button" onClick={handleClose}>
                    Cancel
                  </Button>
                  <Button type="submit" variant="contained">
                    Submit
                  </Button>
                </Stack>
              </Stack>
            </FormContainer>
          )}
        </DialogContent>
      </Dialog>
      <Tooltip title="Contact/Feedback">
        <IconButton
          color="primary"
          size="medium"
          sx={{ position: "fixed", top: "6rem", right: "2rem" }}
          onClick={handleClickOpen}
        >
          <RateReviewIcon fontSize="large" />
        </IconButton>
      </Tooltip>
    </>
  );
}
