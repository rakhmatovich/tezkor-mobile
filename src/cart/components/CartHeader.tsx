import styled from "@emotion/native"
import { SafeAreaView } from "react-native"
import { fonts } from "@core/assets/fonts"

const CartHeader = () => {
    return (
        <HeaderWrapper>
            <SafeAreaView>
                <HeaderText>Tezkor</HeaderText>
            </SafeAreaView>
        </HeaderWrapper>
    )
}

const HeaderWrapper = styled.View`
    padding: 5px 20px 10px;
    background-color: ${(props) => props.theme.white};
`

const HeaderText = styled.Text`
    font-size: 19px;
    font-family: ${fonts.bold};
    color: ${(props) => props.theme.primary};
`

export default CartHeader
