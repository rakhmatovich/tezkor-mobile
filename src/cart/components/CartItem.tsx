import { View } from "react-native"
import styled, { css } from "@emotion/native"
import { useTheme } from "@emotion/react"
import { getCurrencyFormat } from "@core/utils/currencyFormat.ts"
import { HeartSvg, MinusSvg, PlusSvg, TrashSvg } from "@core/assets/svgs"
import ImageSkeleton from "@core/components/ImageSkeleton.tsx"
import { fonts } from "@core/assets/fonts"
import { CartItemType, NavigationType } from "@core/types.ts"
import { domain } from "@core/utils/baseAxios.ts"
import useLike from "@core/hooks/like.ts"
import useCart from "@core/hooks/cart.ts"

type CartItemProps = {
    cartItem: CartItemType
} & NavigationType

const CartItem = ({ cartItem, navigation }: CartItemProps) => {
    const { product } = cartItem
    const theme = useTheme()
    const { likedProducts, handleLike } = useLike()
    const { addToCart: increaseCartItemCount, removeCartItem, decreaseCartItemCount } = useCart()
    const isLiked = Boolean(likedProducts.find((item) => item.id === product.id))

    const onLike = () => {
        handleLike(product)
    }

    const navigateDetail = () => navigation.navigate("ProductDetail", { productId: product.id })

    const increaseCount = () => increaseCartItemCount(product)
    const decreaseCount = () => decreaseCartItemCount(product)
    const removeFromCart = () => removeCartItem(product.id)

    return (
        <ItemWrapper onPress={navigateDetail}>
            <ImageBlock>
                <ImageSkeleton uri={domain + product.thumbnail} imageStyle={productImageStyle} />
            </ImageBlock>

            <ProductInfo>
                <ProductName numberOfLines={3} ellipsizeMode="tail">
                    {product.name}
                </ProductName>

                <View>
                    <ProductPrice>{getCurrencyFormat(product.price)} сум</ProductPrice>
                    {product.oldPrice && <ProductOldPrice>{getCurrencyFormat(product.oldPrice)} сум</ProductOldPrice>}
                </View>

                <ProductActions>
                    <ProductLeftActions>
                        <ActionButton onPress={decreaseCount}>
                            <MinusSvg color={theme.gray} />
                        </ActionButton>

                        <ProductCount>{cartItem.count}</ProductCount>

                        <ActionButton onPress={increaseCount}>
                            <PlusSvg color={theme.text} />
                        </ActionButton>
                    </ProductLeftActions>

                    <ProductRightActions>
                        <ActionButton onPress={onLike}>
                            <HeartSvg
                                color={isLiked ? theme.primary : theme.darkGray}
                                bgColor={isLiked ? theme.primary : "none"}
                            />
                        </ActionButton>

                        <ActionButton onPress={removeFromCart}>
                            <TrashSvg color={theme.danger} />
                        </ActionButton>
                    </ProductRightActions>
                </ProductActions>
            </ProductInfo>
        </ItemWrapper>
    )
}

const ItemWrapper = styled.Pressable`
    width: 100%;
    border-radius: 8px;
    padding: 5px;
    background-color: ${(props) => props.theme.white};
    flex-direction: row;
`

const ImageBlock = styled.View`
    width: 30%;
    flex: 1;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    position: relative;
    border-radius: 8px;
    background-color: ${(props) => props.theme.gray}30;
`

const productImageStyle = css`
    width: 100%;
    height: 100%;
    resize-mode: contain;
    border-radius: 8px;
`

const ProductInfo = styled.View`
    width: 70%;
    padding: 0 10px;
`

const ProductName = styled.Text`
    width: 90%;
    height: 55px;
    font-family: ${fonts.regular};
    font-size: 16px;
    color: ${(props) => props.theme.text};
`

const ProductOldPrice = styled.Text`
    font-size: 14px;
    text-decoration: line-through;
    font-family: ${fonts.regular};
    text-decoration-color: ${(props) => props.theme.danger};
    margin-bottom: 3px;
    color: ${(props) => props.theme.danger};
`

const ProductPrice = styled.Text`
    font-family: ${fonts.bold};
    font-size: 18px;
    color: ${(props) => props.theme.text};
`

const ProductActions = styled.View`
    width: 100%;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin-top: 5px;
`

const actionsContainerStyle = css`
    flex-direction: row;
    align-items: center;
    border-radius: 8px;
    padding: 0 3px;
`

const ProductLeftActions = styled.View`
    background-color: ${(props) => props.theme.gray}30;
    ${actionsContainerStyle}
`

const ProductRightActions = styled.View`
    gap: 5px;
    background-color: ${(props) => props.theme.gray}30;
    ${actionsContainerStyle}
`

const ActionButton = styled.Pressable`
    padding: 5px;
`

const ProductCount = styled.Text`
    width: 40px;
    text-align: center;
    font-size: 18px;
    font-family: ${fonts.bold};
    color: ${(props) => props.theme.text};
`

export default CartItem
