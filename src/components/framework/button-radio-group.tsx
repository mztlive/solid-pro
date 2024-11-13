import { RadioGroup } from "@kobalte/core/radio-group"
import { For, splitProps } from "solid-js"
import { cn } from "~/libs/cn"

type ButtonRadioGroupValue = {
	value: string
	label: string
}

interface ButtonRadioGroupProps {
	items?: ButtonRadioGroupValue[]
	class?: string
	size?: "sm" | "md" | "lg"
	value: string
	onChange: (value: string) => void
}

const sizeClasses = {
	sm: "px-2 py-0.5 text-sm",
	md: "px-3 py-1.5 text-base",
	lg: "px-4 py-2 text-lg",
	xs: "px-2 py-0.5 text-xs",
}

const ButtonRadioGroup = (props: ButtonRadioGroupProps) => {
	const [local, other] = splitProps(props, [
		"items",
		"class",
		"size",
		"onChange",
	])
	const size = () => local.size || "xs"

	const handleChange = (value: string) => {
		if (value !== props.value) {
			props.onChange(value)
		}
	}

	return (
		<RadioGroup
			orientation="horizontal"
			class={cn("flex flex-row gap-2", local.class)}
			value={props.value}
			onChange={handleChange}
			{...other}
		>
			<div class="flex flex-row gap-2" role="presentation">
				<For each={local.items}>
					{(item) => (
						<RadioGroup.Item
							value={item.value}
							class="flex items-center"
						>
							<RadioGroup.ItemInput class="sr-only" />
							<RadioGroup.ItemControl
								class={cn(
									"rounded-md border border-dashed border-primary/30 text-muted-foreground transition-all cursor-pointer",
									"hover:border-primary/80 hover:text-foreground",
									"data-[checked]:border-solid data-[checked]:border-primary data-[checked]:text-primary",
									sizeClasses[size()],
								)}
							>
								<span>{item.label}</span>
							</RadioGroup.ItemControl>
						</RadioGroup.Item>
					)}
				</For>
			</div>
		</RadioGroup>
	)
}

export default ButtonRadioGroup
