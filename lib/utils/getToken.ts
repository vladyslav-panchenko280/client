export const getToken = (): string => {
  // Get JWT token from session storage
  return sessionStorage.getItem("x-token") as string;
};
