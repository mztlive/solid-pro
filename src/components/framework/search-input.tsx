import { TextField, TextFieldInput } from '../ui/text-field'
import { Button } from '../ui/button'
import {
    AlertDialog,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogTitle
} from '../ui/alert-dialog'
import { createEffect, createSignal, onCleanup } from 'solid-js'
import { useLocale } from '~/i18n/lib'

interface SearchItemProps {
    title: string
    description: string
}

const SearchItem = (props: SearchItemProps) => {
    return (
        <div class="flex flex-row gap-4 rounded-md p-4 hover:bg-muted hover:outline-none hover:border-transparent cursor-pointer">
            <span class="text-2xl text-muted-foreground">#</span>
            <div class="flex flex-col">
                <span class="text-lg text-foreground">{props.title}</span>
                <span class="text-muted-foreground text-md">
                    {props.description}
                </span>
            </div>
        </div>
    )
}

const SearchInput = () => {
    const { t } = useLocale()

    const inputClass = `h-8 border-none px-4 bg-muted rounded-none rounded-l-md  focus:outline-none focus:border-transparent hover:bg-hover-muted hover:outline-none hover:border-transparent cursor-pointer`

    const [dialogIsOpen, setDialogIsOpen] = createSignal(false)

    const handleKeyDown = (event: KeyboardEvent) => {
        if (event.ctrlKey && event.key === 'k') {
            event.preventDefault()
            setDialogIsOpen(true)
        }
    }

    // 注册和清理快捷键事件
    createEffect(() => {
        window.addEventListener('keydown', handleKeyDown)
    })

    onCleanup(() => {
        window.removeEventListener('keydown', handleKeyDown)
    })

    return (
        <>
            <div class="flex flex-row" onClick={() => setDialogIsOpen(true)}>
                <input
                    class={inputClass}
                    type="text"
                    placeholder={t.common.search_placeholder()}
                    readOnly
                />
                <Button
                    variant="outline"
                    class="h-8 w-12 border-none bg-muted rounded-none rounded-r-md"
                >
                    ⌘+K
                </Button>
            </div>

            <AlertDialog open={dialogIsOpen()} onOpenChange={setDialogIsOpen}>
                <AlertDialogContent>
                    <AlertDialogTitle class="mt-4">
                        <TextField>
                            <TextFieldInput
                                type="text"
                                placeholder={t.common.search_placeholder()}
                            />
                        </TextField>
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                        <SearchItem
                            title="Dashboard"
                            description="adfjaljlfjalksjflajlfjlqweouqo"
                        />
                    </AlertDialogDescription>
                </AlertDialogContent>
            </AlertDialog>
        </>
    )
}

export default SearchInput
