import { useLocation, useNavigate } from "@solidjs/router"
import {
	type Accessor,
	type ParentProps,
	createContext,
	createEffect,
	createSignal,
	onMount,
	useContext,
} from "solid-js"
import { type SetStoreFunction, createStore } from "solid-js/store"
import type { LoginFunction } from "~/api/contract"
import { showToast } from "~/components/ui/toast"
import { useLocale } from "~/i18n/lib"

interface AuthContextProps {
	isLogined: Accessor<boolean>
	signIn: () => Promise<void>
	signOut: () => void
	setRequest: SetStoreFunction<API.Login.Request>
	isLoging: Accessor<boolean>
}

export const AuthContext = createContext<AuthContextProps>()

interface AuthProviderProps extends ParentProps {
	loginCall: LoginFunction
}

export const AuthProvider = (props: AuthProviderProps) => {
	const navigate = useNavigate()
	const location = useLocation()
	const [request, setRequest] = createStore<API.Login.Request>({
		account: "",
		password: "",
	})

	const { t } = useLocale()

	const [isLogined, setIsLogined] = createSignal<boolean>(false)
	const [isLoging, setIsLoging] = createSignal<boolean>(false)

	const signOut = () => {
		localStorage.removeItem("token")
		setIsLogined(false)
		navigate("/login")
	}

	const signIn = async () => {
		if (!request.account || !request.password) {
			showToast({
				title: !request.account
					? t.login.error.account_required()
					: t.login.error.password_required(),
				variant: "destructive",
			})
			return
		}

		setIsLoging(true)

		try {
			const data = await props.loginCall(request)
			localStorage.setItem("token", data)
			setIsLogined(true)
			navigate("/")
			showToast({
				title: t.login.success(),
				variant: "success",
			})
		} catch (e) {
			showToast({
				title: t.login.error.failed({ message: e.message }),
				variant: "destructive",
			})
		} finally {
			setIsLoging(false)
		}
	}

	onMount(() => {
		setIsLogined(!!localStorage.getItem("token"))
	})

	createEffect(() => {
		if (location.pathname === "/login" && isLogined()) {
			navigate("/")
		} else if (location.pathname !== "/login" && !isLogined()) {
			navigate("/login")
		}
	})

	return (
		<AuthContext.Provider
			value={{ isLoging, isLogined, signIn, signOut, setRequest }}
		>
			{props.children}
		</AuthContext.Provider>
	)
}

export const useAuthContext = () => {
	const context = useContext(AuthContext)
	if (!context) {
		throw new Error("useAuthContext must be used within a AuthProvider")
	}
	return context
}
