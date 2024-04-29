import "@emotion/react"

declare module "@emotion/react" {
    export interface Theme {
        primary: string
        secondary: string
        lightPrimary: string
        success: string
        danger: string
        warning: string
        link: string
        white: string
        gray: string
        darkGray: string
        black: string
        text: string
        background: string
    }
}
