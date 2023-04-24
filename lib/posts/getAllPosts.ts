import { POSTS_ENDPOINT } from "lib/constants/endpoints";

// Dynamic async function which works with query params
export const getAllPosts = async (token: string, query?: string) => {
  if (!query) query = "";
  return await fetch(`${POSTS_ENDPOINT}${query}`, {
    method: "GET",
    mode: "cors",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "x-access-token": token,
    },
  });
};
