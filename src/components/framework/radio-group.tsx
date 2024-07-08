import { For, splitProps } from 'solid-js'
import {
    RadioGroup as SolidRadioGroup,
    RadioGroupItem as SolidRadioGroupItem,
    RadioGroupItemLabel as SolidRadioGroupItemLabel
} from '../ui/radio-group'
import * as RadioGroupPrimitive from '@kobalte/core/radio-group'
import { cn } from '~/lib/utils'

interface RadioGroupProps extends RadioGroupPrimitive.RadioGroupRootProps {
    items?: {
        value: string
        label: string
    }[]
    class?: string
}

const RadioGroup = (props: RadioGroupProps) => {
    const [local, other] = splitProps(props, ['items', 'class'])

    return (
        <SolidRadioGroup
            orientation="vertical"
            class={cn('flex flex-row', local.class)}
            defaultValue="normal"
            {...other}
        >
            <For each={local.items}>
                {(item) => (
                    <SolidRadioGroupItem value={item.value}>
                        <SolidRadioGroupItemLabel>
                            {item.label}
                        </SolidRadioGroupItemLabel>
                    </SolidRadioGroupItem>
                )}
            </For>
        </SolidRadioGroup>
    )
}

export default RadioGroup
