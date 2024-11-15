import { Suspense, createSignal, For } from "solid-js"
import {
	ColumnPinningState,
	createSolidTable,
	flexRender,
	getCoreRowModel,
	getSortedRowModel,
	SortingState,
	VisibilityState,
} from "@tanstack/solid-table"
import { cn } from "~/libs/cn"
import { Table } from "../../ui/table"
import TableSkeleton from "../table-skeleton"
import { TableHeaderComponent } from "./table-header"
import { TableBodyComponent } from "./table-body"
import { SelectAction, type ProTableProps } from "./types"
import {
	Checkbox,
	CheckboxControl,
	CheckboxLabel,
} from "~/components/ui/checkbox"
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu"
import { AiOutlineEye, AiOutlineSetting } from "solid-icons/ai"
import { Button } from "~/components/ui/button"
import I18nText from "../i18n-text"
import ViewSettingIcon from "~/components/icons/view-setting-icon"

const ProTable = <T,>(props: ProTableProps<T>) => {
	const [selectedRows, setSelectedRows] = createSignal<T[]>([])
	const [sorting, setSorting] = createSignal<SortingState>([])
	const [columnVisibility, setColumnVisibility] =
		createSignal<VisibilityState>({
			select: true,
			// eslint-disable-next-line solid/reactivity
			...props.columns.reduce(
				(acc, col) => ({
					...acc,
					[col.id]: true,
				}),
				{},
			),
		})

	const [columnPinning, setColumnPinning] = createSignal<ColumnPinningState>({
		left: [SelectAction],
	})

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

	const handleColumnVisibilityChange = (
		columnId: string,
		visible: boolean,
	) => {
		setColumnVisibility((prev) => ({
			...prev,
			[columnId]: visible,
		}))
	}

	const handleColumnPin = (columnId: string) => {
		// setColumnPinning((prev) => ({
		// 	...prev,
		// 	left: [...prev.left, columnId],
		// }))

		setColumnPinning((prev) => {
			if (prev.left.includes(columnId)) {
				// remove pin
				return {
					...prev,
					left: prev.left.filter((item) => item !== columnId),
				}
			}

			return {
				...prev,
				left: [...prev.left, columnId],
			}
		})
	}

	const tableInstance = createSolidTable({
		get data() {
			return props.data
		},
		columns: [
			{
				id: SelectAction,
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
			get columnVisibility() {
				return columnVisibility()
			},
			get columnPinning() {
				return columnPinning()
			},
		},
		onSortingChange: setSorting,
		getCoreRowModel: getCoreRowModel(),
		getSortedRowModel: getSortedRowModel(),
		onColumnVisibilityChange: setColumnVisibility,
		onColumnPinningChange: setColumnPinning,
	})

	return (
		<Suspense fallback={<TableSkeleton />}>
			<div class={cn("relative", props.class)}>
				<div class="flex justify-end mb-2">
					<DropdownMenu>
						<DropdownMenuTrigger>
							<Button variant="outline" size="sm">
								<ViewSettingIcon size={20} />
								View
							</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent>
							<For each={props.columns}>
								{(column) => (
									<div class="px-2 py-1.5">
										<Checkbox
											checked={
												columnVisibility()[column.id!]
											}
											class="flex items-center gap-2"
											onChange={(checked) => {
												handleColumnVisibilityChange(
													column.id!,
													checked,
												)
											}}
										>
											<CheckboxControl />
											<CheckboxLabel>
												{/* Wrong type  */}
												{column.header as string}
											</CheckboxLabel>
										</Checkbox>
									</div>
								)}
							</For>
						</DropdownMenuContent>
					</DropdownMenu>
				</div>
				<div class="relative overflow-x-auto">
					<Table class="w-full min-w-full border rounded-xl">
						<TableHeaderComponent
							headerGroups={tableInstance.getHeaderGroups()}
							columns={props.columns}
							onSort={(columnId, desc) => {
								const column = tableInstance.getColumn(columnId)
								column?.toggleSorting(desc)
							}}
							onSortClear={(columnId) => {
								const column = tableInstance.getColumn(columnId)
								column?.clearSorting()
							}}
							getIsSorted={(columnId) => {
								const column = tableInstance.getColumn(columnId)
								return column?.getIsSorted() || false
							}}
							onColumnVisibilityChange={
								handleColumnVisibilityChange
							}
							onPin={handleColumnPin}
						/>
						<TableBodyComponent
							rows={tableInstance.getRowModel().rows}
							columns={props.columns}
							selectedRows={selectedRows()}
							onRowSelect={handleSelectRow}
						/>
					</Table>
				</div>
			</div>
		</Suspense>
	)
}

export default ProTable
