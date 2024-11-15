import { type ColumnDef, type Header, type HeaderGroup, type Row } from "@tanstack/solid-table"

export type ProTableColumn<T> = ColumnDef<T> & {
  width?: string
  isSortable?: boolean 
  isPinned?: 'left' | 'right'
}

export interface ProTableProps<T> {
  data: T[]
  columns: ProTableColumn<T>[]
  class?: string
  onSelectionChange?: (selectedRows: T[]) => void
}

export interface TableHeaderProps<T> {
  headerGroups: HeaderGroup<T>[]
  columns: ProTableColumn<T>[]
  onSort: (columnId: string, desc: boolean) => void
  onSortClear: (columnId: string) => void
  getIsSorted: (columnId: string) => false | "asc" | "desc"
  onColumnVisibilityChange: (columnId: string, visible: boolean) => void
  onPin: (columnId: string) => void
}

export interface TableBodyProps<T> {
  rows: Row<T>[]
  columns: ProTableColumn<T>[]
  selectedRows: T[]
  onRowSelect: (row: T, checked: boolean) => void
}

export const SelectAction = "select"