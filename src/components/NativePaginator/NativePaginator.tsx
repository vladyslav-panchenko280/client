import { Paginator } from "primereact/paginator";
import { useDispatch } from "react-redux";
import type { PaginatorCurrentPageReportOptions } from "primereact/paginator";
import React from "react";
import { setCurrentPage } from "src/features/Posts/PostsCRUD";
import { useState } from "react";
import type { NativePaginatorProps } from "lib/interfaces/NativePaginator";

// Template for customizing the layout of the Paginator component
const template = {
  layout: "PrevPageLink PageLinks NextPageLink CurrentPageReport",
  CurrentPageReport: (options: PaginatorCurrentPageReportOptions) => {
    return (
      <span
        style={{
          color: "var(--text-color)",
          userSelect: "none",
          width: "120px",
          textAlign: "center",
        }}
      >
        {options.first} - {options.last} of {options.totalRecords}
      </span>
    );
  },
};

const NativePaginator: React.FC<NativePaginatorProps> = ({
  startIndex,
  pageSize,
  totalPosts,
  className,
}) => {
  const dispatch = useDispatch();
  const [first, setFirst] = useState(startIndex);
  return (
    <Paginator
      template={template}
      first={first}
      rows={pageSize}
      totalRecords={totalPosts}
      onPageChange={(e) => {
        dispatch(setCurrentPage(e.page + 1));
        setFirst(e.first);
        window.scrollTo({ top: 0, behavior: "smooth" });
      }}
      className={className}
    />
  );
};

export default NativePaginator;
