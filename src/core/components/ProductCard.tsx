import { View } from "react-native"
import { useTranslation } from "react-i18next"
import styled, { css, ReactNativeStyle } from "@emotion/native"
import { useTheme } from "@emotion/react"
import { getCurrencyFormat } from "@core/utils/currencyFormat.ts"
import Button from "@core/components/common/Button.tsx"
import { ButtonText } from "@core/components/styles"
import { HeartSvg } from "@core/assets/svgs"
import ImageSkeleton from "@core/components/ImageSkeleton.tsx"
import { fonts } from "@core/assets/fonts"
import { NavigationType } from "@core/types.ts"
import { ProductType } from "@core/types.ts"
import { domain } from "@core/utils/baseAxios.ts"
import useLike from "@core/hooks/like.ts"
import useCart from "@core/hooks/cart.ts"
import { showToast } from "@core/hooks/toast.ts"
import { windowWidth } from "@core/utils/demensions.ts"

type ProductCardProps = {
    product: ProductType
} & NavigationType

const ProductCard = ({ product, navigation }: ProductCardProps) => {
    const { t } = useTranslation()
    const theme = useTheme()
    const { likedProducts, handleLike } = useLike()
    const { addToCart } = useCart()
    const isLiked = Boolean(likedProducts.find((item) => item.id === product.id))

    const navigateDetail = () => {
        navigation.navigate("ProductDetail", { productId: product.id })
    }

    const handlePress = () => {
        if (product.hasOption) {
            navigateDetail()
            return
        }
        addToCart(product)
        showToast({ type: "success", title: t("addedToCart") })
    }
    const onLike = () => handleLike(product)

    return (
        <ProductWrapper onPress={navigateDetail} style={{ width: windowWidth * 0.5 - 15 }}>
            <ImageSkeleton
                uri={domain + product.thumbnail}
                imageStyle={[productImageStyle, { backgroundColor: theme.background }] as ReactNativeStyle}
            />

            <ProductInfo>
                <ProductName numberOfLines={2} ellipsizeMode="tail">
                    {product.name}
                </ProductName>

                <ProductPriceWrapper>
                    <View>
                        <ProductOldPrice>
                            {product.oldPrice !== null && getCurrencyFormat(product.oldPrice) + " " + t("sum")}
                        </ProductOldPrice>

                        <ProductPrice>
                            {getCurrencyFormat(product.price)} {t("sum")}
                        </ProductPrice>
                    </View>

                    {product.oldPrice !== null && (
                        <ProductDiscount>
                            <ProductDiscountText>
                                -{Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)}%
                            </ProductDiscountText>
                        </ProductDiscount>
                    )}
                </ProductPriceWrapper>

                <Button borderRadius={5} onPress={handlePress}>
                    <ButtonText style={{ margin: 6, fontSize: 16 }}>
                        {t(product.hasOption ? "choose" : "addToCart")}
                    </ButtonText>
                </Button>
            </ProductInfo>

            <LikeButton onPress={onLike}>
                <HeartSvg color={isLiked ? theme.primary : theme.darkGray} bgColor={isLiked ? theme.primary : "none"} />
            </LikeButton>
        </ProductWrapper>
    )
}

const ProductWrapper = styled.Pressable`
    position: relative;
    border-radius: 8px;
    overflow: hidden;
    background-color: ${(props) => props.theme.white};
    border: 3px solid ${(props) => props.theme.white};
`

const productImageStyle = css`
    width: 100%;
    height: 200px;
    resize-mode: cover;
`

const LikeButton = styled.Pressable`
    width: 30px;
    height: 30px;
    border-radius: 30px;
    background-color: ${(props) => props.theme.white};
    position: absolute;
    top: 5px;
    right: 5px;
    align-items: center;
    justify-content: center;
`

const ProductInfo = styled.View`
    padding: 5px;
    gap: 10px;
`

const ProductName = styled.Text`
    font-size: 16px;
    font-family: ${fonts.regular};
    color: ${(props) => props.theme.text};
`

const ProductPriceWrapper = styled.View`
    flex-direction: row;
    justify-content: space-between;
`

const ProductOldPrice = styled.Text`
    font-size: 14px;
    text-decoration: line-through;
    text-decoration-color: ${(props) => props.theme.text};
    margin-bottom: 3px;
    font-family: ${fonts.regular};
    color: ${(props) => props.theme.darkGray};
`

const ProductPrice = styled.Text`
    font-family: ${fonts.bold};
    font-size: 18px;
    color: ${(props) => props.theme.text};
`

const ProductDiscount = styled.View`
    border-radius: 30px;
    height: 30px;
    padding: 0 5px;
    align-items: center;
    justify-content: center;
    background-color: ${(props) => props.theme.danger};
`

const ProductDiscountText = styled.Text`
    font-size: 16px;
    margin-top: 1px;
    font-family: ${fonts.regular};
    color: ${(props) => props.theme.white};
`

export default ProductCard
