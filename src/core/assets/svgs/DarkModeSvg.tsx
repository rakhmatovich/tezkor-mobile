import * as React from "react"
import Svg, { G, Path } from "react-native-svg"
const SVGComponent = ({ width = 24, height = 24, color = "#000000" }) => (
    <Svg width={width} height={height} viewBox="0 0 24 24" fill={color}>
        <G id="SVGRepo_bgCarrier" strokeWidth={0} />
        <G id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round" />
        <G id="SVGRepo_iconCarrier">
            <G id="\uD83D\uDD0D-Product-Icons" stroke="none" strokeWidth={1} fill="none" fillRule="evenodd">
                <G id="ic_fluent_dark_theme_24_filled" fill={color} fillRule="nonzero">
                    <Path
                        d="M12,22 C17.5228475,22 22,17.5228475 22,12 C22,6.4771525 17.5228475,2 12,2 C6.4771525,2 2,6.4771525 2,12 C2,17.5228475 6.4771525,22 12,22 Z M12,20 L12,4 C16.418278,4 20,7.581722 20,12 C20,16.418278 16.418278,20 12,20 Z"
                        id="\uD83C\uDFA8-Color"
                    />
                </G>
            </G>
        </G>
    </Svg>
)
export default SVGComponent
