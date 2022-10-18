import { Stack } from "@mui/material";
import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { getTemplates, templatesActions } from "../../reduxSlices/template";
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
      <CreateTemplateForm />
      <Stack spacing={2} alignItems="center" marginTop="2rem">
        {templates.map((template) => (
          <Template key={"template-" + template.id} template={template} />
        ))}
      </Stack>
    </>
  );
}
