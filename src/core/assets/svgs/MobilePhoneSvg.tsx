import * as React from "react"
import Svg, { Path } from "react-native-svg"
const SVGComponent = ({ width = 24, height = 24, color = "#000000" }) => (
    <Svg width={width} height={height} viewBox="0 0 24 24" fill="none">
        <Path
            d="M6 15H18M6 6H18M12 18H12.01M7 21H17C17.5523 21 18 20.5523 18 20V4C18 3.44772 17.5523 3 17 3H7C6.44772 3 6 3.44772 6 4V20C6 20.5523 6.44772 21 7 21Z"
            stroke={color}
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </Svg>
)
export default SVGComponent
