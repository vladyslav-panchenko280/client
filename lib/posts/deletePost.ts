import { POSTS_ENDPOINT } from "lib/constants/endpoints";
import type { Token } from "lib/interfaces/Token";
import type { PostGuid } from "lib/interfaces/postValidator";

// Delete post
export const deletePost = async (token: Token, id: PostGuid) => {
  return await fetch(`${POSTS_ENDPOINT}/${id}`, {
    method: "DELETE",
    mode: "cors",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "x-access-token": token,
    },
  }).catch((error) => error);
};
