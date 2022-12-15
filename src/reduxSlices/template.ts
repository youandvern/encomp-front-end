import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppDispatch, RootState } from "../store";
import {
  apiCreateTemplate,
  apiDeleteTemplate,
  apiFetchTemplates,
  apiRunTemplate,
  apiUpdateTemplate,
  apiUpdateTemplateContent,
} from "../api";
import { errorsActions } from "./errors";

import TemplateT, { TemplateContentDto, TemplateDto } from "../commonTypes/TemplateT";
import { CalculationRunResponse } from "../commonTypes/CalculationT";
import { StatusT } from "../commonTypes/StatusT";

export const GET_TEMPLATES = "GET_TEMPLATES";
export const CREATE_TEMPLATE = "CREATE_TEMPLATE";
export const DELETE_TEMPLATE = "DELETE_TEMPLATE";
export const RUN_TEMPLATE = "RUN_TEMPLATE";
export const UPDATE_TEMPLATE = "UPDATE_TEMPLATE";
export const UPDATE_TEMPLATE_CONTENT = "UPDATE_TEMPLATE_CONTENT";

///
/// State
///

export interface TemplateState {
  currentTemplateId: number | null;
  allTemplates: TemplateT[];
  templateStatus: string;
  templateRunResults: CalculationRunResponse | null;
  templateRunStatus: StatusT;
  templateError: string;
}

export const initialState: TemplateState = {
  currentTemplateId: null,
  allTemplates: [],
  templateStatus: "idle",
  templateRunResults: null,
  templateRunStatus: "idle",
  templateError: "",
};

///
/// Actions
///

const fetchTemplates = createAsyncThunk(GET_TEMPLATES, async (_, thunkApi) => {
  try {
    return await apiFetchTemplates();
  } catch (err) {
    // display api call error message
    thunkApi.dispatch(errorsActions.throwError(`${err}`));
    return thunkApi.rejectWithValue(null);
  }
});

const createTemplate = createAsyncThunk(
  CREATE_TEMPLATE,
  async (templateDto: TemplateDto, thunkApi) => {
    try {
      return await apiCreateTemplate(templateDto);
    } catch (err) {
      thunkApi.dispatch(errorsActions.throwError(`${err}`));
      return thunkApi.rejectWithValue(null);
    }
  }
);

const createAndGetTemplate = (templateDto: TemplateDto) => async (dispatch: AppDispatch) => {
  await dispatch(createTemplate(templateDto));
  return await dispatch(templatesActions.fetchTemplates());
};

const deleteTemplate = createAsyncThunk(DELETE_TEMPLATE, async (id: number, thunkApi) => {
  try {
    const state = thunkApi.getState() as RootState;
    if (state.templates.currentTemplateId === id)
      thunkApi.dispatch(templatesActions.removeCurrentTemplate());
    return await apiDeleteTemplate(id);
  } catch (err) {
    thunkApi.dispatch(errorsActions.throwError(`${err}`));
    return thunkApi.rejectWithValue(null);
  }
});

const deleteAndGetTemplate = (id: number) => async (dispatch: AppDispatch) => {
  await dispatch(deleteTemplate(id));
  return await dispatch(templatesActions.fetchTemplates());
};

const updateTemplate = createAsyncThunk(UPDATE_TEMPLATE, async (template: TemplateT, thunkApi) => {
  try {
    return await apiUpdateTemplate(template);
  } catch (err) {
    thunkApi.dispatch(errorsActions.throwError(`${err}`));
    return thunkApi.rejectWithValue(null);
  }
});

const updateAndGetTemplate = (template: TemplateT) => async (dispatch: AppDispatch) => {
  await dispatch(updateTemplate(template));
  return await dispatch(templatesActions.fetchTemplates());
};

const updateTemplateContent = createAsyncThunk(
  UPDATE_TEMPLATE_CONTENT,
  async (content: TemplateContentDto, thunkApi) => {
    try {
      await apiUpdateTemplateContent(content);
      return "success";
    } catch (err) {
      thunkApi.dispatch(errorsActions.throwError(`${err}`));
      return thunkApi.rejectWithValue(`${err}`);
    }
  }
);

