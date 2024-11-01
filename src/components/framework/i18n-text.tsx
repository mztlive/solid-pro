import { type JSX, splitProps } from "solid-js"

interface I18nTextProps extends JSX.HTMLAttributes<HTMLSpanElement> {
	text: string | (() => string)
}

const I18nText = (props: I18nTextProps) => {
	const [local, other] = splitProps(props, ["text"])

	return (
		<span {...other}>
			{typeof local.text === "function" ? local.text() : local.text}
		</span>
	)
}

export default I18nText
