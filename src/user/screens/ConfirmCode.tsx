import { useState } from "react"
import { Keyboard, Linking, TouchableOpacity, TouchableWithoutFeedback } from "react-native"
import { FormProvider, useForm } from "react-hook-form"
import { useTranslation } from "react-i18next"
import styled, { css } from "@emotion/native"
import { useTheme } from "@emotion/react"
import { storage } from "@core/utils/storage.ts"
import { fonts } from "@core/assets/fonts"
import { ArrowLeftSvg, TelegramSvg } from "@core/assets/svgs"
import Button from "@core/components/common/Button.tsx"
import { NavigationType } from "@core/types.ts"
import FormInput from "@core/components/FormInput.tsx"
import { CheckInType } from "@user/types.ts"
import { useCheckIn } from "@user/hooks/users.ts"
import { showToast } from "@core/hooks/toast.ts"

type ConfirmCodeProps = {
    route: { params: { phone: string; message: string } }
} & NavigationType

const ConfirmCode = ({ route, navigation }: ConfirmCodeProps) => {
    const { phone, message } = route.params
    const { t } = useTranslation()
    const theme = useTheme()
    const methods = useForm<CheckInType>()
    const [buttonDisabled, setButtonDisabled] = useState(true)

    const { isLoading, mutateAsync, error } = useCheckIn()

    const navigateBack = () => {
        navigation.goBack()
    }

    const handleChangeText = (text: string) => {
        if (text.length === 6) return setButtonDisabled(false)
        setButtonDisabled(true)
    }

    const onPressLink = async () => {
        await Linking.openURL(message)
    }

    const handleSubmit = async (data: CheckInType) => {
        data = { ...data, phone }
        const response = await mutateAsync(data)

        storage.set("token", response.token)
        storage.set("phone", response.user.phone)

        navigation.navigate("Home")
    }

    if (error) {
        let errorText = ""
        for (const key of Object.keys(error.response?.data as Record<string, unknown>)) {
            errorText += error.response?.data[key] + " "
        }
        showToast({ type: "error", title: errorText })
    }

    return (
        <Container>
            <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
                <SafeArea>
                    <BackButton onPress={navigateBack}>
                        <ArrowLeftSvg width={32} height={32} color={theme.text} />
                    </BackButton>

                    <InnerBlock>
                        <FormProvider {...methods}>
                            <PageName>{t("confirmation")}</PageName>

                            <InputBox>
                                <PhoneText>{phone}</PhoneText>
                            </InputBox>

                            <TouchableWithoutFeedback>
                                <InputBox>
                                    <FormInput
                                        name="code"
                                        defaultValue=""
                                        onChangeText={handleChangeText}
                                        keyboardType="phone-pad"
                                        maxLength={6}
                                        placeholder="******"
                                        placeholderTextColor={theme.gray}
                                        style={[inputStyle, { color: theme.text }]}
                                    />
                                </InputBox>
                            </TouchableWithoutFeedback>

                            <TouchableOpacity onPress={onPressLink}>
                                <InfoText>{t("codeWillSendYou")}</InfoText>

                                <Row>
                                    <TelegramLinkText>{t("openTelegram")}</TelegramLinkText>

                                    <TelegramSvg />
                                </Row>
                            </TouchableOpacity>

                            <ButtonBlock behavior={"position"} keyboardVerticalOffset={100}>
                                <Button
                                    onPress={methods.handleSubmit(handleSubmit)}
                                    background={buttonDisabled || isLoading ? theme.gray : theme.primary}
                                    disabled={buttonDisabled || isLoading}
                                >
                                    <SubmitText>{t("enter")}</SubmitText>
                                </Button>
                            </ButtonBlock>
                        </FormProvider>
                    </InnerBlock>
                </SafeArea>
            </TouchableWithoutFeedback>
        </Container>
    )
}

const Container = styled.View`
    flex: 1;
    padding: 40px 10px;
    position: relative;
    background-color: ${(props) => props.theme.white};
`

const SafeArea = styled.SafeAreaView`
    flex: 1;
`

const InputBox = styled.View`
    width: 100%;
    height: 40px;
    border-radius: 8px;
    border: 1px solid ${(props) => props.theme.gray};
    padding: 0 10px;
    margin-top: 5px;
    gap: 5px;
    align-items: center;
    flex-direction: row;
`

const inputStyle = css`
    flex: 1;
    font-size: 18px;
    font-family: ${fonts.regular};
    padding: 8px 0;
`

const PhoneText = styled.Text`
    color: ${(props) => props.theme.text};
    ${inputStyle}
`

const InnerBlock = styled.View`
    flex: 1;
    padding: 10px 5px;
    gap: 10px;
`

const BackButton = styled.Pressable`
    width: 50px;
    padding: 10px;
    margin: -10px;
`

const PageName = styled.Text`
    font-size: 22px;
    margin-bottom: 20px;
    font-family: ${fonts.bold};
    color: ${(props) => props.theme.primary};
`

const InfoText = styled.Text`
    margin-top: 20px;
    font-size: 18px;
    text-align: center;
    font-family: ${fonts.regular};
    color: ${(props) => props.theme.text};
`

const Row = styled.View`
    flex-direction: row;
    align-items: center;
    gap: 5px;
    justify-content: center;
`

const TelegramLinkText = styled.Text`
    margin-top: 5px;
    font-size: 16px;
    text-align: center;
    font-family: ${fonts.regular};
    text-decoration: underline ${(props) => props.theme.link};
    color: ${(props) => props.theme.link};
`

const SubmitText = styled.Text`
    font-size: 16px;
    font-family: ${fonts.bold};
    margin: 12px;
    color: ${(props) => props.theme.white};
`

const ButtonBlock = styled.KeyboardAvoidingView`
    width: 100%;
    position: absolute;
    bottom: 20px;
    padding: 0 5px;
`

export default ConfirmCode
