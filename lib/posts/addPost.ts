import type { Post } from "lib/interfaces/postValidator";
import type { Token } from "lib/interfaces/Token";
import { POSTS_ENDPOINT } from "lib/constants/endpoints";

// Add new post
export const addPost = async (token: Token, body: Post) => {
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
