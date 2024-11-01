import type { Component, ComponentProps } from "solid-js"
import { splitProps } from "solid-js"

import type { VariantProps } from "class-variance-authority"
import { cva } from "class-variance-authority"

import { cn } from "~/lib/utils"

const badgeVariants = cva(
	"inline-flex items-center border  text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
	{
		variants: {
			variant: {
				default:
					"border-transparent bg-primary text-primary-foreground hover:bg-primary/80",
				secondary:
					"border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
				destructive:
					"border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80",
				outline: "text-foreground",
			},
			size: {
				xs: "px-2 py-0.5",
				sm: "px-2.5 py-0.5",
				md: "px-3 py-0.5",
				lg: "px-4 py-1",
			},
		},
		defaultVariants: {
			variant: "default",
			size: "sm",
		},
	},
)

type BadgeProps = ComponentProps<"div"> &
	VariantProps<typeof badgeVariants> & {
		round?: boolean
	}

const Badge: Component<BadgeProps> = (props) => {
	const [local, others] = splitProps(props, [
		"class",
		"variant",
		"round",
		"size",
	])
	return (
		<div
			class={cn(
				badgeVariants({ variant: local.variant, size: local.size }),
				local.round ? "rounded-full" : "rounded-md",
				local.class,
			)}
			{...others}
		/>
	)
}

export type { BadgeProps }
export { Badge, badgeVariants }
