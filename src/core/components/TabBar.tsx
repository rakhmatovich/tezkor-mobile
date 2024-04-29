import { BottomTabBarProps } from "@react-navigation/bottom-tabs"
import TabBarItem from "@core/components/TabBarItem.tsx"
import styled from "@emotion/native"

const TabBar = ({ state, descriptors, navigation }: BottomTabBarProps) => {
    return (
        <TabBarContainer>
            {state.routes.map((route, index) => {
                const { options } = descriptors[route.key]
                const label = options.tabBarLabel ?? options.title ?? route.name

                const isFocused = state.index === index

                const onPress = () => {
                    const event = navigation.emit({
                        type: "tabPress",
                        target: route.key,
                        canPreventDefault: true,
                    })

                    if (event !== undefined && !event.defaultPrevented) {
                        navigation.navigate(route.name, route.params)
                    }
                }

                const onLongPress = () => {
                    navigation.emit({
                        type: "tabLongPress",
                        target: route.key,
                    })
                }

                return (
                    <TabBarItem
                        key={index}
                        isFocused={isFocused}
                        options={options}
                        routeName={route.name}
                        onPress={onPress}
                        onLongPress={onLongPress}
                        label={label.toString()}
                    />
                )
            })}
        </TabBarContainer>
    )
}

const TabBarContainer = styled.View`
    width: 100%;
    height: 80px;
    flex-direction: row;
    padding-bottom: 10px;
    border-top: 1px solid ${(props) => props.theme.gray};
    background-color: ${(props) => props.theme.white};
`

export default TabBar
