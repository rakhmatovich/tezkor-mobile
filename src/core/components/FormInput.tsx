import React, { Fragment } from "react"
import { TextInput, TextInputProps } from "react-native"
import { useFormContext, Controller, useController, FieldValues, RegisterOptions } from "react-hook-form"
import styled from "@emotion/native"
import { fonts } from "@core/assets/fonts"
import { useTheme } from "@emotion/react"

type CustomRules =
    | Omit<RegisterOptions<FieldValues, string>, "disabled" | "setValueAs" | "valueAsNumber" | "valueAsDate">
    | undefined

type HookFormInputProps = {
    name: string
    defaultValue?: string
    rules?: CustomRules
    errorMessage?: string | undefined
    onChangeText?: (text: string) => void
} & TextInputProps

const FormInput = ({
    name,
    defaultValue = "",
    rules = {},
    errorMessage = "",
    onChangeText,
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
                    <TextInput
                        {...rest}
                        onBlur={onBlur}
                        onChangeText={(value) => {
                            onChange(value)
                            setValue(name, value)
                            onChangeText?.(value)
                        }}
                        value={field.value}
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

export default FormInput
