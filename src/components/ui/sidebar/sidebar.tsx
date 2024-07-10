import {
    JSX,
    Show,
    createEffect,
    createSignal,
    For,
    createContext,
    ParentProps,
    Accessor,
    useContext
} from 'solid-js'

import { AiOutlineAlignLeft, AiOutlineAlignRight } from 'solid-icons/ai'

import { SiBoxysvg } from 'solid-icons/si'
import { Resolver } from '@solid-primitives/i18n'
import { useLocation } from '@solidjs/router'
import { Dynamic } from 'solid-js/web'
import MenuItem from './menu-item'

export type MenuItem = {
    icon?: JSX.Element
    text: string | Resolver<string, string>
    children?: MenuItem[]
    description?: string | Resolver<string, string>
    href?: string
}

interface SidebarContextProps {
    openItems: Accessor<Record<string, boolean>>
    selectedItem: Accessor<string | null>
    toggleItem: (index: string) => void
    selectItem: (index: string, hasChildren: boolean) => void
}

interface SidebarProps extends ParentProps {
    menuItems: MenuItem[]
}

const SidebarContext = createContext<SidebarContextProps>()

const SidebarProvider = (props: SidebarProps) => {
    const location = useLocation()

    const [openItems, setOpenItems] = createSignal<Record<string, boolean>>({})
    const [selectedItem, setSelectedItem] = createSignal<string | null>(null)

    // 切换菜单项折叠状态
    const toggleItem = (index: string) =>
        setOpenItems({ ...openItems(), [index]: !openItems()[index] })

    // 选中菜单项
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
        <SidebarContext.Provider
            value={{ openItems, selectedItem, toggleItem, selectItem }}
        >
            {props.children}
        </SidebarContext.Provider>
    )
}

export const useSidebarContext = () => {
    const context = useContext(SidebarContext)
    if (!context) {
        throw new Error(
            'useSidebarContext must be used within a SidebarProvider'
        )
    }
    return context
}

export const Sidebar = (props: SidebarProps) => {
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

    return (
        <SidebarProvider menuItems={props.menuItems}>
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
                        <span class="text-white text-lg">XXXXXX</span>
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
                    <For each={props.menuItems}>
                        {(item, index) => (
                            <MenuItem item={item} index={index} />
                        )}
                    </For>
                </ul>
            </div>
        </SidebarProvider>
    )
}
