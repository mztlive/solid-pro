import { For, Show } from "solid-js"
import { TableHead, TableHeader, TableRow } from "../../ui/table"
import { Checkbox, CheckboxControl } from "../../ui/checkbox"
import { HeadTrigger } from "./sort-trigger"
import { SelectAction, type TableHeaderProps } from "./types"
import { cn } from "~/libs/cn"

export const TableHeaderComponent = <T,>(props: TableHeaderProps<T>) => {
	return (
		<TableHeader class="sticky top-0 z-10">
			<For each={props.headerGroups}>
				{(headerGroup) => (
					<TableRow>
						<For each={headerGroup.headers}>
							{(header) => {
								const width =
									header.column.id === SelectAction
										? "40px"
										: (props.columns[header.index - 1]
												?.width ?? "auto")

								let leftOffset = 0
								if (header.column.getIsPinned() === "left") {
									headerGroup.headers.forEach((h) => {
										if (
											h.column.getIsPinned() === "left" &&
											h.column.getIndex() <
												header.column.getIndex()
										) {
											leftOffset +=
												h.column.id === SelectAction
													? 40
													: parseInt(
															props.columns[
																h.column.getIndex() -
																	1
															]?.width || "150",
														) || 150
										}
									})
								}

								return (
									<TableHead
										class={cn(
											"font-bold whitespace-nowrap",
											header.column.getIsPinned() &&
												"sticky bg-background",
											header.column.getIsPinned() ===
												"left" &&
												"left-0 z-20 after:absolute after:right-0 after:top-0 after:bottom-0 after:w-[0.5px] after:bg-border",
											header.column.getIsPinned() ===
												"right" && "right-0 z-20",
										)}
										style={{
											width,
											"min-width":
												width === "auto"
													? "150px"
													: width,
											left:
												header.column.getIsPinned() ===
												"left"
													? `${leftOffset}px`
													: "auto",
										}}
									>
										<Show
											when={!header.isPlaceholder}
											fallback={null}
										>
											<HeadTrigger
												header={header}
												onSort={(desc) =>
													props.onSort(
														header.column.id,
														desc,
													)
												}
												onClear={() =>
													props.onSortClear(
														header.column.id,
													)
												}
												onVisibilityChange={() =>
													props.onColumnVisibilityChange(
														header.column.id,
														false,
													)
												}
												onPin={() =>
													props.onPin(
														header.column.id,
													)
												}
											/>
										</Show>
									</TableHead>
								)
							}}
						</For>
					</TableRow>
				)}
			</For>
		</TableHeader>
	)
}
