import { AiOutlineDashboard, AiOutlineTable } from "solid-icons/ai"
import type { MenuItemType } from "./components/ui/sidebar/sidebar"
import { useLocale } from "./i18n/lib"

const { t } = useLocale()

export const createMenus = (): MenuItemType[] => [
	{
		text: t.menu.dashboard,
		icon: AiOutlineDashboard,
		href: "/",
	},
	{
		text: t.menu.table,
		icon: AiOutlineTable,
		children: [
			{
				text: "Standard Table",
				href: "/table-test",
			},
		],
	},
]
