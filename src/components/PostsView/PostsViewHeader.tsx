import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { useRef } from "react";
import type { RootState } from "src/app/store";
import { Dropdown } from "primereact/dropdown";
import {
  sortChange,
  setFilterKey,
  setFilterValue,
} from "src/features/Posts/PostsView";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { addPost } from "lib/posts/addPost";
import { getToken } from "lib/utils/getToken";
import ModalPost from "src/components/ModalPost/ModalPost";

const PostsViewHeader = () => {
  const dispatch = useDispatch();

  const sortKey = useSelector(
    (state: RootState) => state.postsView.selected.sortKey
  );

  const sortOptions = useSelector(
    (state: RootState) => state.postsView.sortOptions
  );
  const filterKey = useSelector(
    (state: RootState) => state.postsView.selected.filterKey
  );
  const filterOptions = useSelector(
    (state: RootState) => state.postsView.filterOptions
  );

  const postState = useSelector(
    (state: RootState) => state.postValidator,
    shallowEqual
  );

  const submitFunc = async () => {
    const token = getToken();
    return await addPost(token, postState);
  };

  const inputRef = useRef<HTMLInputElement>(null);
  return (
    <div className="flex flex-column justify-content-between xl:flex-row">
      <div className="flex gap-3">
        <Dropdown
          options={sortOptions}
          value={sortKey}
          optionLabel="label"
          placeholder={sortOptions[0].label}
          onChange={(event) => dispatch(sortChange(event.value))}
          className="min-w-0"
        />
        <ModalPost
          data={postState}
          submitFunc={submitFunc}
          icon={"pi pi-plus"}
          label="New post"
        />
      </div>
      <div className="p-inputgroup flex min-w-0 w-auto">
        <Dropdown
          value={filterKey}
          onChange={(event) => {
            dispatch(setFilterKey(event.value));
          }}
          options={filterOptions}
          optionLabel="name"
          placeholder={filterKey === "" ? "Select filter criteria" : filterKey}
          className="w-1 md:w-14rem"
        />
        <InputText
          placeholder="Search"
          ref={inputRef}
          className="w-5 md:w-14rem"
        />
        <Button
          label="Search"
          onClick={() => {
            dispatch(setFilterValue(inputRef.current?.value ?? ""));
          }}
        />
      </div>
    </div>
  );
};

export { PostsViewHeader };
