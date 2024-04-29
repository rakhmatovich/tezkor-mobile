import { useCallback, useEffect, useRef, useState } from "react"
import { Image, Platform, SafeAreaView } from "react-native"
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps"
import { useTranslation } from "react-i18next"
import { check, PERMISSIONS, request, RESULTS } from "react-native-permissions"
import Geolocation from "@react-native-community/geolocation"
import { BottomSheetModal } from "@gorhom/bottom-sheet"
import styled, { css } from "@emotion/native"
import { useTheme } from "@emotion/react"
import BackButton from "@core/components/BackButton.tsx"
import { fonts } from "@core/assets/fonts"
import { ButtonText } from "@core/components/styles"
import Button from "@core/components/common/Button.tsx"
import BottomSheetComponent from "@core/components/BottomSheetComponent.tsx"
import { windowHeight } from "@core/utils/demensions.ts"
import { NavigationType } from "@core/types.ts"
import { locationMark } from "@core/assets/images"
import UserLocationFields from "@user/components/UserLocationFields.tsx"
import { LocationType } from "@user/types.ts"
import { useFocusEffect } from "@react-navigation/native"

type Props = {
    route: { params: { location: LocationType } | undefined }
} & NavigationType

const UserLocation = ({ route, navigation }: Props) => {
    const location = route.params?.location
    const theme = useTheme()
    const { t } = useTranslation()
    const [markerCoordinates, setMarkerCoordinates] = useState({
        latitude: location?.latitude || 41.311081,
        longitude: location?.longitude || 69.240562,
        latitudeDelta: 0.01,
        longitudeDelta: 0.008,
    })

    const bottomSheetRef = useRef<BottomSheetModal>(null)
    const mapRef = useRef<MapView>(null)

    useFocusEffect(
        useCallback(() => {
            if (!location) {
                checkLocationPermission()
                return
            }
            setTimeout(() => mapRef.current?.animateToRegion(markerCoordinates, 2000), 1000)
            // eslint-disable-next-line react-hooks/exhaustive-deps
        }, [])
    )

    useEffect(() => {
        mapRef.current?.animateToRegion(markerCoordinates, 500)
    }, [markerCoordinates])

    const getCurrentLocation = () => {
        Geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords
                setMarkerCoordinates((prev) => ({ ...prev, latitude, longitude }))
            },
            // eslint-disable-next-line no-console
            (error) => console.log(error),
            { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
        )
    }

    const checkLocationPermission = async () => {
        const platformPermission =
            Platform.OS === "ios" ? PERMISSIONS.IOS.LOCATION_WHEN_IN_USE : PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION
        const result = await check(platformPermission)

        if (result !== RESULTS.GRANTED) await request(platformPermission)
        getCurrentLocation()
    }

    const openModal = () => bottomSheetRef.current?.present()
    const closeModal = () => bottomSheetRef.current?.close()

    return (
        <Wrapper>
            <HeaderBg>
                <SafeAreaView>
                    <Header>
                        <BackButton color={theme.white} size={28} />
                        <Heading>{t("tapToChoose")}</Heading>
                    </Header>
                </SafeAreaView>
            </HeaderBg>

            <MapView
                style={mapViewStyle}
                provider={PROVIDER_GOOGLE}
                showsUserLocation={true}
                showsMyLocationButton={true}
                mapType={Platform.OS === "android" ? "none" : "standard"}
                mapPadding={{ bottom: 40, top: 100, right: 10, left: 10 }}
                ref={mapRef}
                onPress={(e) =>
                    setMarkerCoordinates({ ...e.nativeEvent.coordinate, latitudeDelta: 0.01, longitudeDelta: 0.008 })
                }
            >
                <Marker coordinate={markerCoordinates}>
                    <Image
                        source={locationMark}
                        style={{ height: 35, width: 35, resizeMode: "contain", marginBottom: 35 }}
                    />
                </Marker>
            </MapView>

            <ButtonView>
                <SafeAreaView>
                    <Button borderRadius={8} onPress={openModal}>
                        <ButtonText style={{ margin: 10, fontSize: 16 }}> {t("chose")}</ButtonText>
                    </Button>
                </SafeAreaView>
            </ButtonView>

            <BottomSheetComponent bottomSheetRef={bottomSheetRef} snapPoints={[windowHeight * 0.85]}>
                <UserLocationFields
                    longitude={markerCoordinates.longitude}
                    latitude={markerCoordinates.latitude}
                    navigation={navigation}
                    location={location}
                    closeModal={closeModal}
                />
            </BottomSheetComponent>
        </Wrapper>
    )
}

const Wrapper = styled.View`
    flex: 1;
    position: relative;
`

const HeaderBg = styled.View`
    top: 0;
    position: absolute;
    z-index: 10;
    width: 100%;
    background-color: ${(props) => props.theme.primary}99;
`

const Header = styled.View`
    width: 100%;
    padding: 10px;
    flex-direction: row;
    align-items: center;
`

const Heading = styled.Text`
    flex: 1;
    text-align: center;
    font-size: 18px;
    font-family: ${fonts.regular};
    color: ${(props) => props.theme.white};
    padding-right: 28px;
`

const mapViewStyle = css`
    flex: 1;
`

const ButtonView = styled.View`
    position: absolute;
    bottom: 0;
    width: 100%;
    padding: 10px;
`

export default UserLocation
