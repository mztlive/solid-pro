import {
	type Accessor,
	type Component,
	For,
	type ParentProps,
	Show,
	createContext,
	createEffect,
	createMemo,
	createSignal,
	useContext,
} from "solid-js"

import {
	AiOutlineAlignLeft,
	AiOutlineAlignRight,
	AiFillPushpin,
	AiOutlineMenu,
} from "solid-icons/ai"

import { BsLayoutSidebar, BsLayoutSidebarReverse } from "solid-icons/bs"

import type { Resolver } from "@solid-primitives/i18n"
import { useLocation } from "@solidjs/router"
import { SiBoxysvg } from "solid-icons/si"
import { Dynamic } from "solid-js/web"
import MenuItem from "./menu-item"
import { Button } from "../button"

export type MenuItemType = {
	icon?: Component
	text: string | Resolver<string, string>
	children?: MenuItemType[]
	description?: string | Resolver<string, string>
	href?: string
}

interface SidebarContextProps {
	// 展开的菜单项
	openItems: Accessor<Record<string, boolean>>
	// 选中的菜单项
	selectedItem: Accessor<string | null>
	// 切换菜单项折叠状态
	toggleItem: (index: string) => void
	// 选中菜单项
	setSelectItem: (index: string, hasChildren: boolean) => void
	// 是否折叠
	isCollapsed: Accessor<boolean>
	// 切换折叠状态
	toggleCollapse: () => void

	menuItems: MenuItemType[]
}

interface SidebarProps extends ParentProps {
	menuItems: MenuItemType[]
}

const SidebarContext = createContext<SidebarContextProps>()

export const SidebarProvider = (props: SidebarProps) => {
	const location = useLocation()

	const [openItems, setOpenItems] = createSignal<Record<string, boolean>>({})
	const [selectedItem, setSelectedItem] = createSignal<string | null>(null)
	const [isCollapsed, setIsCollapsed] = createSignal(false)

	// 切换菜单项折叠状态
	const toggleItem = (index: string) => {
		setOpenItems({ ...openItems(), [index]: !openItems()[index] })
	}

	// 选中菜单项
	const setSelectItem = (index: string, hasChildren: boolean) => {
		if (!hasChildren) setSelectedItem(index)
	}

	// 使用 createMemo 来缓存计算结果
	const currentPathInfo = createMemo(() => {
		const currentPath = location.pathname
		let selectedIndex: string | null = null
		let openIndex: string | null = null

		props.menuItems.forEach((item, index) => {
			if (item.href === currentPath) {
				selectedIndex = index.toString()
			} else {
				item.children?.forEach((subItem, subIndex) => {
					if (subItem.href === currentPath) {
						selectedIndex = `${index}-${subIndex}`
						openIndex = index.toString()
					}
				})
			}
		})

		return { selectedIndex, openIndex }
	})

	// 根据当前路径设置选中的菜单项
	createEffect(() => {
		const { selectedIndex, openIndex } = currentPathInfo()
		if (selectedIndex !== null) {
			setSelectedItem(selectedIndex)
		}

		if (openIndex !== null) {
			setOpenItems((prev) => ({ ...prev, [openIndex]: true }))
		}
	})

	return (
		<SidebarContext.Provider
			value={{
				openItems,
				selectedItem,
				toggleItem,
				setSelectItem,
				isCollapsed,
				toggleCollapse: () => setIsCollapsed(!isCollapsed()),
				menuItems: props.menuItems,
			}}
		>
			{props.children}
		</SidebarContext.Provider>
	)
}

export const useSidebarContext = () => {
	const context = useContext(SidebarContext)
	if (!context) {
		throw new Error(
			"useSidebarContext must be used within a SidebarProvider",
		)
	}
	return context
}

export const Sidebar = () => {
	const { isCollapsed, toggleCollapse, menuItems } = useSidebarContext()

	const sidebarClasses = createMemo(() => ({
		"w-0": isCollapsed(),
		"w-60": !isCollapsed(),
		"h-full": true,
		"bg-sidebar-background": true,
		"text-foreground": true,
		"transition-width": true,
		"duration-200": true,
		"overflow-y-auto": true,
		"opacity-0": isCollapsed(),
		"group-hover:w-60": isCollapsed(),
		"group-hover:opacity-100": isCollapsed(),
	}))

	return (
		<div class="relative h-full group">
			<div classList={sidebarClasses()}>
				<div class="flex flex-row items-center justify-between gap-8 h-14 py-8 px-4 whitespace-nowrap">
					{/* <img src="/logo.png" alt="logo" class="w-8 h-8" /> */}
					<Show when={!isCollapsed() || true}>
						<SiBoxysvg />
						<span class="text-white text-lg">XXXXXX</span>
					</Show>

					<Button
						onClick={toggleCollapse}
						size="icon"
						class="transition-transform duration-300 bg-transparent dark:hover:bg-transparent"
					>
						<Dynamic
							component={
								isCollapsed()
									? BsLayoutSidebarReverse
									: BsLayoutSidebar
							}
							class="text-white"
						/>
					</Button>
				</div>
				<ul class="list-none mt-2 p-2.5 whitespace-nowrap">
					<For each={menuItems}>
						{(item, index) => (
							<MenuItem item={item} index={index} />
						)}
					</For>
				</ul>
			</div>
			<Show when={isCollapsed()}>
				<Button
					onClick={toggleCollapse}
					size="icon"
					class="fixed bottom-4 left-4 z-50  rounded-full  hover:bg-opacity-80 transition-colors"
				>
					<AiOutlineMenu size={24} />
				</Button>
			</Show>
			<div
				class="absolute top-0 left-0 w-4 h-full cursor-pointer"
				classList={{
					hidden: !isCollapsed(),
				}}
			/>
		</div>
	)
}
