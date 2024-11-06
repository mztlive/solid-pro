import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card"
import LoadingButton from "~/components/ui/loading-button"
import {
	TextField,
	TextFieldInput,
	TextFieldLabel,
} from "~/components/ui/text-field"
import { useLocale } from "~/i18n/lib"
import { useAuthContext } from "../providers/auth-provider"
import LocaleSelect from "~/components/framework/locale-select"
import ColorModeDropdownmenu from "~/components/framework/color-model-dropdownment"

const Login = () => {
	const { signIn, setRequest, isLoging } = useAuthContext()

	const { t } = useLocale()

	return (
		<div class="flex w-full h-screen justify-center items-center">
			<div class="absolute top-2 right-4 flex items-center gap-4">
				<ColorModeDropdownmenu />
				<svg
					xmlns="http://www.w3.org/2000/svg"
					class="w-5 h-5"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="2"
					stroke-linecap="round"
					stroke-linejoin="round"
				>
					<circle cx="12" cy="12" r="10" />
					<line x1="2" y1="12" x2="22" y2="12" />
					<path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
				</svg>
				<LocaleSelect />
			</div>
			<Card class="w-[500px]">
				<CardHeader>
					<CardTitle>{t.login.title()}</CardTitle>
				</CardHeader>
				<CardContent class="flex gap-4 flex-col">
					<TextField>
						<TextFieldLabel>{t.login.account()} *</TextFieldLabel>
						<TextFieldInput
							placeholder={t.login.please_input_account()}
							type="text"
							onInput={(e) =>
								setRequest("account", e.currentTarget.value)
							}
						/>
					</TextField>

					<TextField>
						<TextFieldLabel>{t.login.password()}</TextFieldLabel>
						<TextFieldInput
							placeholder={t.login.please_input_password()}
							type="password"
							onInput={(e) =>
								setRequest("password", e.currentTarget.value)
							}
						/>
					</TextField>
					<LoadingButton
						onClick={() => signIn()}
						loading={isLoging()}
					>
						{t.login.confirm()}
					</LoadingButton>
				</CardContent>
			</Card>
		</div>
	)
}

export default Login
