import { useState } from "react"
import { ScrollView } from "react-native"
import { useTranslation } from "react-i18next"
import { useTheme } from "@emotion/react"
import styled, { css } from "@emotion/native"
import { fonts } from "@core/assets/fonts"
import { ProductOption } from "@core/types.ts"

type Props = {
    options: ProductOption[]
    setOption: (option: ProductOption) => void
}

const ProductDetailSizes = ({ options, setOption }: Props) => {
    const { t } = useTranslation()
    const theme = useTheme()
    const [selected, setSelected] = useState<ProductOption>(options[0])

    const onSelect = (option: ProductOption) => {
        setSelected(option)
        setOption(option)
    }

    return (
        <Wrapper>
            <Heading>{t("sizes")}</Heading>
            <Line />

            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={scrollViewStyle}>
                {options.map((option) => (
                    <Option
                        key={option.id}
                        onPress={() => onSelect(option)}
                        style={{ backgroundColor: option.id === selected.id ? theme.primary : theme.white }}
                    >
                        <OptionText style={{ color: option.id === selected.id ? theme.white : theme.primary }}>
                            {option.title}
                        </OptionText>
                    </Option>
                ))}
            </ScrollView>
        </Wrapper>
    )
}

const Wrapper = styled.View`
    margin-top: 10px;
    padding: 20px 0;
    gap: 10px;
    background-color: ${(props) => props.theme.white};
`

const Heading = styled.Text`
    padding: 0 20px;
    font-family: ${fonts.regular};
    font-size: 20px;
    text-transform: uppercase;
    color: ${(props) => props.theme.primary};
`

const Line = styled.View`
    width: 100%;
    border: 0.5px solid ${(props) => props.theme.primary};
`

const scrollViewStyle = css`
    gap: 10px;
    padding: 2px 20px;
`

const Option = styled.Pressable`
    height: 35px;
    padding: 0 12px;
    justify-content: center;
    border-radius: 30px;
    border: 1px solid ${(props) => props.theme.primary};
`

const OptionText = styled.Text`
    font-size: 18px;
    color: ${(props) => props.theme.primary};
`

export default ProductDetailSizes
