import {
    JSX,
    Show,
    createEffect,
    createSignal,
    For,
    createContext,
    ParentProps,
    Accessor
} from 'solid-js'

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
import { Dynamic } from 'solid-js/web'

export type MenuItem = {
    icon?: JSX.Element
    text: string | Resolver<string, string>
    children?: MenuItem[]
    description?: string | Resolver<string, string>
    href?: string
}

export interface SidebarProps extends ParentProps {
    menuItems: MenuItem[]
}

const SidebarContext = createContext()

const SidebarProvider = (props: SidebarProps) => {
    const location = useLocation()

    const [openItems, setOpenItems] = createSignal<Record<string, boolean>>({})
    const [selectedItem, setSelectedItem] = createSignal<string | null>(null)

    // 是否折叠的
    const [collapsed, setCollapsed] = createSignal(false)

    // 是否手动折叠的
    const [isManualCollapse, setIsManualCollapse] = createSignal(false)

    // 鼠标是否在侧边栏内部的
    const [isMouseInside, setIsMouseInside] = createSignal(false)

    const handleCollapseToggle = () => {
        // 如果当前是手动折叠状态
        if (isManualCollapse()) {
            // 取消手动折叠状态并展开侧边栏
            setIsManualCollapse(false)
            setCollapsed(false)
        } else {
            // 否则，设置为手动折叠状态并切换侧边栏的折叠状态
            setIsManualCollapse(true)
            setCollapsed(!collapsed())
        }
    }

    const toggleItem = (index: string) =>
        setOpenItems({ ...openItems(), [index]: !openItems()[index] })

    const selectItem = (index: string, hasChildren: boolean) => {
        if (!hasChildren) setSelectedItem(index)
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

    return (
        <SidebarContext.Provider value={{ openItems, selectedItem }}>
            {props.children}
        </SidebarContext.Provider>
    )
}

export const Sidebar = (props: SidebarProps) => {
    const { colorMode } = useColorMode()

    const navigate = useNavigate()
    const location = useLocation()

    const [openItems, setOpenItems] = createSignal<Record<string, boolean>>({})
    const [selectedItem, setSelectedItem] = createSignal<string | null>(null)

    // 是否折叠的
    const [collapsed, setCollapsed] = createSignal(false)

    // 是否手动折叠的
    const [isManualCollapse, setIsManualCollapse] = createSignal(false)

    // 鼠标是否在侧边栏内部的
    const [isMouseInside, setIsMouseInside] = createSignal(false)

    const handleCollapseToggle = () => {
        // 如果当前是手动折叠状态
        if (isManualCollapse()) {
            // 取消手动折叠状态并展开侧边栏
            setIsManualCollapse(false)
            setCollapsed(false)
        } else {
            // 否则，设置为手动折叠状态并切换侧边栏的折叠状态
            setIsManualCollapse(true)
            setCollapsed(!collapsed())
        }
    }

    const toggleItem = (index: string) =>
        setOpenItems({ ...openItems(), [index]: !openItems()[index] })

    const selectItem = (index: string, hasChildren: boolean) => {
        if (!hasChildren) setSelectedItem(index)
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

    const renderMenuItem = (item: MenuItem, index: Accessor<number>) => {
        const itemIndex = index().toString()
        const hasChildren = !!item.children

        return (
            <li>
                <div
                    class={`flex items-center p-2 mb-2 cursor-pointer gap-2 text-base rounded-md text-white user-select-none hover:bg-hover-muted ${
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
                            <Dynamic
                                component={
                                    openItems()[itemIndex]
                                        ? AiOutlineDown
                                        : AiOutlineRight
                                }
                                size={12}
                            />
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
                class={`flex items-center mb-2 cursor-pointer gap-2 text-base p-1.5 rounded-md text-white hover:bg-hover-muted ${
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
                'w-2': collapsed(),
                'w-64': !collapsed(),
                'h-full': true,
                'bg-sidebar-background': true,
                'text-foreground': true,
                'transition-width': true,
                'duration-200': true,
                'overflow-y-auto': true
            }}
            onMouseEnter={() => {
                setIsMouseInside(true)
                setTimeout(() => {
                    if (isManualCollapse() && isMouseInside()) {
                        setCollapsed(false)
                    }
                }, 100)
            }}
            onMouseLeave={() => {
                setIsMouseInside(false)
                if (isManualCollapse()) {
                    setCollapsed(true)
                }
            }}
        >
            <div class="flex flex-row items-center justify-between gap-8 h-14 py-8 px-4">
                {/* <img src="/logo.png" alt="logo" class="w-8 h-8" /> */}
                <Show when={!collapsed()}>
                    <SiBoxysvg />
                    <span class="text-white text-lg">{colorMode()}</span>
                </Show>
                <button
                    onClick={handleCollapseToggle}
                    class={`transition-transform duration-300 ${
                        collapsed() ? 'rotate-180' : ''
                    }`}
                >
                    <Dynamic
                        component={
                            collapsed()
                                ? AiOutlineAlignRight
                                : AiOutlineAlignLeft
                        }
                        class="text-white"
                    />
                </button>
            </div>
            <ul class="list-none mt-2 p-2.5">
                <For each={props.menuItems}>{renderMenuItem}</For>
            </ul>
        </div>
    )
}
