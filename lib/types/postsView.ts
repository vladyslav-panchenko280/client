export interface SortOption {
  label: string;
  value: string;
}
export interface FilterOption {
  name: string;
  value: string;
}
export interface SelectedOptions {
  sortKey: string;
  sortOrder: 1 | -1 | null | undefined;
  sortField: string;
  filterKey: string;
  filterValue: string;
}

// Interface for defining the state shape
export interface PostsView {
  sortOptions: SortOption[];
  filterOptions: FilterOption[];
  selected: SelectedOptions;
}
