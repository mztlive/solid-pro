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
import { Card, CardContent, CardFooter } from '../ui/card'
import {
    Pagination,
    PaginationEllipsis,
    PaginationItem,
    PaginationItems,
    PaginationNext,
    PaginationPrevious
} from '../ui/pagination'
import TableSkeleton from './table-skeleton'
import { cn } from '~/lib/utils'

interface ProTableProps<T> {
    data: T[]
    columns: ColumnDef<T>[]
    page: number
    pageSize: number
    totalPage: number
    onPageChange: (page: number) => void
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
        <Card hover="none" class=" border-none shadown-none">
            <CardContent class=" h-[500px] overflow-y-auto">
                <Suspense fallback={<TableSkeleton />}>
                    <Table>
                        <TableHeader>
                            <For each={tableInstance.getHeaderGroups()}>
                                {(headerGroup) => (
                                    <TableRow>
                                        <For each={headerGroup.headers}>
                                            {(header) => (
                                                <TableHead>
                                                    {header.isPlaceholder
                                                        ? null
                                                        : flexRender(
                                                              header.column
                                                                  .columnDef
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
                                                        cell.column.columnDef
                                                            .cell,
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
            </CardContent>
            <CardFooter class="flex justify-end">
                <Pagination
                    count={10}
                    fixedItems
                    page={1}
                    itemComponent={(props) => (
                        <PaginationItem page={props.page}>
                            {props.page}
                        </PaginationItem>
                    )}
                    ellipsisComponent={() => <PaginationEllipsis />}
                >
                    <PaginationPrevious />
                    <PaginationItems />
                    <PaginationNext />
                </Pagination>
            </CardFooter>
        </Card>
    )
}

export default ProTable
