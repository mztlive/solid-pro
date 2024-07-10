import { AiOutlineDashboard, AiOutlineTable } from 'solid-icons/ai'
import { useLocale } from './i18n/lib'
import { MenuItem } from './components/ui/sidebar/sidebar'

const { t } = useLocale()

export const createMenus = (): MenuItem[] => [
    {
        text: t.menu.dashboard,
        icon: AiOutlineDashboard,
        href: '/'
    },
    {
        text: t.menu.table,
        icon: AiOutlineTable,
        children: [
            {
                text: 'Standard Table',
                href: '/table-test'
            }
        ]
    }
]
