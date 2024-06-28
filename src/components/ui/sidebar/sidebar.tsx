import { JSX, Match, Show, Switch, createEffect, createSignal } from 'solid-js'
import { For } from 'solid-js/web'
import {
    AiOutlineAlignLeft,
    AiOutlineAlignRight,
    AiOutlineDown,
    AiOutlineRight
} from 'solid-icons/ai'
import { Motion } from 'solid-motionone'

import { SiBoxysvg } from 'solid-icons/si'
import { Resolver } from '@solid-primitives/i18n'
import { useColorMode } from '@kobalte/core/color-mode'
import { useLocation, useNavigate } from '@solidjs/router'

export type MenuItem = {
    icon?: JSX.Element
    text: string | Resolver<string, string>
    children?: MenuItem[]
    description?: string | Resolver<string, string>
    href?: string
}

export type SidebarProps = {
    menuItems: MenuItem[]
}

export const Sidebar = (props: SidebarProps) => {
    const { colorMode } = useColorMode()

    const navigate = useNavigate()
    const location = useLocation()

    const [openItems, setOpenItems] = createSignal<Record<string, boolean>>({})
    const [selectedItem, setSelectedItem] = createSignal<string | null>(null)

    const [collapsed, setCollapsed] = createSignal(false)
    const [isManualCollapse, setIsManualCollapse] = createSignal(false)

    const toggleItem = (index: string) =>
        setOpenItems({ ...openItems(), [index]: !openItems()[index] })

    const selectItem = (index: string, hasChildren: boolean) => {
        if (!hasChildren) setSelectedItem(index)
    }

    const handleCollapseToggle = () => {
        if (collapsed()) {
            setIsManualCollapse(false)
        } else {
            setIsManualCollapse(true)
        }

        setCollapsed(!collapsed())
    }

    // 根据当前路径设置选中的菜单项
    createEffect(() => {
        const currentPath = location.pathname
        props.menuItems.forEach((item, index) => {
            if (item.href === currentPath) {
                setSelectedItem(index.toString())
            }

            item.children?.forEach((subItem, subIndex) => {
                if (subItem.href === currentPath) {
                    setSelectedItem(`${index}-${subIndex}`)
                    setOpenItems({ ...openItems(), [index]: true })
                }
            })
        })
    })

    const renderMenuItem = (item: MenuItem, index: () => number) => {
        const itemIndex = index().toString()
        const hasChildren = !!item.children

        return (
            <li>
                <div
                    class={`flex items-center p-2 mb-2 cursor-pointer gap-2 text-base rounded-md text-foreground user-select-none hover:bg-hover-muted ${
                        selectedItem() === itemIndex && !hasChildren
                            ? 'bg-selected-background'
                            : ''
                    }`}
                    onClick={() => {
                        selectItem(itemIndex, hasChildren)
                        hasChildren
                            ? toggleItem(itemIndex)
                            : navigate(item.href || '/')
                    }}
                >
                    {item.icon}
                    <Show when={!collapsed()}>
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
                class={`flex items-center mb-2 cursor-pointer gap-2 text-base p-1.5 rounded-md text-foreground hover:bg-hover-muted ${
                    selectedItem() === subItemIndex
                        ? 'bg-selected-background'
                        : ''
                }`}
                onClick={() => {
                    selectItem(subItemIndex, false)
                    navigate(subItem.href || '/')
                }}
            >
                {subItem.icon}
                <Show when={!collapsed()}>
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
                'w-24': collapsed(),
                'w-64': !collapsed(),
                'bg-background': true,
                'text-foreground': true,
                'transition-width': true,
                'duration-300': true,
                'overflow-y-auto': true,
                'border-r': true,
                'border-muted': true
            }}
        >
            <div class="flex flex-row items-center justify-between gap-8 h-14 py-8 px-4 border-b border-muted">
                {/* <img src="/logo.png" alt="logo" class="w-8 h-8" /> */}
                <SiBoxysvg />
                <Show when={!collapsed()}>
                    <span class="text-foreground text-lg">{colorMode()}</span>
                </Show>
                <button
                    onClick={handleCollapseToggle}
                    class={`transition-transform duration-300 ${
                        collapsed() ? 'rotate-180' : ''
                    }`}
                >
                    <Switch>
                        <Match when={collapsed()}>
                            <AiOutlineAlignRight />
                        </Match>
                        <Match when={!collapsed()}>
                            <AiOutlineAlignLeft />
                        </Match>
                    </Switch>
                </button>
            </div>
            <ul
                class="list-none mt-2 p-2.5"
                onMouseEnter={() => {
                    if (isManualCollapse()) {
                        setCollapsed(false)
                    }
                }}
                onMouseLeave={() => {
                    if (isManualCollapse()) {
                        setCollapsed(true)
                    }
                }}
            >
                <For each={props.menuItems}>{renderMenuItem}</For>
            </ul>
        </div>
    )
}
