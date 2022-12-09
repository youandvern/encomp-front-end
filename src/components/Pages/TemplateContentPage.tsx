import { Button, Typography, FormControlLabel, Paper, Stack, Switch } from "@mui/material";
import { styled } from "@mui/material/styles";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Editor from "@monaco-editor/react";
import monaco from "monaco-editor";
import { apiFetchTemplateContent, apiUpdateTemplateContent } from "../../api";
import { TemplateContentDto } from "../../commonTypes/TemplateT";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { errorsActions } from "../../reduxSlices/errors";
import {
  getCurrentTemplate,
  getTemplateError,
  getTemplateRunResults,
  templatesActions,
} from "../../reduxSlices/template";
import CalcReport from "../CalcReport";
import DraggableDivider from "../DraggableDivider";

const LOADING_TEXT = "Loading....";

const ErrorDiv = styled("div")(({ theme }) => ({
  marginBlock: "1rem",
  backgroundColor: theme.palette.error.light,
  padding: "0.5rem",
  maxWidth: theme.breakpoints.values.lg,
  borderRadius: theme.shape.borderRadius,
}));

export default function TemplateContentPage() {
  const currentTemplate = useAppSelector(getCurrentTemplate);
  const currentTemplateRun = useAppSelector(getTemplateRunResults);
  const currentError = useAppSelector(getTemplateError);
  const dispatch = useAppDispatch();
  const templateId = Number(useParams().id);

  const [content, setContent] = useState<TemplateContentDto>({
    id: templateId || 0,
    content: "",
  });
  const [displayContent, setDisplay] = useState(LOADING_TEXT);
  const [darkMode, setDarkMode] = useState(true);
  const [previewCalc, setPreviewCalc] = useState(true);

  const handleSwitchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDarkMode(event.target.checked);
  };

  const handleSwitchChangePreview = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPreviewCalc(event.target.checked);
  };

  const handleContentChange = (
    value: string | undefined,
    ev: monaco.editor.IModelContentChangedEvent
  ) => {
    const contentUpdate = value == null ? displayContent : value;
    const realContent = !!contentUpdate && contentUpdate !== LOADING_TEXT;
    if (realContent) {
      setContent({ ...content, content: contentUpdate });
    }
    setDisplay(contentUpdate);
  };

  const updateContent = () => {
    dispatch(templatesActions.updateTemplateContent(content));
  };

  // Fetch all required data if not already in store i.e. direct page load
  useEffect(() => {
    if (templateId !== currentTemplate?.id && templateId) {
      dispatch(templatesActions.fetchTemplates());
      dispatch(templatesActions.setCurrentTemplate(templateId));
    }
  }, [templateId]);

  // fetch and set content
  useEffect(() => {
    if (templateId) {
      setDisplay(LOADING_TEXT);
      apiFetchTemplateContent(templateId)
        .then((cont) => {
          setContent({ id: templateId, content: cont });
          setDisplay(cont);
        })
        .catch((err) => dispatch(errorsActions.throwError(err)));
      dispatch(templatesActions.runTemplate(templateId));
    }
  }, [templateId]);

  const TemplateEditor = (
    <Editor
      height="90vh"
      defaultLanguage="python"
      defaultValue={displayContent}
      onChange={handleContentChange}
      theme={darkMode ? "vs-dark" : "light"}
    />
  );

  return (
    <>
      <Stack direction="row" padding="0.5rem">
        <Typography variant="h3" display="inline-block" paddingRight="2em">
          Template: {currentTemplate ? currentTemplate.name : "not selected"}
        </Typography>
        <FormControlLabel
          control={
            <Switch
              checked={darkMode}
              onChange={handleSwitchChange}
              inputProps={{ "aria-label": "dark-mode-switch" }}
            />
          }
          label="Dark Mode"
        />

        <FormControlLabel
          control={
            <Switch
              checked={previewCalc}
              onChange={handleSwitchChangePreview}
              inputProps={{ "aria-label": "preview-calculation-switch" }}
            />
          }
          label="Preview Calculation"
        />

        <Button type="button" variant="contained" onClick={updateContent}>
          Save Changes
        </Button>
      </Stack>

      {currentError && (
        <ErrorDiv>
          <Typography variant="h4" color={(theme) => theme.palette.error.dark}>
            Current Error:
          </Typography>
          <Typography>{currentError}</Typography>
        </ErrorDiv>
      )}

      {previewCalc ? (
        <DraggableDivider
          leftChild={displayContent === LOADING_TEXT ? <h3>{LOADING_TEXT}</h3> : TemplateEditor}
          rightChild={
            <Paper
              sx={{ height: "90vh", overflow: "auto", marginLeft: "0.5rem", maxWidth: "40vw" }}
            >
              <CalcReport runResults={currentTemplateRun?.items || []} />
            </Paper>
          }
        />
      ) : (
        TemplateEditor
      )}
    </>
  );
}
