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
					createEffect(() => {
						console.log(row.getIsSelected())
					})

					return (
						<TableRow>
							<For each={row.getVisibleCells()}>
								{(cell) => {
									const width =
										cell.column.id === "select"
											? "40px"
											: (props.columns[
													cell.column.getIndex() - 1
												]?.width ?? "auto")
									return (
										<TableCell
											style={{
												width,
												"min-width": width,
												"max-width": width,
											}}
										>
											{flexRender(
												cell.column.columnDef.cell,
												cell.getContext(),
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
