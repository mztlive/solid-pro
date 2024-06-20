import { AiOutlineSearch } from 'solid-icons/ai'
import { TextField } from '../ui/text-field'
import { Button } from '../ui/button'
import { useI18nContext } from '~/providers/i18n-provider'

const SearchInput = () => {
    const { t } = useI18nContext()

    return (
        <TextField class="flex flex-row">
            <input
                class="h-8 border-none px-4 bg-gray-200 rounded-none rounded-l-md focus:bg-gray-300 focus:outline-none  focus:border-transparent"
                type="text"
                placeholder={t('common.search_placeholder')}
            />
            <Button
                variant="outline"
                class="h-8 w-8 border-none bg-gray-200 rounded-none rounded-r-md"
            >
                <AiOutlineSearch size={20} />
            </Button>
        </TextField>
    )
}

export default SearchInput
