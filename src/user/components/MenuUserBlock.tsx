import SkeletonPlaceholder from "react-native-skeleton-placeholder"
import styled from "@emotion/native"
import { UserEditSvg } from "@core/assets/svgs"
import { useTheme } from "@emotion/react"
import { fonts } from "@core/assets/fonts"
import { useUserInfo } from "@user/hooks/users.ts"

type MenuUserBlockProps = {
    onPress?: () => void
}

const MenuUserBlock = ({ onPress }: MenuUserBlockProps) => {
    const theme = useTheme()
    const { data: user, isLoading } = useUserInfo()

    let fullName = "Sello Client"
    if (user) {
        const { firstName, lastName } = user
        if (firstName) fullName = firstName
        if (lastName) fullName += " " + lastName
    }

    return (
        <BlockWrapper>
            {isLoading ? (
                <SkeletonPlaceholder borderRadius={4}>
                    <SkeletonPlaceholder.Item flexDirection="row" alignItems="center">
                        <SkeletonPlaceholder.Item width={60} height={60} borderRadius={50} />
                        <SkeletonPlaceholder.Item marginLeft={20}>
                            <SkeletonPlaceholder.Item width={120} height={20} />
                            <SkeletonPlaceholder.Item marginTop={6} width={80} height={20} />
                        </SkeletonPlaceholder.Item>
                    </SkeletonPlaceholder.Item>
                </SkeletonPlaceholder>
            ) : (
                <UserInformation>
                    <AvatarPlaceHolder>
                        <AvatarPlaceHolderText>SC</AvatarPlaceHolderText>
                    </AvatarPlaceHolder>

                    <UserTexts>
                        <UserName>{fullName}</UserName>

                        <UserPhone>{user?.phone}</UserPhone>
                    </UserTexts>
                </UserInformation>
            )}

            {onPress && (
                <UserEditButton onPress={onPress}>
                    <UserEditSvg width={28} height={28} color={theme.darkGray} />
                </UserEditButton>
            )}
        </BlockWrapper>
    )
}

const BlockWrapper = styled.View`
    margin-top: 20px;
    flex-direction: row;
    justify-content: space-between;
`

const UserInformation = styled.View`
    flex-direction: row;
    align-items: center;
    gap: 10px;
`
const AvatarPlaceHolder = styled.View`
    width: 60px;
    height: 60px;
    border-radius: 60px;
    background-color: ${(props) => props.theme.gray}80;
    align-items: center;
    justify-content: center;
`
const AvatarPlaceHolderText = styled.Text`
    font-size: 18px;
    font-family: ${fonts.bold};
    color: ${(props) => props.theme.primary};
`

const UserTexts = styled.View`
    gap: 5px;
`
const UserName = styled.Text`
    font-size: 18px;
    font-family: ${fonts.bold};
    color: ${(props) => props.theme.text};
`

const UserPhone = styled.Text`
    font-size: 16px;
    font-family: ${fonts.regular};
    color: ${(props) => props.theme.text};
`

const UserEditButton = styled.Pressable`
    max-height: 50px;
    margin: -10px;
    padding: 10px;
`

export default MenuUserBlock
