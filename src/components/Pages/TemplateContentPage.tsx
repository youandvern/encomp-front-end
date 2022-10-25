import { Box, Button, Tabs, Tab, TextField, Typography } from "@mui/material";
import React, { ChangeEvent, useEffect, useState } from "react";
import { apiFetchTemplateContent, apiUpdateTemplateContent } from "../../api";
import { TemplateContentDto } from "../../commonTypes/TemplateT";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { errorsActions } from "../../reduxSlices/errors";
import { getCurrentTemplate } from "../../reduxSlices/template";

const LOADING_TEXT = "Loading...";

// TabPanel ref https://mui.com/material-ui/react-tabs/
interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`template-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ marginTop: "2rem" }}>{children}</Box>}
    </div>
  );
}

export default function TemplateContentPage() {
  const currentTemplate = useAppSelector(getCurrentTemplate);
  const dispatch = useAppDispatch();

  const [value, setValue] = useState(0);
  const [content, setContent] = useState<TemplateContentDto>({
    id: currentTemplate?.id || 0,
    content: "",
  });
  const [displayContent, setDisplay] = useState(LOADING_TEXT);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const handleContentChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const contentUpdate = event.target.value;
    const realContent = !!contentUpdate && contentUpdate !== LOADING_TEXT;
    if (realContent) {
      setContent({ ...content, content: contentUpdate });
    }
    setDisplay(contentUpdate);
  };

  const updateContent = () => {
    apiUpdateTemplateContent(content).catch((err) => dispatch(errorsActions.throwError(err)));
  };

  // fetch and set content
  useEffect(() => {
    if (currentTemplate) {
      setDisplay("LOADING_TEXT");
      apiFetchTemplateContent(currentTemplate?.id)
        .then((cont) => {
          setContent({ id: currentTemplate?.id || 0, content: cont });
          setDisplay(cont);
        })
        .catch((err) => dispatch(errorsActions.throwError(err)));
    }
  }, [currentTemplate]);

  return (
    <>
      <Typography variant="h3">
        Template: {currentTemplate ? currentTemplate.name : "not selected"}
      </Typography>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs value={value} onChange={handleTabChange}>
          <Tab label="Save/Edit Content" id="template-tab-0" aria-controls="tabpanel-0" />
          <Tab label="Online Editor" id="template-tab-1" aria-controls="tabpanel-1" />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <TextField
          multiline
          fullWidth
          minRows={8}
          id="template-content-text"
          name="content"
          label="Template File Content"
          value={displayContent}
          onChange={handleContentChange}
        />
        <Button type="button" variant="contained" onClick={updateContent} sx={{ marginTop: "1em" }}>
          Save Changes
        </Button>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <p>Coming soon...</p>
      </TabPanel>
    </>
  );
}
