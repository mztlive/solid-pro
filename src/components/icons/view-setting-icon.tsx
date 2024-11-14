import { cn } from "~/libs/cn"

interface ViewSettingIconProps {
	class?: string
	size?: number
}

const ViewSettingIcon = (props: ViewSettingIconProps) => {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			class={cn("mr-2 size-4", props.class)}
			viewBox="0 0 24 24"
		>
			<g
				fill="none"
				stroke="currentColor"
				stroke-linecap="round"
				stroke-linejoin="round"
				stroke-width="2"
			>
				<path d="M10 12a2 2 0 1 0 4 0a2 2 0 0 0-4 0" />
				<path d="M12 18c-3.6 0-6.6-2-9-6c2.4-4 5.4-6 9-6c3.6 0 6.6 2 9 6m-3.999 7a2 2 0 1 0 4 0a2 2 0 1 0-4 0m2-3.5V17m0 4v1.5m3.031-5.25l-1.299.75m-3.463 2l-1.3.75m0-3.5l1.3.75m3.463 2l1.3.75" />
			</g>
			<title>View</title>
		</svg>
	)
}

export default ViewSettingIcon
