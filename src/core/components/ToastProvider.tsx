import React from "react"
import { StyleProp, TextStyle } from "react-native"
import Toast, { BaseToast, BaseToastProps } from "react-native-toast-message"
import { css } from "@emotion/native"
import { fonts } from "@core/assets/fonts"
import { windowWidth } from "@core/utils/demensions.ts"
import { Theme, useTheme } from "@emotion/react"
import { StylesPropsType } from "@core/types.ts"

type ToastConfigType = React.JSX.IntrinsicAttributes & BaseToastProps

const MainToast = (props: ToastConfigType) => {
    return (
        <BaseToast
            {...props}
            text1Style={titleStyle as StyleProp<TextStyle>}
            text2Style={subtitleStyle as StyleProp<TextStyle>}
            text1NumberOfLines={2}
            text2NumberOfLines={2}
        />
    )
}

const toastConfig = (theme: Theme) => ({
    success: (props: ToastConfigType) => (
        <MainToast
            style={{ top: 15, borderLeftColor: theme.success, backgroundColor: "#d6f5d3", width: windowWidth - 20 }}
            {...props}
        />
    ),
    warning: (props: ToastConfigType) => (
        <MainToast
            style={{ top: 15, borderLeftColor: theme.warning, backgroundColor: "#f6efd1", width: windowWidth - 20 }}
            {...props}
        />
    ),
    error: (props: ToastConfigType) => (
        <MainToast
            style={{ top: 15, borderLeftColor: theme.danger, backgroundColor: "#fcd6d6", width: windowWidth - 20 }}
            {...props}
        />
    ),
})

const ToastProvider = () => {
    const theme = useTheme()

    return <Toast config={toastConfig(theme)} />
}

const titleStyle = (props: StylesPropsType) => css`
    font-size: 16px;
    font-family: ${fonts.regular};
    color: ${props.theme.text};
`

const subtitleStyle = (props: StylesPropsType) => css`
    font-size: 14px;
    font-family: ${fonts.regular};
    color: ${props.theme.text};
`

export default ToastProvider
