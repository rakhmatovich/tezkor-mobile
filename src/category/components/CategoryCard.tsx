import styled, { css } from "@emotion/native"
import { domain } from "@core/utils/baseAxios.ts"
import { NavigationType } from "@core/types.ts"
import { CategoryType } from "@category/types.ts"
import { fonts } from "@core/assets/fonts"
import { windowWidth } from "@core/utils/demensions.ts"
import ImageSkeleton from "@core/components/ImageSkeleton.tsx"

type CategoryCardProps = {
    category: CategoryType
} & NavigationType

const CategoryCard = ({ category, navigation }: CategoryCardProps) => {
    const handlePress = () => {
        navigation.navigate("CategoryDetail", { category })
    }

    return (
        <Wrapper onPress={handlePress} style={{ width: windowWidth * 0.218 }}>
            <ImageSkeleton imageStyle={imageStyle} uri={domain + category.icon} />

            <CategoryName numberOfLines={3} ellipsizeMode="tail">
                {category.name}
            </CategoryName>
        </Wrapper>
    )
}

const Wrapper = styled.Pressable`
    position: relative;
    border-radius: 8px;
    overflow: hidden;
    align-items: center;
`

const imageStyle = css`
    width: 95%;
    height: 80px;
    border-radius: 8px;
`

const CategoryName = styled.Text`
    font-size: 16px;
    margin: 5px;
    font-family: ${fonts.regular};
    color: ${(props) => props.theme.text};
`

export default CategoryCard
