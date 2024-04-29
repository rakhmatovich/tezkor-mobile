import { useState } from "react"
import { useTranslation } from "react-i18next"
import styled from "@emotion/native"
import { Theme } from "@emotion/react"
import { ruFlag, uzFlag } from "@core/assets/images"
import { storage } from "@core/utils/storage.ts"
import { fonts } from "@core/assets/fonts"

const languages = [
    { code: "uz", label: "uzbek", icon: uzFlag },
    { code: "ru", label: "russian", icon: ruFlag },
]

type SettingsLanguage = {
    closeModal: () => void
    theme: Theme
}

const SettingsLanguage = ({ closeModal, theme }: SettingsLanguage) => {
    const { t, i18n } = useTranslation()
    const [currentLanguage, setCurrentLanguage] = useState(i18n.language)

    const changeLanguage = async (language: string) => {
        await i18n.changeLanguage(language)
        setCurrentLanguage(language)
        storage.set("language", language)
        closeModal()
    }

    return (
        <Wrapper>
            {languages.map((language, index) => (
                <Option
                    key={index}
                    onPress={() => changeLanguage(language.code)}
                    style={{
                        backgroundColor: theme.background + "90",
                        borderColor: currentLanguage === language.code ? theme.primary : theme.darkGray,
                    }}
                >
                    <OptionImage source={language.icon} />
                    <OptionText style={{ color: theme.text }}>{t(language.label)}</OptionText>
                </Option>
            ))}
        </Wrapper>
    )
}

const Wrapper = styled.View`
    flex: 1;
    padding: 10px 10px 40px;
    gap: 10px;
`

const Option = styled.Pressable`
    flex-direction: row;
    gap: 10px;
    align-items: center;
    padding: 4px 10px;
    border-radius: 8px;
    border: 1px solid ${(props) => props.theme.gray};
    background-color: ${(props) => props.theme.darkGray};
`

const OptionImage = styled.Image`
    width: 30px;
    height: 30px;
`

const OptionText = styled.Text`
    font-size: 18px;
    font-family: ${fonts.regular};
    color: ${(props) => props.theme.text};
`

export default SettingsLanguage
