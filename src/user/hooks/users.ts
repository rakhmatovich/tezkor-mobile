import { request } from "@core/utils/baseAxios.ts"
import { useFetchOne, useMutate } from "@core/hooks/request.ts"
import { USERS_CHECK_IN, USERS_SIGN_IN, USERS_USER } from "@user/urls.ts"
import { CheckInType, SignInType, UserType } from "@user/types.ts"
import { useQueryClient } from "react-query"

export function useSignIn() {
    return useMutate((values: SignInType) => {
        return request({ method: "post", url: USERS_SIGN_IN, data: values })
    })
}

export function useCheckIn() {
    return useMutate((values: CheckInType) => {
        return request({ method: "post", url: USERS_CHECK_IN, data: values })
    })
}

export function useUserInfo() {
    return useFetchOne<UserType>(["user"], () => {
        return request({ method: "get", url: USERS_USER }, false)
    })
}

export function useUserUpdate() {
    const queryClient = useQueryClient()
    const onSuccess = (data: UserType) => {
        queryClient.setQueryData(["user"], () => data)
    }

    return useMutate(
        (values: UserType) => {
            return request({ method: "put", url: USERS_USER, data: values }, false)
        },
        { onSuccess }
    )
}
