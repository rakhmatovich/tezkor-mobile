import { ActivityIndicator, FlatList, RefreshControl, SafeAreaView } from "react-native"
import { useTranslation } from "react-i18next"
import styled from "@emotion/native"
import { Container } from "@core/components/styles"
import { fonts } from "@core/assets/fonts"
import { useCategoryList } from "@category/hooks/category.tsx"
import CategoryCard from "@category/components/CategoryCard.tsx"
import { NavigationType } from "@core/types.ts"
import { useTheme } from "@emotion/react"
import { useState } from "react"

type CategoriesProps = NavigationType

const Categories = ({ navigation }: CategoriesProps) => {
    const { t } = useTranslation()
    const theme = useTheme()

    const [refreshing, setRefreshing] = useState(false)
    const { data: categories, isLoading, refetch: refetchCategories } = useCategoryList()

    const onRefresh = async () => {
        setRefreshing(true)
        await refetchCategories()
        setRefreshing(false)
    }

    return (
        <Container>
            <HeaderWrapper>
                <SafeAreaView>
                    <Heading>{t("categories")}</Heading>
                </SafeAreaView>
            </HeaderWrapper>

            <SafeWrapper>
                {isLoading ? (
                    <LoadingView>
                        <ActivityIndicator size="large" color={theme.primary} />
                    </LoadingView>
                ) : (
                    <FlatList
                        data={categories?.results}
                        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
                        keyExtractor={(item) => item.id.toString()}
                        renderItem={({ item }) => <CategoryCard category={item} navigation={navigation} />}
                        numColumns={4}
                        contentContainerStyle={{ paddingHorizontal: 10, paddingVertical: 20, gap: 10 }}
                        columnWrapperStyle={{ gap: 10 }}
                        initialNumToRender={16}
                    />
                )}
            </SafeWrapper>
        </Container>
    )
}

const SafeWrapper = styled.SafeAreaView`
    flex: 1;
    background-color: ${(props) => props.theme.white};
`

const HeaderWrapper = styled.View`
    padding: 5px 20px 10px;
    background-color: ${(props) => props.theme.white};
    border-bottom-width: 0.5px;
    border-bottom-style: solid;
    border-bottom-color: ${(props) => props.theme.gray};
`

const Heading = styled.Text`
    font-family: ${fonts.bold};
    font-size: 20px;
    color: ${(props) => props.theme.primary};
`

const LoadingView = styled.View`
    flex: 1;
    align-items: center;
    justify-content: center;
`

export default Categories
