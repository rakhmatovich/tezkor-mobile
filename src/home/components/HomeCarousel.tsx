import { memo, useEffect, useRef, useState } from "react"
import { FlatList, StyleSheet } from "react-native"
import { windowWidth } from "@core/utils/demensions.ts"
import ImageSkeleton from "@core/components/ImageSkeleton.tsx"

type AdvertisementType = {
    id: number
    image: string
}

type HomeCarouselProps = {
    advertisements: AdvertisementType[] | undefined
}

type RenderItemType = {
    item: AdvertisementType
}

const space = 10

const mainWidth = windowWidth - space * 2

const HomeCarousel = ({ advertisements }: HomeCarouselProps) => {
    const [currentIndex, setCurrentIndex] = useState(0)
    const carouselRef = useRef<FlatList<AdvertisementType>>(null)

    useEffect(() => {
        const interval = setInterval(() => {
            if (carouselRef.current) {
                const newIndex = currentIndex === (advertisements && advertisements.length - 1) ? 0 : currentIndex + 1
                carouselRef.current.scrollToIndex({
                    animated: true,
                    index: newIndex,
                })
                setCurrentIndex(newIndex)
            }
        }, 5000)

        return () => clearInterval(interval)
    }, [currentIndex, advertisements])

    const renderItem = ({ item }: RenderItemType) => {
        return <ImageSkeleton imageStyle={styles.item} uri={item.image} />
    }

    return (
        <FlatList
            ref={carouselRef}
            data={advertisements}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item) => item.id.toString()}
            renderItem={renderItem}
            getItemLayout={(_, index) => ({
                length: windowWidth,
                offset: windowWidth * index,
                index,
            })}
            onScroll={(event) => {
                const slideIndex = Math.round(event.nativeEvent.contentOffset.x / windowWidth)
                setCurrentIndex(slideIndex)
            }}
            initialScrollIndex={0}
            initialNumToRender={3}
        />
    )
}

const styles = StyleSheet.create({
    item: {
        width: mainWidth,
        height: 200,
        marginHorizontal: space,
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "center",
    },
})

export default memo(HomeCarousel)
