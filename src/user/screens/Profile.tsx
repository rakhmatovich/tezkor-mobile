import { Fragment, ReactNode, useRef, useState } from "react"
import { BottomSheetModal } from "@gorhom/bottom-sheet"
import styled from "@emotion/native"
import { Container } from "@core/components/styles"
import { NavigationType } from "@core/types.ts"
import BottomSheetComponent from "@core/components/BottomSheetComponent.tsx"
import { windowHeight } from "@core/utils/demensions.ts"
import { ProfileModalType } from "@user/types.ts"
import ProfileHeader from "@user/components/ProfileHeader.tsx"
import ProfileOptions from "@user/components/ProfileOptions.tsx"
import ProfileUserLocations from "@user/components/ProfileUserLocations.tsx"
import ProfileEdit from "@user/components/ProfileEdit.tsx"
import ProfileSignOut from "@user/components/ProfileSignOut.tsx"

type ProfileProps = NavigationType

const Profile = ({ navigation }: ProfileProps) => {
    const bottomSheetRef = useRef<BottomSheetModal>(null)
    const [modalSettings, setModalSettings] = useState<{ height: number; component: ReactNode }>()

    const openModal = (type: ProfileModalType) => {
        switch (type) {
            case "edit":
                setModalSettings({
                    height: windowHeight * 0.9,
                    component: <ProfileEdit closeModal={closeModal} />,
                })
                break
            case "exit":
                setModalSettings({
                    height: 170,
                    component: <ProfileSignOut closeModal={closeModal} navigation={navigation} />,
                })
                break
        }

        bottomSheetRef.current?.present()
    }

    const closeModal = () => bottomSheetRef.current?.close()

    return (
        <Fragment>
            <ProfileHeader />

            <Container>
                <OptionWrapper>
                    <ProfileUserLocations navigation={navigation} />
                    <ProfileOptions openModal={openModal} />
                </OptionWrapper>
            </Container>

            <BottomSheetComponent
                bottomSheetRef={bottomSheetRef}
                snapPoints={[modalSettings?.height ?? windowHeight * 0.25]}
            >
                {modalSettings?.component}
            </BottomSheetComponent>
        </Fragment>
    )
}

const OptionWrapper = styled.ScrollView`
    padding: 30px 10px;
`

export default Profile
