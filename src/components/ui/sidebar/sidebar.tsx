import { JSX, Match, Show, Switch, createSignal } from 'solid-js'
import { For } from 'solid-js/web'
import { AiOutlineDown, AiOutlineRight } from 'solid-icons/ai'
import { Motion } from 'solid-motionone'

import { SiBoxysvg } from 'solid-icons/si'
import { useI18nContext } from '~/providers/i18n-provider'
import { Resolver } from '@solid-primitives/i18n'

export type MenuItem = {
    icon?: JSX.Element
    text: string | Resolver<string, string>
    children?: MenuItem[]
    description?: string | Resolver<string, string>
}

export type SidebarProps = {
    menuItems: MenuItem[]
    collapsed?: boolean
}

export const Sidebar = (props: SidebarProps) => {
    const { t } = useI18nContext()

    const [openItems, setOpenItems] = createSignal<Record<string, boolean>>({})
    const [selectedItem, setSelectedItem] = createSignal<string | null>(null)

    const toggleItem = (index: string) =>
        setOpenItems({ ...openItems(), [index]: !openItems()[index] })

    const selectItem = (index: string, hasChildren: boolean) => {
        if (!hasChildren) setSelectedItem(index)
    }

    const renderMenuItem = (item: MenuItem, index: () => number) => {
        const itemIndex = index().toString()
        const hasChildren = !!item.children

        return (
            <li>
                <div
                    class={`flex items-center p-2 cursor-pointer gap-2 text-base rounded-md text-foreground user-select-none hover:bg-hover-muted ${
                        selectedItem() === itemIndex && !hasChildren
                            ? 'bg-selected-background'
                            : ''
                    }`}
                    onClick={() => {
                        selectItem(itemIndex, hasChildren)
                        hasChildren && toggleItem(itemIndex)
                    }}
                >
                    {item.icon}
                    <Show when={!props.collapsed}>
                        <Motion.span
                            animate={{
                                opacity: [0, 1],
                                transition: {
                                    duration: 0.3,
                                    easing: 'ease-in-out'
                                }
                            }}
                        >
                            <span>
                                {typeof item.text === 'function'
                                    ? item.text()
                                    : item.text}
                            </span>
                        </Motion.span>
                    </Show>
                    <Show when={hasChildren}>
                        <span class="ml-auto pr-4">
                            <Switch>
                                <Match when={openItems()[itemIndex]}>
                                    <AiOutlineDown size={12} />
                                </Match>
                                <Match when={!openItems()[itemIndex]}>
                                    <AiOutlineRight size={12} />
                                </Match>
                            </Switch>
                        </span>
                    </Show>
                </div>
                <Show when={hasChildren && openItems()[itemIndex]}>
                    <Motion.ul
                        animate={{
                            opacity: [0, 1],
                            x: [-20, 0]
                        }}
                        transition={{
                            duration: 0.3,
                            easing: 'ease-in-out'
                        }}
                        class="pl-8 overflow-hidden"
                    >
                        <For each={item.children}>
                            {(subItem, subIndex) =>
                                renderSubMenuItem(subItem, subIndex, itemIndex)
                            }
                        </For>
                    </Motion.ul>
                </Show>
            </li>
        )
    }

    const renderSubMenuItem = (
        subItem: MenuItem,
        subIndex: () => number,
        parentIndex: string
    ) => {
        const subItemIndex = `${parentIndex}-${subIndex()}`
        return (
            <li
                class={`flex items-center cursor-pointer gap-2 text-base p-1.5 rounded-md text-foreground hover:bg-hover-muted ${
                    selectedItem() === subItemIndex
                        ? 'bg-selected-background'
                        : ''
                }`}
                onClick={() => selectItem(subItemIndex, false)}
            >
                {subItem.icon}
                <Show when={!props.collapsed}>
                    <Motion.span
                        animate={{
                            opacity: [0, 1],
                            transition: { duration: 0.3, easing: 'ease-in-out' }
                        }}
                    >
                        {typeof subItem.text === 'function'
                            ? subItem.text()
                            : subItem.text}
                    </Motion.span>
                </Show>
            </li>
        )
    }

    return (
        <div
            classList={{
                'w-24': props.collapsed,
                'w-64': !props.collapsed,
                'bg-background': true,
                'text-foreground': true,
                'transition-width': true,
                'duration-300': true,
                'p-2.5': true,
                'border-r': true,
                'border-border': true,
                'overflow-y-auto': true
            }}
        >
            <ul class="list-none p-0">
                <For each={props.menuItems}>{renderMenuItem}</For>
            </ul>
        </div>
    )
}
