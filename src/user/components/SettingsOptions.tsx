import { memo, useState } from "react"
import { Switch } from "react-native"
import { useTranslation } from "react-i18next"
import styled from "@emotion/native"
import { useTheme } from "@emotion/react"
import { DarkModeSvg, LanguageSvg } from "@core/assets/svgs"
import { fonts } from "@core/assets/fonts"
import { storage } from "@core/utils/storage.ts"

type SettingsOptionsProps = {
    openModal: () => void
    changeTheme: () => void
}

const SettingsOptions = ({ openModal, changeTheme }: SettingsOptionsProps) => {
    const { t } = useTranslation()
    const theme = useTheme()
    const initialTheme = storage.getString("theme") === "dark"
    const [darkModeIsEnabled, setDarkModeIsEnabled] = useState<boolean>(initialTheme)

    const handleChangeTheme = () => {
        changeTheme()
        setDarkModeIsEnabled((prev) => !prev)
    }

    return (
        <OptionsContainer>
            <Option onPress={openModal}>
                <LanguageSvg color={theme.black} />
                <OptionText>{t("selectLanguage")}</OptionText>
            </Option>

            <Line />

            <Option>
                <DarkModeSvg color={theme.black} />
                <OptionText>{t("darkTheme")}</OptionText>

                <Switch
                    trackColor={{ false: theme.gray, true: theme.black }}
                    thumbColor={darkModeIsEnabled ? theme.gray : theme.black}
                    ios_backgroundColor={theme.gray}
                    onValueChange={handleChangeTheme}
                    style={{ transform: [{ scaleX: 0.9 }, { scaleY: 0.9 }] }}
                    value={darkModeIsEnabled}
                />
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
    flex: 1;
    font-size: 16px;
    font-family: ${fonts.regular};
    color: ${(props) => props.theme.text};
`

const Line = styled.View`
    width: 100%;
    height: 1px;
    background-color: ${(props) => props.theme.gray};
`

export default memo(SettingsOptions)
