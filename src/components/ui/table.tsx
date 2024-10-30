import type { Component, ComponentProps } from 'solid-js'
import { splitProps } from 'solid-js'

import { cn } from '~/lib/utils'

const Table: Component<ComponentProps<'table'>> = (props) => {
    const [local, others] = splitProps(props, ['class'])
    return (
        <div class="relative w-full overflow-auto">
            <table
                class={cn(
                    'w-full text-sm border-collapse bg-white',
                    local.class
                )}
                {...others}
            />
        </div>
    )
}

const TableHeader: Component<ComponentProps<'thead'>> = (props) => {
    const [local, others] = splitProps(props, ['class'])
    return <thead class={cn('bg-white', local.class)} {...others} />
}

const TableBody: Component<ComponentProps<'tbody'>> = (props) => {
    const [local, others] = splitProps(props, ['class'])
    return (
        <tbody class={cn('text-[rgba(0,0,0,0.88)]', local.class)} {...others} />
    )
}

const TableFooter: Component<ComponentProps<'tfoot'>> = (props) => {
    const [local, others] = splitProps(props, ['class'])
    return <tfoot class={cn('bg-white font-medium', local.class)} {...others} />
}

const TableRow: Component<ComponentProps<'tr'>> = (props) => {
    const [local, others] = splitProps(props, ['class'])
    return (
        <tr
            class={cn(
                'transition-colors hover:bg-[#fafafa] data-[state=selected]:bg-[#e6f4ff]',
                local.class
            )}
            {...others}
        />
    )
}

const TableHead: Component<ComponentProps<'th'>> = (props) => {
    const [local, others] = splitProps(props, ['class'])
    return (
        <th
            class={cn(
                'h-14 px-4 text-left align-middle font-medium text-[rgba(0,0,0,0.88)] bg-white border-b border-[#f0f0f0] [&:has([role=checkbox])]:pr-0',
                local.class
            )}
            {...others}
        />
    )
}

const TableCell: Component<ComponentProps<'td'>> = (props) => {
    const [local, others] = splitProps(props, ['class'])
    return (
        <td
            class={cn(
                'px-4 py-4 align-middle text-[rgba(0,0,0,0.88)] border-b border-[#f0f0f0] [&:has([role=checkbox])]:pr-0',
                local.class
            )}
            {...others}
        />
    )
}

const TableCaption: Component<ComponentProps<'caption'>> = (props) => {
    const [local, others] = splitProps(props, ['class'])
    return (
        <caption
            class={cn('mt-3 text-sm text-[rgba(0,0,0,0.45)]', local.class)}
            {...others}
        />
    )
}

export {
    Table,
    TableHeader,
    TableBody,
    TableFooter,
    TableHead,
    TableRow,
    TableCell,
    TableCaption
}
