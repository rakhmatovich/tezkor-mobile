import { SafeAreaView } from "react-native"
import styled from "@emotion/native"
import { useTranslation } from "react-i18next"
import MenuUserBlock from "@user/components/MenuUserBlock.tsx"
import { fonts } from "@core/assets/fonts"
import { NavigationType } from "@core/types.ts"
import { checkAuth } from "@user/utils/auth.ts"
import { ButtonText } from "@core/components/styles"
import Button from "@core/components/common/Button.tsx"
import { useFocusEffect } from "@react-navigation/native"
import { useCallback, useState } from "react"

type MenuHeaderProps = NavigationType

const MenuHeader = ({ navigation }: MenuHeaderProps) => {
    const { t } = useTranslation()
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false)

    useFocusEffect(
        useCallback(() => {
            setIsAuthenticated(checkAuth)
        }, [])
    )

    const navigateProfile = () => navigation.navigate("Profile")

    const navigateSignIn = () => navigation.navigate("SignIn")

    return (
        <HeaderWrapper>
            <SafeAreaView>
                <HeaderText>{t("menu")}</HeaderText>

                {isAuthenticated ? (
                    <MenuUserBlock onPress={navigateProfile} />
                ) : (
                    <ButtonBlock>
                        <Button borderRadius={8} onPress={navigateSignIn}>
                            <ButtonText style={{ margin: 12, fontSize: 16 }}>{t("signIn")}</ButtonText>
                        </Button>
                    </ButtonBlock>
                )}
            </SafeAreaView>
        </HeaderWrapper>
    )
}

const HeaderWrapper = styled.View`
    padding: 5px 20px 10px;
    background-color: ${(props) => props.theme.white};
`

const HeaderText = styled.Text`
    font-size: 18px;
    font-family: ${fonts.bold};
    color: ${(props) => props.theme.primary};
`

const ButtonBlock = styled.View`
    margin-top: 20px;
`

export default MenuHeader
