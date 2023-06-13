import { BuildURI } from "lib/interfaces/postsView";
import { setQueryParams } from "src/features/Posts/PostsCRUD";
import { toggleFlag } from "src/features/Posts/PostsCRUD";

export const buildURI: BuildURI = (
  dispatch,
  currentPage,
  sortField,
  sortOrder,
  filterKey,
  filterValue
) => {
  dispatch(
    setQueryParams(
      `?page=${currentPage}&sortBy=${sortField}&sortOrder=${sortOrder}&filterBy=${filterKey}&filterValue=${encodeURIComponent(
        filterValue
      )}`
    )
  );
  dispatch(toggleFlag(true));
};
