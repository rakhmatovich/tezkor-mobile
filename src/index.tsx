import React, { useState } from "react"
import { NavigationContainer } from "@react-navigation/native"
import { createStackNavigator } from "@react-navigation/stack"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { Theme, ThemeProvider } from "@emotion/react"
import "@core/assets/language/i18n.ts"
import BaseProvider from "@core/components/BaseProvider.tsx"
import { RootStackParamListType, RootTabParamListType } from "@core/types.ts"
import { lightColors, darkColors, getTheme } from "@core/utils/theme.ts"
import { storage } from "@core/utils/storage.ts"
import Home from "@home/screens/Home.tsx"
import ProductDetail from "@home/screens/ProductDetail.tsx"
import Categories from "@category/screens/Categories.tsx"
import Cart from "@cart/screens/Cart.tsx"
import Menu from "@user/screens/Menu.tsx"
import TabBar from "@core/components/TabBar.tsx"
import Search from "@home/screens/Search.tsx"
import SignIn from "@user/screens/SignIn.tsx"
import ConfirmCode from "@user/screens/ConfirmCode.tsx"
import CategoryDetail from "@category/screens/CategoryDetail.tsx"
import Favorites from "@home/screens/Favorites.tsx"
import Settings from "@user/screens/Settings.tsx"
import Profile from "@user/screens/Profile.tsx"
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet"
import UserLocation from "@user/screens/UserLocation.tsx"

const Stack = createStackNavigator<RootStackParamListType>()
const Tab = createBottomTabNavigator<RootTabParamListType>()

function TabNavigation() {
    return (
        // eslint-disable-next-line react/no-unstable-nested-components
        <Tab.Navigator screenOptions={{ headerShown: false }} tabBar={(props) => <TabBar {...props} />}>
            <Tab.Screen name="Home" component={Home} options={{ tabBarLabel: "home" }} />

            <Tab.Screen name="Categories" component={Categories} options={{ tabBarLabel: "categories" }} />

            <Tab.Screen name="Cart" component={Cart} options={{ tabBarLabel: "cart" }} />

            <Tab.Screen name="Menu" component={Menu} options={{ tabBarLabel: "menu" }} />
        </Tab.Navigator>
    )
}

const Router = () => {
    const [theme, setTheme] = useState<Theme>(getTheme)

    const changeTheme = () => {
        const prevTheme = storage.getString("theme")
        storage.set("theme", prevTheme === "dark" ? "light" : "dark")
        setTheme(prevTheme === "dark" ? lightColors : darkColors)
    }

    return (
        <ThemeProvider theme={theme}>
            <BaseProvider>
                <NavigationContainer>
                    <BottomSheetModalProvider>
                        <Stack.Navigator initialRouteName="TabNavigation" screenOptions={{ headerShown: false }}>
                            <Stack.Screen name="TabNavigation" component={TabNavigation} />
                            <Stack.Screen name="ProductDetail" component={ProductDetail} />
                            <Stack.Screen name="Search" component={Search} />
                            <Stack.Screen name="Favorites" component={Favorites} />
                            <Stack.Screen name="SignIn" component={SignIn} />
                            <Stack.Screen name="ConfirmCode" component={ConfirmCode} />
                            <Stack.Screen name="Profile" component={Profile} />

                            <Stack.Screen name="Settings">
                                {(props) => <Settings {...props} changeTheme={changeTheme} />}
                            </Stack.Screen>

                            <Stack.Screen name="UserLocation" component={UserLocation} />
                            <Stack.Screen name="CategoryDetail" component={CategoryDetail} />
                        </Stack.Navigator>
                    </BottomSheetModalProvider>
                </NavigationContainer>
            </BaseProvider>
        </ThemeProvider>
    )
}

export default Router
