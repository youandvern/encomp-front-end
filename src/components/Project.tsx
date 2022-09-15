import React from "react";
import ProjectT from "../commonTypes/Project";
import { useAppDispatch } from "../hooks";
import { projectsActions } from "../reduxSlices/projects";

interface Props {
  project: ProjectT;
}

export default function Project({ project }: Props) {
  const dispatch = useAppDispatch();
  return (
    <>
      <h3>{project.name}</h3>
      <p>{project.description}</p>
      <button onClick={() => dispatch(projectsActions.deleteAndGetProject(project.id))}>
        Delete
      </button>
    </>
  );
}
