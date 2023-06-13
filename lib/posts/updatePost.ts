import { Token } from "lib/interfaces/Token";
import type { Post, PostGuid } from "lib/interfaces/postValidator";
// Delete post
export const updatePost = async (token: Token, post: Post, id: PostGuid) => {
  return await fetch(`http://localhost:3010/api/posts/${id}`, {
    method: "PUT",
    body: JSON.stringify(post),
    mode: "cors",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "x-access-token": token,
    },
  }).catch((error) => error);
};
