import * as React from "react"
import Svg, { Path } from "react-native-svg"
const SVGComponent = ({ width = 24, height = 24, color = "#000000" }) => (
    <Svg width={width} height={height} viewBox="0 0 24 24" fill="none">
        <Path
            d="M18.7962 4H5.20377C4.34461 4 3.88543 5.01192 4.45119 5.6585L9.75258 11.7172C9.91208 11.8995 10 12.1335 10 12.3757V17.25C10 17.4074 10.0741 17.5556 10.2 17.65L13.2 19.9C13.5296 20.1472 14 19.912 14 19.5V12.3757C14 12.1335 14.0879 11.8995 14.2474 11.7172L19.5488 5.6585C20.1146 5.01192 19.6554 4 18.7962 4Z"
            stroke={color}
            strokeWidth={2}
            strokeLinecap="round"
        />
    </Svg>
)
export default SVGComponent
