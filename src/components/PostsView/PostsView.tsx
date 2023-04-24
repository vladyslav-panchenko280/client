import React, { useEffect, useCallback, useState } from "react";
import { DataView } from "primereact/dataview";
import { getAllPosts } from "lib/posts/getAllPosts";
import { useDispatch, useSelector } from "react-redux";
import { getToken } from "lib/utils/getToken";
import { RootState } from "src/app/store";
import { PostsViewHeader } from "src/components/PostsView/PostsViewHeader";
import { PostTemplate } from "src/components/PostsView/PostTemplate";
import {
  setPosts,
  setTotalPosts,
  setTotalPages,
  setPageSize,
  setCurrentPage,
  setPostsFound,
  setStartIndex,
  setQueryParams,
} from "src/features/Posts/PostsCRUD";
import NativePaginator from "src/components/NativePaginator/NativePaginator";
import Router from "next/router";

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
        dispatch(setPosts(result.data.data));
        // Get total posts count
        dispatch(setTotalPosts(result.data.info.totalPosts));
        // Get total pages count
        dispatch(setTotalPages(result.data.info.totalPages));
        // Get all found posts
        dispatch(setPostsFound(result.data.info.postsFound));
        // Get start index
        dispatch(setStartIndex(result.data.info.startIndex));
        // Get page size
        dispatch(setPageSize(result.data.info.pageSize));
        // Get current page
        dispatch(setCurrentPage(result.data.info.currentPage));
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
};
export default PostsView;
