import * as React from "react"
import Svg, { Path } from "react-native-svg"
const SVGComponent = ({ width = 24, height = 24, color = "#000000" }) => (
    <Svg width={width} height={height} viewBox="0 0 24 24" fill="none">
        <Path
            d="M18.4268 14.7678L17.2015 13.5416C16.8764 13.2166 16.4357 13.0341 15.9762 13.0341C15.5167 13.0341 15.076 13.2166 14.7509 13.5416L14.1382 14.1547C13.8132 14.4799 13.3725 14.6625 12.9129 14.6625C12.4534 14.6625 12.0126 14.4799 11.6876 14.1547L9.84968 12.3154C9.52474 11.9902 9.34219 11.5492 9.34219 11.0893C9.34219 10.6294 9.52474 10.1883 9.84968 9.86312L10.4623 9.25004C10.7871 8.92471 10.9695 8.4837 10.9695 8.02388C10.9695 7.56406 10.7871 7.12304 10.4623 6.79772L9.23704 5.57156C9.08686 5.39257 8.89936 5.24865 8.68768 5.14991C8.476 5.05117 8.24528 5 8.01174 5C7.77819 5 7.54748 5.05117 7.3358 5.14991C7.12412 5.24865 6.93661 5.39257 6.78644 5.57156C3.56391 8.77271 5.08503 12.4678 8.30581 15.6891C11.5266 18.9104 15.22 20.4344 18.4268 17.2236C18.6062 17.0733 18.7506 16.8855 18.8496 16.6733C18.9487 16.4612 19 16.2298 19 15.9957C19 15.7615 18.9487 15.5302 18.8496 15.318C18.7506 15.1059 18.6062 14.918 18.4268 14.7678Z"
            stroke={color}
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </Svg>
)
export default SVGComponent
