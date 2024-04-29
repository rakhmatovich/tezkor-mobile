import { ActivityIndicator, SafeAreaView, ScrollView } from "react-native"
import { useTranslation } from "react-i18next"
import { useTheme } from "@emotion/react"
import styled from "@emotion/native"
import { Container } from "@core/components/styles"
import { NavigationType, ProductOption } from "@core/types.ts"
import { fonts } from "@core/assets/fonts"
import Button from "@core/components/common/Button.tsx"
import { useProductDetail } from "@home/hooks/product.ts"
import ProductDetailHeader from "@home/components/ProductDetailHeader.tsx"
import ProductDetailImages from "@home/components/ProductDetailImages.tsx"
import ProductDetailInfo from "@home/components/ProductDetailInfo.tsx"
import ProductDetailSizes from "@home/components/ProductDetailSizes.tsx"
import ProductDetailDescription from "@home/components/ProductDetailDescription.tsx"
import RelatedProducts from "@home/components/RelatedProducts.tsx"
import { getCurrencyFormat } from "@core/utils/currencyFormat.ts"
import { useState } from "react"
import useCart from "@core/hooks/cart.ts"
import { showToast } from "@core/hooks/toast.ts"

type ProductDetailProps = {
    route: { params: { productId: number } }
} & NavigationType

const ProductDetail = ({ route, navigation }: ProductDetailProps) => {
    const { productId } = route.params
    const { t } = useTranslation()
    const theme = useTheme()
    const { addToCart } = useCart()
    const { data: product, isLoading } = useProductDetail(productId)
    const [option, setOption] = useState<ProductOption | null>(product?.options[0] || null)

    const handleButton = () => {
        if (!product) return
        const { id, name, price, oldPrice, thumbnail } = product
        const hasOption = product.options.length > 0

        addToCart({ id, name, price, oldPrice, thumbnail, hasOption }, option)
        showToast({ type: "success", title: t("addedToCart") })
    }

    return (
        <Container>
            <ProductDetailHeader />

            {isLoading ? (
                <LoadingView>
                    <ActivityIndicator size="large" color={theme.primary} />
                </LoadingView>
            ) : (
                <ScrollView>
                    <ProductDetailImages images={product?.images} />
                    <ProductDetailInfo product={product} />
                    {product && product.options.length > 0 && (
                        <ProductDetailSizes options={product.options} setOption={setOption} />
                    )}
                    <ProductDetailDescription description={product?.description} />
                    <RelatedProducts productId={productId} categoryId={product?.categoryId} navigation={navigation} />
                </ScrollView>
            )}

            <BuyContainer>
                <SafeAreaView>
                    <BuyButtonWrapper>
                        <Button borderRadius={40} onPress={handleButton}>
                            <ButtonText>{t("buy")}</ButtonText>
                            <ButtonPrice>{product && getCurrencyFormat(product.price) + " " + t("sum")}</ButtonPrice>
                        </Button>
                    </BuyButtonWrapper>
                </SafeAreaView>
            </BuyContainer>
        </Container>
    )
}

const LoadingView = styled.View`
    flex: 1;
    align-items: center;
    justify-content: center;
`

const BuyContainer = styled.Pressable`
    width: 100%;
    background-color: ${(props) => props.theme.white};
`

const BuyButtonWrapper = styled.Pressable`
    width: 100%;
    padding: 10px 20px;
    align-items: center;
    justify-content: center;
`

const ButtonText = styled.Text`
    font-family: ${fonts.regular};
    font-size: 16px;
    margin-top: 10px;
    color: ${(props) => props.theme.white};
`

const ButtonPrice = styled.Text`
    font-family: ${fonts.regular};
    font-size: 16px;
    margin-bottom: 10px;
    color: ${(props) => props.theme.white};
`

export default ProductDetail
