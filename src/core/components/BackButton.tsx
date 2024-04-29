import { useNavigation } from "@react-navigation/native"
import { AngleLeftSvg } from "@core/assets/svgs"
import { useTheme } from "@emotion/react"
import { StackNavigationType } from "@core/types.ts"
import styled from "@emotion/native"

type BackIconProps = {
    size?: number
    color?: string
}

const BackButton = ({ size = 24, color }: BackIconProps) => {
    const navigation = useNavigation<StackNavigationType>()
    const theme = useTheme()

    return (
        <Button onPress={() => navigation.goBack()}>
            <AngleLeftSvg color={color || theme.darkGray} width={size} height={size} />
        </Button>
    )
}

const Button = styled.Pressable`
    padding: 10px;
    margin: -10px;
`

export default BackButton
