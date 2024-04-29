import { useTranslation } from "react-i18next"
import styled from "@emotion/native"
import { useTheme } from "@emotion/react"
import { EditSvg, LogOutSvg } from "@core/assets/svgs"
import { fonts } from "@core/assets/fonts"
import { ProfileModalType } from "@user/types.ts"

type ProfileOptionsProps = {
    openModal: (type: ProfileModalType) => void
}

const ProfileOptions = ({ openModal }: ProfileOptionsProps) => {
    const { t } = useTranslation()
    const theme = useTheme()

    const handleEdit = () => openModal("edit")

    const handleSignOut = () => openModal("exit")

    return (
        <OptionsContainer>
            <Option onPress={handleEdit}>
                <EditSvg color={theme.black} />
                <OptionText>{t("editProfile")}</OptionText>
            </Option>

            <Line />

            <Option onPress={handleSignOut}>
                <LogOutSvg color={theme.black} />
                <OptionText style={{ color: theme.danger }}>{t("logOut")}</OptionText>
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

export default ProfileOptions
