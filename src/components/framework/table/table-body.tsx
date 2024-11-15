import { For } from "solid-js"
import { TableBody, TableCell, TableRow } from "../../ui/table"
import { type TableBodyProps } from "./types"
import { flexRender } from "@tanstack/solid-table"
import { calculateLeftOffset, getWidth, getMinWidth, getPinnedClassNames } from "./utils"

export const TableBodyComponent = <T,>(props: TableBodyProps<T>) => {
	return (
		<TableBody>
			<For each={props.rows}>
				{(row) => {
					const isSelected = () =>
						props.selectedRows.includes(row.original)

					return (
						<TableRow
							data-state={isSelected() ? "selected" : undefined}
							onClick={() => {
								props.onRowSelect(row.original, !isSelected())
							}}
						>
							<For each={row.getVisibleCells()}>
								{(cell) => {
									const width = getWidth(
										cell.column.id,
										cell.column.getIndex(),
										props.columns
									)
									const leftOffset = calculateLeftOffset(
										cell,
										row.getVisibleCells(),
										props.columns
									)

									return (
										<TableCell
											class={getPinnedClassNames(cell)}
											style={{
												width,
												"min-width": getMinWidth(width),
												left: cell.column.getIsPinned() === "left"
													? `${leftOffset}px`
													: "auto",
											}}
										>
											{flexRender(
												cell.column.columnDef.cell,
												cell.getContext()
											)}
										</TableCell>
									)
								}}
							</For>
						</TableRow>
					)
				}}
			</For>
		</TableBody>
	)
}
