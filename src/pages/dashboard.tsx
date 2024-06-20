import { Button } from '~/components/ui/button'
import { showToast } from '~/components/ui/toast'
import { useI18nContext } from '~/providers/i18n-provider'

const Dashboard = () => {
    const { t } = useI18nContext()

    return (
        <div>
            <h1>Dashboard</h1>
            <Button
                onClick={() =>
                    showToast({
                        title: 'Hello',
                        description: 'World'
                    })
                }
            >
                {t('menu.dashboard')}
            </Button>
        </div>
    )
}

export default Dashboard
