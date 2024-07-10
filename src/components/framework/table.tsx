import {
    ColumnDef,
    createSolidTable,
    flexRender,
    getCoreRowModel
} from '@tanstack/solid-table'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from '../ui/table'
import { For, Suspense } from 'solid-js'
import TableSkeleton from './table-skeleton'
import { cn } from '~/lib/utils'

interface ProTableProps<T> {
    data: T[]
    columns: ColumnDef<T>[]
    class?: string
}

const ProTable = <T,>(props: ProTableProps<T>) => {
    const tableInstance = createSolidTable({
        get data() {
            return props.data
        },
        // eslint-disable-next-line solid/reactivity
        columns: props.columns,
        getCoreRowModel: getCoreRowModel()
    })

    return (
        <Suspense fallback={<TableSkeleton />}>
            <Table>
                <TableHeader>
                    <For each={tableInstance.getHeaderGroups()}>
                        {(headerGroup) => (
                            <TableRow>
                                <For each={headerGroup.headers}>
                                    {(header) => (
                                        <TableHead class="bg-accent font-bold">
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(
                                                      header.column.columnDef
                                                          .header,
                                                      header.getContext()
                                                  )}
                                        </TableHead>
                                    )}
                                </For>
                            </TableRow>
                        )}
                    </For>
                </TableHeader>
                <TableBody class={cn(props.class)}>
                    <For each={tableInstance.getRowModel().rows}>
                        {(row) => (
                            <TableRow>
                                <For each={row.getVisibleCells()}>
                                    {(cell) => (
                                        <TableCell>
                                            {flexRender(
                                                cell.column.columnDef.cell,
                                                cell.getContext()
                                            )}
                                        </TableCell>
                                    )}
                                </For>
                            </TableRow>
                        )}
                    </For>
                </TableBody>
            </Table>
        </Suspense>
    )
}

export default ProTable
