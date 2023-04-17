import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { ChangeEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setFormData,
  setErrorMessage,
} from "../../features/Login/loginService";
import { RootState } from "../../store/store";
import { useRouter } from "next/router";
import { FormData } from "../../features/Login/loginService";
import { login } from "../../pages/api/login";

// Login Form
const LoginForm = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const formData = useSelector((state: RootState) => state.loginForm.formData);
  const errorMessage = useSelector(
    (state: RootState) => state.loginForm.errorMessage
  );

  // Handle input changing while user typing
  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { id, value } = event.target;

    // Dynamically change form data
    dispatch(
      setFormData({
        ...formData,
        [id]: value,
      })
    );

    // Clear error message
    dispatch(setErrorMessage({ message: "" }));
  };

  // Async submit more function, which handle many errors
  const submitForm = async (formData: FormData) => {
    try {
      // Make API call to submit form data
      const response = await login(formData);

      // Handle response
      if (response.status === 200) {
        const result = await response.json();
        // Save our token
        sessionStorage.setItem("x-token", result);
        // Redirect to index page
        router.push("/");
      } else {
        const errorResult = await response.json();
        dispatch(setErrorMessage(errorResult));
      }
    } catch (error) {
      dispatch(
        setErrorMessage({
          message: "Failed to submit the form. Please try again.",
        })
      );
    }
  };

  return (
    <div className="flex align-items-center justify-content-center w-full mb-8">
      <div className="surface-card p-7 shadow-2 border-round w-full lg:w-6">
        <div className="text-center mb-5">
          <div className="text-900 text-3xl font-medium mb-3">Welcome Back</div>
        </div>

        <div>
          <label htmlFor="username" className="block text-900 font-medium mb-2">
            Email
          </label>
          <InputText
            id="username"
            type="text"
            placeholder={"Enter username"}
            className={
              errorMessage.message ? "w-full mb-3 p-invalid" : "w-full mb-3"
            }
            onChange={handleInputChange}
          />

          <label htmlFor="password" className="block text-900 font-medium mb-2">
            Password
          </label>
          <InputText
            id="password"
            type="password"
            placeholder={"Enter password"}
            className={
              errorMessage.message ? "w-full mb-3 p-invalid" : "w-full mb-3"
            }
            onChange={handleInputChange}
          />

          <Button
            onClick={async () => await submitForm(formData)}
            label="Sign In"
            icon="pi pi-user"
            className="w-full mb-3 p-ripple"
          />
          {errorMessage.message !== "" && (
            <div className="text-pink-500">{errorMessage.message}</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
