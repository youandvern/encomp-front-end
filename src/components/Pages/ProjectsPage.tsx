import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks";
import Project from "../Project";
import { getCurrentProject, getProjects, projectsActions } from "../../reduxSlices/projects";
import CreateProjectForm from "../CreateProjectForm";
import { Stack, Grid, Typography } from "@mui/material";
import CreateCalculationForm from "../CreateCalculationForm";
import Calculation from "../CalculationForProject";

export default function ProjectsPage() {
  const projects = useAppSelector(getProjects);
  const currentProject = useAppSelector(getCurrentProject);
  const dispatch = useAppDispatch();

  const projectSelected = !!currentProject;
  const projectWithZeroCalculations = currentProject && currentProject.calculations.length === 0;

  useEffect(() => {
    dispatch(projectsActions.fetchProjects());
  }, []);

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={6}>
        <CreateProjectForm />
      </Grid>
      <Grid item xs={12} sm={6}>
        <CreateCalculationForm />
      </Grid>
      <Grid item xs={12} sm={6}>
        <Typography variant="h2">Projects:</Typography>
      </Grid>
      <Grid item xs={12} sm={6}>
        <Typography variant="h2">Calculations:</Typography>
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
  );
}
