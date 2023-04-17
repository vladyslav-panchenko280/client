import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

// Interfaces for defining types
export interface FormData {
  username: string;
  password: string;
}

export interface ErrorData {
  message: string;
}

// Interface for defining the state shape
export interface FormState {
  formData: FormData;
  errorMessage: ErrorData;
}

// Initial state for the state slice
const initialState: FormState = {
  formData: {
    username: "",
    password: "",
  },
  errorMessage: {
    message: "",
  },
};

// Create a Redux slice using createSlice from @reduxjs/toolkit
const formSlice = createSlice({
  name: "loginForm",
  initialState,
  reducers: {
    setFormData: (state, action: PayloadAction<FormData>) => {
      state.formData = action.payload;
    },
    setErrorMessage: (state, action: PayloadAction<ErrorData>) => {
      state.errorMessage = action.payload;
    },
    clearDataAndErrors: (state) => {
      state.formData = initialState.formData;
      state.errorMessage = initialState.errorMessage;
    },
  },
});

// Export the action creators generated by createSlice
export const { setFormData, setErrorMessage, clearDataAndErrors } =
  formSlice.actions;

// Export the reducer generated by createSlice
export default formSlice.reducer;
