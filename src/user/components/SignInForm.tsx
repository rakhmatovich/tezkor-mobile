import { useState } from "react"
import { TouchableWithoutFeedback } from "react-native"
import { FormProvider, useForm } from "react-hook-form"
import { useTheme } from "@emotion/react"
import styled, { css } from "@emotion/native"
import { fonts } from "@core/assets/fonts"
import { NavigationType } from "@core/types.ts"
import { InformationSvg } from "@core/assets/svgs"
import Button from "@core/components/common/Button.tsx"
import MaskedFormInput from "@core/components/MaskedFormInput.tsx"
import { phoneMask } from "@user/utils/masks.ts"
import { SignInType } from "@user/types.ts"
import { useSignIn } from "@user/hooks/users.ts"
import { useTranslation } from "react-i18next"

type SignInFormProps = NavigationType

const SignInForm = ({ navigation }: SignInFormProps) => {
    const { t } = useTranslation()
    const theme = useTheme()
    const methods = useForm<SignInType>()
    const [buttonDisabled, setButtonDisabled] = useState(true)

    const { isLoading, mutateAsync } = useSignIn()

    const handleChangeText = (text: string) => {
        if (text.length === 14) return setButtonDisabled(false)
        setButtonDisabled(true)
    }

    const handleSubmit = async (data: SignInType) => {
        data.phone = "+998" + data.phone
        const response = await mutateAsync(data)
        // eslint-disable-next-line no-console
        console.log(response.message)

        navigation.navigate("ConfirmCode", response)
    }

    return (
        <FormProvider {...methods}>
            <InnerBlock>
                <HelloText>{t("hello")}!</HelloText>

                <WelcomeText>{t("welcome")}</WelcomeText>

                <InfoText>{t("authWithPhone")}</InfoText>

                <FormWrapper>
                    <Heading>{t("enterYourNumber")}</Heading>

                    <FormInfoText>{t("youGetCode")}</FormInfoText>

                    <TouchableWithoutFeedback>
                        <InputBox>
                            <PhoneStarter>+998</PhoneStarter>

                            <MaskedFormInput
                                name="phone"
                                defaultValue=""
                                onChangeText={handleChangeText}
                                keyboardType="phone-pad"
                                maxLength={14}
                                placeholder="(00) 000-00-00"
                                placeholderTextColor={theme.gray}
                                style={[inputStyle, { color: theme.text }]}
                                mask={phoneMask}
                            />
                        </InputBox>
                    </TouchableWithoutFeedback>

                    <Row>
                        <InformationSvg color={theme.gray} width={18} height={18} />

                        <InfoText>{t("registerOnlyYou")}</InfoText>
                    </Row>
                </FormWrapper>
            </InnerBlock>

            <ButtonBlock behavior={"position"} keyboardVerticalOffset={50}>
                <Button
                    onPress={methods.handleSubmit(handleSubmit)}
                    background={buttonDisabled || isLoading ? theme.gray : theme.primary}
                    disabled={buttonDisabled || isLoading}
                >
                    <SubmitText>{t("getCode")}</SubmitText>
                </Button>
            </ButtonBlock>
        </FormProvider>
    )
}

const FormWrapper = styled.View`
    padding: 8px;
    margin-top: 10px;
    gap: 5px;
    border-radius: 8px;
    background-color: ${(props) => props.theme.white};
`

const Heading = styled.Text`
    font-size: 16px;
    font-family: ${fonts.bold};
    color: ${(props) => props.theme.text};
`

const InfoText = styled.Text`
    font-size: 16px;
    font-family: ${fonts.regular};
    color: ${(props) => props.theme.gray};
`

const FormInfoText = styled.Text`
    font-size: 14px;
    font-family: ${fonts.regular};
    color: ${(props) => props.theme.gray};
`

const InputBox = styled.View`
    width: 100%;
    height: 40px;
    border-radius: 8px;
    border: 1px solid ${(props) => props.theme.gray};
    padding: 0 10px;
    margin: 10px 0 5px;
    gap: 5px;
    align-items: center;
    flex-direction: row;
`

const PhoneStarter = styled.Text`
    font-size: 18px;
    font-family: ${fonts.regular};
    margin-top: 1px;
    color: ${(props) => props.theme.text};
`

const inputStyle = css`
    flex: 1;
    font-size: 18px;
    font-family: ${fonts.regular};
    padding: 8px 0;
`

const Row = styled.View`
    flex-direction: row;
    align-items: center;
    gap: 3px;
`

const InnerBlock = styled.View`
    flex: 1;
    padding: 10px 5px;
    gap: 10px;
`

const HelloText = styled.Text`
    font-size: 24px;
    font-family: ${fonts.bold};
    color: ${(props) => props.theme.primary};
`

const WelcomeText = styled.Text`
    font-size: 28px;
    font-family: ${fonts.regular};
    color: ${(props) => props.theme.text};
`

const ButtonBlock = styled.KeyboardAvoidingView`
    width: 100%;
    position: absolute;
    bottom: 20px;
    padding: 0 5px;
`

const SubmitText = styled.Text`
    font-size: 16px;
    font-family: ${fonts.bold};
    margin: 12px;
    color: ${(props) => props.theme.white};
`

export default SignInForm
