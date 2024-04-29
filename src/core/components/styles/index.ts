import styled, { css } from "@emotion/native"
import { fonts } from "@core/assets/fonts"

const Container = styled.View`
    flex: 1;
    background-color: ${(props) => props.theme.background};
`

const Center = styled.View`
    flex: 1;
    align-items: center;
    justify-content: center;
`

/** Button */

const buttonCss = css`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
`
const ButtonTouchable = styled.TouchableOpacity`
    background-color: ${(props) => props.theme.primary};
    ${buttonCss}
`

const ButtonPressable = styled.Pressable`
    background-color: ${(props) => props.theme.primary};
    ${buttonCss}
`

const ButtonText = styled.Text`
    font-size: 16px;
    text-align: center;
    font-family: ${fonts.regular};
    color: ${(props) => props.theme.white};
`

export { Container, Center, ButtonTouchable, ButtonPressable, ButtonText }
