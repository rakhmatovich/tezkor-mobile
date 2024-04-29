import { Fragment } from "react"
import { FlatList } from "react-native"
import { Container } from "@core/components/styles"
import { NavigationType } from "@core/types.ts"
import ProductCard from "@core/components/ProductCard.tsx"
import FavoritesHeader from "@home/components/FavoritesHeader.tsx"
import useLike from "@core/hooks/like.ts"
import FavouritesEmpty from "@home/components/FavouritesEmpty.tsx"

type FavoritesProps = NavigationType

const Favorites = ({ navigation }: FavoritesProps) => {
    const { likedProducts } = useLike()
    const isEmpty = likedProducts.length === 0

    return (
        <Fragment>
            <FavoritesHeader navigation={navigation} />

            <Container>
                {isEmpty ? (
                    <FavouritesEmpty navigation={navigation} />
                ) : (
                    <FlatList
                        data={likedProducts}
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

export default Favorites
