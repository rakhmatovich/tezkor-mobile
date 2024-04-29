import { Keyboard, TouchableWithoutFeedback } from "react-native"
import styled from "@emotion/native"
import { ArrowLeftSvg } from "@core/assets/svgs"
import { useTheme } from "@emotion/react"
import SignInForm from "@user/components/SignInForm.tsx"
import { NavigationType } from "@core/types.ts"

type SignInProps = NavigationType

const SignIn = ({ navigation }: SignInProps) => {
    const theme = useTheme()

    const navigateBack = () => {
        navigation.goBack()
    }

    return (
        <Container>
            <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
                <SafeArea>
                    <BackButton onPress={navigateBack}>
                        <ArrowLeftSvg width={32} height={32} color={theme.text} />
                    </BackButton>

                    <SignInForm navigation={navigation} />
                </SafeArea>
            </TouchableWithoutFeedback>
        </Container>
    )
}

const Container = styled.View`
    flex: 1;
    padding: 40px 10px;
    position: relative;
    background-color: ${(props) => props.theme.white};
`

const SafeArea = styled.SafeAreaView`
    flex: 1;
`
const BackButton = styled.Pressable`
    width: 50px;
    padding: 10px;
    margin: -10px;
`

export default SignIn
