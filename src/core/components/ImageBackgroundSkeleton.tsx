import { ReactNode, useState } from "react"
import { ImageBackground, ImageSourcePropType } from "react-native"
import styled, { ReactNativeStyle } from "@emotion/native"
import SkeletonPlaceholder from "react-native-skeleton-placeholder"
import { windowHeight, windowWidth } from "@core/utils/demensions.ts"
import { useTheme } from "@emotion/react"

type ImageBackgroundSkeletonProps = {
    imageStyle: ReactNativeStyle
    uri: string | undefined | null
    children: ReactNode
}

const ImageBackgroundSkeleton = ({ imageStyle, uri, children }: ImageBackgroundSkeletonProps) => {
    const [loadingImage, setLoadingImage] = useState(true)
    const theme = useTheme()

    return (
        <ImageBackground
            source={typeof uri === "string" && uri.startsWith("http") ? { uri } : (uri as ImageSourcePropType)}
            style={imageStyle}
            onLoad={() => setLoadingImage(false)}
        >
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
            {children}
        </ImageBackground>
    )
}

const SkeletonView = styled.View`
    overflow: hidden;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 10;
`

export default ImageBackgroundSkeleton
