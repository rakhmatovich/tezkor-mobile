import * as React from "react"
import Svg, { G, Path } from "react-native-svg"
const SVGComponent = ({ width = 24, height = 24, color = "#000000" }) => (
    <Svg width={width} height={height} viewBox="0 0 24 24" fill="none">
        <G id="SVGRepo_bgCarrier" strokeWidth={0} />
        <G id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round" />
        <G id="SVGRepo_iconCarrier">
            <Path
                d="M7 11C6.44772 11 6 11.4477 6 12C6 12.5523 6.44772 13 7 13H17C17.5523 13 18 12.5523 18 12C18 11.4477 17.5523 11 17 11H7Z"
                fill={color}
            />
            <Path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M12 1C5.92487 1 1 5.92487 1 12C1 18.0751 5.92487 23 12 23C18.0751 23 23 18.0751 23 12C23 5.92487 18.0751 1 12 1ZM3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12Z"
                fill={color}
            />
        </G>
    </Svg>
)
export default SVGComponent
