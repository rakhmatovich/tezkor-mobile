import React, { ReactNode, Ref, useCallback } from "react"
import { BottomSheetBackdrop, BottomSheetModal, BottomSheetView } from "@gorhom/bottom-sheet"
import { BottomSheetDefaultBackdropProps } from "@gorhom/bottom-sheet/lib/typescript/components/bottomSheetBackdrop/types"
import { useTheme } from "@emotion/react"

type BottomSheetComponentProps = {
    bottomSheetRef: Ref<BottomSheetModal>
    snapPoints?: string[] | number[]
    children: ReactNode
}

const BottomSheetComponent = ({ bottomSheetRef, snapPoints = ["50%"], children }: BottomSheetComponentProps) => {
    const theme = useTheme()

    const renderBackdrop = useCallback(
        (props: BottomSheetDefaultBackdropProps) => (
            <BottomSheetBackdrop {...props} disappearsOnIndex={-1} appearsOnIndex={0} />
        ),
        []
    )

    return (
        <BottomSheetModal
            ref={bottomSheetRef}
            index={0}
            snapPoints={snapPoints}
            backdropComponent={renderBackdrop}
            backgroundStyle={{ backgroundColor: theme.white }}
            handleIndicatorStyle={{ backgroundColor: theme.black }}
        >
            <BottomSheetView style={{ flex: 1 }}>{children}</BottomSheetView>
        </BottomSheetModal>
    )
}

export default BottomSheetComponent
