import { Fragment, useCallback, useRef } from "react"
import styled from "@emotion/native"
import { useTheme } from "@emotion/react"
import { NavigationType } from "@core/types.ts"
import { Container } from "@core/components/styles"
import SettingsHeader from "@user/components/SettingsHeader.tsx"
import SettingsOptions from "@user/components/SettingsOptions.tsx"
import { BottomSheetModal } from "@gorhom/bottom-sheet"
import BottomSheetComponent from "@core/components/BottomSheetComponent.tsx"
import SettingsLanguage from "@user/components/SettingsLanguage.tsx"

type SettingsProps = {
    changeTheme: () => void
} & NavigationType

const Settings = ({ changeTheme, navigation }: SettingsProps) => {
    const theme = useTheme()
    const bottomSheetRef = useRef<BottomSheetModal>(null)

    const openModal = useCallback(() => {
        bottomSheetRef.current?.present()
    }, [])

    const closeModal = useCallback(() => {
        bottomSheetRef.current?.close()
    }, [])

    return (
        <Fragment>
            <SettingsHeader navigation={navigation} />

            <Container>
                <OptionWrapper>
                    <SettingsOptions changeTheme={changeTheme} openModal={openModal} />
                </OptionWrapper>

                <BottomSheetComponent bottomSheetRef={bottomSheetRef} snapPoints={["25%"]}>
                    <SettingsLanguage closeModal={closeModal} theme={theme} />
                </BottomSheetComponent>
            </Container>
        </Fragment>
    )
}

const OptionWrapper = styled.ScrollView`
    padding: 10px;
`

export default Settings
