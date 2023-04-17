// Delete post
export const deletePost = async (token: string, id: string | number) => {
  return await fetch(`http://localhost:3010/api/posts/${id}`, {
    method: "DELETE",
    mode: "cors",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "x-access-token": token,
    },
  });
};
