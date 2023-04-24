import { InputText } from "primereact/inputtext";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "src/app/store";
import { FC } from "react";
import { InputFormProps } from "lib/types/loginForm";
import { ChangeEvent } from "react";
import { setFormData, setErrorMessage } from "src/features/Login/loginService";

const InputForm: FC<InputFormProps> = ({ title, inputType }) => {
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

  return (
    <>
      <label
        htmlFor={title.toLowerCase()}
        className="block text-900 font-medium mb-2"
      >
        {title}
      </label>
      <InputText
        id={title.toLowerCase()}
        type={inputType}
        placeholder={`Enter ${title.toLowerCase()}`}
        className={
          errorMessage.message ? "w-full mb-3 p-invalid" : "w-full mb-3"
        }
        onChange={handleInputChange}
      />
    </>
  );
};

export default InputForm;
