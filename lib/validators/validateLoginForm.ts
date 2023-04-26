import { object, string } from "yup";
import type { FormData } from "lib/types/loginForm";

export const loginFormSchema = object({
  username: string().required().max(100),
  password: string().required().max(100),
});

export const validateLoginForm = (formData: FormData) => {
  return loginFormSchema.isValid(formData);
};
