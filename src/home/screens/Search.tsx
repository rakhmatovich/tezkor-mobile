import { Fragment, useState } from "react"
import { ActivityIndicator, FlatList } from "react-native"
import styled from "@emotion/native"
import { useTheme } from "@emotion/react"
import debounce from "@core/hooks/debounce.ts"
import { Container } from "@core/components/styles"
import { NavigationType } from "@core/types.ts"
import { useProductSearchList } from "@home/hooks/product.ts"
import SearchHeader from "@home/components/SearchHeader.tsx"
import ProductCard from "@core/components/ProductCard.tsx"

type SearchProps = NavigationType

const Search = ({ navigation }: SearchProps) => {
    const theme = useTheme()
    const [query, setQuery] = useState<string>("")
    const searchValue = debounce(query, 300)
    const { data: products, isLoading } = useProductSearchList(searchValue)

    return (
        <Fragment>
            <SearchHeader value={query} onSearch={setQuery} navigation={navigation} />

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

export default Search
