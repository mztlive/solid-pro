import { useLocation, useNavigate } from "@solidjs/router"
import { createSignal, createMemo, on, createEffect } from "solid-js"
import { TabItem } from "~/components/framework/navigate-tabs"
import { MenuItemType } from "~/components/ui/sidebar/sidebar"
import { createMenus } from "~/menus"

const useNavigateTab = () => {
    const [items, setItems] = createSignal<TabItem[]>([])
	const location = useLocation()
	const currentPath = createMemo(() => location.pathname)

    const navigate = useNavigate()

    const menus = createMenus()
	const flattenMenus = menus.reduce<MenuItemType[]>((acc, menu) => {
		acc.push(menu)
		if (menu.children) {
			acc.push(...menu.children)
		}
		return acc
	}, [])

    const handleTabClick = (key: string) => {
		navigate(key)
	}

	const handleTabClose = (key: string) => {
		const currentIndex = items().findIndex((item) => item.key === key)
		const remainingItems = items().filter((item) => item.key !== key)

		// 先导航
		if (remainingItems.length > 0) {
			const targetItem = remainingItems[Math.max(0, currentIndex - 1)]
			navigate(targetItem.key)
		} else {
			navigate("/")
		}

		// 后删除标签
		setItems(remainingItems)
	}


    createEffect(
		on(currentPath, () => {
			const path = location.pathname
			const menu = flattenMenus.find((m) => m.href === path)

			if (menu) {
				if (!items().find((item) => item.key === path)) {
					setItems((prev) => [
						...prev,
						{ key: path, label: menu.text },
					])
				}
			}
		}),
	)

	return {
		items,
        currentPath,
		handleTabClick,
		handleTabClose,
	}
}


export default useNavigateTab