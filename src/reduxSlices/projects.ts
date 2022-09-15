import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AppDispatch, RootState } from "../store";
import ProjectT from "../commonTypes/Project";
import { StatusT } from "../commonTypes/Status";
import { apiDeleteProject, apiFetchProjects } from "../api";
import { errorsActions } from "./errors";

export const GET_PROJECTS = "GET_PROJECTS";
export const DELETE_PROJECT = "DELETE_PROJECT";

///
/// State
///

export interface ProjectsState {
  allProjects: ProjectT[];
  projectStatus: StatusT;
  actionSuccessful: boolean;
}

export const initialState: ProjectsState = {
  allProjects: [],
  projectStatus: "idle",
  actionSuccessful: true,
};

///
/// Actions
///

export const fetchProjects = createAsyncThunk(GET_PROJECTS, apiFetchProjects);
const deleteProject = createAsyncThunk(DELETE_PROJECT, async (id: number, thunkApi) => {
  let deleted: boolean;
  try {
    deleted = await apiDeleteProject(id);
  } catch (err) {
    console.log(err);
    deleted = false;
  }

  if (deleted) {
    return deleted;
  } else {
    thunkApi.dispatch(errorsActions.throwError("Failed to delete project."));
    return thunkApi.rejectWithValue(null);
  }
});

export const deleteAndGetProject = (id: number) => async (dispatch: AppDispatch) => {
  await dispatch(deleteProject(id));
  return await dispatch(fetchProjects());
};

///
/// Slice
///

export const projects = createSlice({
  name: "projects",
  initialState,
  reducers: {
    clearProjects: (state) => {
      state.allProjects = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProjects.pending, (state) => {
        state.projectStatus = "loading";
      })
      .addCase(fetchProjects.fulfilled, (state, action) => {
        state.projectStatus = "idle";
        state.allProjects = action.payload;
      })
      .addCase(fetchProjects.rejected, (state) => {
        state.projectStatus = "failed";
      })
      .addCase(deleteProject.fulfilled, (state, action) => {
        state.actionSuccessful = action.payload;
      })
      .addCase(deleteProject.rejected, (state) => {
        state.actionSuccessful = false;
      });
  },
});

///
/// Exports
///

export const getProjects = (state: RootState) => state.projects.allProjects;
export const getProjectsStatus = (state: RootState) => state.projects.projectStatus;

export const projectsActions = { ...projects.actions, fetchProjects, deleteAndGetProject };
export default projects.reducer;
