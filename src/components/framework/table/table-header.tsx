import { For, Show } from "solid-js"
import { TableHead, TableHeader, TableRow } from "../../ui/table"
import { Checkbox, CheckboxControl } from "../../ui/checkbox"
import { SortTrigger } from "./sort-trigger"
import type { TableHeaderProps } from "./types"

export const TableHeaderComponent = <T,>(props: TableHeaderProps<T>) => {
	return (
		<TableHeader class="sticky top-0 z-10">
			<For each={props.headerGroups}>
				{(headerGroup) => (
					<TableRow>
						<For each={headerGroup.headers}>
							{(header) => {
								const width =
									header.column.id === "select"
										? "40px"
										: (props.columns[header.index - 1]
												?.width ?? "auto")
								return (
									<TableHead
										class="font-bold"
										style={{
											width,
											"min-width": width,
											"max-width": width,
										}}
									>
										<Show
											when={!header.isPlaceholder}
											fallback={null}
										>
											<SortTrigger
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
