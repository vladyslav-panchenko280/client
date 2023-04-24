export interface FormData {
  username: string;
  password: string;
}

export interface ErrorData {
  message: string;
}

export interface FormState {
  formData: FormData;
  errorMessage: ErrorData;
}

export interface InputFormProps {
  title: string;
  inputType: string;
}
