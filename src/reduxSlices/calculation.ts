import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppDispatch, RootState } from "../store";
import { StatusT } from "../commonTypes/StatusT";
import {
  apiCreateCalculation,
  apiDeleteCalculation,
  apiFetchCalculation,
  apiRunCalculation,
  apiUpdateCalculation,
} from "../api";
import { errorsActions } from "./errors";
import CalculationT, {
  CalculationDto,
  CalculationForProjectT,
  CalculationRunDto,
  CalculationRunResponse,
} from "../commonTypes/CalculationT";
import { projectsActions } from "./projects";

export const GET_CALCULATION = "GET_CALCULATION";
export const CREATE_CALCULATION = "CREATE_CALCULATION";
export const DELETE_CALCULATION = "DELETE_CALCULATION";
export const UPDATE_CALCULATION = "UPDATE_CALCULATION";
export const GET_RUN_CALCULATION = "GET_RUN_CALCULATION";
export const RUN_CALCULATION = "RUN_CALCULATION";

///
/// State
///

export interface CalculationState {
  currentCalculation: CalculationT | null;
  calculationStatus: StatusT;
  calculationRunResults: CalculationRunResponse | null;
  calculationRunStatus: StatusT;
}

export const initialState: CalculationState = {
  currentCalculation: null,
  calculationStatus: "idle",
  calculationRunResults: null,
  calculationRunStatus: "idle",
};

///
/// Actions
///

const fetchCalculation = createAsyncThunk(GET_CALCULATION, async (calcId: number, thunkApi) => {
  try {
    return await apiFetchCalculation(calcId);
  } catch (err) {
    // display api call error message
    thunkApi.dispatch(errorsActions.throwError(`${err}`));
    return thunkApi.rejectWithValue(null);
  }
});

const createCalculation = createAsyncThunk(
  CREATE_CALCULATION,
  async (calculationDto: CalculationDto, thunkApi) => {
    try {
      return await apiCreateCalculation(calculationDto);
    } catch (err) {
      thunkApi.dispatch(errorsActions.throwError(`${err}`));
      return thunkApi.rejectWithValue(null);
    }
  }
);

const createAndGetCalculation =
  (calculationDto: CalculationDto) => async (dispatch: AppDispatch) => {
    await dispatch(createCalculation(calculationDto));
    return await dispatch(projectsActions.fetchProjects());
  };

const deleteCalculation = createAsyncThunk(DELETE_CALCULATION, async (id: number, thunkApi) => {
  try {
    const state = thunkApi.getState() as RootState;
    if (state.calculation.currentCalculation?.id === id)
      thunkApi.dispatch(calculationActions.clearCalculationState());
    return await apiDeleteCalculation(id);
  } catch (err) {
    thunkApi.dispatch(errorsActions.throwError(`${err}`));
    return thunkApi.rejectWithValue(null);
  }
});

const deleteAndGetCalculation = (id: number) => async (dispatch: AppDispatch) => {
  await dispatch(deleteCalculation(id));
  return await dispatch(projectsActions.fetchProjects());
};

const updateCalculation = createAsyncThunk(
  UPDATE_CALCULATION,
  async (calculation: CalculationForProjectT, thunkApi) => {
    try {
      return await apiUpdateCalculation(calculation);
    } catch (err) {
      thunkApi.dispatch(errorsActions.throwError(`${err}`));
      return thunkApi.rejectWithValue(null);
    }
  }
);

const updateAndGetCalculation =
  (calculation: CalculationForProjectT) => async (dispatch: AppDispatch) => {
    await dispatch(updateCalculation(calculation));
    return await dispatch(projectsActions.fetchProjects());
  };

const getCalculationItems = createAsyncThunk(GET_RUN_CALCULATION, async (id: number, thunkApi) => {
  try {
    return await apiRunCalculation({ id });
  } catch (err) {
    thunkApi.dispatch(errorsActions.throwError(`${err}`));
    return thunkApi.rejectWithValue(null);
  }
});

const runCalculation = createAsyncThunk(
  RUN_CALCULATION,
  async (calculationRunDto: CalculationRunDto, thunkApi) => {
    try {
      return await apiRunCalculation(calculationRunDto);
    } catch (err) {
      thunkApi.dispatch(errorsActions.throwError(`${err}`));
      return thunkApi.rejectWithValue(null);
    }
  }
);

///
/// Slice
///

export const calculation = createSlice({
  name: "calculation",
  initialState,
  reducers: {
    clearCalculationState: () => initialState,
    setCurrentCalculation: (state: CalculationState, action: PayloadAction<CalculationT>) => {
      state.currentCalculation = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCalculation.pending, (state) => {
        state.calculationStatus = "loading";
      })
      .addCase(fetchCalculation.fulfilled, (state, action) => {
        state.calculationStatus = "idle";
        state.currentCalculation = action.payload
          ? action.payload
          : initialState.currentCalculation;
      })
      .addCase(fetchCalculation.rejected, (state) => {
        state.calculationStatus = "failed";
      })
      .addCase(createCalculation.fulfilled, (state, action) => {
        state.calculationStatus = "idle";
      })
      .addCase(createCalculation.pending, (state) => {
        state.calculationStatus = "loading";
      })
      .addCase(createCalculation.rejected, (state) => {
        state.calculationStatus = "failed";
      })
      .addCase(deleteCalculation.fulfilled, (state, action) => {
        state.calculationStatus = "idle";
      })
      .addCase(deleteCalculation.pending, (state) => {
        state.calculationStatus = "loading";
      })
      .addCase(deleteCalculation.rejected, (state) => {
        state.calculationStatus = "failed";
      })
      .addCase(updateCalculation.fulfilled, (state, action) => {
        state.calculationStatus = "idle";
      })
      .addCase(updateCalculation.pending, (state) => {
        state.calculationStatus = "loading";
      })
      .addCase(updateCalculation.rejected, (state) => {
        state.calculationStatus = "failed";
      })
      .addCase(getCalculationItems.pending, (state) => {
        state.calculationRunStatus = "loading";
      })
      .addCase(getCalculationItems.fulfilled, (state, action) => {
        state.calculationRunStatus = "idle";
        state.calculationRunResults = action.payload;
      })
      .addCase(getCalculationItems.rejected, (state) => {
        state.calculationRunStatus = "failed";
      })
      .addCase(runCalculation.pending, (state) => {
        state.calculationRunStatus = "loading";
      })
      .addCase(runCalculation.fulfilled, (state, action) => {
        state.calculationRunStatus = "idle";
        state.calculationRunResults = action.payload;
      })
      .addCase(runCalculation.rejected, (state) => {
        state.calculationRunStatus = "failed";
      });
  },
});

///
/// Exports
///

export const getCalculationStatus = (state: RootState) => state.calculation.calculationStatus;
export const getCurrentCalculation = (state: RootState) => state.calculation.currentCalculation;
export const getCalculationRunStatus = (state: RootState) => state.calculation.calculationRunStatus;
export const getCalculationRunResults = (state: RootState) =>
  state.calculation.calculationRunResults;

export const calculationActions = {
  ...calculation.actions,
  fetchCalculation,
  createAndGetCalculation,
  deleteAndGetCalculation,
  updateAndGetCalculation,
  getCalculationItems,
  runCalculation,
};
export default calculation.reducer;
