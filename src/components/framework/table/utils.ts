import { type ColumnDef } from "@tanstack/solid-table"
import { cn } from "~/libs/cn"
import { SelectAction } from "./types"

export const calculateLeftOffset = (
    element: any,
    elements: any[],
    columns: (ColumnDef<any> & { width?: string })[],
) => {
    let leftOffset = 0
    if (element.column.getIsPinned() === "left") {
        elements.forEach((e) => {
            if (
                e.column.getIsPinned() === "left" &&
                e.column.getIndex() < element.column.getIndex()
            ) {
                leftOffset += e.column.id === SelectAction
                    ? 40
                    : parseInt(columns[e.column.getIndex() - 1]?.width || "150") || 150
            }
        })
    }
    return leftOffset
}

export const getWidth = (
    columnId: string,
    columnIndex: number,
    columns: (ColumnDef<any> & { width?: string })[],
) => {
    return columnId === SelectAction
        ? "40px"
        : (columns[columnIndex - 1]?.width ?? "auto")
}

export const getMinWidth = (
    width: string,
) => {
    return width === "auto" ? "150px" : width
}

export const getPinnedClassNames = (element: any) => {
    return cn(
        "whitespace-nowrap",
        element.column.getIsPinned() && "sticky bg-background",
        element.column.getIsPinned() === "left" &&
            "left-0 z-20 after:absolute after:right-0 after:top-0 after:bottom-0 after:w-[0.5px] after:bg-border",
        element.column.getIsPinned() === "right" && "right-0 z-20 after:absolute after:left-0 after:top-0 after:bottom-0 after:w-[0.5px] after:bg-border",
    )
} 