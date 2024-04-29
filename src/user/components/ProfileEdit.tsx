import { FormProvider, useForm } from "react-hook-form"
import { useTranslation } from "react-i18next"
import { useTheme } from "@emotion/react"
import styled, { css } from "@emotion/native"
import { fonts } from "@core/assets/fonts"
import FormInput from "@core/components/FormInput.tsx"
import Button from "@core/components/common/Button.tsx"
import { UserType } from "@user/types.ts"
import { useUserInfo, useUserUpdate } from "@user/hooks/users.ts"
import { storage } from "@core/utils/storage.ts"

type ProfileEditProps = {
    closeModal: () => void
}

const ProfileEdit = ({ closeModal }: ProfileEditProps) => {
    const { t } = useTranslation()
    const theme = useTheme()
    const methods = useForm<UserType>()
    const { data: user } = useUserInfo()
    const { mutateAsync, isLoading } = useUserUpdate()

    const phone = storage.getString("phone")

    const handleSubmit = async (data: UserType) => {
        data = { ...data, phone: phone as string }
        await mutateAsync(data)
        closeModal()
    }

    return (
        <FormProvider {...methods}>
            <Wrapper>
                <Heading>{t("moreUserInfo")}</Heading>

                <Field>
                    <Label>{t("name")}</Label>

                    <InputWrapper>
                        <FormInput
                            name="firstName"
                            defaultValue={user?.firstName}
                            placeholder={t("fill")}
                            placeholderTextColor={theme.gray}
                            style={[inputStyle, { color: theme.text }]}
                        />
                    </InputWrapper>
                </Field>

                <Field>
                    <Label>{t("surname")}</Label>

                    <InputWrapper>
                        <FormInput
                            name="lastName"
                            defaultValue={user?.lastName}
                            placeholder={t("fill")}
                            placeholderTextColor={theme.gray}
                            style={[inputStyle, { color: theme.text }]}
                        />
                    </InputWrapper>
                </Field>

                <Field>
                    <Label>{t("phone")}</Label>

                    <InputWrapper>
                        <PhoneNumber>+998 (33) 577-55-05</PhoneNumber>
                    </InputWrapper>
                </Field>

                <ButtonBlock behavior={"position"} keyboardVerticalOffset={120}>
                    <Button
                        onPress={methods.handleSubmit(handleSubmit)}
                        background={theme.primary}
                        disabled={isLoading}
                    >
                        <SubmitText>{t("save")}</SubmitText>
                    </Button>
                </ButtonBlock>
            </Wrapper>
        </FormProvider>
    )
}

const Wrapper = styled.View`
    flex: 1;
    gap: 10px;
    padding: 10px 20px;
`

const Heading = styled.Text`
    font-size: 20px;
    font-family: ${fonts.bold};
    color: ${(props) => props.theme.text};
`

const Field = styled.View`
    margin-top: 10px;
    gap: 3px;
`

const Label = styled.Text`
    font-size: 16px;
    font-family: ${fonts.regular};
    color: ${(props) => props.theme.text};
`

const InputWrapper = styled.View`
    width: 100%;
    border-radius: 6px;
    justify-content: center;
    border: 1px solid ${(props) => props.theme.primary};
`

const inputStyle = css`
    width: 100%;
    padding: 8px 10px;
    font-size: 16px;
    font-family: ${fonts.regular};
`

const PhoneNumber = styled.Text`
    font-size: 16px;
    font-family: ${fonts.regular};
    padding: 10px;
    background-color: ${(props) => props.theme.gray}90;
    color: ${(props) => props.theme.text};
`

const ButtonBlock = styled.KeyboardAvoidingView`
    width: 100%;
    margin-top: auto;
    margin-bottom: 30px;
`

const SubmitText = styled.Text`
    font-size: 16px;
    font-family: ${fonts.bold};
    margin: 12px;
    color: ${(props) => props.theme.white};
`

export default ProfileEdit
