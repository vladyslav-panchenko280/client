import { Button } from "primereact/button";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "src/app/store";
import { submitForm } from "pages/api/auth/submitForm";
import { useRouter } from "next/router";
import { validateLoginForm } from "lib/validators/validateLoginForm";
import InputForm from "./InputForm";
import { setErrorMessage } from "src/features/Login/loginService";

// Login Form
const LoginForm = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const formData = useSelector((state: RootState) => state.loginForm.formData);
  const errorMessage = useSelector(
    (state: RootState) => state.loginForm.errorMessage
  );

  return (
    <div className="flex align-items-center justify-content-center w-full mb-8">
      <div className="surface-card p-7 shadow-2 border-round w-full lg:w-6">
        <div className="text-center mb-5">
          <div className="text-900 text-3xl font-medium mb-3">Welcome Back</div>
        </div>

        <div>
          <InputForm title="Username" inputType="text" />

          <InputForm title="Password" inputType="password" />

          <Button
            onClick={async () => {
              if (await validateLoginForm(formData)) {
                await submitForm(router, dispatch, formData);
              } else {
                dispatch(setErrorMessage({ message: "" }));
              }
            }}
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
