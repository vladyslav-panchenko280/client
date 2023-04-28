export type StartIndex = number;
export type PageSize = number;
export type TotalPosts = number;

export interface NativePaginatorProps {
  startIndex: StartIndex;
  pageSize: PageSize;
  totalPosts: TotalPosts;
  className: string;
}
