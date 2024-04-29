import * as React from "react"
import Svg, { Path } from "react-native-svg"

function SvgComponent({ width = 24, height = 24, color = "#0088cc" }) {
    return (
        <Svg
            viewBox="0 0 333334 333334"
            fillRule="evenodd"
            clipRule="evenodd"
            width={width}
            height={height}
            fill={color}
        >
            <Path d="M166667 0c92048 0 166667 74619 166667 166667s-74619 166667-166667 166667S0 258715 0 166667 74619 0 166667 0zm80219 91205l-29735 149919s-4158 10396-15594 5404l-68410-53854s76104-68409 79222-71320c3119-2911 2079-3534 2079-3534 207-3535-5614 0-5614 0l-100846 64043-42002-14140s-6446-2288-7069-7277c-624-4992 7277-7694 7277-7694l166970-65498s13722-6030 13722 3951zm-87637 122889l-27141 24745s-2122 1609-4443 601l5197-45965 26387 20619z" />
        </Svg>
    )
}

export default SvgComponent
