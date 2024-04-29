import * as React from "react"
import Svg, { G, Path, Defs, ClipPath, Rect } from "react-native-svg"
const SVGComponent = ({ width = 24, height = 24, color = "#000000" }) => (
    <Svg width={width} height={height} viewBox="0 0 24 24" fill="none">
        <G id="SVGRepo_bgCarrier" strokeWidth={0} />
        <G id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round" />
        <G id="SVGRepo_iconCarrier">
            <G clipPath="url(#clip0_105_1758)">
                <Path
                    d="M20 7.00024L10 17.0002L5 12.0002"
                    stroke={color}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2.5}
                />
            </G>
            <Defs>
                <ClipPath id="clip0_105_1758">
                    <Rect fill="white" transform="translate(0 0.000244141)" width={24} height={24} />
                </ClipPath>
            </Defs>
        </G>
    </Svg>
)
export default SVGComponent
