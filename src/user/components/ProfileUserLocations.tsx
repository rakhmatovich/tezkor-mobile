import { ActivityIndicator } from "react-native"
import { useTranslation } from "react-i18next"
import { useTheme } from "@emotion/react"
import styled from "@emotion/native"
import { fonts } from "@core/assets/fonts"
import { ButtonText } from "@core/components/styles"
import Button from "@core/components/common/Button.tsx"
import { NavigationType } from "@core/types.ts"
import { useLocationList } from "@user/hooks/location.ts"
import { locationMark } from "@core/assets/images"
import { EditSvg } from "@core/assets/svgs"
import { Fragment } from "react"
import { LocationType } from "@user/types.ts"

type ProfileUserLocationsProps = NavigationType

const ProfileUserLocations = ({ navigation }: ProfileUserLocationsProps) => {
    const { t } = useTranslation()
    const theme = useTheme()
    const { data: locations, isLoading } = useLocationList()

    const navigateLocation = () => navigation.navigate("UserLocation")
    const navigateChangeLocation = (location: LocationType) => navigation.navigate("UserLocation", { location })

    if (isLoading) {
        return (
            <Wrapper>
                <ActivityIndicator size="small" color={theme.primary} />
            </Wrapper>
        )
    }

    return (
        <Wrapper>
            <Row>
                <Heading>{t("locationsInfo")}</Heading>

                <LocationsCountBg>
                    <LocationsCount>{locations?.count || "0"}</LocationsCount>
                </LocationsCountBg>
            </Row>

            {locations &&
                locations.results.length > 0 &&
                locations.results.map((location, index) => (
                    <Fragment key={location.id}>
                        <LocationWrapper>
                            <Image source={locationMark} />

                            <NameBlock>
                                <Name numberOfLines={1} ellipsizeMode="tail">
                                    {location.name}
                                </Name>
                                <Address numberOfLines={2} ellipsizeMode="tail">
                                    {location.location}
                                </Address>
                            </NameBlock>
                            <EditButton onPress={() => navigateChangeLocation(location)}>
                                <EditSvg />
                            </EditButton>
                        </LocationWrapper>
                        {index !== locations.results.length - 1 && <Line />}
                    </Fragment>
                ))}

            <Button borderRadius={8} onPress={navigateLocation}>
                <ButtonText style={{ margin: 10, fontSize: 15 }}>+ {t("addLocation")}</ButtonText>
            </Button>
        </Wrapper>
    )
}

const Wrapper = styled.View`
    background-color: ${(props) => props.theme.white};
    border-radius: 8px;
    padding: 20px;
    margin-bottom: 20px;
    gap: 20px;
`

const Row = styled.View`
    flex-direction: row;
    align-items: flex-end;
    gap: 10px;
`

const LocationWrapper = styled.View`
    width: 100%;
    flex-direction: row;
    align-items: center;
    gap: 10px;
`

const Line = styled.View`
    width: 100%;
    border: 0.5px solid ${(props) => props.theme.gray};
`

const Image = styled.Image`
    width: 24px;
    height: 30px;
    resize-mode: contain;
`

const EditButton = styled.Pressable`
    padding: 10px;
    margin: -10px;
`

const NameBlock = styled.View`
    flex: 1;
`

const Name = styled.Text`
    font-size: 16px;
    font-family: ${fonts.regular};
    color: ${(props) => props.theme.text};
`

const Address = styled.Text`
    font-size: 14px;
    font-family: ${fonts.regular};
    color: ${(props) => props.theme.darkGray};
`

const Heading = styled.Text`
    font-size: 16px;
    font-family: ${fonts.bold};
    color: ${(props) => props.theme.text};
`

const LocationsCountBg = styled.View`
    height: 18px;
    justify-content: center;
    padding: 0 6px;
    border-radius: 4px;
    background-color: ${(props) => props.theme.background};
`

const LocationsCount = styled.Text`
    font-size: 12px;
    font-family: ${fonts.bold};
    color: ${(props) => props.theme.text};
`

export default ProfileUserLocations
