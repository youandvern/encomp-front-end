import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks";
import Project from "../Project";
import { getCurrentProject, getProjects, projectsActions } from "../../reduxSlices/projects";
import CreateProjectForm from "../Forms/CreateProjectForm";
import { Stack, Grid, Typography, Container } from "@mui/material";
import AddCircleOutlineRoundedIcon from "@mui/icons-material/AddCircleOutlineRounded";
import CreateCalculationForm from "../Forms/CreateCalculationForm";
import Calculation from "../CalculationForProject";
import { templatesActions } from "../../reduxSlices/template";
import FormDialog from "../FormDialog";

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
    <Container maxWidth="md" sx={{ marginTop: "1rem" }}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Stack direction="row">
            <Typography variant="h2">Projects:</Typography>
            <FormDialog
              FormComponent={CreateProjectForm}
              ButtonComponent={<AddCircleOutlineRoundedIcon fontSize="large" color="success" />}
            />
          </Stack>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Stack direction="row">
            <Typography variant="h2">Calculations:</Typography>
            <FormDialog
              FormComponent={CreateCalculationForm}
              ButtonComponent={<AddCircleOutlineRoundedIcon fontSize="large" color="success" />}
            />
          </Stack>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Stack>
            {projects.map((project) => (
              <Project key={"project-" + project.id} project={project} />
            ))}
          </Stack>
        </Grid>
        <Grid
          item
          xs={12}
          sm={6}
          sx={{
            backgroundColor: currentProject !== null ? "secondary.light" : undefined,
            padding: "1rem",
            borderRadius: "0.5rem",
          }}
        >
          {!projectSelected && <Typography variant="h5">Select a project.</Typography>}
          {projectWithZeroCalculations && (
            <Typography variant="h5">This project does not have any calculations yet.</Typography>
          )}

          <Stack spacing={2} sx={{ marginTop: "1rem" }}>
            {currentProject?.calculations.map((calculation) => (
              <Calculation key={"calculation-" + calculation.id} calculation={calculation} />
            ))}
          </Stack>
        </Grid>
      </Grid>
    </Container>
  );
}
