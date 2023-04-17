import { FormData } from "../../features/Login/loginService";

// Standart login form
export const login = async ({ username, password }: FormData) => {
  return await fetch("http://localhost:3010/api/login", {
    method: "POST",
    mode: "cors",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username: username,
      password: password,
    }),
  });
};
