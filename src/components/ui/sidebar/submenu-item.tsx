import { useIsRouting, useNavigate } from "@solidjs/router"
import { type Accessor, createMemo, Show } from "solid-js"
import { Dynamic } from "solid-js/web"
import { Motion } from "solid-motionone"
import I18nText from "~/components/framework/i18n-text"
import { type MenuItemType, useSidebarContext } from "./sidebar"
import { Progress } from "../progress"

interface SubmenuItemProps {
	subItem: MenuItemType
	subIndex: Accessor<number>
	parentIndex: string
}
const SubmenuItem = (props: SubmenuItemProps) => {
	const { selectedItem, setSelectItem: selectItem } = useSidebarContext()
	const navigate = useNavigate()

	const subItemIndex = createMemo(
		() => `${props.parentIndex}-${props.subIndex()}`,
	)

	const isSelected = createMemo(() => selectedItem() === subItemIndex())

	const itemBaseClass =
		"user-select-none flex flex-col mb-2 cursor-pointer gap-2 p-1.5 rounded-md text-white hover:bg-selected-background relative"

	return (
		<li
			classList={{
				[itemBaseClass]: true,
				"bg-selected-background": isSelected(),
			}}
			onClick={() => {
				selectItem(subItemIndex(), false)
				navigate(props.subItem.href || "/")
			}}
		>
			<div class="">
				<Dynamic component={props.subItem.icon} />
				<Motion.span
					animate={{
						opacity: [0, 1],
						transition: {
							duration: 0.3,
							easing: "ease-in-out",
						},
					}}
				>
					<I18nText
						class="text-sm p-2 user-select-none"
						text={props.subItem.text}
					/>
				</Motion.span>
			</div>
			<Show when={isSelected()}>
				<div class="absolute bottom-0 left-0 w-full h-[1px] bg-red-300" />
			</Show>
		</li>
	)
}

export default SubmenuItem
