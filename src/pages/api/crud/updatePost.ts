import type { Post } from "../../../components/PostsView/PostsView";
// Delete post
export const updatePost = async (
  token: string,
  id: string | number,
  post: Post
) => {
  return await fetch(`http://localhost:3010/api/posts/${id}`, {
    method: "PUT",
    body: JSON.stringify(post),
    mode: "cors",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "x-access-token": token,
    },
  });
};
