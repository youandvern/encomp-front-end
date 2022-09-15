import { Container } from "@mui/material";
import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks";
import Project from "../Project";
import { getProjects, projectsActions } from "../../reduxSlices/projects";
import CreateProjectForm from "../CreateProjectForm";

export default function ProjectsPage() {
  const projects = useAppSelector(getProjects);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(projectsActions.fetchProjects());
  }, []);

  return (
    <Container maxWidth="md" className="page-top-padding">
      <CreateProjectForm />
      <h1>Projects:</h1>
      {projects.map((project) => (
        <Project key={"project-" + project.id} project={project} />
      ))}
    </Container>
  );
}
