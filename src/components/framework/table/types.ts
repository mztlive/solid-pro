import { type ColumnDef } from "@tanstack/solid-table"

export interface ProTableProps<T> {
  data: T[]
  columns: (ColumnDef<T> & { width?: string; isSortable?: boolean })[]
  class?: string
  onSelectionChange?: (selectedRows: T[]) => void
}

export interface TableHeaderProps<T> {
  headerGroups: any[]
  columns: ProTableProps<T>["columns"]
  onSort: (columnId: string, desc: boolean) => void
  onSortClear: (columnId: string) => void
  getIsSorted: (columnId: string) => false | "asc" | "desc"
  onColumnVisibilityChange: (columnId: string, visible: boolean) => void
}

export interface TableBodyProps<T> {
  rows: any[]
  columns: ProTableProps<T>["columns"]
  selectedRows: T[]
  onRowSelect: (row: T, checked: boolean) => void
} 