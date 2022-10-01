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
}

export const initialState: ProjectsState = {
  allProjects: [],
  currentProject: null,
  projectStatus: "idle",
};

///
/// Actions
///

const fetchProjects = createAsyncThunk(GET_PROJECTS, async (_, thunkApi) => {
  try {
    return await apiFetchProjects();
  } catch (err) {
    // display api call error message
    thunkApi.dispatch(errorsActions.throwError(`${err}`));
    return thunkApi.rejectWithValue(null);
  }
});

// TODO: fetch user on app mount, logout if 401
const createProject = createAsyncThunk(CREATE_PROJECT, async (projectDto: ProjectDto, thunkApi) => {
  try {
    return await apiCreateProject(projectDto);
  } catch (err) {
    thunkApi.dispatch(errorsActions.throwError(`${err}`));
    return thunkApi.rejectWithValue(null);
  }
});

const createAndGetProject = (projectDto: ProjectDto) => async (dispatch: AppDispatch) => {
  await dispatch(createProject(projectDto));
  return await dispatch(fetchProjects());
};

const deleteProject = createAsyncThunk(DELETE_PROJECT, async (id: number, thunkApi) => {
  try {
    return await apiDeleteProject(id);
  } catch (err) {
    thunkApi.dispatch(errorsActions.throwError(`${err}`));
    return thunkApi.rejectWithValue(null);
  }
});

const deleteAndGetProject = (id: number) => async (dispatch: AppDispatch) => {
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
    clearProjectState: () => initialState,
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
        state.projectStatus = "idle";
      })
      .addCase(createProject.pending, (state) => {
        state.projectStatus = "loading";
      })
      .addCase(createProject.rejected, (state) => {
        state.projectStatus = "failed";
      })
      .addCase(deleteProject.fulfilled, (state, action) => {
        state.projectStatus = "idle";
      })
      .addCase(deleteProject.pending, (state) => {
        state.projectStatus = "loading";
      })
      .addCase(deleteProject.rejected, (state) => {
        state.projectStatus = "failed";
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
