import { Fragment } from "react"
import { ActivityIndicator, FlatList } from "react-native"
import styled from "@emotion/native"
import { useTheme } from "@emotion/react"
import { Container } from "@core/components/styles"
import { NavigationType } from "@core/types.ts"
import ProductCard from "@core/components/ProductCard.tsx"
import { CategoryType } from "@category/types.ts"
import CategoryDetailHeader from "@category/components/CategoryDetailHeader.tsx"
import { useCategoryDetail } from "@category/hooks/category.tsx"

type CategoryDetailProps = {
    route: { params: { category: CategoryType } }
} & NavigationType

const CategoryDetail = ({ route, navigation }: CategoryDetailProps) => {
    const { category } = route.params
    const theme = useTheme()
    const { data: products, isLoading } = useCategoryDetail(category.id)

    return (
        <Fragment>
            <CategoryDetailHeader categoryName={category.name} navigation={navigation} />

            <Container>
                {isLoading ? (
                    <LoadingView>
                        <ActivityIndicator size="large" color={theme.primary} />
                    </LoadingView>
                ) : (
                    <FlatList
                        data={products?.results}
                        keyExtractor={(item) => item.id.toString()}
                        renderItem={({ item }) => <ProductCard product={item} navigation={navigation} />}
                        numColumns={2}
                        contentContainerStyle={{ gap: 10, paddingTop: 10, paddingBottom: 30 }}
                        columnWrapperStyle={{ justifyContent: "space-between", paddingHorizontal: 10 }}
                        initialNumToRender={6}
                    />
                )}
            </Container>
        </Fragment>
    )
}

const LoadingView = styled.View`
    flex: 1;
    align-items: center;
    justify-content: center;
`

export default CategoryDetail
