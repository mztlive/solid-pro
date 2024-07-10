import { Accessor, createMemo } from 'solid-js'
import { MenuItem, useSidebarContext } from './sidebar'
import { Motion } from 'solid-motionone'
import { useNavigate } from '@solidjs/router'

interface SubmenuItemProps {
    subItem: MenuItem
    subIndex: Accessor<number>
    parentIndex: string
}
const SubmenuItem = (props: SubmenuItemProps) => {
    const { selectedItem, selectItem } = useSidebarContext()
    const navigate = useNavigate()

    const subItemIndex = createMemo(
        () => `${props.parentIndex}-${props.subIndex()}`
    )

    const isSelected = createMemo(() => selectedItem() === subItemIndex())

    return (
        <li
            class={`flex items-center mb-2 cursor-pointer gap-2 text-base p-1.5 rounded-md text-white hover:bg-hover-muted ${
                isSelected() ? 'bg-selected-background' : ''
            }`}
            onClick={() => {
                selectItem(subItemIndex(), false)
                navigate(props.subItem.href || '/')
            }}
        >
            {props.subItem.icon}
            <Motion.span
                animate={{
                    opacity: [0, 1],
                    transition: { duration: 0.3, easing: 'ease-in-out' }
                }}
            >
                {typeof props.subItem.text === 'function'
                    ? props.subItem.text()
                    : props.subItem.text}
            </Motion.span>
        </li>
    )
}

export default SubmenuItem
