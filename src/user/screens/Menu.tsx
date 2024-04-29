import { Fragment } from "react"
import styled from "@emotion/native"
import { NavigationType } from "@core/types.ts"
import { Container } from "@core/components/styles"
import MenuHeader from "@user/components/MenuHeader.tsx"
import MenuOptions from "@user/components/MenuOptions.tsx"

type MenuProps = NavigationType

const Menu = ({ navigation }: MenuProps) => {
    return (
        <Fragment>
            <MenuHeader navigation={navigation} />

            <Container>
                <OptionWrapper>
                    <MenuOptions navigation={navigation} />
                </OptionWrapper>
            </Container>
        </Fragment>
    )
}

const OptionWrapper = styled.ScrollView`
    padding: 40px 10px;
`

export default Menu
