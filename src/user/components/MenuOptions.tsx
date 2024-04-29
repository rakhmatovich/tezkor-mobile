import { useTranslation } from "react-i18next"
import styled from "@emotion/native"
import { useTheme } from "@emotion/react"
import {
    ContactSvg,
    HeartSvg,
    InformationSvg,
    MobilePhoneSvg,
    MyOrdersSvg,
    PhoneSvg,
    SettingsSvg,
} from "@core/assets/svgs"
import { fonts } from "@core/assets/fonts"
import { NavigationType } from "@core/types.ts"
import { checkAuth } from "@user/utils/auth.ts"
import { Fragment } from "react"

type MenuOptionsProps = NavigationType

const MenuOptions = ({ navigation }: MenuOptionsProps) => {
    const { t } = useTranslation()
    const theme = useTheme()
    const isAuthenticated = checkAuth()

    const navigateFavourites = () => navigation.navigate("Favorites")
    const navigateSettings = () => navigation.navigate("Settings")

    return (
        <OptionsContainer>
            {isAuthenticated && (
                <Fragment>
                    <Option>
                        <MyOrdersSvg color={theme.primary} />

                        <OptionText>{t("myOrders")}</OptionText>
                    </Option>

                    <Line />
                </Fragment>
            )}

            <Option onPress={navigateFavourites}>
                <HeartSvg color={theme.primary} />
                <OptionText>{t("liked")}</OptionText>
            </Option>

            <Line />

            <Option onPress={navigateSettings}>
                <SettingsSvg color={theme.primary} />
                <OptionText>{t("settings")}</OptionText>
            </Option>

            <Line />

            <Option>
                <InformationSvg color={theme.primary} />
                <OptionText>{t("aboutUs")}</OptionText>
            </Option>

            <Line />

            <Option>
                <PhoneSvg color={theme.primary} />
                <OptionText>+998 33 577 55 05</OptionText>
            </Option>

            <Line />

            <Option>
                <ContactSvg color={theme.primary} />
                <OptionText>{t("contactUs")}</OptionText>
            </Option>

            <Line />

            <Option>
                <MobilePhoneSvg color={theme.primary} />
                <OptionText>{t("aboutApp")}</OptionText>
            </Option>
        </OptionsContainer>
    )
}

const OptionsContainer = styled.View`
    background-color: ${(props) => props.theme.white};
    border-radius: 8px;
    padding: 0 20px;
`

const Option = styled.Pressable`
    padding: 15px 0;
    flex-direction: row;
    align-items: center;
    gap: 10px;
`

const OptionText = styled.Text`
    font-size: 16px;
    font-family: ${fonts.regular};
    color: ${(props) => props.theme.text};
`

const Line = styled.View`
    width: 100%;
    height: 1px;
    background-color: ${(props) => props.theme.gray};
`

export default MenuOptions
