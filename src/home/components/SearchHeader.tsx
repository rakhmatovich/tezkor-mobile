import { Pressable, SafeAreaView } from "react-native"
import { useTranslation } from "react-i18next"
import { useTheme } from "@emotion/react"
import styled from "@emotion/native"
import { AngleLeftSvg, CloseSvg } from "@core/assets/svgs"
import { NavigationType } from "@core/types.ts"
import { fonts } from "@core/assets/fonts"

type SearchHeaderProps = {
    value: string
    onSearch: (value: string) => void
} & NavigationType

const SearchHeader = ({ value, onSearch, navigation }: SearchHeaderProps) => {
    const { t } = useTranslation()
    const theme = useTheme()

    return (
        <SearchContainer>
            <SafeAreaView>
                <SearchInputWrapper>
                    <Pressable onPress={() => navigation.goBack()}>
                        <AngleLeftSvg color={theme.black + "90"} width={28} height={28} />
                    </Pressable>

                    <SearchInput
                        value={value}
                        onChangeText={(text) => onSearch(text)}
                        placeholder={t("enterToSearch")}
                        placeholderTextColor={theme.darkGray}
                    />

                    {value ? (
                        <Pressable onPress={() => onSearch("")}>
                            <CloseSvg color={theme.black + "90"} />
                        </Pressable>
                    ) : null}
                </SearchInputWrapper>
            </SafeAreaView>
        </SearchContainer>
    )
}

const SearchContainer = styled.View`
    padding: 5px 20px 10px;
    background-color: ${(props) => props.theme.white};
`

const SearchInputWrapper = styled.View`
    border: 2px solid ${(props) => props.theme.primary};
    padding: 0 10px;
    border-radius: 50px;
    flex-direction: row;
    align-items: center;
    gap: 5px;
`

const SearchInput = styled.TextInput`
    flex-grow: 1;
    width: 100px;
    font-size: 17px;
    font-family: ${fonts.regular};
    padding: 12px 0;
    color: ${(props) => props.theme.black};
`

export default SearchHeader
