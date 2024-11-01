import {
	type ColumnDef,
	createSolidTable,
	flexRender,
	getCoreRowModel,
} from "@tanstack/solid-table"
import { For, Suspense } from "solid-js"
import { cn } from "~/lib/utils"
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "../ui/table"
import TableSkeleton from "./table-skeleton"

interface ProTableProps<T> {
	data: T[]
	columns: (ColumnDef<T> & { width?: string })[]
	class?: string
}

const ProTable = <T,>(props: ProTableProps<T>) => {
	const tableInstance = createSolidTable({
		get data() {
			return props.data
		},
		// eslint-disable-next-line solid/reactivity
		columns: props.columns,
		getCoreRowModel: getCoreRowModel(),
	})

	return (
		<Suspense fallback={<TableSkeleton />}>
			<div class={cn("relative h-[500px]", props.class)}>
				<Table class="table-fixed w-full">
					<TableHeader class="sticky top-0 z-10 bg-background">
						<For each={tableInstance.getHeaderGroups()}>
							{(headerGroup) => (
								<TableRow>
									<For each={headerGroup.headers}>
										{(header) => (
											<TableHead
												class="bg-accent font-bold"
												style={{
													width:
														props.columns[
															header.index
														]?.width ?? "auto",
												}}
											>
												{header.isPlaceholder
													? null
													: flexRender(
															header.column
																.columnDef
																.header,
															header.getContext(),
														)}
											</TableHead>
										)}
									</For>
								</TableRow>
							)}
						</For>
					</TableHeader>
				</Table>
				<div class="overflow-auto h-[calc(100%-48px)]">
					<Table class="table-fixed w-full">
						<TableBody>
							<For each={tableInstance.getRowModel().rows}>
								{(row) => (
									<TableRow>
										<For each={row.getVisibleCells()}>
											{(cell) => (
												<TableCell
													style={{
														width:
															props.columns[
																cell.column.getIndex()
															]?.width ?? "auto",
													}}
												>
													{flexRender(
														cell.column.columnDef
															.cell,
														cell.getContext(),
													)}
												</TableCell>
											)}
										</For>
									</TableRow>
								)}
							</For>
						</TableBody>
					</Table>
				</div>
			</div>
		</Suspense>
	)
}

export default ProTable
