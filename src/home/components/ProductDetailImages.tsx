import { memo, useRef, useState } from "react"
import { FlatList, StyleSheet, View } from "react-native"
import { ReactNativeStyle } from "@emotion/native"
import { windowWidth } from "@core/utils/demensions.ts"
import ImageSkeleton from "@core/components/ImageSkeleton.tsx"
import { ProductImage } from "@core/types.ts"
import { useTheme } from "@emotion/react"
import { domain } from "@core/utils/baseAxios.ts"

type ProductDetailImagesProps = {
    images: ProductImage[] | undefined
}

type RenderImageType = {
    item: ProductImage
}

const space = 20

const mainWidth = windowWidth - space * 2

const ProductDetailImages = ({ images }: ProductDetailImagesProps) => {
    const theme = useTheme()
    const [currentIndex, setCurrentIndex] = useState(0)
    const carouselRef = useRef<FlatList<ProductImage>>(null)

    const renderImage = ({ item }: RenderImageType) => {
        return (
            <ImageSkeleton
                imageStyle={[styles.item, { backgroundColor: theme.white }] as ReactNativeStyle}
                uri={domain + item.image}
            />
        )
    }

    return (
        <View style={styles.wrapper}>
            <FlatList
                ref={carouselRef}
                data={images}
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                keyExtractor={(item) => item.id.toString()}
                renderItem={renderImage}
                getItemLayout={(_, index) => ({
                    length: windowWidth - space,
                    offset: windowWidth * index,
                    index,
                })}
                onScroll={(event) => {
                    const slideIndex = Math.round(event.nativeEvent.contentOffset.x / windowWidth)
                    setCurrentIndex(slideIndex)
                }}
                initialScrollIndex={0}
                initialNumToRender={4}
            />

            <View style={styles.dotsWrapper}>
                {images?.map((_, index) => (
                    <View
                        key={index}
                        style={[styles.dot, { backgroundColor: index === currentIndex ? theme.primary : theme.gray }]}
                    />
                ))}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    wrapper: {
        paddingTop: 20,
    },
    item: {
        width: mainWidth,
        height: 400,
        marginHorizontal: space,
        justifyContent: "center",
        alignItems: "center",
        resizeMode: "contain",
    },
    dotsWrapper: {
        flexDirection: "row",
        gap: 5,
        justifyContent: "center",
        marginVertical: 15,
    },
    dot: {
        width: 7,
        height: 7,
        borderRadius: 7,
    },
})

export default memo(ProductDetailImages)
