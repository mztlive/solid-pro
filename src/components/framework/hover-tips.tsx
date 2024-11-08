import type { JSX } from "solid-js"
import { cn } from "~/libs/cn"

interface HoverTipsProps extends JSX.HTMLAttributes<HTMLDivElement> {
	children: JSX.Element
	tips: string
}

const HoverTips = (props: HoverTipsProps) => {
	return (
		<div class={cn("relative group", props.class)} {...props}>
			{props.children}
			<div class="absolute bottom-full mb-2 hidden w-max px-2 py-1 text-background bg-foreground rounded group-hover:block transition-all duration-300 select-none text-sm">
				{props.tips}
			</div>
		</div>
	)
}

export default HoverTips
