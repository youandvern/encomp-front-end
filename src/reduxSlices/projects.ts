import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AppDispatch, RootState } from "../store";
import ProjectT, { ProjectDto } from "../commonTypes/Project";
import { StatusT } from "../commonTypes/Status";
import { apiCreateProject, apiDeleteProject, apiFetchProjects } from "../api";
import { errorsActions } from "./errors";

export const GET_PROJECTS = "GET_PROJECTS";
export const CREATE_PROJECT = "CREATE_PROJECT";
export const DELETE_PROJECT = "DELETE_PROJECT";

///
/// State
///

export interface ProjectsState {
  allProjects: ProjectT[];
  currentProject: ProjectT | null;
  projectStatus: StatusT;
  actionSuccessful: boolean;
}

export const initialState: ProjectsState = {
  allProjects: [],
  currentProject: null,
  projectStatus: "idle",
  actionSuccessful: true,
};

///
/// Actions
///

export const fetchProjects = createAsyncThunk(GET_PROJECTS, async (_, thunkApi) => {
  try {
    return await apiFetchProjects();
  } catch (err) {
    // display api call error message
    thunkApi.dispatch(errorsActions.throwError(`Failed to get projects: ${err}`));
    return thunkApi.rejectWithValue(null);
  }
});

// TODO: clean up these try/catch blocks, double logging error
const createProject = createAsyncThunk(CREATE_PROJECT, async (projectDto: ProjectDto, thunkApi) => {
  let project;
  try {
    project = await apiCreateProject(projectDto);
  } catch (err) {
    // log api call error message
    console.log(err);
  }

  // display pretty message
  if (project) {
    return project;
  } else {
    thunkApi.dispatch(errorsActions.throwError(`Failed to create project ${projectDto.name}.`));
    return thunkApi.rejectWithValue(null);
  }
});

export const createAndGetProject = (projectDto: ProjectDto) => async (dispatch: AppDispatch) => {
  await dispatch(createProject(projectDto));
  return await dispatch(fetchProjects());
};

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
        state.allProjects = action.payload ? action.payload : initialState.allProjects;
      })
      .addCase(fetchProjects.rejected, (state) => {
        state.projectStatus = "failed";
      })
      .addCase(createProject.fulfilled, (state, action) => {
        state.currentProject = action.payload;
        state.actionSuccessful = true;
      })
      .addCase(createProject.rejected, (state) => {
        state.actionSuccessful = false;
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

export const projectsActions = {
  ...projects.actions,
  fetchProjects,
  createAndGetProject,
  deleteAndGetProject,
};
export default projects.reducer;
