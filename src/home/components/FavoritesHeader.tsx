import { SafeAreaView } from "react-native"
import { useTranslation } from "react-i18next"
import { useTheme } from "@emotion/react"
import styled from "@emotion/native"
import { AngleLeftSvg, CartSvg, TrashSvg } from "@core/assets/svgs"
import { NavigationType } from "@core/types.ts"
import { fonts } from "@core/assets/fonts"
import useLike from "@core/hooks/like.ts"

type FavoritesHeaderProps = NavigationType

const FavoritesHeader = ({ navigation }: FavoritesHeaderProps) => {
    const { t } = useTranslation()
    const theme = useTheme()
    const { clearLikes } = useLike()

    const navigateBack = () => navigation.goBack()
    const navigateCart = () => navigation.navigate("Cart")
    const handleTrash = () => clearLikes()

    return (
        <SearchContainer>
            <SafeAreaView>
                <SearchInputWrapper>
                    <ButtonWrapper>
                        <Button onPress={navigateBack}>
                            <AngleLeftSvg color={theme.black + "90"} width={28} height={28} />
                        </Button>
                    </ButtonWrapper>

                    <CategoryName>{t("liked")}</CategoryName>

                    <ButtonWrapper>
                        <Button onPress={handleTrash}>
                            <TrashSvg color={theme.darkGray} width={22} height={22} />
                        </Button>

                        <Button onPress={navigateCart}>
                            <CartSvg color={theme.darkGray} width={22} height={22} />
                        </Button>
                    </ButtonWrapper>
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

const CategoryName = styled.TextInput`
    flex-grow: 1;
    text-align: center;
    font-size: 17px;
    font-family: ${fonts.bold};
    padding: 12px 0;
    color: ${(props) => props.theme.black};
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

export default FavoritesHeader
