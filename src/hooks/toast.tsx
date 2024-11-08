import { toaster } from "@kobalte/core/toast"
import { splitProps } from "solid-js"

import {
	Toast,
	ToastContent,
	ToastDescription,
	ToastProgress,
	ToastTitle,
} from "~/components/ui/toast"

interface ToastProps {
	title: string
	description: string
	variant: "destructive" | "success" | "default"
}

export const showToast = (props: ToastProps) => {
	const [local] = splitProps(props, ["variant", "title", "description"])

	toaster.show((props) => (
		<Toast toastId={props.toastId} variant={local.variant}>
			<ToastContent>
				<ToastTitle>{local.title}</ToastTitle>
				<ToastDescription>{local.description}</ToastDescription>
			</ToastContent>
			<ToastProgress />
		</Toast>
	))
}
