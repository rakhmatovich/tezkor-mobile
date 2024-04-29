import { useTranslation } from "react-i18next"
import styled, { css } from "@emotion/native"
import { NavigationType } from "@core/types.ts"
import { fonts } from "@core/assets/fonts"
import { signOut } from "@user/utils/auth.ts"

type ProfileSignOutProps = {
    closeModal: () => void
} & NavigationType

const ProfileSignOut = ({ closeModal, navigation }: ProfileSignOutProps) => {
    const { t } = useTranslation()

    const onCancel = () => closeModal()

    const handleSignOut = () => {
        closeModal()
        signOut()
        navigation.replace("TabNavigation")
    }

    return (
        <Wrapper>
            <Heading>{t("areYouSureToSignOut")}</Heading>

            <Row>
                <Button onPress={onCancel}>
                    <ButtonText>{t("cancel")}</ButtonText>
                </Button>

                <ButtonDanger onPress={handleSignOut}>
                    <ButtonDangerText>{t("logOut")}</ButtonDangerText>
                </ButtonDanger>
            </Row>
        </Wrapper>
    )
}

const Wrapper = styled.View`
    padding: 10px 20px;
    flex: 1;
    gap: 10px;
    align-items: center;
    background-color: ${(props) => props.theme.white};
`

const Heading = styled.Text`
    font-size: 18px;
    font-family: ${fonts.bold};
    color: ${(props) => props.theme.text};
`

const Row = styled.View`
    flex-direction: row;
    gap: 10px;
`

const buttonStyles = css`
    flex: 1;
    height: 40px;
    border-radius: 8px;
    align-items: center;
    justify-content: center;
`

const Button = styled.Pressable`
    border: 1px solid ${(props) => props.theme.text};
    ${buttonStyles}
`

const ButtonDanger = styled.Pressable`
    background-color: ${(props) => props.theme.danger};
    ${buttonStyles}
`

const ButtonText = styled.Text`
    font-size: 18px;
    font-family: ${fonts.regular};
    color: ${(props) => props.theme.text};
`

const ButtonDangerText = styled.Text`
    font-size: 18px;
    font-family: ${fonts.regular};
    color: ${(props) => props.theme.white};
`

export default ProfileSignOut
