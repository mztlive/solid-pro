import { createEffect, For } from "solid-js"
import { TableBody, TableCell, TableRow } from "../../ui/table"
import { Checkbox, CheckboxControl } from "../../ui/checkbox"
import type { TableBodyProps } from "./types"
import { flexRender } from "@tanstack/solid-table"

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
								{(cell) => (
									<TableCell
										style={{
											width:
												cell.column.id === "select"
													? "40px"
													: (props.columns[
															cell.column.getIndex() -
																1
														]?.width ?? "auto"),
										}}
									>
										{flexRender(
											cell.column.columnDef.cell,
											cell.getContext(),
										)}
									</TableCell>
								)}
							</For>
						</TableRow>
					)
				}}
			</For>
		</TableBody>
	)
}
