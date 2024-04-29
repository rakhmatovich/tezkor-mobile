import * as React from "react"
import Svg, { G, Path } from "react-native-svg"
const SVGComponent = ({ width = 24, height = 24, color = "#000000" }) => (
    <Svg width={width} height={height} viewBox="0 0 24 24" fill="none">
        <G id="SVGRepo_bgCarrier" strokeWidth={0} />
        <G id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round" />
        <G id="SVGRepo_iconCarrier">
            <Path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M16.7071 7.29289C17.0976 7.68342 17.0976 8.31658 16.7071 8.70711L8.41421 17C7.63316 17.7811 6.36683 17.781 5.58579 17L6.29289 16.2929L5.58579 17L2.29289 13.7071C1.90237 13.3166 1.90237 12.6834 2.29289 12.2929C2.68342 11.9024 3.31658 11.9024 3.70711 12.2929L7 15.5858L15.2929 7.29289C15.6834 6.90237 16.3166 6.90237 16.7071 7.29289ZM21.7071 7.29289C22.0976 7.68342 22.0976 8.31658 21.7071 8.70711L12.7071 17.7071C12.3166 18.0976 11.6834 18.0976 11.2929 17.7071C10.9024 17.3166 10.9024 16.6834 11.2929 16.2929L20.2929 7.29289C20.6834 6.90237 21.3166 6.90237 21.7071 7.29289Z"
                fill={color}
            />
        </G>
    </Svg>
)
export default SVGComponent
