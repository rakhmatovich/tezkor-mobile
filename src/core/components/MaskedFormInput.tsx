import React, { Fragment } from "react"
import { TextInputProps } from "react-native"
import { useFormContext, Controller, useController, FieldValues, RegisterOptions } from "react-hook-form"
import MaskInput, { Mask } from "react-native-mask-input"
import styled from "@emotion/native"
import { fonts } from "@core/assets/fonts"

type CustomRules =
    | Omit<RegisterOptions<FieldValues, string>, "disabled" | "setValueAs" | "valueAsNumber" | "valueAsDate">
    | undefined

type HookFormInputProps = {
    name: string
    defaultValue?: string
    rules?: CustomRules
    errorMessage?: string | undefined
    onChangeText?: (text: string) => void
    mask: Mask
} & TextInputProps

const MaskedFormInput = ({
    name,
    defaultValue = "",
    rules = {},
    errorMessage = "",
    onChangeText,
    mask,
    ...rest
}: HookFormInputProps) => {
    const { control, setValue } = useFormContext()
    const { field } = useController({
        control,
        defaultValue,
        name,
    })

    return (
        <Fragment>
            <Controller
                control={control}
                name={name}
                render={({ field: { onChange, onBlur } }) => (
                    <MaskInput
                        {...rest}
                        onBlur={onBlur}
                        onChangeText={(value, unmasked) => {
                            onChange(value)
                            setValue(name, unmasked)
                            onChangeText?.(value)
                        }}
                        value={field.value}
                        mask={mask}
                    />
                )}
                rules={rules}
            />
            {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
        </Fragment>
    )
}

const ErrorMessage = styled.Text`
    font-size: 14px;
    font-family: ${fonts.regular};
    margin-top: 10px;
    color: ${(props) => props.theme.danger};
`

export default MaskedFormInput
