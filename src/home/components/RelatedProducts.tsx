import { FlatList } from "react-native"
import { useTranslation } from "react-i18next"
import styled from "@emotion/native"
import { fonts } from "@core/assets/fonts"
import ProductCard from "@core/components/ProductCard.tsx"
import { NavigationType } from "@core/types.ts"
import { useCategoryDetail } from "@category/hooks/category.tsx"

type RelatedProductsProps = {
    productId: number | undefined
    categoryId: number | undefined
} & NavigationType

const RelatedProducts = ({ productId, categoryId, navigation }: RelatedProductsProps) => {
    const { t } = useTranslation()
    const { data: relatedProducts } = useCategoryDetail(categoryId)
    const products = relatedProducts?.results.filter((product) => product.id !== productId)

    return (
        <Wrapper>
            <HeadingWrapper>
                <Line />
                <Heading>{t("relatedProducts")}</Heading>
                <Line />
            </HeadingWrapper>

            <FlatList
                data={products}
                horizontal
                showsHorizontalScrollIndicator={false}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => <ProductCard product={item} navigation={navigation} />}
                contentContainerStyle={{ gap: 10, paddingHorizontal: 10 }}
                initialNumToRender={3}
            />
        </Wrapper>
    )
}

const Wrapper = styled.View`
    margin: 10px 0;
    gap: 10px;
`

const HeadingWrapper = styled.View`
    flex-direction: row;
    justify-content: space-evenly;
    align-items: center;
    padding: 10px 20px;
    gap: 10px;
    background-color: ${(props) => props.theme.white};
`

const Heading = styled.Text`
    text-transform: uppercase;
    font-size: 14px;
    font-family: ${fonts.regular};
    color: ${(props) => props.theme.text};
`

const Line = styled.View`
    flex: 1;
    border: 0.5px solid ${(props) => props.theme.primary};
`

export default RelatedProducts
