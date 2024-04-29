import { useCallback } from "react"
import { AxiosError } from "axios"
import { UseMutationOptions } from "react-query/types/react/types"
import { signOut } from "@user/utils/auth.ts"
import { ModelType, Pagination } from "@core/types"
import {
    MutationFunction,
    QueryFunction,
    QueryKey,
    useIsFetching,
    useMutation,
    useQuery,
    useQueryClient,
    UseQueryOptions,
} from "react-query"
import { addToList, deleteFromList, updateList, updateObject } from "@core/utils/state.ts"
import { showToast } from "@core/hooks/toast.ts"
import { useTranslation } from "react-i18next"

type ServerErrorType = Record<string, string>
type BaseError = AxiosError<ServerErrorType>

function useErrorHandler(onError?: (err: BaseError) => void) {
    // const navigation = useNavigation<StackNavigationType>()
    // const client = useQueryClient()
    const { t } = useTranslation()

    return (error: BaseError) => {
        onError?.(error)
        // eslint-disable-next-line no-console
        console.log(JSON.stringify(error.response?.data))

        if (error.response === undefined || error.response.status === 0) {
            showToast({
                type: "error",
                title: t("internetError"),
                visibilityTime: 4000,
            })
        } else if (error.response.status >= 500) {
            showToast({
                type: "error",
                title: t("serverError"),
                visibilityTime: 4000,
            })
        } else if (error.response.status === 401) {
            signOut()
            // navigation.navigate("Home")
            // client.invalidateQueries()
        }
    }
}

export function useFetch<Data = unknown>(
    queryKey: QueryKey,
    queryFn: QueryFunction<Data>,
    options?: Omit<UseQueryOptions<Data, BaseError>, "queryKey" | "queryFn">
) {
    const onError = useErrorHandler(options?.onError)

    return useQuery<Data, BaseError>(queryKey, queryFn, {
        ...options,
        onError,
    })
}

export function useFetchList<Data extends ModelType>(
    queryKey: QueryKey,
    queryFn: QueryFunction<Pagination<Data>>,
    options?: Omit<UseQueryOptions<Pagination<Data>, BaseError>, "queryKey" | "queryFn">
) {
    const client = useQueryClient()
    const result = useFetch(queryKey, queryFn, options)

    const addItem = useCallback(
        (item: Data) => {
            client.setQueryData<Pagination<Data> | undefined>(queryKey, addToList(item))
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [queryKey]
    )

    const updateItem = useCallback(
        (item: Data) => {
            client.setQueryData<Pagination<Data> | undefined>(queryKey, updateList(item))
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [queryKey]
    )

    const deleteItem = useCallback(
        (id: number) => {
            client.setQueryData<Pagination<Data> | undefined>(queryKey, deleteFromList(id))
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [queryKey]
    )

    return { ...result, addItem, updateItem, deleteItem }
}

export function useFetchOne<Data>(
    queryKey: QueryKey,
    queryFn: QueryFunction<Data>,
    options?: Omit<UseQueryOptions<Data, BaseError>, "queryKey" | "queryFn">
) {
    const client = useQueryClient()
    const result = useFetch(queryKey, queryFn, options)

    const setData = useCallback(
        (item: Partial<Data>) => {
            client.setQueryData<Partial<Data> | undefined>(queryKey, updateObject(item))
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [queryKey]
    )

    return { ...result, setData }
}

export function useMutate<Data, Variables>(
    mutationFn: MutationFunction<Data, Variables>,
    options?: Omit<UseMutationOptions<Data, BaseError, Variables>, "mutationFn">
) {
    const onError = useErrorHandler(options?.onError as (err: BaseError) => void)
    return useMutation(mutationFn, { ...options, onError })
}

export function useIsUpdating() {
    const isLoading = useIsFetching({ predicate: (query) => query.state.status === "loading" })
    const isFetching = useIsFetching()

    return isFetching && !isLoading
}

// export function useInfiniteFetch<Data extends ModelType>(
//     queryKey: QueryKey,
//     queryFn: QueryFunction<Pagination<Data>>,
//     options?: Omit<UseInfiniteQueryOptions<Pagination<Data>, BaseError>, "queryKey" | "queryFn">,
//     pageSize = 16
// ) {
//     const client = useQueryClient()
//     const onError = useErrorHandler(options?.onError)
//
//     const result = useInfiniteQuery(queryKey, queryFn, {
//         getNextPageParam: (last, pages) => {
//             const maxPages = Math.ceil(last.count / pageSize)
//             const nextPage = pages.length + 1
//             return nextPage <= maxPages ? nextPage : undefined
//         },
//         ...options,
//         onError,
//     })
//
//     const observer = useIntersectionObserver({
//         onIntersect: result.fetchNextPage,
//         enabled: result.hasNextPage && !result.isFetchingNextPage,
//     })
//
//     const addItem = useCallback(
//         (item: Data) => {
//             client.setQueryData<InfiniteData<Pagination<Data>> | undefined>(queryKey, addToInfinite(item))
//         },
//         // eslint-disable-next-line react-hooks/exhaustive-deps
//         [queryKey]
//     )
//
//     const updateItem = useCallback(
//         (item: Data) => {
//             client.setQueryData<InfiniteData<Pagination<Data>> | undefined>(queryKey, updateInfinite(item))
//         },
//         // eslint-disable-next-line react-hooks/exhaustive-deps
//         [queryKey]
//     )
//
//     const deleteItem = useCallback(
//         (id: number) => {
//             client.setQueryData<InfiniteData<Pagination<Data>> | undefined>(queryKey, deleteFromInfinite(id))
//         },
//         // eslint-disable-next-line react-hooks/exhaustive-deps
//         [queryKey]
//     )
//
//     return { observer, addItem, updateItem, deleteItem, ...result }
// }
