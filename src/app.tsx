import { ParentProps, Suspense, type Component } from 'solid-js'
import { AuthProvider } from './providers/auth-provider'
import { fakeLogin } from './api/mock'
import { Toaster } from './components/ui/toast'
import { Skeleton } from './components/ui/skeleton'
import { I18nProvider } from './providers/i18n-provider'

const App: Component = (props: ParentProps) => {
    return (
        <I18nProvider>
            <div class="w-full flex flex-row">
                <Toaster />
                <AuthProvider loginCall={fakeLogin}>
                    <Suspense
                        fallback={
                            <Skeleton class="w-full h-screen" radius={10} />
                        }
                    >
                        {props.children}
                    </Suspense>
                </AuthProvider>
            </div>
        </I18nProvider>
    )
}

export default App
