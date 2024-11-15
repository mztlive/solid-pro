import { For, Show } from "solid-js"
import { TableHead, TableHeader, TableRow } from "../../ui/table"
import { HeadTrigger } from "./sort-trigger"
import { type TableHeaderProps } from "./types"
import {
	calculateLeftOffset,
	getWidth,
	getMinWidth,
	getPinnedClassNames,
} from "./utils"
import { cn } from "~/libs/cn"

export const TableHeaderComponent = <T,>(props: TableHeaderProps<T>) => {
	return (
		<TableHeader class="sticky top-0 z-10">
			<For each={props.headerGroups}>
				{(headerGroup) => (
					<TableRow>
						<For each={headerGroup.headers}>
							{(header) => {
								const width = getWidth(
									header.column.id,
									header.index,
									props.columns,
								)
								const leftOffset = calculateLeftOffset(
									header,
									headerGroup.headers,
									props.columns,
								)

								return (
									<TableHead
										class={cn(
											"font-bold",
											getPinnedClassNames(header),
										)}
										style={{
											width,
											"min-width": getMinWidth(width),
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
