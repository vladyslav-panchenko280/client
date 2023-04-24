import type { Post } from "lib/types/postValidator";
import { POSTS_ENDPOINT } from "lib/constants/endpoints";

// Add new post
export const addPost = async (token: string, body: Post) => {
  return await fetch(POSTS_ENDPOINT, {
    method: "POST",
    mode: "cors",
    body: JSON.stringify(body),
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "x-access-token": token,
    },
  });
};
