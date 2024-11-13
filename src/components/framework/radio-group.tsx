import type * as RadioGroupPrimitive from "@kobalte/core/radio-group"
import { For, splitProps } from "solid-js"
import { cn } from "~/libs/cn"
import {
	RadioGroup as SolidRadioGroup,
	RadioGroupItem as SolidRadioGroupItem,
	RadioGroupItemLabel as SolidRadioGroupItemLabel,
	RadioGroupItemControl as SolidRadioGroupItemControl,
} from "../ui/radio-group"

interface RadioGroupProps extends RadioGroupPrimitive.RadioGroupRootProps {
	items?: {
		value: string
		label: string
	}[]
	class?: string
}

const RadioGroup = (props: RadioGroupProps) => {
	const [local, other] = splitProps(props, ["items", "class"])

	return (
		<SolidRadioGroup
			orientation="vertical"
			class={cn("flex flex-row", local.class)}
			defaultValue="normal"
			{...other}
		>
			<For each={local.items}>
				{(item) => (
					<SolidRadioGroupItem
						value={item.value}
						class="flex flex-row items-center gap-2 ml-2"
					>
						<SolidRadioGroupItemControl />
						<SolidRadioGroupItemLabel class="cursor-pointer">
							{item.label}
						</SolidRadioGroupItemLabel>
					</SolidRadioGroupItem>
				)}
			</For>
		</SolidRadioGroup>
	)
}

export default RadioGroup
