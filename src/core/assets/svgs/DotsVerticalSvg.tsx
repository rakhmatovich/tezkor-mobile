import * as React from "react"
import Svg, { Path } from "react-native-svg"
const SVGComponent = ({ width = 28, height = 28, color = "#383838" }) => (
    <Svg width={width} height={height} viewBox="0 0 24 24" fill="none">
        <Path d="M12 6H12.01M12 12H12.01M12 18H12.01" stroke={color} strokeWidth={4} strokeLinecap="round" />
    </Svg>
)
export default SVGComponent
