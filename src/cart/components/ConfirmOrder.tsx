import { useTranslation } from "react-i18next"
import styled from "@emotion/native"
import { ButtonText } from "@core/components/styles"
import Button from "@core/components/common/Button.tsx"
import { getCurrencyFormat } from "@core/utils/currencyFormat.ts"
import { fonts } from "@core/assets/fonts"
import { CartItemType, NavigationType } from "@core/types.ts"
import { checkAuth } from "@user/utils/auth.ts"

type ConfirmOrderProps = {
    cartItems: CartItemType[]
} & NavigationType

const ConfirmOrder = ({ cartItems, navigation }: ConfirmOrderProps) => {
    const { t } = useTranslation()
    const productsCount = cartItems.reduce((acc, curr) => acc + curr.count, 0)
    const totalPrice = cartItems.reduce((acc, curr) => acc + curr.count * curr.product.price, 0)

    const handlePress = () => {
        if (checkAuth()) {
            console.log("order")
            return
        }
        navigation.navigate("SignIn")
    }

    return (
        <Wrapper>
            <OrderText>
                {productsCount} {t("productCount")} {getCurrencyFormat(totalPrice)} {t("sum")}
            </OrderText>

            <Button borderRadius={8} onPress={handlePress}>
                <ButtonText style={{ margin: 10, fontSize: 15 }}>{t("confirmOrder")}</ButtonText>
            </Button>
        </Wrapper>
    )
}

const Wrapper = styled.View`
    width: 100%;
    gap: 10px;
    padding: 10px;
    margin-bottom: 1px;
    background-color: ${(props) => props.theme.white};
`
const OrderText = styled.Text`
    font-size: 14px;
    font-family: ${fonts.regular};
    text-align: center;
    color: ${(props) => props.theme.text};
`

export default ConfirmOrder
