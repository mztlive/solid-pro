import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card"
import LoadingButton from "~/components/ui/loading-button"
import {
	TextField,
	TextFieldInput,
	TextFieldLabel,
} from "~/components/ui/text-field"
import { useLocale } from "~/i18n/lib"
import { useAuthContext } from "../providers/auth-provider"

const Login = () => {
	const { signIn, setRequest, isLoging } = useAuthContext()

	const { t } = useLocale()

	return (
		<div class="flex w-full h-screen justify-center items-center">
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
