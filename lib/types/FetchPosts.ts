import type { PostsInfo } from "lib/types/postsCRUD";
import type { Post } from "lib/types/postValidator";

export interface FetchPostsInterface {
  data: Post[];
  info: PostsInfo;
}
