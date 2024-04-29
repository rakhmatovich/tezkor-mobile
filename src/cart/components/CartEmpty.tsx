import { useTranslation } from "react-i18next"
import styled from "@emotion/native"
import { EmptySvg } from "@core/assets/svgs"
import { windowHeight, windowWidth } from "@core/utils/demensions.ts"
import { fonts } from "@core/assets/fonts"
import { ButtonText } from "@core/components/styles"
import Button from "@core/components/common/Button.tsx"
import { NavigationType } from "@core/types.ts"

type CartEmptyProps = NavigationType

const CartEmpty = ({ navigation }: CartEmptyProps) => {
    const { t } = useTranslation()

    const navigateHome = () => navigation.navigate("Home")
    return (
        <Wrapper>
            <EmptySvg width={windowWidth * 0.6} height={windowHeight * 0.22} />
            <Heading>{t("cartEmpty")}</Heading>

            <Button borderRadius={8} onPress={navigateHome}>
                <ButtonText style={{ margin: 10, fontSize: 15 }}>{t("startBuy")}</ButtonText>
            </Button>
        </Wrapper>
    )
}

const Wrapper = styled.View`
    margin: 20px;
    padding: 20px;
    border-radius: 8px;
    gap: 20px;
    align-items: center;
    background-color: ${(props) => props.theme.white};
`

const Heading = styled.Text`
    font-size: 18px;
    font-family: ${fonts.regular};
    color: ${(props) => props.theme.gray};
`

export default CartEmpty
