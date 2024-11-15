import { type ColumnDef, type Header, type HeaderGroup, type Row } from "@tanstack/solid-table"

export interface ProTableProps<T> {
  data: T[]
  columns: (ColumnDef<T> & { width?: string; isSortable?: boolean; isPinned?: 'left' | 'right' })[]
  class?: string
  onSelectionChange?: (selectedRows: T[]) => void
}

export interface TableHeaderProps<T> {
  headerGroups: HeaderGroup<T>[]
  columns: ProTableProps<T>["columns"]
  onSort: (columnId: string, desc: boolean) => void
  onSortClear: (columnId: string) => void
  getIsSorted: (columnId: string) => false | "asc" | "desc"
  onColumnVisibilityChange: (columnId: string, visible: boolean) => void
  onPin: (columnId: string) => void
}

export interface TableBodyProps<T> {
  rows: Row<T>[]
  columns: ProTableProps<T>["columns"]
  selectedRows: T[]
  onRowSelect: (row: T, checked: boolean) => void
}


export const SelectAction = "select"