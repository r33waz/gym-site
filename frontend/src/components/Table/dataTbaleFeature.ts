import {
  createPaginatedRowModel,
  createSortedRowModel,
  rowPaginationFeature,
  rowSortingFeature,
  tableFeatures,
} from "@tanstack/react-table";

export const features = tableFeatures({
  rowPaginationFeature,

  rowSortingFeature,

  sortedRowModel: createSortedRowModel(),

  paginatedRowModel: createPaginatedRowModel(),
});

export type DataTableFeatures = typeof features;
