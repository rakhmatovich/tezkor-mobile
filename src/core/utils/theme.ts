import { Theme } from "@emotion/react"
import { storage } from "@core/utils/storage.ts"

const lightColors: Theme = {
    primary: "#7b45da",
    lightPrimary: "#7960ab",
    secondary: "#622ebe",
    success: "#25c417",
    danger: "#ee0303",
    warning: "#ffcc00",
    link: "#0088cc",
    gray: "#b6b6b6",
    darkGray: "#a2a2a2",
    white: "#FFFFFF",
    black: "#000000",
    text: "#333333",
    background: "#e3e3e3",
}

const darkColors: Theme = {
    primary: "#7b45da",
    lightPrimary: "#7960ab",
    secondary: "#622ebe",
    success: "#25c417",
    danger: "rgba(238,3,3,0.89)",
    warning: "#ffcc00",
    white: "#1e1e1e",
    gray: "#464646",
    darkGray: "#818181",
    black: "#dadada",
    link: "#0088cc",
    text: "#a1a1a1",
    background: "#333333",
}

export const getTheme = storage.getString("theme") === "dark" ? darkColors : lightColors

export { lightColors, darkColors }
