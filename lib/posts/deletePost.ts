import { POSTS_ENDPOINT } from "lib/constants/endpoints";

// Delete post
export const deletePost = async (token: string, id: string | number) => {
  return await fetch(`${POSTS_ENDPOINT}/${id}`, {
    method: "DELETE",
    mode: "cors",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "x-access-token": token,
    },
  });
};
