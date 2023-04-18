import React, { useEffect, useCallback, useState } from "react";
import { DataView } from "primereact/dataview";
import { getAllPosts } from "../../pages/api/crud/getAllPosts";
import { useDispatch, useSelector } from "react-redux";
import { getToken } from "../../pages/api/getToken";
import { RootState } from "../../store/store";
import { PostsViewHeader } from "./PostsViewHeader";
import { PostTemplate } from "./PostTemplate";
import {
  setPosts,
  setTotalPosts,
  setTotalPages,
  setPageSize,
  setCurrentPage,
  setPostsFound,
  setStartIndex,
  setQueryParams,
} from "../../features/Posts/PostsCRUD";
import NativePaginator from "./NativePaginator";
import Router from "next/router";

export interface Post {
  creator: string;
  title: string;
  link: string;
  pubDate: string;
  "dc:creator": string;
  content: string;
  contentSnippet: string;
  guid: string;
  categories: string[];
  isoDate: string;
}

export const PostsView = () => {
  const dispatch = useDispatch();

  const [queryParamsUpdated, setQueryParamsUpdated] = useState(false);

  const sortField = useSelector(
    (state: RootState) => state.postsView.selected.sortField
  );
  const sortOrder = useSelector(
    (state: RootState) => state.postsView.selected.sortOrder
  );

  const queryParams = useSelector(
    (state: RootState) => state.postsCRUD.queryParams
  );
  const posts = useSelector((state: RootState) => state.postsCRUD.postsData);
  const pageSize = useSelector(
    (state: RootState) => state.postsCRUD.postsInfo.pageSize
  );
  const totalPosts = useSelector(
    (state: RootState) => state.postsCRUD.postsInfo.totalPosts
  );
  const currentPage = useSelector(
    (state: RootState) => state.postsCRUD.postsInfo.currentPage
  );
  const startIndex = useSelector(
    (state: RootState) => state.postsCRUD.postsInfo.startIndex
  );

  const filterValue = useSelector(
    (state: RootState) => state.postsView.selected.filterValue
  );
  const filterKey = useSelector(
    (state: RootState) => state.postsView.selected.filterKey
  );

  const queryParamsInURL = useCallback(() => {
    dispatch(
      setQueryParams(
        `?page=${currentPage}&sortBy=${sortField}&sortOrder=${sortOrder}&filterBy=${filterKey}&filterValue=${encodeURIComponent(
          filterValue
        )}`
      )
    );
    setQueryParamsUpdated(true);
  }, [sortField, sortOrder, currentPage, filterValue, filterKey, startIndex]);

  const renderPage = useCallback(async () => {
    if (!queryParamsUpdated) {
      return;
    }
    const token = getToken();
      try {
        // Make API call to submit form data
        const response = await getAllPosts(token, queryParams);

        // Handle response
        if (response.status === 200) {
          const result = await response.json();
          // Get posts
          dispatch(setPosts(result.data));
          // Get total posts count
          dispatch(setTotalPosts(result.info.totalPosts));
          // Get total pages count
          dispatch(setTotalPages(result.info.totalPages));
          // Get all found posts
          dispatch(setPostsFound(result.info.postsFound));
          // Get start index
          dispatch(setStartIndex(result.info.startIndex));
          // Get page size
          dispatch(setPageSize(result.info.pageSize));
          // Get current page
          dispatch(setCurrentPage(result.info.currentPage));
        } else {
          Router.push("/login");
        }
      } catch (error) {
        console.error(error);
      }
  }, [queryParamsUpdated, queryParams, dispatch]);

  useEffect(() => {
    queryParamsInURL();
  }, [queryParamsInURL]);

  useEffect(() => {
    renderPage();
  }, [renderPage]);

  return (
    <div className="card w-full">
      <DataView
        value={posts}
        itemTemplate={PostTemplate}
        header={PostsViewHeader()}
      />
      <NativePaginator
        startIndex={startIndex}
        pageSize={pageSize}
        totalPosts={totalPosts}
        className="justify-conten-center mb-5 mt-5"
      />
    </div>
  );
}
export default PostsView;
