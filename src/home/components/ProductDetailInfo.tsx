import { Pressable } from "react-native"
import { useTranslation } from "react-i18next"
import { useTheme } from "@emotion/react"
import styled from "@emotion/native"
import { CartSvg, HeartSvg, StartSvg } from "@core/assets/svgs"
import useLike from "@core/hooks/like.ts"
import { ProductDetailType } from "@core/types.ts"
import { getCurrencyFormat } from "@core/utils/currencyFormat.ts"
import { fonts } from "@core/assets/fonts"

type ProductDetailInfoProps = {
    product: ProductDetailType | undefined
}

const starts = [1, 2, 3, 4, 5]

const ProductDetailInfo = ({ product }: ProductDetailInfoProps) => {
    const { t } = useTranslation()
    const theme = useTheme()
    const { likedProducts, handleLike } = useLike()
    const isLiked = Boolean(likedProducts.find((item) => item.id === product?.id))

    const onLike = () => product && handleLike(product)

    return (
        <Wrapper>
            <RowBetween>
                <ProductName>{product?.name}</ProductName>

                <Pressable onPress={onLike}>
                    <HeartSvg
                        color={isLiked ? theme.primary : theme.darkGray}
                        bgColor={isLiked ? theme.primary : "none"}
                    />
                </Pressable>
            </RowBetween>

            <Row>
                <StarsWrapper>
                    {starts.map((_, index) => (
                        <StartSvg key={index} color={"none"} bgColor={theme.darkGray} width={20} height={20} />
                    ))}
                </StarsWrapper>

                <Reviews>{t("reviews")} (0)</Reviews>
            </Row>

            <PriceWrapper>
                <PriceHeading>{t("price")}</PriceHeading>

                <RowBetween>
                    <Price>{product && getCurrencyFormat(product.price) + " " + t("sum")}</Price>
                    <Pressable>
                        <CartSvg color={theme.primary} />
                    </Pressable>
                </RowBetween>

                <OldPrice>
                    {product && product?.oldPrice !== null && getCurrencyFormat(product.oldPrice) + " сум"}
                </OldPrice>
            </PriceWrapper>
        </Wrapper>
    )
}

const Wrapper = styled.View`
    padding: 10px 20px;
    gap: 10px;
    background-color: ${(props) => props.theme.white};
`

const Row = styled.View`
    flex-direction: row;
    gap: 10px;
    align-items: flex-end;
`

const RowBetween = styled.View`
    flex-direction: row;
    justify-content: space-between;
`

const ProductName = styled.Text`
    font-size: 22px;
    font-family: ${fonts.regular};
    width: 80%;
    color: ${(props) => props.theme.text};
`

const StarsWrapper = styled.View`
    flex-direction: row;
`

const Reviews = styled.Text`
    font-size: 16px;
    font-family: ${fonts.regular};
    text-decoration: underline;
    text-decoration-color: ${(props) => props.theme.link};
    color: ${(props) => props.theme.link};
`

const PriceWrapper = styled.View`
    padding: 10px 0;
`

const PriceHeading = styled.Text`
    font-size: 24px;
    font-family: ${fonts.regular};
    color: ${(props) => props.theme.darkGray};
`

const Price = styled.Text`
    margin: 6px 0 4px;
    font-family: ${fonts.bold};
    font-size: 22px;
    color: ${(props) => props.theme.text};
`

const OldPrice = styled.Text`
    font-size: 14px;
    text-decoration: line-through;
    text-decoration-color: ${(props) => props.theme.text};
    margin-bottom: 3px;
    font-family: ${fonts.regular};
    color: ${(props) => props.theme.text};
`

export default ProductDetailInfo
