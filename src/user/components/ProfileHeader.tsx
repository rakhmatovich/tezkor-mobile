import { SafeAreaView } from "react-native"
import { useTheme } from "@emotion/react"
import styled from "@emotion/native"
import { useTranslation } from "react-i18next"
import MenuUserBlock from "@user/components/MenuUserBlock.tsx"
import { fonts } from "@core/assets/fonts"
import BackButton from "@core/components/BackButton.tsx"

const ProfileHeader = () => {
    const { t } = useTranslation()
    const theme = useTheme()

    return (
        <HeaderWrapper>
            <SafeAreaView>
                <Row>
                    <BackButton color={theme.text} />
                    <HeaderText>{t("profile")}</HeaderText>
                </Row>

                <MenuUserBlock />
            </SafeAreaView>
        </HeaderWrapper>
    )
}

const HeaderWrapper = styled.View`
    padding: 5px 20px 10px;
    background-color: ${(props) => props.theme.white};
`

const Row = styled.View`
    flex-direction: row;
    align-items: center;
    gap: 10px;
`

const HeaderText = styled.Text`
    font-size: 18px;
    font-family: ${fonts.bold};
    color: ${(props) => props.theme.text};
`

export default ProfileHeader
