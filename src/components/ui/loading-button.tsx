import { JSX, JSXElement, Show, splitProps } from 'solid-js'
import { Button, ButtonProps } from './button'
import { Circles, Puff, Spinner } from 'solid-spinner'
import * as ButtonPrimitive from '@kobalte/core/button'

type LoadingButtonProps = ButtonProps &
    JSX.IntrinsicElements['button'] & {
        loading?: boolean
    }

const LoadingButton = (props: LoadingButtonProps) => {
    return (
        <Button disabled={props.loading} {...props}>
            <Show when={props.loading}>
                <Puff width={30} height={30} />
            </Show>
            <Show when={!props.loading}>{props.children}</Show>
        </Button>
    )
}

export default LoadingButton
