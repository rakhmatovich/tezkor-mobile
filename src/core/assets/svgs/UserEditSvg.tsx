import * as React from "react"
import Svg, { Path } from "react-native-svg"
const SVGComponent = ({ width = 24, height = 24, color = "#000000" }) => (
    <Svg width={width} height={height} viewBox="0 0 24 24" fill="none">
        <Path
            d="M7 19H5C4.44772 19 4 18.5523 4 18V17C4 15.3431 5.34315 14 7 14H8M12 8C12 9.65685 10.6569 11 9 11C7.34315 11 6 9.65685 6 8C6 6.34315 7.34315 5 9 5C10.6569 5 12 6.34315 12 8ZM19.4411 9.55891C19.6183 9.73602 19.7588 9.94632 19.8547 10.1778C19.9506 10.4092 20 10.6573 20 10.9078C20 11.1584 19.9506 11.4065 19.8547 11.6379C19.7588 11.8694 19.6183 12.0797 19.4411 12.2568L13.3721 18.3258L10 19L10.6742 15.6279L16.7432 9.55891C16.9203 9.38172 17.1306 9.24116 17.3621 9.14526C17.5935 9.04936 17.8416 9 18.0922 9C18.3427 9 18.5908 9.04936 18.8222 9.14526C19.0537 9.24116 19.264 9.38172 19.4411 9.55891Z"
            stroke={color}
            strokeWidth={2}
            strokeLinecap="square"
            strokeLinejoin="round"
        />
    </Svg>
)
export default SVGComponent
