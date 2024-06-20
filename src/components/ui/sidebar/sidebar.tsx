import { JSX, Match, Show, Switch, createSignal } from 'solid-js'
import { For } from 'solid-js/web'
import styles from './style.module.css'
import {
    AiOutlineAlignLeft,
    AiOutlineAlignRight,
    AiOutlineDown,
    AiOutlineRight
} from 'solid-icons/ai'
import { Motion } from 'solid-motionone'

import { SiBoxysvg } from 'solid-icons/si'
import { useI18nContext } from '~/providers/i18n-provider'

export type MenuItem = {
    icon?: JSX.Element
    text: string
    children?: MenuItem[]
}

export type SidebarProps = {
    menuItems: MenuItem[]
}

export const Sidebar = (props: SidebarProps) => {
    const { t } = useI18nContext()

    const [collapsed, setCollapsed] = createSignal(false)
    const [openItems, setOpenItems] = createSignal<Record<string, boolean>>({})
    const [selectedItem, setSelectedItem] = createSignal<string | null>(null)

    const toggleCollapse = () => setCollapsed(!collapsed())
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
                    class={`${styles.menuItem} ${
                        selectedItem() === itemIndex && !hasChildren
                            ? styles.selected
                            : ''
                    }`}
                    onClick={() => {
                        selectItem(itemIndex, hasChildren)
                        hasChildren && toggleItem(itemIndex)
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
                            <span>{t(item.text)}</span>
                        </Motion.span>
                    </Show>
                    <Show when={hasChildren}>
                        <span class="ml-auto">
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
                        class={styles.subMenu}
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
                class={`${styles.subMenuItem} ${
                    selectedItem() === subItemIndex ? styles.selected : ''
                }`}
                onClick={() => selectItem(subItemIndex, false)}
            >
                {subItem.icon}
                <Show when={!collapsed()}>
                    <Motion.span
                        animate={{
                            opacity: [0, 1],
                            transition: { duration: 0.3, easing: 'ease-in-out' }
                        }}
                    >
                        {t(subItem.text)}
                    </Motion.span>
                </Show>
            </li>
        )
    }

    return (
        <div class={collapsed() ? styles.collapsedSidebar : styles.sidebar}>
            <div class={styles.sidebarHeader}>
                {/* <img src="/logo.png" alt="logo" class="w-8 h-8" /> */}
                <SiBoxysvg />
                <Show when={!collapsed()}>
                    <span>SolidJS</span>
                </Show>
                <button class={styles.collapseButton} onClick={toggleCollapse}>
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
            <ul class={styles.menu}>
                <For each={props.menuItems}>{renderMenuItem}</For>
            </ul>
        </div>
    )
}
