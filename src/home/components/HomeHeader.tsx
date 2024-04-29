import { SafeAreaView } from "react-native"
import { useTranslation } from "react-i18next"
import { useTheme } from "@emotion/react"
import styled, { css } from "@emotion/native"
import { HeartSvg, SearchSvg } from "@core/assets/svgs"
import { NavigationType, StylesPropsType } from "@core/types.ts"
import { fonts } from "@core/assets/fonts"
import useLike from "@core/hooks/like.ts"

type HomeHeaderProps = NavigationType

const HomeHeader = ({ navigation }: HomeHeaderProps) => {
    const { t } = useTranslation()
    const theme = useTheme()
    const { likedProducts } = useLike()
    const count = likedProducts.length

    const navigateSearch = () => navigation.navigate("Search")
    const navigateFavourites = () => navigation.navigate("Favorites")

    return (
        <HeaderWrapper>
            <SafeAreaView>
                <HeaderContainer>
                    <SearchButton onPress={navigateSearch}>
                        <SearchSvg color={theme.darkGray} />

                        <InputPlaceHolder>{t("search")}</InputPlaceHolder>
                    </SearchButton>

                    <ButtonsContainer>
                        <Button onPress={navigateFavourites}>
                            <HeartSvg color={theme.darkGray} />
                            {count ? (
                                <LikesCountWrapper>
                                    <LikesCount>{count}</LikesCount>
                                </LikesCountWrapper>
                            ) : null}
                        </Button>
                    </ButtonsContainer>
                </HeaderContainer>
            </SafeAreaView>
        </HeaderWrapper>
    )
}

const HeaderWrapper = styled.View`
    background-color: ${(props) => props.theme.white};
`

const HeaderContainer = styled.View`
    flex-direction: row;
    gap: 10px;
    padding: 10px;
`

const baseContainerStyle = (props: StylesPropsType) => css`
    padding-left: 6px;
    padding-right: 6px;
    border-radius: 8px;
    flex-direction: row;
    border: 1px solid ${props.theme.gray}95;
    align-items: center;
    color: ${props.theme.text};
`

const SearchButton = styled.Pressable`
    flex-grow: 1;
    gap: 10px;
    ${baseContainerStyle}
`

const InputPlaceHolder = styled.Text`
    flex-grow: 1;
    padding: 8px 0;
    font-size: 16px;
    font-family: ${fonts.regular};
    color: ${(props) => props.theme.darkGray};
`

const ButtonsContainer = styled.View`
    gap: 15px;
    ${baseContainerStyle}
`

const Button = styled.Pressable`
    position: relative;
`

const LikesCountWrapper = styled.View`
    height: 20px;
    min-width: 20px;
    position: absolute;
    left: -12px;
    top: -12px;
    background-color: ${(props) => props.theme.primary};
    padding: 0 6px;
    align-items: center;
    justify-content: center;
    border-radius: 20px;
`

const LikesCount = styled.Text`
    font-size: 12px;
    font-family: ${fonts.regular};
    margin-top: 1px;
    color: ${(props) => props.theme.white};
`

export default HomeHeader
