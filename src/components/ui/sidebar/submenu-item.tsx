import { Accessor, createMemo } from 'solid-js'
import { MenuItem, useSidebarContext } from './sidebar'
import { Motion } from 'solid-motionone'
import { useNavigate } from '@solidjs/router'
import I18nText from '~/components/framework/i18n-text'
import { Dynamic } from 'solid-js/web'

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

    const itemBaseClass =
        'user-select-none flex items-center mb-2 cursor-pointer gap-2 p-1.5 rounded-md text-white hover:bg-selected-background'

    return (
        <li
            classList={{
                [itemBaseClass]: true,
                'bg-selected-background': isSelected()
            }}
            onClick={() => {
                selectItem(subItemIndex(), false)
                navigate(props.subItem.href || '/')
            }}
        >
            <Dynamic component={props.subItem.icon} />
            <Motion.span
                animate={{
                    opacity: [0, 1],
                    transition: { duration: 0.3, easing: 'ease-in-out' }
                }}
            >
                <I18nText class="text-sm p-2" text={props.subItem.text} />
            </Motion.span>
        </li>
    )
}

export default SubmenuItem
