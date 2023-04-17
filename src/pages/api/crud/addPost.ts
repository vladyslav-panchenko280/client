import { Post } from "../../../features/Posts/PostValidator";

// Add new post
export const addPost = async (token: string, body: Post) => {
  return await fetch(`http://localhost:3010/api/posts`, {
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
