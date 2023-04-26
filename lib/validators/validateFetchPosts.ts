import { object, string, array, number } from "yup";
import type { FetchPostsInterface } from "lib/types/FetchPosts";

export const fetchPostsSchema = object({
  data: array().of(
    object({
      creator: string().required().max(100),
      title: string().required().max(180),
      link: string().required().max(300),
      pubDate: string().required().max(100),
      "dc:creator": string().required().max(100),
      content: string().required(),
      contentSnippet: string().required(),
      guid: string().required().length(10),
      categories: array().of(string()).max(50),
      isoDate: string().required().max(100),
    })
  ),
  info: object({
    currentPage: number().required(),
    pageSize: number().required(),
    startIndex: number().required(),
    totalPages: number().required(),
    totalPosts: number().required(),
  }),
});

export const validateFetchPosts = async (data: FetchPostsInterface) => {
  return fetchPostsSchema.isValid(data);
};
