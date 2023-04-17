// Dynamic async function which works with query params
export const getAllPosts = async (token: string, query?: string) => {
  if (!query) query = "";
  return await fetch(`http://localhost:3010/api/posts${query}`, {
    method: "GET",
    mode: "cors",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "x-access-token": token,
    },
  });
};
