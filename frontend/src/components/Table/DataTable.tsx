import { type ColumnDef, type RowData, useTable } from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { ArrowDown, ArrowUp, ArrowUpDown } from "lucide-react";

import { features, type DataTableFeatures } from "./dataTbaleFeature";

import { DataTablePagination } from "./DataTablePagination";

interface DataTableProps<TData extends RowData> {
  columns: ColumnDef<DataTableFeatures, TData>[];

  /**
   * Client:
   *   data contains ALL records.
   *
   * Server:
   *   data contains ONLY the current API page.
   */
  data: TData[];

  /**
   * false = client-side pagination
   * true  = server-side pagination
   */
  serverTable?: boolean;

  /**
   * Number of rows per page.
   */
  pageSize?: number;

  pageSizeOptions?: number[];

  /**
   * Server-side pagination values.
   */
  pageNumber?: number;

  totalRecords?: number;

  totalPages?: number;

  /**
   * Called only for server-side pagination.
   */
  onPageChange?: (page: number) => void;

  /**
   * Called when page size changes.
   */
  onPageSizeChange?: (pageSize: number) => void;

  searchable?: boolean;
}

export function DataTable<TData extends RowData>({
  columns,
  data,

  serverTable = false,

  pageSize = 10,

  pageSizeOptions = [10, 20, 30, 40, 50],

  pageNumber = 1,

  totalRecords,

  totalPages,

  onPageChange,

  onPageSizeChange,

  searchable,
}: DataTableProps<TData>) {
  /**
   * ============================================================
   * SERIAL NUMBER COLUMN
   * ============================================================
   *
   * Client:
   *
   * Page 1 → 1,2,3...10
   * Page 2 → 11,12,13...20
   *
   * Server:
   *
   * API page 1 → 1,2,3...10
   * API page 2 → 11,12,13...20
   */
  const snColumn: ColumnDef<DataTableFeatures, TData> = {
    id: "SN",

    header: "SN",

    enableSorting: false,

    cell: ({ row }) => {
      if (serverTable) {
        return (pageNumber - 1) * pageSize + row.index + 1;
      }

      return row.getDisplayIndex() + 1;
    },
  };

  /**
   * ============================================================
   * TABLE
   * ============================================================
   */
  const table = useTable({
    features,

    data,

    columns: [snColumn, ...columns],

    initialState: {
      pagination: {
        pageIndex: serverTable ? pageNumber - 1 : 0,

        pageSize,
      },
    },

    /**
     * Server-side pagination.
     *
     * TanStack should NOT paginate the API result again.
     */
    ...(serverTable
      ? {
          manualPagination: true,

          pageCount: totalPages ?? 0,

          rowCount: totalRecords ?? 0,
        }
      : {}),
  });

  /**
   * ============================================================
   * ROWS
   * ============================================================
   *
   * Client:
   *   getRowModel() returns current page.
   *
   * Server:
   *   getRowModel() returns API's current page.
   */
  const rows = table.getRowModel().rows;

  /**
   * ============================================================
   * TOTAL RECORDS
   * ============================================================
   */
  const totalRowCount = serverTable ? (totalRecords ?? 0) : data.length;

  /**
   * ============================================================
   * TOTAL PAGES
   * ============================================================
   */
  const calculatedTotalPages = serverTable
    ? (totalPages ?? 0)
    : Math.ceil(data.length / pageSize);

  return (
    <div className="space-y-4">
      {/* ====================================================== */}
      {/* TABLE */}
      {/* ====================================================== */}

      <div
        className="
          overflow-hidden
          rounded-lg
          border
          border-border
          bg-card
          shadow-sm
        "
      >
        <Table>
          {/* ================================================== */}
          {/* HEADER */}
          {/* ================================================== */}

          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow
                key={headerGroup.id}
                className="
                    border-border
                    bg-muted/50
                    hover:bg-muted/50
                  "
              >
                {headerGroup.headers.map((header) => {
                  const sorted = header.column.getIsSorted();

                  const canSort = header.column.getCanSort();

                  return (
                    <TableHead
                      key={header.id}
                      className="
                            h-11
                            whitespace-nowrap
                            px-4
                            text-xs
                            font-semibold
                            uppercase
                            tracking-wide
                            text-muted-foreground
                          "
                    >
                      {header.isPlaceholder ? null : canSort ? (
                        <button
                          type="button"
                          onClick={header.column.getToggleSortingHandler()}
                          className="
                                flex
                                items-center
                                gap-2
                                transition-colors
                                hover:text-primary
                              "
                        >
                          <table.FlexRender header={header} />

                          {sorted === "asc" ? (
                            <ArrowUp
                              className="
                                    size-4
                                    text-primary
                                  "
                            />
                          ) : sorted === "desc" ? (
                            <ArrowDown
                              className="
                                    size-4
                                    text-primary
                                  "
                            />
                          ) : (
                            <ArrowUpDown
                              className="
                                    size-4
                                    opacity-40
                                  "
                            />
                          )}
                        </button>
                      ) : (
                        <table.FlexRender header={header} />
                      )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>

          {/* ================================================== */}
          {/* BODY */}
          {/* ================================================== */}

          <TableBody>
            {rows.length > 0 ? (
              rows.map((row) => (
                <TableRow
                  key={row.id}
                  className="
                    border-border
                    transition-colors
                    hover:bg-surface-hover
                  "
                >
                  {row.getAllCells().map((cell) => (
                    <TableCell
                      key={cell.id}
                      className="
                          px-4
                          py-3
                          text-sm
                          text-foreground
                        "
                    >
                      <table.FlexRender cell={cell} />
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length + 1}
                  className="
                    h-28
                    text-center
                    text-sm
                    text-muted-foreground
                  "
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* ====================================================== */}
      {/* PAGINATION */}
      {/* ====================================================== */}

      <DataTablePagination
        serverTable={serverTable}
        table={table}
        pageNumber={pageNumber}
        pageSize={pageSize}
        totalRecords={totalRowCount}
        totalPages={calculatedTotalPages}
        pageSizeOptions={pageSizeOptions}
        onPageChange={onPageChange}
        onPageSizeChange={onPageSizeChange}
      />
    </div>
  );
}
