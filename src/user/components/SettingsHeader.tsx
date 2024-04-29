import { SafeAreaView } from "react-native"
import { useTranslation } from "react-i18next"
import styled from "@emotion/native"
import { useTheme } from "@emotion/react"
import { AngleLeftSvg } from "@core/assets/svgs"
import { NavigationType } from "@core/types.ts"
import { fonts } from "@core/assets/fonts"

type SettingsProps = NavigationType

const SettingsHeader = ({ navigation }: SettingsProps) => {
    const { t } = useTranslation()
    const theme = useTheme()

    const navigateBack = () => navigation.goBack()

    return (
        <SearchContainer>
            <SafeAreaView>
                <SearchInputWrapper>
                    <ButtonWrapper>
                        <Button onPress={navigateBack}>
                            <AngleLeftSvg color={theme.black + "90"} width={28} height={28} />
                        </Button>
                    </ButtonWrapper>

                    <Heading>{t("settings")}</Heading>

                    <ButtonWrapper />
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
    border-radius: 50px;
    flex-direction: row;
    align-items: center;
    gap: 5px;
`

const Heading = styled.TextInput`
    flex-grow: 1;
    text-align: center;
    font-size: 17px;
    font-family: ${fonts.bold};
    padding: 12px 0;
    color: ${(props) => props.theme.text};
`

const ButtonWrapper = styled.View`
    min-width: 17%;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
`

const Button = styled.Pressable`
    padding: 5px;
    margin: -5px;
`

export default SettingsHeader
