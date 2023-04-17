import { useDispatch, useSelector } from "react-redux";
import { useRef } from "react";
import type { RootState } from "../../store/store";
import { Dropdown } from "primereact/dropdown";
import {
  sortChange,
  setFilterKey,
  setFilterValue,
} from "../../features/Posts/PostsView";
import { ModalPost } from "./ModalPost";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";

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
        <ModalPost></ModalPost>
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
