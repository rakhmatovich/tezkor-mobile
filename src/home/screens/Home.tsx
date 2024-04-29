import { Fragment, useState } from "react"
import { ActivityIndicator, FlatList, RefreshControl } from "react-native"
import { useTheme } from "@emotion/react"
import styled from "@emotion/native"
import { Container } from "@core/components/styles"
import { NavigationType } from "@core/types.ts"
import { windowWidth } from "@core/utils/demensions.ts"
import ProductCard from "@core/components/ProductCard.tsx"
import HomeHeader from "@home/components/HomeHeader.tsx"
import HomeCarousel from "@home/components/HomeCarousel.tsx"
import { useProductList } from "@home/hooks/product.ts"

type AdvertisementType = {
    id: number
    image: string
}

const dummyAdds: AdvertisementType[] = [
    { id: 1, image: "https://images.uzum.uz/cno430tbl7rtgkba10gg/main_page_banner.jpg" },
    { id: 2, image: "https://images.uzum.uz/co59d4tlqsilsr3lu6f0/main_page_banner.jpg" },
    { id: 3, image: "https://pr.uz/wp-content/uploads/2023/05/1-2.jpg" },
    { id: 4, image: "https://www.spot.uz/media/img/2022/12/bva69316717139405962_l.jpg" },
]

type HomeProps = NavigationType

const Home = ({ navigation }: HomeProps) => {
    const theme = useTheme()
    const [refreshing, setRefreshing] = useState(false)
    const { data: products, refetch: refetchProducts, isLoading } = useProductList()

    const onRefresh = async () => {
        setRefreshing(true)
        await refetchProducts()
        setRefreshing(false)
    }

    return (
        <Fragment>
            <HomeHeader navigation={navigation} />

            <Container>
                {isLoading ? (
                    <LoadingView>
                        <ActivityIndicator size="large" color={theme.primary} />
                    </LoadingView>
                ) : (
                    <FlatList
                        data={products?.results}
                        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
                        keyExtractor={(item) => item.id.toString()}
                        renderItem={({ item }) => <ProductCard product={item} navigation={navigation} />}
                        numColumns={2}
                        contentContainerStyle={{ gap: 10, paddingBottom: 10 }}
                        columnWrapperStyle={{ justifyContent: "space-between", paddingHorizontal: 10 }}
                        ListHeaderComponentStyle={{ width: windowWidth, marginTop: 10 }}
                        ListHeaderComponent={<HomeCarousel advertisements={dummyAdds} />}
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

export default Home
