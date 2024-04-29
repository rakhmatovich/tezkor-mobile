import { useTranslation } from "react-i18next"
import { useQueryClient } from "react-query"
import i18n from "i18next"
import { API_GOOGLE_MAPS_KEY } from "@env"
import { useFetchList, useFetchOne, useMutate } from "@core/hooks/request.ts"
import { request } from "@core/utils/baseAxios.ts"
import { showToast } from "@core/hooks/toast.ts"
import { addToList, updateList } from "@core/utils/state.ts"
import { GOOGLE_MAP_API, USER_LOCATION, USER_LOCATION_DETAIL } from "@user/urls.ts"
import { LocationType } from "@user/types.ts"

export function useGeocoder(lat: number, long: number) {
    const language = i18n.language

    return useFetchOne(["location", lat, long], () =>
        request({
            method: "get",
            url: GOOGLE_MAP_API,
            params: { address: `${lat},${long}`, key: API_GOOGLE_MAPS_KEY, language },
        })
    )
}

export function useLocationList() {
    return useFetchList<LocationType>(["location-list"], () => request({ method: "get", url: USER_LOCATION }, false))
}

export function useLocationCreate() {
    const { t } = useTranslation()
    const queryClient = useQueryClient()

    const onSuccess = (data: LocationType) => {
        queryClient.setQueryData(["location-list"], addToList<LocationType>(data))
        showToast({ type: "success", title: t("addedLocation") })
    }

    return useMutate(
        (values: LocationType) => {
            return request({ method: "post", url: USER_LOCATION, data: values }, false)
        },
        { onSuccess }
    )
}

export function useLocationUpdate(id: number | undefined) {
    const queryClient = useQueryClient()

    const onSuccess = (data: LocationType) => {
        queryClient.setQueryData(["location-list"], updateList<LocationType>(data))
    }

    return useMutate(
        (values: LocationType) => {
            return request(
                { method: "put", url: USER_LOCATION_DETAIL.replace("{id}", String(id)), data: values },
                false
            )
        },
        { onSuccess }
    )
}
