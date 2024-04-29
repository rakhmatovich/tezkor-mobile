import { useState } from "react"
import { Image, ImageSourcePropType, ImageStyle } from "react-native"
import styled, { ReactNativeStyle } from "@emotion/native"
import SkeletonPlaceholder from "react-native-skeleton-placeholder"
import { windowHeight, windowWidth } from "@core/utils/demensions.ts"
import { useTheme } from "@emotion/react"

type ImageSkeletonProps = {
    imageStyle: ReactNativeStyle
    uri: string | undefined | null
}

const ImageSkeleton = ({ imageStyle, uri }: ImageSkeletonProps) => {
    const [loadingImage, setLoadingImage] = useState(true)
    const theme = useTheme()

    return (
        <>
            {loadingImage && (
                <SkeletonView style={imageStyle}>
                    <SkeletonPlaceholder
                        backgroundColor={theme.white}
                        highlightColor={theme.lightPrimary}
                        speed={1500}
                        enabled={loadingImage}
                    >
                        <SkeletonPlaceholder.Item width={windowWidth} height={windowHeight} />
                    </SkeletonPlaceholder>
                </SkeletonView>
            )}
            <Image
                style={imageStyle as ImageStyle}
                onLoad={() => setLoadingImage(false)}
                source={typeof uri === "string" && uri.startsWith("http") ? { uri } : (uri as ImageSourcePropType)}
            />
        </>
    )
}

const SkeletonView = styled.View`
    overflow: hidden;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 10;
`

export default ImageSkeleton
