import { useDispatch, useSelector } from "react-redux";
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
import { setVisible, setSubmitFunc } from "src/features/Posts/ModalPost";
import type { HandleAddButton } from "lib/interfaces/postsView";

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

  const posts = useSelector((state: RootState) => state.postsCRUD.postsData);

  const handleInputsState = () => {
    if (posts.length !== 0) {
      return false;
    } else {
      return true;
    }
  };

  const handleAddButton: HandleAddButton = () => {
    dispatch(setVisible(true));
    dispatch(setSubmitFunc(addPost));
  };

  const inputRef = useRef<HTMLInputElement>(null);
  return (
    <div className="flex gap-4 flex-column justify-content-between xl:flex-row">
      <div className="flex gap-3">
        <Dropdown
          options={sortOptions}
          value={sortKey}
          optionLabel="label"
          placeholder={sortOptions[0].label}
          onChange={(event) => dispatch(sortChange(event.value))}
          className="min-w-0"
          disabled={handleInputsState()}
        />
        <Button
          label={"New post"}
          icon={"pi pi-plus"}
          className="mr-2"
          onClick={handleAddButton}
          disabled={handleInputsState()}
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
          disabled={handleInputsState()}
        />
        <InputText
          placeholder="Search"
          ref={inputRef}
          className="w-5 md:w-14rem"
          disabled={handleInputsState()}
        />
        <Button
          label="Search"
          onClick={() => {
            dispatch(setFilterValue(inputRef.current?.value ?? ""));
          }}
          disabled={handleInputsState()}
        />
      </div>
    </div>
  );
};

export { PostsViewHeader };
