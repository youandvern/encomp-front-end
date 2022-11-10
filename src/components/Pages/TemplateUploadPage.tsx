import { Stack, Typography } from "@mui/material";
import AddCircleOutlineRoundedIcon from "@mui/icons-material/AddCircleOutlineRounded";
import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { getTemplates, templatesActions } from "../../reduxSlices/template";
import FormDialog from "../FormDialog";
import CreateTemplateForm from "../Forms/CreateTemplateForm";
import Template from "../Template";

export default function TemplateUploadPage() {
  const templates = useAppSelector(getTemplates);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(templatesActions.fetchTemplates());
  }, []);

  return (
    <>
      <Stack spacing={2} alignItems="center">
        <Stack direction="row">
          <Typography variant="h2">Templates: </Typography>
          <FormDialog
            FormComponent={CreateTemplateForm}
            ButtonComponent={<AddCircleOutlineRoundedIcon fontSize="large" color="success" />}
          />
        </Stack>
        {templates.map((template) => (
          <Template key={"template-" + template.id} template={template} />
        ))}
      </Stack>
    </>
  );
}
