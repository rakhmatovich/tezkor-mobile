import { BottomTabNavigationOptions } from "@react-navigation/bottom-tabs"
import { useTranslation } from "react-i18next"
import { useTheme } from "@emotion/react"
import styled from "@emotion/native"
import { CartSvg, DotsVerticalSvg, HomeSvg, ListSvg } from "@core/assets/svgs"
import { fonts } from "@core/assets/fonts"
import useCart from "@core/hooks/cart.ts"

type TabBarItemProps = {
    isFocused: boolean
    options: BottomTabNavigationOptions
    routeName: string
    onPress: () => void
    onLongPress: () => void
    label: string
}

const TabItemImage = ({ routeName, isFocused }: { routeName: string; isFocused: boolean }) => {
    const colors = useTheme()

    if (routeName === "Home") return <HomeSvg color={isFocused ? colors.primary : colors.darkGray} />

    if (routeName === "Categories") return <ListSvg color={isFocused ? colors.primary : colors.darkGray} />

    if (routeName === "Cart") return <CartSvg color={isFocused ? colors.primary : colors.darkGray} />

    if (routeName === "Menu") return <DotsVerticalSvg color={isFocused ? colors.primary : colors.darkGray} />

    return <HomeSvg />
}

const TabBarItem = ({ isFocused, options, routeName, onPress, onLongPress, label }: TabBarItemProps) => {
    const { t } = useTranslation()
    const colors = useTheme()
    const { cartProducts } = useCart()
    const productsCount = cartProducts.reduce((acc, curr) => acc + curr.count, 0)

    return (
        <TabBarButton
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
        >
            {routeName === "Cart" && productsCount ? (
                <CartItemCountWrapper>
                    <CartItemCount>{productsCount}</CartItemCount>
                </CartItemCountWrapper>
            ) : null}

            <TabItemImage routeName={routeName} isFocused={isFocused} />
            <TabBarText style={{ color: isFocused ? colors.primary : colors.darkGray }}>{t(label)}</TabBarText>
        </TabBarButton>
    )
}

const TabBarButton = styled.Pressable`
    width: 25%;
    flex: 1;
    padding: 10px;
    align-items: center;
    position: relative;
`

const TabBarText = styled.Text`
    font-size: 12px;
    font-family: ${fonts.bold};
    color: ${(props) => props.theme.text};
`

const CartItemCountWrapper = styled.View`
    height: 20px;
    min-width: 20px;
    position: absolute;
    left: 15px;
    top: 3px;
    background-color: ${(props) => props.theme.primary};
    padding: 0 6px;
    align-items: center;
    justify-content: center;
    border-radius: 20px;
    z-index: 9999;
`

const CartItemCount = styled.Text`
    font-size: 12px;
    font-family: ${fonts.regular};
    margin-top: 1px;
    color: ${(props) => props.theme.white};
`

export default TabBarItem
