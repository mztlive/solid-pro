import {
	type ColumnDef,
	createSolidTable,
	flexRender,
	getCoreRowModel,
	getSortedRowModel,
	SortingState,
} from "@tanstack/solid-table"
import { For, Show, Suspense, createSignal } from "solid-js"
import { cn } from "~/libs/cn"
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "../ui/table"
import TableSkeleton from "./table-skeleton"
import { Checkbox, CheckboxControl } from "../ui/checkbox"
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "../ui/dropdown-menu"
import { Button } from "../ui/button"
import { AiOutlineClear } from "solid-icons/ai"
import { AiOutlineSortDescending } from "solid-icons/ai"
import { AiOutlineSortAscending } from "solid-icons/ai"

interface ProTableProps<T> {
	data: T[]
	columns: (ColumnDef<T> & { width?: string; isSortable?: boolean })[]
	class?: string
	onSelectionChange?: (selectedRows: T[]) => void
}

const ProTable = <T,>(props: ProTableProps<T>) => {
	const [selectedRows, setSelectedRows] = createSignal<T[]>([])
	const [sorting, setSorting] = createSignal<SortingState>([])

	const handleSelectAll = (checked: boolean) => {
		if (checked) {
			setSelectedRows(props.data)
		} else {
			setSelectedRows([])
		}
		props.onSelectionChange?.(selectedRows())
	}

	const handleSelectRow = (row: T, checked: boolean) => {
		if (checked) {
			setSelectedRows([...selectedRows(), row])
		} else {
			setSelectedRows(selectedRows().filter((r) => r !== row))
		}
		props.onSelectionChange?.(selectedRows())
	}

	const tableInstance = createSolidTable({
		get data() {
			return props.data
		},
		columns: [
			{
				id: "select",
				header: () => (
					<Checkbox
						checked={selectedRows().length === props.data.length}
						onChange={(checked) => handleSelectAll(checked)}
					>
						<CheckboxControl />
					</Checkbox>
				),
				cell: (props) => (
					<Checkbox
						checked={selectedRows().includes(props.row.original)}
						onChange={(checked) =>
							handleSelectRow(props.row.original, checked)
						}
					>
						<CheckboxControl />
					</Checkbox>
				),
				meta: {
					width: "40px",
				},
			},

			// eslint-disable-next-line solid/reactivity
			...props.columns.map((column) => ({
				...column,
				enableSorting: column.isSortable,
			})),
		],
		state: {
			get sorting() {
				return sorting()
			},
		},
		onSortingChange: setSorting,
		getCoreRowModel: getCoreRowModel(),
		getSortedRowModel: getSortedRowModel(),
	})

	return (
		<Suspense fallback={<TableSkeleton />}>
			<div class={cn("relative overflow-auto", props.class)}>
				<Table class="w-full table-fixed border rounded-xl">
					<TableHeader class="sticky top-0 z-10">
						<For each={tableInstance.getHeaderGroups()}>
							{(headerGroup) => (
								<TableRow>
									<For each={headerGroup.headers}>
										{(header) => {
											const width =
												header.column.id === "select"
													? "40px"
													: (props.columns[
															header.index - 1
														]?.width ?? "auto")
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
														when={
															!header.isPlaceholder
														}
														fallback={null}
													>
														<DropdownMenu>
															<DropdownMenuTrigger class="w-full text-left">
																<Button
																	class="flex items-center gap-2 -ml-4 h-8 data-[expanded]:bg-accent font-bold color-accent"
																	variant="ghost"
																>
																	{flexRender(
																		header
																			.column
																			.columnDef
																			.header,
																		header.getContext(),
																	)}
																	<Show
																		when={header.column.getIsSorted()}
																	>
																		<span class="font-bold">
																			{header.column.getIsSorted() ===
																			"asc"
																				? " ↑"
																				: " ↓"}
																		</span>
																	</Show>
																</Button>
															</DropdownMenuTrigger>
															<Show
																when={header.column.getCanSort()}
															>
																<DropdownMenuContent>
																	<DropdownMenuItem
																		onClick={() =>
																			header.column.toggleSorting(
																				false,
																			)
																		}
																	>
																		<AiOutlineSortAscending class="mr-2" />
																		Asc
																	</DropdownMenuItem>
																	<DropdownMenuItem
																		onClick={() =>
																			header.column.toggleSorting(
																				true,
																			)
																		}
																	>
																		<AiOutlineSortDescending class="mr-2" />
																		Desc
																	</DropdownMenuItem>
																	<DropdownMenuItem
																		onClick={() =>
																			header.column.clearSorting()
																		}
																	>
																		<AiOutlineClear class="mr-2" />
																		Clear
																		Sort
																	</DropdownMenuItem>
																</DropdownMenuContent>
															</Show>
														</DropdownMenu>
													</Show>
												</TableHead>
											)
										}}
									</For>
								</TableRow>
							)}
						</For>
					</TableHeader>
					<TableBody>
						<For each={tableInstance.getRowModel().rows}>
							{(row) => (
								<TableRow>
									<For each={row.getVisibleCells()}>
										{(cell) => {
											const width =
												cell.column.id === "select"
													? "40px"
													: (props.columns[
															cell.column.getIndex() -
																1
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
														cell.column.columnDef
															.cell,
														cell.getContext(),
													)}
												</TableCell>
											)
										}}
									</For>
								</TableRow>
							)}
						</For>
					</TableBody>
				</Table>
			</div>
		</Suspense>
	)
}

export default ProTable
