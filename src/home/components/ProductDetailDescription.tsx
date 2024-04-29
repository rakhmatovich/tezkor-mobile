import { useTranslation } from "react-i18next"
import styled from "@emotion/native"
import { fonts } from "@core/assets/fonts"

type ProductDetailDescriptionProps = {
    description: string | undefined
}

const ProductDetailDescription = ({ description }: ProductDetailDescriptionProps) => {
    const { t } = useTranslation()

    return (
        <Wrapper>
            <Heading>{t("description")}</Heading>
            <Line />
            <Description>{description}</Description>
        </Wrapper>
    )
}

const Wrapper = styled.View`
    margin-top: 10px;
    padding: 20px 0;
    gap: 10px;
    background-color: ${(props) => props.theme.white};
`

const Heading = styled.Text`
    padding: 0 20px;
    font-family: ${fonts.regular};
    font-size: 20px;
    text-transform: uppercase;
    color: ${(props) => props.theme.primary};
`

const Line = styled.View`
    width: 100%;
    border: 0.5px solid ${(props) => props.theme.primary};
`

const Description = styled.Text`
    font-size: 14px;
    color: ${(props) => props.theme.text};
    padding: 0 20px;
`

export default ProductDetailDescription
