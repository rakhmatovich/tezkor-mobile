import * as React from "react"
import Svg, { Path } from "react-native-svg"
const SVGComponent = ({ width = 24, height = 24, color = "#000000" }) => (
    <Svg width={width} height={height} viewBox="0 0 24 24" fill="none">
        <Path
            d="M9 10V6C9 4.34315 10.3431 3 12 3V3C13.6569 3 15 4.34315 15 6V10M18 8L18.9172 19.9233C18.9619 20.5041 18.5026 21 17.9201 21H6.07988C5.49737 21 5.03815 20.5041 5.08282 19.9233L6 8H18Z"
            stroke={color}
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </Svg>
)
export default SVGComponent