const runTemplate = createAsyncThunk(RUN_TEMPLATE, async (id: number, thunkApi) => {
  try {
    return await apiRunTemplate(id);
  } catch (err) {
    thunkApi.dispatch(errorsActions.throwError(`${err}`));
    return thunkApi.rejectWithValue(null);
  }
});

const updateAndRunContent = (content: TemplateContentDto) => async (dispatch: AppDispatch) => {
  await dispatch(updateTemplateContent(content));
  return await dispatch(templatesActions.runTemplate(content.id));
};

///
/// Slice
///

export const templates = createSlice({
  name: "templates",
  initialState,
  reducers: {
    clearTemplates: (state) => {
      state.allTemplates = [];
    },
    clearTemplatesState: () => initialState,
    removeCurrentTemplate: (state: TemplateState) => {
      state.currentTemplateId = null;
    },
    setCurrentTemplate: (state: TemplateState, action: PayloadAction<number>) => {
      state.currentTemplateId = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTemplates.pending, (state) => {
        state.templateStatus = "loading";
      })
      .addCase(fetchTemplates.fulfilled, (state, action) => {
        state.templateStatus = "idle";
        state.allTemplates = action.payload ? action.payload : initialState.allTemplates;
      })
      .addCase(fetchTemplates.rejected, (state) => {
        state.templateStatus = "failed";
      })
      .addCase(createTemplate.fulfilled, (state, action) => {
        state.currentTemplateId = action.payload.id;
        state.templateStatus = "idle";
      })
      .addCase(createTemplate.pending, (state) => {
        state.templateStatus = "loading";
      })
      .addCase(createTemplate.rejected, (state) => {
        state.templateStatus = "failed";
      })
      .addCase(deleteTemplate.fulfilled, (state, action) => {
        state.templateStatus = "idle";
      })
      .addCase(deleteTemplate.pending, (state) => {
        state.templateStatus = "loading";
      })
      .addCase(deleteTemplate.rejected, (state) => {
        state.templateStatus = "failed";
      })
      .addCase(updateTemplate.fulfilled, (state, action) => {
        state.currentTemplateId = action.payload.id;
        state.templateStatus = "idle";
      })
      .addCase(updateTemplate.pending, (state) => {
        state.templateStatus = "loading";
      })
      .addCase(updateTemplate.rejected, (state) => {
        state.templateStatus = "failed";
      })
      .addCase(updateTemplateContent.fulfilled, (state) => {
        state.templateStatus = "idle";
        state.templateError = "";
      })
      .addCase(updateTemplateContent.pending, (state) => {
        state.templateStatus = "loading";
      })
      .addCase(updateTemplateContent.rejected, (state, action) => {
        state.templateStatus = "failed";
        state.templateError = action.payload as string;
      })
      .addCase(runTemplate.pending, (state) => {
        state.templateRunStatus = "loading";
      })
      .addCase(runTemplate.fulfilled, (state, action) => {
        state.templateRunStatus = "idle";
        state.templateRunResults = action.payload;
      })
      .addCase(runTemplate.rejected, (state) => {
        state.templateRunStatus = "failed";
      });
  },
});

///
/// Exports
///

export const getTemplates = (state: RootState) => state.templates.allTemplates;
export const getTemplatesStatus = (state: RootState) => state.templates.templateStatus;
export const getTemplateError = (state: RootState) => state.templates.templateError;
export const getCurrentTemplateId = (state: RootState) => state.templates.currentTemplateId;
export const getCurrentTemplate = (state: RootState) =>
  state.templates.currentTemplateId === null
    ? null
    : state.templates.allTemplates.find(
        (template) => template.id === state.templates.currentTemplateId
      );
export const getTemplateRunResults = (state: RootState) => state.templates.templateRunResults;
export const getTemplateRunStatus = (state: RootState) => state.templates.templateRunStatus;

export const templatesActions = {
  ...templates.actions,
  fetchTemplates,
  createAndGetTemplate,
  deleteAndGetTemplate,
  updateAndGetTemplate,
  updateAndRunContent,
  runTemplate,
};
export default templates.reducer;
