import { type ReactTable, type RowData } from "@tanstack/react-table";

import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";

import { Button } from "@/components/ui/button";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import type { DataTableFeatures } from "./dataTbaleFeature";

interface DataTablePaginationProps<TData extends RowData> {
  serverTable: boolean;

  table: ReactTable<DataTableFeatures, TData>;

  pageNumber: number;

  pageSize: number;

  totalRecords: number;

  totalPages: number;

  pageSizeOptions?: number[];

  onPageChange?: (page: number) => void;

  onPageSizeChange?: (pageSize: number) => void;
}

export function DataTablePagination<TData extends RowData>({
  serverTable,

  table,

  pageNumber,

  pageSize,

  totalRecords,

  totalPages,

  pageSizeOptions = [10, 20, 30, 40, 50],

  onPageChange,

  onPageSizeChange,
}: DataTablePaginationProps<TData>) {
  /**
   * ============================================================
   * PAGINATION STATE
   * ============================================================
   *
   * TanStack v9-style table uses atoms.
   */
  const pagination = table.atoms.pagination.get();

  /**
   * ============================================================
   * CURRENT PAGE
   * ============================================================
   */
  const currentPage = serverTable ? pageNumber : pagination.pageIndex + 1;

  /**
   * ============================================================
   * CURRENT PAGE SIZE
   * ============================================================
   */
  const currentPageSize = serverTable ? pageSize : pagination.pageSize;

  /**
   * ============================================================
   * TOTAL PAGES
   * ============================================================
   */
  const currentTotalPages = serverTable ? totalPages : table.getPageCount();

  /**
   * ============================================================
   * PREVIOUS / NEXT
   * ============================================================
   */
  const canPrevious = currentPage > 1;

  const canNext = currentPage < currentTotalPages;

  /**
   * ============================================================
   * PAGE CHANGE
   * ============================================================
   */
  const handlePageChange = (page: number) => {
    if (serverTable) {
      onPageChange?.(page);
      return;
    }

    table.setPageIndex(page - 1);
  };

  /**
   * ============================================================
   * PAGE SIZE CHANGE
   * ============================================================
   */
  const handlePageSizeChange = (size: number) => {
    if (serverTable) {
      onPageSizeChange?.(size);
      return;
    }

    table.setPageSize(size);
  };

  return (
    <div
      className="
        flex
        flex-col
        gap-4
        rounded-lg
        border
        border-border
        bg-card
        px-4
        py-3
        shadow-sm

        sm:flex-row
        sm:items-center
        sm:justify-between
      "
    >
      {/* ====================================================== */}
      {/* INFORMATION */}
      {/* ====================================================== */}

      <div
        className="
          flex
          items-center
          gap-2
          text-sm
          text-muted-foreground
        "
      >
        <span>
          Page{" "}
          <span className="font-semibold text-foreground">{currentPage}</span>{" "}
          of{" "}
          <span className="font-semibold text-foreground">
            {currentTotalPages || 1}
          </span>
        </span>

        <span className="text-border">•</span>

        <span>
          <span className="font-semibold text-foreground">{totalRecords}</span>{" "}
          rows
        </span>
      </div>

      {/* ====================================================== */}
      {/* CONTROLS */}
      {/* ====================================================== */}

      <div className="flex flex-wrap items-center gap-4">
        {/* ================================================== */}
        {/* ROWS PER PAGE */}
        {/* ================================================== */}

        <div className="flex items-center gap-2">
          <span
            className="
              whitespace-nowrap
              text-sm
              font-medium
              text-muted-foreground
            "
          >
            Rows per page
          </span>

          <Select
            value={String(currentPageSize)}
            onValueChange={(value) => {
              handlePageSizeChange(Number(value));
            }}
          >
            <SelectTrigger
              className="
                h-9
                w-[72px]
                border-border
                bg-background
                hover:border-primary
                focus:border-primary
                focus:ring-primary/20
              "
            >
              <SelectValue />
            </SelectTrigger>

            <SelectContent side="top">
              {pageSizeOptions.map((size) => (
                <SelectItem key={size} value={String(size)}>
                  {size}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* ================================================== */}
        {/* PAGINATION BUTTONS */}
        {/* ================================================== */}

        <div className="flex items-center gap-1">
          {/* First */}

          <Button
            variant="outline"
            size="icon"
            className="
              hidden
              size-9
              border-border
              hover:border-primary
              hover:bg-primary/10
              hover:text-primary
              disabled:opacity-40
              lg:flex
            "
            disabled={!canPrevious}
            onClick={() => handlePageChange(1)}
          >
            <span className="sr-only">Go to first page</span>

            <ChevronsLeft className="size-4" />
          </Button>

          {/* Previous */}

          <Button
            variant="outline"
            size="icon"
            className="
              size-9
              border-border
              hover:border-primary
              hover:bg-primary/10
              hover:text-primary
              disabled:opacity-40
            "
            disabled={!canPrevious}
            onClick={() => handlePageChange(currentPage - 1)}
          >
            <span className="sr-only">Go to previous page</span>

            <ChevronLeft className="size-4" />
          </Button>

          {/* Current page */}

          <div
            className="
              flex
              size-9
              items-center
              justify-center
              rounded-md
              bg-primary
              text-sm
              font-semibold
              text-primary-foreground
              shadow-sm
            "
          >
            {currentPage}
          </div>

          {/* Next */}

          <Button
            variant="outline"
            size="icon"
            className="
              size-9
              border-border
              hover:border-primary
              hover:bg-primary/10
              hover:text-primary
              disabled:opacity-40
            "
            disabled={!canNext}
            onClick={() => handlePageChange(currentPage + 1)}
          >
            <span className="sr-only">Go to next page</span>

            <ChevronRight className="size-4" />
          </Button>

          {/* Last */}

          <Button
            variant="outline"
            size="icon"
            className="
              hidden
              size-9
              border-border
              hover:border-primary
              hover:bg-primary/10
              hover:text-primary
              disabled:opacity-40
              lg:flex
            "
            disabled={!canNext}
            onClick={() => handlePageChange(currentTotalPages)}
          >
            <span className="sr-only">Go to last page</span>

            <ChevronsRight className="size-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
