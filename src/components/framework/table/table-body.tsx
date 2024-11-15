import { For } from "solid-js"
import { TableBody, TableCell, TableRow } from "../../ui/table"
import { SelectAction, type TableBodyProps } from "./types"
import { flexRender } from "@tanstack/solid-table"
import { cn } from "~/libs/cn"

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
									let leftOffset = 0
									if (cell.column.getIsPinned() === "left") {
										row.getVisibleCells().forEach((c) => {
											if (
												c.column.getIsPinned() ===
													"left" &&
												c.column.getIndex() <
													cell.column.getIndex()
											) {
												leftOffset +=
													c.column.id === SelectAction
														? 40
														: parseInt(
																props.columns[
																	c.column.getIndex() -
																		1
																]?.width ||
																	"150",
															) || 150
											}
										})
									}

									return (
										<TableCell
											class={cn(
												"whitespace-nowrap",
												cell.column.getIsPinned() &&
													"sticky bg-background",
												cell.column.getIsPinned() ===
													"left" &&
													"left-0 z-20 after:absolute after:right-0 after:top-0 after:bottom-0 after:w-[0.5px] after:bg-border",
												cell.column.getIsPinned() ===
													"right" && "right-0 z-20",
											)}
											style={{
												width:
													cell.column.id === "select"
														? "40px"
														: (props.columns[
																cell.column.getIndex() -
																	1
															]?.width ?? "auto"),
												"min-width":
													cell.column.id === "select"
														? "40px"
														: (props.columns[
																cell.column.getIndex() -
																	1
															]?.width ??
															"150px"),
												left:
													cell.column.getIsPinned() ===
													"left"
														? `${leftOffset}px`
														: "auto",
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
