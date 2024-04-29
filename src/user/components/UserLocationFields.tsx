import { useEffect } from "react"
import { Alert, View } from "react-native"
import { FormProvider, useForm } from "react-hook-form"
import { useTranslation } from "react-i18next"
import { useTheme } from "@emotion/react"
import styled, { css } from "@emotion/native"
import { NavigationType } from "@core/types.ts"
import FormInput from "@core/components/FormInput.tsx"
import Button from "@core/components/common/Button.tsx"
import { fonts } from "@core/assets/fonts"
import { useGeocoder, useLocationCreate, useLocationUpdate } from "@user/hooks/location.ts"
import { LocationType } from "@user/types.ts"

type Props = {
    latitude: number
    longitude: number
    closeModal: () => void
    location?: LocationType
} & NavigationType

const UserLocationFields = ({ latitude, longitude, closeModal, location, navigation }: Props) => {
    const { t } = useTranslation()
    const theme = useTheme()
    const geocoder = useGeocoder(latitude, longitude)
    const methods = useForm<LocationType>()
    const { mutateAsync: createLocation } = useLocationCreate()
    const { mutateAsync: updateLocation } = useLocationUpdate(location?.id)

    useEffect(() => {
        if (location) {
            methods.setValue("name", location.name)
            methods.setValue("location", location.location)
            return
        }
        if (geocoder.data && geocoder.data.results[0] && geocoder.data.results[0].formattedAddress) {
            methods.setValue("location", geocoder.data.results[0].formattedAddress)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [geocoder, location])

    const handleSubmit = async (data: LocationType) => {
        if (!data.name) {
            Alert.alert(t("namingError"))
            return
        }
        data = { ...data, latitude: latitude, longitude: longitude }
        if (location) await updateLocation(data)
        else await createLocation(data)

        closeModal()
        navigation.goBack()
    }

    return (
        <FormProvider {...methods}>
            <Wrapper>
                <View>
                    <Heading>{t("addLocation")}</Heading>
                    <Subtitle>{t("fillAllField")}</Subtitle>
                </View>

                <Field>
                    <Label>
                        {t("naming")}
                        <Important>*</Important>
                    </Label>

                    <InputWrapper>
                        <FormInput
                            name="name"
                            placeholder={t("fill")}
                            placeholderTextColor={theme.gray}
                            style={[inputStyle, { color: theme.text }]}
                        />
                    </InputWrapper>
                </Field>

                <Field>
                    <Label>
                        {t("address")}
                        <Important>*</Important>
                    </Label>

                    <InputWrapper>
                        <FormInput
                            name="location"
                            defaultValue=""
                            placeholder={t("fill")}
                            placeholderTextColor={theme.gray}
                            style={[inputStyle, { color: theme.text }]}
                        />
                    </InputWrapper>
                </Field>

                <ButtonBlock behavior="position" keyboardVerticalOffset={160}>
                    <Button onPress={methods.handleSubmit(handleSubmit)} background={theme.primary}>
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

const Subtitle = styled.Text`
    font-size: 14px;
    font-family: ${fonts.regular};
    color: ${(props) => props.theme.darkGray};
`

const Field = styled.View`
    margin-top: 10px;
    gap: 3px;
`

const Label = styled.Text`
    flex-direction: row;
    font-size: 16px;
    font-family: ${fonts.regular};
    color: ${(props) => props.theme.text};
`

const Important = styled.Text`
    padding-left: 5px;
    font-size: 20px;
    font-family: ${fonts.bold};
    color: ${(props) => props.theme.danger};
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

export default UserLocationFields
