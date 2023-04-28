export type FormUsername = string;
export type FormPassword = string;
export type FormError = string;
export type InputFormTitle = string;
export type InputFormType = string;

export interface FormData {
  username: FormUsername;
  password: FormPassword;
}

export interface ErrorData {
  message: FormError;
}

export interface FormState {
  formData: FormData;
  errorMessage: ErrorData;
}

export interface InputFormProps {
  title: InputFormTitle;
  inputType: InputFormType;
}
