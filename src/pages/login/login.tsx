import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card"
import LoadingButton from "~/components/ui/loading-button"
import {
	TextField,
	TextFieldInput,
	TextFieldLabel,
} from "~/components/ui/text-field"
import { useLocale } from "~/i18n/lib"
import { useAuthContext } from "~/providers/auth-provider"
import LocaleSelect from "~/components/framework/locale-select"
import ColorModeDropdownmenu from "~/components/framework/color-model-dropdownment"
import "./style.css"
import SolidjsIcon from "~/components/ui/solidjs-icon"

const Login = () => {
	const { signIn, setRequest, isLoging } = useAuthContext()
	const { t } = useLocale()

	return (
		<div class="relative w-full h-screen flex overflow-hidden">
			{/* 左侧区域 - 图片/动画 */}
			<div class="flex-1 relative bg-primary/10">
				<svg
					class="absolute inset-0 w-full h-full"
					viewBox="0 0 100 100"
					preserveAspectRatio="none"
				>
					<path
						fill="rgba(58, 123, 213, 0.1)"
						d="M0 50 Q 25 60, 50 50 T 100 50 V100 H0 Z"
					>
						<animate
							attributeName="d"
							dur="10s"
							repeatCount="indefinite"
							values="
								M0 50 Q 25 60, 50 50 T 100 50 V100 H0 Z;
								M0 50 Q 25 40, 50 50 T 100 50 V100 H0 Z;
								M0 50 Q 25 60, 50 50 T 100 50 V100 H0 Z"
						/>
					</path>
					<path
						fill="rgba(58, 123, 213, 0.2)"
						d="M0 55 Q 25 65, 50 55 T 100 55 V100 H0 Z"
					>
						<animate
							attributeName="d"
							dur="8s"
							repeatCount="indefinite"
							values="
								M0 55 Q 25 65, 50 55 T 100 55 V100 H0 Z;
								M0 55 Q 25 45, 50 55 T 100 55 V100 H0 Z;
								M0 55 Q 25 65, 50 55 T 100 55 V100 H0 Z"
						/>
					</path>
					<path
						fill="rgba(58, 123, 213, 0.3)"
						d="M0 60 Q 25 70, 50 60 T 100 60 V100 H0 Z"
					>
						<animate
							attributeName="d"
							dur="6s"
							repeatCount="indefinite"
							values="
								M0 60 Q 25 70, 50 60 T 100 60 V100 H0 Z;
								M0 60 Q 25 50, 50 60 T 100 60 V100 H0 Z;
								M0 60 Q 25 70, 50 60 T 100 60 V100 H0 Z"
						/>
					</path>
				</svg>
			</div>

			{/* 右侧区域 - 登录表单 */}
			<div class="flex-1 relative flex justify-center items-center">
				{/* Header elements */}
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
						<path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10z" />
					</svg>
					<LocaleSelect />
				</div>

				<div class="flex flex-col items-center gap-8">
					<SolidjsIcon />

					<Card class="w-[400px] relative z-10">
						<CardHeader>
							<CardTitle>{t.login.title()}</CardTitle>
						</CardHeader>
						<CardContent class="flex gap-4 flex-col">
							<TextField>
								<TextFieldLabel>
									{t.login.account()} *
								</TextFieldLabel>
								<TextFieldInput
									placeholder={t.login.please_input_account()}
									type="text"
									onInput={(e) =>
										setRequest(
											"account",
											e.currentTarget.value,
										)
									}
								/>
							</TextField>

							<TextField>
								<TextFieldLabel>
									{t.login.password()}
								</TextFieldLabel>
								<TextFieldInput
									placeholder={t.login.please_input_password()}
									type="password"
									onInput={(e) =>
										setRequest(
											"password",
											e.currentTarget.value,
										)
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
			</div>
		</div>
	)
}

export default Login
