import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppDispatch, RootState } from "../store";
import { apiCreateTemplate, apiDeleteTemplate, apiFetchTemplates, apiUpdateTemplate } from "../api";
import { errorsActions } from "./errors";

import TemplateT, { TemplateDto } from "../commonTypes/TemplateT";

export const GET_TEMPLATES = "GET_TEMPLATES";
export const CREATE_TEMPLATE = "CREATE_TEMPLATE";
export const DELETE_TEMPLATE = "DELETE_TEMPLATE";
export const UPDATE_TEMPLATE = "UPDATE_TEMPLATE";

///
/// State
///

export interface TemplateState {
  currentTemplateId: number | null;
  allTemplates: TemplateT[];
  templateStatus: string;
}

export const initialState: TemplateState = {
  currentTemplateId: null,
  allTemplates: [],
  templateStatus: "idle",
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
      });
  },
});

///
/// Exports
///

export const getTemplates = (state: RootState) => state.templates.allTemplates;
export const getTemplatesStatus = (state: RootState) => state.templates.templateStatus;
export const getCurrentTemplateId = (state: RootState) => state.templates.currentTemplateId;
export const getCurrentTemplate = (state: RootState) =>
  state.templates.currentTemplateId === null
    ? null
    : state.templates.allTemplates.find(
        (template) => template.id === state.templates.currentTemplateId
      );

export const templatesActions = {
  ...templates.actions,
  fetchTemplates,
  createAndGetTemplate,
  deleteAndGetTemplate,
  updateAndGetTemplate,
};
export default templates.reducer;
