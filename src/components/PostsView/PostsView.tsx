import { useEffect, useCallback } from "react";
import type { FC } from "react";
import { DataView } from "primereact/dataview";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "src/app/store";
import { PostsViewHeader } from "src/components/PostsView/PostsViewHeader";
import { PostTemplate } from "src/components/PostsView/PostTemplate";
import { renderPosts } from "pages/api/posts/renderPosts";
import NativePaginator from "src/components/NativePaginator/NativePaginator";
import ModalPost from "src/components/ModalPost/ModalPost";
import { buildURI } from "pages/api/posts/buildURI";
import { SkeletonTemplate } from "./SkeletonTemplate";
import { postsSkeletonTemplateData } from "lib/constants/templates";

export const PostsView: FC = () => {
  const dispatch = useDispatch();

  const changeFlag = useSelector(
    (state: RootState) => state.postsCRUD.changeFlag
  );

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
    buildURI(
      dispatch,
      currentPage,
      sortField,
      sortOrder,
      filterKey,
      filterValue
    );
  }, [
    dispatch,
    currentPage,
    sortField,
    sortOrder,
    filterKey,
    filterValue,
    startIndex,
  ]);

  const renderPostsCallback = useCallback(() => {
    renderPosts(changeFlag, queryParams, dispatch);
  }, [changeFlag, queryParams, dispatch]);

  useEffect(() => {
    queryParamsInURL();
  }, [queryParamsInURL]);

  useEffect(() => {
    renderPostsCallback();
  }, [renderPostsCallback]);

  const validateLoadingValue = () => {
    if (posts.length === 0) {
      return postsSkeletonTemplateData;
    }
    return posts;
  };

  const validateLoadingTemplate = () => {
    if (posts.length === 0) {
      return SkeletonTemplate;
    }
    return PostTemplate;
  };

  return (
    <div className="card w-full">
      <ModalPost />
      <DataView
        value={validateLoadingValue()}
        itemTemplate={validateLoadingTemplate()}
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
