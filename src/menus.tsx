import { AiOutlineDashboard, AiOutlineTable } from 'solid-icons/ai'
import { useLocale } from './i18n/lib'
import { MenuItem } from './components/ui/sidebar/sidebar'

const { t } = useLocale()

export const menus: MenuItem[] = [
    {
        text: t.menu.dashboard,
        icon: <AiOutlineDashboard size={20} />,
        href: '/'
    },
    {
        text: t.menu.table,
        icon: <AiOutlineTable size={20} />,
        children: [
            {
                text: 'Standard Table',
                href: '/table-test'
            }
        ]
    }
]
