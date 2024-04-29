import { SafeAreaView } from "react-native"
import styled from "@emotion/native"
import { fonts } from "@core/assets/fonts"
import { SearchSvg } from "@core/assets/svgs"
import { useTheme } from "@emotion/react"
import BackButton from "@core/components/BackButton.tsx"

const ProductDetailHeader = () => {
    const theme = useTheme()

    return (
        <Main>
            <SafeAreaView>
                <Wrapper>
                    <Section>
                        <BackButton />
                    </Section>

                    <AppName>Tezkor</AppName>

                    <Section style={{ justifyContent: "flex-end" }}>
                        {/*<HeaderButton>*/}
                        {/*    <ShareSvg color={theme.darkGray} />*/}
                        {/*</HeaderButton>*/}

                        <HeaderButton>
                            <SearchSvg color={theme.darkGray} />
                        </HeaderButton>
                    </Section>
                </Wrapper>
            </SafeAreaView>
        </Main>
    )
}

const Main = styled.View`
    background-color: ${(props) => props.theme.white};
`

const Wrapper = styled.View`
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding: 10px;
`

const Section = styled.View`
    width: 20%;
    flex-direction: row;
    align-items: center;
    gap: 15px;
`

const HeaderButton = styled.Pressable`
    padding: 10px;
    margin: -10px;
`

const AppName = styled.Text`
    font-family: ${fonts.bold};
    font-size: 24px;
    color: ${(props) => props.theme.primary};
`

export default ProductDetailHeader
