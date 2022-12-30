import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks";
import Project from "../Project";
import { getCurrentProject, getProjects, projectsActions } from "../../reduxSlices/projects";
import CreateProjectForm from "../Forms/CreateProjectForm";
import { Box, Stack, Grid, Typography, Container } from "@mui/material";
import { styled } from "@mui/material/styles";
import AddCircleOutlineRoundedIcon from "@mui/icons-material/AddCircleOutlineRounded";
import CreateCalculationForm from "../Forms/CreateCalculationForm";
import Calculation from "../CalculationForProject";
import { templatesActions } from "../../reduxSlices/template";
import FormDialog from "../FormDialog";

const ProjectStack = styled(Stack)(({ theme }) => ({
  flexWrap: "nowrap",
  [theme.breakpoints.down("md")]: {
    flexWrap: "wrap",
  },
}));

export default function ProjectsPage() {
  const projects = useAppSelector(getProjects);
  const currentProject = useAppSelector(getCurrentProject);
  const dispatch = useAppDispatch();

  const projectSelected = !!currentProject;
  const projectWithZeroCalculations = currentProject && currentProject.calculations.length === 0;

  useEffect(() => {
    dispatch(projectsActions.fetchProjects());
    dispatch(templatesActions.fetchTemplates());
  }, []);

  return (
    <Container
      maxWidth="xl"
      sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <ProjectStack direction="row" spacing={0}>
        <Box marginTop="2rem">
          <Stack direction="row">
            <Typography variant="h2">Projects:</Typography>
            <FormDialog
              FormComponent={CreateProjectForm}
              ButtonComponent={<AddCircleOutlineRoundedIcon fontSize="large" color="success" />}
            />
          </Stack>
          <Stack>
            {projects.map((project) => (
              <Project key={"project-" + project.id} project={project} />
            ))}
          </Stack>
        </Box>
        <Box
          marginTop="2rem"
          sx={{
            backgroundColor: currentProject !== null ? "secondary.light" : undefined,
            padding: "1rem",
            paddingTop: "0px",
            borderRadius: "0.5rem",
          }}
        >
          <Stack direction="row">
            <Typography variant="h2">Calculations:</Typography>
            <FormDialog
              FormComponent={CreateCalculationForm}
              ButtonComponent={<AddCircleOutlineRoundedIcon fontSize="large" color="success" />}
            />
          </Stack>
          {!projectSelected && <Typography variant="h5">Select a project.</Typography>}
          {projectWithZeroCalculations && (
            <Typography variant="h5">This project does not have any calculations yet.</Typography>
          )}

          <Stack spacing={2} sx={{ marginTop: "1rem" }}>
            {currentProject?.calculations.map((calculation) => (
              <Calculation key={"calculation-" + calculation.id} calculation={calculation} />
            ))}
          </Stack>
        </Box>
      </ProjectStack>
    </Container>
  );
}
